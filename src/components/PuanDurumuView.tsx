"use client";

import { useEffect, useRef } from "react";
import type { StandingRow, FixtureRow } from "@/lib/tff";
import SmallCaps from "./SmallCaps";

type Props = {
  leagueLabel: string;
  weekLabel: string;
  groupLabel: string;
  standings: StandingRow[];
  fixtures: FixtureRow[];
};

// TFF's own placeholder crest for clubs without an uploaded photo — same
// shield artwork, recolored per club. Reproduced here as static source
// (not fetched/injected at runtime) so it's the exact graphic tffistanbul.org
// shows for these clubs, with no untrusted-HTML injection risk.
function PlaceholderShield({ primary, accent }: { primary: string; accent: string }) {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
      <path
        fillRule="evenodd"
        fill={primary}
        d="M16 31.992c-1.092-.025-4.912-.197-6.757-.369-1.845-.172-1.949-.369-1.949-.369v-.615c.104-2.066.65-4.305.65-4.305 1.039-4.355.675-8.34.13-10.21-.546-1.869-.52-3.96-.52-4.181 0-.222-.13-.739-.13-.739-.26.246-1.538 2.563-1.689 2.829-.152.267-.78-.245-.78-.245-1.169-1.108-3.703-1.989-4.418-2.215-.714-.225-.519-.492-.519-.492l1.949-3.813c2.144-4.182 3.54-4.705 5.327-5.043A11.91 11.91 0 0 0 10.701 1h.814c-.046.34.045.707.485 1 1.125.75 4 2.125 4 3v26.992z"
      />
      <path
        fillRule="evenodd"
        fill={accent}
        d="M31.439 11.591c-.714.225-3.244 1.106-4.411 2.212 0 0-.627.512-.779.246-.151-.267-1.427-2.581-1.686-2.827 0 0-.13.516-.13.737 0 .221.026 2.311-.519 4.179-.545 1.868-.908 5.85.13 10.201 0 0 .545 2.236.649 4.301v.615s-.104.196-1.947.368c-1.842.172-5.656.344-6.746.369V5c0-.875 2.556-2.25 3.556-3 .391-.293.469-.66.429-1h1.257c.841.478 2.127.999 3.451 1.25 1.783.338 3.178.86 5.319 5.039l1.946 3.81s.194.266-.519.492z"
      />
      <path
        fillRule="evenodd"
        fill={primary}
        d="M20.528 2.505c-.859.723-1.274.737-1.719 1.02-.339.216-1.964.85-2.824 1.473-.853-.623-2.468-1.257-2.804-1.473-.442-.283-.854-.297-1.707-1.02-.854-.722-.244-1.699-.244-1.699l.239-.519C11.78.92 12.265 1.625 13 2c1.531.781 3.031 1.5 3 2-.034-.5 1.593-1.219 3.254-2 .918-.432 1.119-1.295 1.123-1.988h.028l.369.794s.613.977-.246 1.699z"
      />
      <path
        fillRule="evenodd"
        fill={primary}
        d="M.572 9.997c1.157.046 3.844.448 5.758 2.98-.288.505-.534.949-.595 1.056-.152.267-.78-.245-.78-.245-1.169-1.108-3.703-1.989-4.418-2.215-.714-.225-.519-.492-.519-.492l.554-1.084zM26.265 14.033c-.061-.107-.307-.551-.595-1.056 1.914-2.532 4.601-2.934 5.758-2.98l.554 1.084s.195.267-.519.492c-.715.226-3.249 1.107-4.418 2.215 0 0-.628.512-.78.245z"
      />
      <path
        fillRule="evenodd"
        opacity={0.149}
        fill={primary}
        d="M8.074 16.124a11.896 11.896 0 0 1-.325-1.508c.836 1.269 2.091 5.164 2.236 17.069a46.13 46.13 0 0 1-.742-.062c-1.845-.172-1.949-.369-1.949-.369v-.615c.104-2.066.65-4.305.65-4.305 1.039-4.355.675-8.34.13-10.21zM24.207 14.651a11.847 11.847 0 0 1-.324 1.505c-.545 1.867-.908 5.845.129 10.192 0 0 .545 2.234.649 4.297v.614s-.104.196-1.946.368c-.22.021-.472.041-.74.062.145-11.883 1.397-15.772 2.232-17.038z"
      />
      <path
        fillRule="evenodd"
        opacity={0.149}
        fill={primary}
        d="M7 10s3.906 5 8 5c0 0-2.747.846-6.964.974-.502-1.83-.482-3.816-.482-4.031 0-.222-.13-.739-.13-.739-.074.07-.234.316-.424.627V10zM24.93 10v1.831c-.189-.311-.349-.557-.423-.627 0 0-.13.517-.13.739 0 .215.021 2.201-.48 4.031-4.207-.128-6.946-.974-6.946-.974 4.083 0 7.979-5 7.979-5z"
      />
    </svg>
  );
}

