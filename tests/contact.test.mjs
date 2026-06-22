import assert from "node:assert/strict";
import test from "node:test";

import {
  ContactRateLimiter,
  readJsonBody,
  validateContactPayload,
} from "../src/lib/contact.ts";

test("validateContactPayload accepts and trims valid input", () => {
  const result = validateContactPayload({
    name: "  Ada Lovelace  ",
    email: "  ada@example.com  ",
    message: "  Kulüp hakkında bilgi almak istiyorum.  ",
    website: "",
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Kulüp hakkında bilgi almak istiyorum.",
    },
  });
});

test("validateContactPayload rejects invalid types and field lengths", () => {
  assert.equal(validateContactPayload(null).ok, false);
  assert.equal(validateContactPayload({ name: 42, email: [], message: {} }).ok, false);
  assert.equal(
    validateContactPayload({ name: "A", email: "a@example.com", message: "Yeterince uzun" }).ok,
    false,
  );
  assert.equal(
    validateContactPayload({
      name: "Ada Lovelace",
      email: `${"a".repeat(245)}@example.com`,
      message: "Yeterince uzun",
    }).ok,
    false,
  );
  assert.equal(
    validateContactPayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "x".repeat(5001),
    }).ok,
    false,
  );
});

test("validateContactPayload rejects header control characters and honeypot input", () => {
  assert.equal(
    validateContactPayload({
      name: "Ada\r\nBcc: victim@example.com",
      email: "ada@example.com",
      message: "Yeterince uzun",
    }).ok,
    false,
  );
  assert.equal(
    validateContactPayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Yeterince uzun",
      website: "https://spam.example",
    }).ok,
    false,
  );
});

test("readJsonBody rejects unsupported content and oversized streamed bodies", async () => {
  await assert.rejects(
    readJsonBody(new Request("https://example.com", { method: "POST", body: "hello" }), 32),
    (error) => error.status === 415,
  );

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("{\"message\":\""));
      controller.enqueue(new TextEncoder().encode("x".repeat(64)));
      controller.enqueue(new TextEncoder().encode("\"}"));
      controller.close();
    },
  });
  const request = new Request("https://example.com", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: stream,
    duplex: "half",
  });

  await assert.rejects(readJsonBody(request, 32), (error) => error.status === 413);
});

test("ContactRateLimiter blocks requests over limit until window resets", () => {
  const limiter = new ContactRateLimiter({ limit: 2, windowMs: 1_000, maxEntries: 10 });

  assert.equal(limiter.check("client", 0).allowed, true);
  assert.equal(limiter.check("client", 100).allowed, true);
  const blocked = limiter.check("client", 200);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 1);
  assert.equal(limiter.check("client", 1_001).allowed, true);
});

test("ContactRateLimiter keeps storage bounded", () => {
  const limiter = new ContactRateLimiter({ limit: 1, windowMs: 10_000, maxEntries: 2 });

  limiter.check("one", 0);
  limiter.check("two", 1);
  limiter.check("three", 2);

  assert.ok(limiter.size <= 2);
});
