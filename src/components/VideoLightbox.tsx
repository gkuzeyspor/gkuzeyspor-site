"use client";

import { useState, useEffect } from "react";
import { MasonryGrid } from "@/components/MasonryGrid";

type VideoItem = {
  src: string;
  caption?: string;
};

export default function VideoLightbox({ videos }: { videos: VideoItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % videos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + videos.length) % videos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, videos.length]);

  const active = openIndex !== null ? videos[openIndex] : null;

  return (
    <>
      <MasonryGrid columns={2} gap={5}>
        {videos.map((video, i) => (
          <button
            key={video.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${video.caption ?? "Video"} - büyüt`}
            className="relative w-full border border-white/8 overflow-hidden cursor-pointer hover:border-sky-light/30 transition-colors duration-200 group"
          >
            <video src={video.src} muted preload="metadata" className="w-full h-auto pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/20 group-hover:bg-navy-deep/35 transition-colors duration-200">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-navy-deep/70 border border-white/20 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
              </span>
            </div>
            {video.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent px-4 py-3 pointer-events-none">
                <p className="font-worksans text-[13px] font-medium text-white/90 text-left">{video.caption}</p>
              </div>
            )}
          </button>
        ))}
      </MasonryGrid>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? "Video oynatıcı"}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[100] bg-navy-deep/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Kapat"
            className="absolute top-6 right-6 text-white/80 hover:text-sky-light text-3xl leading-none"
          >
            ✕
          </button>

          {videos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex - 1 + videos.length) % videos.length);
                }}
                aria-label="Önceki video"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-navy-deep/60 text-white/80 border border-white/15 hover:text-sky-light hover:border-sky-light/40 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex + 1) % videos.length);
                }}
                aria-label="Sonraki video"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-navy-deep/60 text-white/80 border border-white/15 hover:text-sky-light hover:border-sky-light/40 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <video
            src={active.src}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] w-auto h-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