// Exact colors TFF assigns to each club's placeholder shield (verified against
// tffistanbul.org's own markup). Clubs not listed here have no placeholder
// on TFF either — those keep a generic jersey icon further below.
const PLACEHOLDER_SHIELDS: Record<string, { primary: string; accent: string }> = {
  "Etiler Kartalspor": { primary: "#000000", accent: "#ff0000" },
  "İstanbul Çamoluk 28 Spor Kulübü": { primary: "#339900", accent: "#f0f0f0" },
  "Yeni Levent Konaklar Spor": { primary: "#000000", accent: "#ff0000" },
};

const JERSEY_COLORS = ["#e63946", "#2a9d8f", "#e9c46a", "#457b9d", "#f4a261", "#6a4c93", "#1d3557", "#ef476f"];

function jerseyColor(team: string): string {
  let hash = 0;
  for (let i = 0; i < team.length; i++) hash = (hash + team.charCodeAt(i)) % JERSEY_COLORS.length;
  return JERSEY_COLORS[hash];
}

function JerseyIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill={color} aria-hidden="true">
      <path d="M7.5 2L2 5.5l1.8 3.2L6 7.5V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5l2.2 1.2L22 5.5 16.5 2c-.6 1.2-2 2-4.5 2s-3.9-.8-4.5-2z" />
    </svg>
  );
}

function Crest({ team, src, size = 28 }: { team: string; src?: string; size?: number }) {
  const shield = PLACEHOLDER_SHIELDS[team];
  return (
    <span
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={team} loading="lazy" className="w-full h-full object-contain" />
      ) : shield ? (
        <PlaceholderShield primary={shield.primary} accent={shield.accent} />
      ) : (
        <JerseyIcon color={jerseyColor(team)} />
      )}
    </span>
  );
}

