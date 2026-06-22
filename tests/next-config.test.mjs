import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config.ts";

test("Next config applies baseline security headers to every route", async () => {
  assert.equal(typeof nextConfig.headers, "function");
  const rules = await nextConfig.headers();
  const allHeaders = new Map(rules.flatMap((rule) => rule.headers).map((header) => [header.key, header.value]));

  assert.match(allHeaders.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(allHeaders.get("X-Content-Type-Options"), "nosniff");
  assert.equal(allHeaders.get("X-Frame-Options"), "DENY");
  assert.equal(allHeaders.get("Referrer-Policy"), "strict-origin-when-cross-origin");
  assert.match(allHeaders.get("Permissions-Policy") ?? "", /camera=\(\)/);
});

test("Next config does not disclose framework identity", () => {
  assert.equal(nextConfig.poweredByHeader, false);
});
