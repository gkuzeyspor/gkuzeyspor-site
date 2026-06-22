import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  ContactRateLimiter,
  ContactRequestError,
  readJsonBody,
  validateContactPayload,
} from "@/lib/contact";

const TO_EMAIL = "gkuzeyspor@hotmail.com";
const MAX_BODY_BYTES = 8_192;
const rateLimiter = new ContactRateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1_000,
  maxEntries: 10_000,
});

function json(body: object, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",", 1)[0].trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  const candidate = forwarded || realIp || "unknown";
  return candidate.slice(0, 64);
}

export async function POST(req: NextRequest) {
  const rateLimit = rateLimiter.check(clientKey(req));
  if (!rateLimit.allowed) {
    return json(
      { error: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await readJsonBody(req, MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return json({ error: error.message }, error.status);
    }
    return json({ error: "Geçersiz istek." }, 400);
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return json({ error: validation.error }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Sunucu yapılandırması eksik." }, 500);
  }

  const { name, email, message } = validation.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Gerçek Kuzey SK Web Sitesi <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Web sitesi mesajı — ${name}`,
      text: `Ad Soyad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    });

    if (error) {
      return json({ error: "Mail gönderilemedi." }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ error: "Mail gönderilemedi." }, 502);
  }
}
