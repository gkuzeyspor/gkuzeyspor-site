import { decodeEntities, toTitleCase } from "./tff";

const PLAYERS_ORIGIN = "https://tffistanbul.org";
const CLUB_ID = "1151";
const MAX_PAGES = 20; // hard ceiling so a malformed pagination block can't trigger unbounded fetches
const MAX_RESPONSE_CHARACTERS = 2_000_000;
const FETCH_TIMEOUT_MS = 10_000;

// Player roster changes rarely (license transfers happen a few times a season),
// so a monthly refresh is plenty and keeps load on tffistanbul.org minimal.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

export type PlayerRow = {
  name: string;
  licenseNo: string;
  birthDate: string;
  profileUrl: string;
};

function playersPageUrl(page: number): string {
  return `${PLAYERS_ORIGIN}/futbolcular?t=${CLUB_ID}&n=&l=${page > 1 ? `&p=${page}` : ""}`;
}

async function fetchPage(page: number): Promise<string | undefined> {
  try {
    const res = await fetch(playersPageUrl(page), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GercekKuzeySK-Site/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return undefined;
    const contentLength = Number(res.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_CHARACTERS) {
      return undefined;
    }
    const html = await res.text();
    if (html.length > MAX_RESPONSE_CHARACTERS) return undefined;
    return html;
  } catch {
    return undefined;
  }
}

const PROFILE_PATH = /^\/futbolcu\/[a-z0-9-]+\/\d+$/i;

function parsePlayers(html: string): PlayerRow[] {
  const tableMatch = html.match(/players-table[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/);
  if (!tableMatch) return [];
  const rows = [...tableMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  const out: PlayerRow[] = [];

  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td>\s*<a href="([^"]+)">([\s\S]*?)<\/a>\s*<\/td>/g)];
    if (cells.length < 4) continue;
    const path = cells[0][1];
    if (!PROFILE_PATH.test(path)) continue;
    out.push({
      profileUrl: `${PLAYERS_ORIGIN}${path}`,
      name: toTitleCase(cells[0][2]),
      licenseNo: decodeEntities(cells[2][2]).trim(),
      birthDate: decodeEntities(cells[3][2]).trim(),
    });
  }
  return out;
}

function lastPageNumber(html: string): number {
  const pageLinks = [...html.matchAll(/futbolcular\?p=(\d+)&amp;n=&amp;l=&amp;t=\d+/g)];
  const numbers = pageLinks.map((m) => Number(m[1])).filter((n) => Number.isFinite(n));
  return numbers.length ? Math.min(Math.max(...numbers), MAX_PAGES) : 1;
}

export async function getPlayers(): Promise<PlayerRow[]> {
  const firstHtml = await fetchPage(1);
  if (!firstHtml) return [];

  const totalPages = lastPageNumber(firstHtml);
  const pages = [firstHtml];
  for (let page = 2; page <= totalPages; page++) {
    const html = await fetchPage(page);
    if (html) pages.push(html);
  }

  const players = pages.flatMap(parsePlayers);
  players.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return players;
}
