import assert from "node:assert/strict";
import test from "node:test";

import { lastPageNumber, parsePlayers } from "../src/lib/players.ts";

const playerRow = ({
  path = "/futbolcu/andres-dos-reis-de-abreu/123607",
  name = "ANDRES DOS REIS DE ABREU",
  license = "2768743",
  birthDate = "08.11.2011",
} = {}) => `
  <tr>
    <td><a href="${path}">${name}</a></td>
    <td><a href="${path}">GERÇEK KUZEY SPOR</a></td>
    <td><a href="${path}">${license}</a></td>
    <td><a href="${path}">${birthDate}</a></td>
  </tr>`;

const playersTable = (rows) => `<table class="players-table"><tbody>${rows}</tbody></table>`;

test("parsePlayers preserves TFF source spelling and minimizes public data", () => {
  const players = parsePlayers(playersTable(playerRow()));

  assert.deepEqual(players, [
    {
      name: "ANDRES DOS REIS DE ABREU",
      birthYear: "2011",
      profileUrl: "https://tffistanbul.org/futbolcu/andres-dos-reis-de-abreu/123607",
    },
  ]);
  assert.equal("licenseNo" in players[0], false);
  assert.equal("birthDate" in players[0], false);
});

test("parsePlayers rejects hostile profile paths and malformed birth dates", () => {
  const html = playersTable(
    playerRow({ path: "https://evil.example/futbolcu/test/1" }) +
      playerRow({ path: "/futbolcu/test/1", birthDate: "not-a-date" }),
  );

  assert.deepEqual(parsePlayers(html), []);
});

test("lastPageNumber reads TFF pagination and enforces hard ceiling", () => {
  const normal = '<a href="/futbolcular?p=2&amp;n=&amp;l=&amp;t=1151">2</a>' +
    '<a href="/futbolcular?p=7&amp;n=&amp;l=&amp;t=1151">7</a>';
  const hostile = '<a href="/futbolcular?p=999&amp;n=&amp;l=&amp;t=1151">999</a>';

  assert.equal(lastPageNumber(normal), 7);
  assert.equal(lastPageNumber(hostile), 20);
});
