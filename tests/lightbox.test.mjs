import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

for (const file of ["PhotoLightbox.tsx", "VideoLightbox.tsx"]) {
  const source = readFileSync(new URL(`../src/components/${file}`, import.meta.url), "utf8");

  test(`${file} locks scrolling and moves focus inside the modal`, () => {
    assert.match(source, /document\.body\.style\.overflow = "hidden"/);
    assert.match(source, /closeButtonRef\.current\?\.focus\(\)/);
  });

  test(`${file} restores scroll and focus state when the modal closes`, () => {
    assert.match(source, /document\.body\.style\.overflow = previousOverflow/);
    assert.match(source, /previousFocus\?\.focus\(\)/);
  });
}
