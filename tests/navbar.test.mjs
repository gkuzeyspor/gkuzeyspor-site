import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const navbarSource = readFileSync(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");

test("mobile navigation overlay remains scrollable on short screens", () => {
  assert.match(navbarSource, /fixed inset-0[^"`]*overflow-y-auto/);
});

test("mobile navigation locks background scrolling while open", () => {
  assert.match(navbarSource, /document\.body\.style\.overflow = "hidden"/);
});
