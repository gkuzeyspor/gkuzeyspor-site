import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/Iletisim.tsx", import.meta.url),
  "utf8",
);

test("contact form forwards the honeypot field to the API", () => {
  assert.match(source, /website:\s*data\.get\("website"\)/);
});