export default function PuanDurumuView({ leagueLabel, weekLabel, groupLabel, standings, fixtures }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in"), i * 100);
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="puan-durumu" ref={sectionRef} className="py-24 md:py-32 bg-navy-deep">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3">
            Lig Durumu
          </p>
          <h2 className="reveal font-cinzel font-bold text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            <SmallCaps>{"Puan Durumu & Fikstür"}</SmallCaps>
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mb-2" />
          <p className="font-worksans font-medium text-white/65 text-[13px] tracking-[0.05em] uppercase">
            {leagueLabel} · {groupLabel} · {weekLabel}
          </p>
        </div>

        {/* Standings */}
        <div className="reveal border border-white/8 mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <caption className="sr-only">
                {leagueLabel} {groupLabel} puan durumu tablosu, {weekLabel}
              </caption>
              <thead>
                <tr className="bg-white/[0.03] border-b-2 border-sky-light/20">
                  <th scope="col" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-5 py-4">Takım</th>
                  <th scope="col" title="Galibiyet" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-3 py-4 text-center border-l border-white/8">G</th>
                  <th scope="col" title="Beraberlik" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-3 py-4 text-center">B</th>
                  <th scope="col" title="Mağlubiyet" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-3 py-4 text-center">M</th>
                  <th scope="col" title="Puan" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-sky-light px-5 py-4 text-center border-l border-white/8">P</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr
                    key={row.rank}
                    className={`group border-b border-white/5 last:border-0 transition-colors duration-200 hover:bg-white/[0.035]
                      ${row.isUs ? "bg-sky-light/[0.07]" : i % 2 === 1 ? "bg-white/[0.015]" : ""}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-worksans text-[13px] font-bold tabular-nums w-5 flex-shrink-0
                            ${row.rank === 1 ? "text-sky-light" : "text-white/40"}`}
                        >
                          {row.rank}
                        </span>
                        <Crest team={row.team} src={row.crestUrl} size={28} />
                        <span className={`font-worksans text-[13px] leading-tight ${row.isUs ? "font-bold text-sky-light" : "font-semibold text-white/80"}`}>
                          {row.team}
                        </span>
                        {row.rank === 1 && (
                          <span className="font-worksans text-[9px] font-bold tracking-[0.08em] uppercase text-sky-light/70 border border-sky-light/30 px-1.5 py-0.5 flex-shrink-0">
                            Lider
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="font-worksans text-[13px] font-medium text-white/55 px-3 py-3.5 text-center tabular-nums border-l border-white/5">{row.g}</td>
                    <td className="font-worksans text-[13px] font-medium text-white/55 px-3 py-3.5 text-center tabular-nums">{row.b}</td>
                    <td className="font-worksans text-[13px] font-medium text-white/55 px-3 py-3.5 text-center tabular-nums">{row.m}</td>
                    <td className="font-worksans text-[14px] font-bold text-white px-5 py-3.5 text-center tabular-nums border-l border-white/5">
                      {row.p}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixtures */}
        <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fixtures.map((f) => (
            <div key={f.week} className="border border-white/8 hover:border-sky-light/20 transition-colors duration-200 p-5">
              <div className="text-center mb-4">
                <span className="font-worksans text-[10px] font-bold tracking-[0.1em] uppercase text-sky-light/70">
                  {f.week}. Hafta
                </span>
                <div className="font-worksans text-[11px] font-medium text-white/35 mt-0.5">
                  {f.date}
                  {f.time && <span> &middot; {f.time}</span>}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col items-center gap-2 w-[40%] min-w-0">
                  <Crest team={f.home} src={f.homeCrestUrl} size={44} />
                  <span className={`font-worksans text-[12px] leading-snug text-center truncate w-full ${f.homeIsUs ? "font-bold text-sky-light" : "font-semibold text-white/80"}`}>
                    {f.home}
                  </span>
                </div>
                <span className="font-worksans text-[15px] font-bold text-white/25 flex-shrink-0">–</span>
                <div className="flex flex-col items-center gap-2 w-[40%] min-w-0">
                  <Crest team={f.away} src={f.awayCrestUrl} size={44} />
                  <span className={`font-worksans text-[12px] leading-snug text-center truncate w-full ${f.awayIsUs ? "font-bold text-sky-light" : "font-semibold text-white/80"}`}>
                    {f.away}
                  </span>
                </div>
              </div>

              {f.stadium && (
                <div className="mt-4 pt-3 border-t border-white/5 font-worksans text-[10px] font-medium text-white/30 text-center truncate">
                  {f.stadium}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="reveal reveal-delay-3 mt-8 font-worksans text-[11px] font-medium text-white/35">
          Kaynak:{" "}
          <a
            href="https://tffistanbul.org/kulup/gercek-kuzey-spor/1151"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-light focus-visible:text-sky-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-light/50 transition-colors duration-200"
          >
            TFF İstanbul
          </a>
          {" "}— veriler haftalık güncellenmektedir.
        </p>

      </div>
    </section>
  );
}
