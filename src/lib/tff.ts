const CLUB_URL = "https://tffistanbul.org/kulup/gercek-kuzey-spor/1151";
const OUR_CLUB_SLUG = "gercek-kuzey-spor";
const TFF_ORIGIN = "https://tffistanbul.org";
const MAX_TFF_RESPONSE_CHARACTERS = 2_000_000;
const TFF_FETCH_TIMEOUT_MS = 10_000;

// Scraping starts only once the season is underway. Before this date we
// keep showing the static pre-season snapshot instead of hitting the
// source site on every build/request for nothing.
const SEASON_START = new Date("2026-09-01T13:00:00+03:00");

// Once live, refresh once a week (matches are weekly; no point polling more).
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export type StandingRow = {
  rank: number;
  team: string;
  g: number;
  b: number;
  m: number;
  p: number;
  isUs: boolean;
  crestUrl?: string; // absolute URL to the club's crest image, when TFF has a real one on file
};

export type FixtureRow = {
  week: number;
  date: string;
  home: string;
  away: string;
  homeIsUs: boolean;
  awayIsUs: boolean;
  homeCrestUrl?: string;
  awayCrestUrl?: string;
  stadium?: string;
  time?: string;
};

export type LeagueData = {
  leagueLabel: string; // e.g. "U11 Ligi"
  weekLabel: string;   // e.g. "7. Hafta"
  groupLabel: string;  // e.g. "9. Grup"
  standings: StandingRow[];
  fixtures: FixtureRow[];
  isLive: boolean; // true if this came from a live fetch, false if static fallback
};

const OUR_CREST = "/logo.png";
const OUR_NAME_NORMALIZED = "gerçek kuzey spor";

function isOurTeam(name: string): boolean {
  return name.trim().toLocaleLowerCase("tr-TR") === OUR_NAME_NORMALIZED;
}

