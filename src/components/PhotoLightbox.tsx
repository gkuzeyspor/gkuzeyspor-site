"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MasonryGrid } from "@/components/MasonryGrid";

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function PhotoLightbox({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, photos.length]);

  const active = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <MasonryGrid columns={2} gap={5}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${photo.alt} - büyüt`}
            className="relative w-full border border-white/8 overflow-hidden cursor-pointer hover:border-sky-light/30 transition-colors duration-200"
          >
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="w-full h-auto" />
          </button>
        ))}
      </MasonryGrid>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
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

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((openIndex - 1 + photos.length) % photos.length);
                }}
                aria-label="Önceki görsel"
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
                  setOpenIndex((openIndex + 1) % photos.length);
                }}
                aria-label="Sonraki görsel"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-navy-deep/60 text-white/80 border border-white/15 hover:text-sky-light hover:border-sky-light/40 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <Image
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
