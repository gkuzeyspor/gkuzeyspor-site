const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const MESSAGE_CONTROL_CHARACTERS = /[\u0000\u000b\u000c\u000e-\u001f\u007f]/;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

export function validateContactPayload(value: unknown): ContactValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Geçersiz istek." };
  }

  const body = value as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.trim()) {
    return { ok: false, error: "Geçersiz istek." };
  }
  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return { ok: false, error: "Tüm alanları doldurun." };
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  if (
    name.length < NAME_MIN_LENGTH ||
    name.length > NAME_MAX_LENGTH ||
    HEADER_CONTROL_CHARACTERS.test(name)
  ) {
    return { ok: false, error: "Ad soyad 2–100 karakter olmalıdır." };
  }
  if (
    !email ||
    email.length > EMAIL_MAX_LENGTH ||
    HEADER_CONTROL_CHARACTERS.test(email) ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { ok: false, error: "Geçersiz e-posta adresi." };
  }
  if (
    message.length < MESSAGE_MIN_LENGTH ||
    message.length > MESSAGE_MAX_LENGTH ||
    MESSAGE_CONTROL_CHARACTERS.test(message)
  ) {
    return { ok: false, error: "Mesaj 10–5000 karakter olmalıdır." };
  }

  return { ok: true, data: { name, email, message } };
}

export class ContactRequestError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ContactRequestError";
    this.status = status;
  }
}

export async function readJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new ContactRequestError(415, "Yalnızca JSON istekleri kabul edilir.");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new ContactRequestError(413, "İstek gövdesi çok büyük.");
  }
  if (!request.body) {
    throw new ContactRequestError(400, "Geçersiz JSON gövdesi.");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new ContactRequestError(413, "İstek gövdesi çok büyük.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new ContactRequestError(400, "Geçersiz JSON gövdesi.");
  }
}

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  maxEntries: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export class ContactRateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>();
  private readonly options: RateLimitOptions;

  constructor(options: RateLimitOptions) {
    if (options.limit < 1 || options.windowMs < 1 || options.maxEntries < 1) {
      throw new Error("Rate limit options must be positive integers.");
    }
    this.options = options;
  }

  get size(): number {
    return this.entries.size;
  }

  check(key: string, now = Date.now()): RateLimitResult {
    let entry = this.entries.get(key);
    if (!entry || now >= entry.resetAt) {
      if (!entry && this.entries.size >= this.options.maxEntries) {
        const oldestKey = this.entries.keys().next().value as string | undefined;
        if (oldestKey) this.entries.delete(oldestKey);
      }
      entry = { count: 0, resetAt: now + this.options.windowMs };
      this.entries.set(key, entry);
    }

    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1_000));
    if (entry.count >= this.options.limit) {
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    entry.count += 1;
    return {
      allowed: true,
      remaining: this.options.limit - entry.count,
      retryAfterSeconds,
    };
  }
}