// Pre-season snapshot (matches what tffistanbul.org shows before kickoff).
// Used as-is until SEASON_START so we don't scrape for nothing.
const FALLBACK: LeagueData = {
  leagueLabel: "U11 Ligi",
  weekLabel: "7. Hafta",
  groupLabel: "9. Grup",
  isLive: false,
  standings: [
    { rank: 1, team: "Boğaziçi",                        g: 0, b: 0, m: 0, p: 0, isUs: false, crestUrl: encodeURI(`${TFF_ORIGIN}/images/40__306048281_bogazicispor copy.jpg`) },
    { rank: 2, team: "Dikilitaş Spor",                  g: 0, b: 0, m: 0, p: 0, isUs: false, crestUrl: encodeURI(`${TFF_ORIGIN}/images/40__4730692139_dikilitasspor copy.jpg`) },
    { rank: 3, team: "Etiler Kartalspor",               g: 0, b: 0, m: 0, p: 0, isUs: false },
    { rank: 4, team: "Gerçek Kuzey Spor",               g: 0, b: 0, m: 0, p: 0, isUs: true, crestUrl: OUR_CREST },
    { rank: 5, team: "Ihlamurdere Spor",                g: 0, b: 0, m: 0, p: 0, isUs: false, crestUrl: encodeURI(`${TFF_ORIGIN}/images/40__5874910149_IHLAMURDERE.jpeg`) },
    { rank: 6, team: "İstanbul Çamoluk 28 Spor Kulübü", g: 0, b: 0, m: 0, p: 0, isUs: false },
    { rank: 7, team: "Simurg Spor",                     g: 0, b: 0, m: 0, p: 0, isUs: false, crestUrl: encodeURI(`${TFF_ORIGIN}/images/40__47309531270_SimurgSK logo.jpg`) },
    { rank: 8, team: "Yeni Levent Konaklar Spor",       g: 0, b: 0, m: 0, p: 0, isUs: false },
  ],
  fixtures: [
    { week: 1, date: "31 Mart 2026 Salı",      home: "Gerçek Kuzey Spor", away: "Etiler Kartalspor",         homeIsUs: true,  awayIsUs: false, homeCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "18:00" },
    { week: 2, date: "6 Nisan 2026 Pazartesi", home: "Dikilitaş Spor",    away: "Gerçek Kuzey Spor",         homeIsUs: false, awayIsUs: true,  homeCrestUrl: encodeURI(`${TFF_ORIGIN}/images/60__4730692139_dikilitasspor copy.jpg`), awayCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "20:00" },
    { week: 3, date: "13 Nisan 2026 Pazartesi", home: "İstanbul Çamoluk 28 Spor Kulübü", away: "Gerçek Kuzey Spor", homeIsUs: false, awayIsUs: true, awayCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "19:00" },
    { week: 4, date: "18 Nisan 2026 Cumartesi", home: "Gerçek Kuzey Spor", away: "Yeni Levent Konaklar Spor", homeIsUs: true,  awayIsUs: false, homeCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "19:00" },
    { week: 5, date: "23 Nisan 2026 Perşembe", home: "Ihlamurdere Spor", away: "Gerçek Kuzey Spor",          homeIsUs: false, awayIsUs: true,  homeCrestUrl: encodeURI(`${TFF_ORIGIN}/images/60__5874910149_IHLAMURDERE.jpeg`), awayCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi - 2", time: "18:00" },
    { week: 6, date: "25 Nisan 2026 Cumartesi", home: "Gerçek Kuzey Spor", away: "Simurg Spor",              homeIsUs: true,  awayIsUs: false, homeCrestUrl: OUR_CREST, awayCrestUrl: encodeURI(`${TFF_ORIGIN}/images/60__47309531270_SimurgSK logo.jpg`), stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "19:00" },
    { week: 7, date: "2 Mayıs 2026 Cumartesi", home: "Boğaziçi",          away: "Gerçek Kuzey Spor",         homeIsUs: false, awayIsUs: true,  homeCrestUrl: encodeURI(`${TFF_ORIGIN}/images/60__306048281_bogazicispor copy.jpg`), awayCrestUrl: OUR_CREST, stadium: "Beşiktaş Bld. İsmet İnönü Spor Tesisi", time: "17:30" },
  ],
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function toTitleCase(s: string): string {
  return decodeEntities(s)
    .toLocaleLowerCase("tr-TR")
    .replace(/(^|\s|-)(\p{L})/gu, (_, sep, ch) => sep + ch.toLocaleUpperCase("tr-TR"));
}

// Only trusts real raster crests (<img>) hosted by TFF. Teams without an
// uploaded crest fall back to an inline placeholder <svg> on their site;
// we deliberately don't inject that markup (it's untrusted external HTML),
// our own initials badge covers that case instead.
export function normalizeTffCrestUrl(src: string): string | undefined {
  try {
    const url = new URL(src, TFF_ORIGIN);
    if (url.protocol !== "https:" || url.hostname !== "tffistanbul.org") return undefined;
    if (!url.pathname.startsWith("/images/") || !/\.(?:jpe?g|png|webp)$/i.test(url.pathname)) {
      return undefined;
    }
    return url.href;
  } catch {
    return undefined;
  }
}

function extractCrest(block: string): string | undefined {
  const img = block.match(/<img\s+src="([^"]+)"/);
  if (!img) return undefined;
  return normalizeTffCrestUrl(img[1].trim());
}

function parseHeader(html: string): { leagueLabel: string; weekLabel: string; groupLabel: string } {
  const h4 = html.match(/widget-standings[\s\S]*?<h4>([\s\S]*?)<\/h4>/);
  const h5 = html.match(/widget-standings[\s\S]*?<h5 class="widget--sub-header">([\s\S]*?)<\/h5>/);
  let leagueLabel = "Lig";
  let weekLabel = "";
  if (h4) {
    const parts = h4[1].split(/<br\s*\/?>/i).map((p) => decodeEntities(p.replace(/<[^>]+>/g, "")));
    leagueLabel = toTitleCase(parts[0] || "Lig");
    weekLabel = (parts[1] || "").replace(/\s*Puan Durumu\s*$/i, "");
  }
  const groupLabel = h5 ? toTitleCase(h5[1].replace(/<[^>]+>/g, "")) : "";
  return { leagueLabel, weekLabel, groupLabel };
}

function parseStandings(html: string): StandingRow[] {
  const tableMatch = html.match(/widget-standings[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>/);
  if (!tableMatch) return [];
  const rows = [...tableMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  const out: StandingRow[] = [];
  let rank = 0;
  for (const row of rows) {
    const body = row[1];
    const nameMatch = body.match(/team-meta__name">([\s\S]*?)<\/h6>/);
    if (!nameMatch) continue; // header row
    const slugMatch = body.match(/href="\/kulup\/([^/]+)\//);
    const cells = [...body.matchAll(/<td[^>]*>\s*([\s\S]*?)\s*<\/td>/g)]
      .map((c) => c[1].replace(/<[^>]+>/g, "").trim())
      .filter((_, i) => i > 0); // drop the team cell itself (already parsed via name)
    const isUs = slugMatch?.[1] === OUR_CLUB_SLUG;
    rank += 1;
    out.push({
      rank,
      team: toTitleCase(nameMatch[1]),
      g: Number(cells[0] ?? 0),
      b: Number(cells[1] ?? 0),
      m: Number(cells[2] ?? 0),
      p: Number(cells[3] ?? 0),
      isUs,
      crestUrl: isUs ? OUR_CREST : extractCrest(body),
    });
  }
  return out;
}

function parseFixtures(html: string): FixtureRow[] {
  const rawItems = html.split('<li class="widget-results__item">').slice(1);
  const out: FixtureRow[] = [];
  let pendingWeek = 0;
  let pendingDate = "";

  for (const raw of rawItems) {
    const body = raw.split("</li>")[0];
    const headerMatch = body.match(/(\d+)\.\s*Hafta\s*-\s*<\/span>\s*([\s\S]*?)<\/div>/);
    if (headerMatch) {
      pendingWeek = Number(headerMatch[1]);
      pendingDate = decodeEntities(headerMatch[2].replace(/<[^>]+>/g, ""));
      continue;
    }

    const firstIdx = body.indexOf("widget-results__team--first");
    const secondIdx = body.indexOf("widget-results__team--second");
    const resultIdx = body.indexOf("widget-results__result");
    const stadiumIdx = body.indexOf("widget-results__stadiumname");
    if (firstIdx === -1 || secondIdx === -1 || !pendingWeek) continue;

    const homeBlock = body.slice(firstIdx, resultIdx !== -1 ? resultIdx : secondIdx);
    const awayBlock = body.slice(secondIdx, stadiumIdx !== -1 ? stadiumIdx : body.length);

    const homeName = homeBlock.match(/team-name">([\s\S]*?)<\/h5>/);
    const awayName = awayBlock.match(/team-name">([\s\S]*?)<\/h5>/);
    if (!homeName || !awayName) continue;

    const home = toTitleCase(homeName[1]);
    const away = toTitleCase(awayName[1]);
    const homeIsUs = isOurTeam(home);
    const awayIsUs = isOurTeam(away);

    let stadium: string | undefined;
    let time: string | undefined;
    if (stadiumIdx !== -1) {
      const stadiumBlock = body.slice(stadiumIdx, body.length);
      const stadiumMatch = stadiumBlock.match(/widget-results__stadiumname">([\s\S]*?)<span>\s*-\s*([\d:]+)\s*<\/span>/);
      if (stadiumMatch) {
        stadium = decodeEntities(stadiumMatch[1].replace(/<[^>]+>/g, ""));
        time = stadiumMatch[2].trim();
      }
    }

    out.push({
      week: pendingWeek,
      date: pendingDate,
      home,
      away,
      homeIsUs,
      awayIsUs,
      homeCrestUrl: homeIsUs ? OUR_CREST : extractCrest(homeBlock),
      awayCrestUrl: awayIsUs ? OUR_CREST : extractCrest(awayBlock),
      stadium,
      time,
    });
    pendingWeek = 0;
  }
  return out;
}

export async function getLeagueData(): Promise<LeagueData> {
  if (Date.now() < SEASON_START.getTime()) {
    return FALLBACK;
  }

  try {
    const res = await fetch(CLUB_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GercekKuzeySK-Site/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TFF_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return FALLBACK;
    const contentLength = Number(res.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_TFF_RESPONSE_CHARACTERS) {
      return FALLBACK;
    }
    const html = await res.text();
    if (html.length > MAX_TFF_RESPONSE_CHARACTERS) return FALLBACK;

    const { leagueLabel, weekLabel, groupLabel } = parseHeader(html);
    const standings = parseStandings(html);
    const fixtures = parseFixtures(html);

    if (standings.length === 0) return FALLBACK;

    return { leagueLabel, weekLabel, groupLabel, standings, fixtures, isLive: true };
  } catch {
    return FALLBACK;
  }
}
