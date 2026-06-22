import assert from "node:assert/strict";
import test from "node:test";

import { normalizeTffCrestUrl } from "../src/lib/tff.ts";

test("normalizeTffCrestUrl accepts only HTTPS images from TFF İstanbul", () => {
  assert.equal(
    normalizeTffCrestUrl("/images/team logo.jpg"),
    "https://tffistanbul.org/images/team%20logo.jpg",
  );
  assert.equal(
    normalizeTffCrestUrl("https://tffistanbul.org/images/team.png"),
    "https://tffistanbul.org/images/team.png",
  );
  assert.equal(normalizeTffCrestUrl("http://tffistanbul.org/images/team.png"), undefined);
  assert.equal(normalizeTffCrestUrl("https://tffistanbul.org.evil.example/team.png"), undefined);
  assert.equal(normalizeTffCrestUrl("https://evil.example/team.png"), undefined);
  assert.equal(normalizeTffCrestUrl("data:image/svg+xml,<svg/>"), undefined);
});

test("normalizeTffCrestUrl rejects non-image paths", () => {
  assert.equal(normalizeTffCrestUrl("/api/track"), undefined);
  assert.equal(normalizeTffCrestUrl("/images/team.svg"), undefined);
});
