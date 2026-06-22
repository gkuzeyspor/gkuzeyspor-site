"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Branch = {
  title: string;
  desc: string;
  detail: string;
  icon: React.ReactNode;
};

type Position = "front" | "middle" | "back";

export function BranchCard({
  handleShuffle,
  branch,
  position,
}: {
  handleShuffle: () => void;
  branch: Branch;
  position: Position;
}) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-4deg" : position === "middle" ? "0deg" : "4deg",
        x: position === "front" ? "0%" : position === "middle" ? "8%" : "16%",
        y: position === "front" ? "0%" : position === "middle" ? "4%" : "8%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = (e as PointerEvent).clientX;
      }}
      onDragEnd={(e) => {
        if (dragRef.current - (e as PointerEvent).clientX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`group absolute left-0 top-0 flex h-[300px] w-[300px] sm:h-[320px] sm:w-[320px] select-none flex-col justify-between border border-navy-dark/15 bg-[#bfe3f7] p-8 ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div>
        <div className="absolute top-0 left-0 w-0 h-0.5 bg-navy-dark group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
        <div className="text-navy-dark/50 mb-8 group-hover:text-navy-dark transition-colors duration-300 pointer-events-none">
          {branch.icon}
        </div>
        <h3 className="font-cinzel font-bold text-navy-dark text-base tracking-[0.06em] uppercase mb-3 pointer-events-none">
          {branch.title}
        </h3>
        <p className="font-worksans font-medium text-navy-dark/70 text-[13px] leading-relaxed pointer-events-none">
          {branch.desc}
        </p>
      </div>
      <div className="flex items-center gap-2 pointer-events-none">
        <div className="w-4 h-px bg-navy-dark/40" />
        <span className="font-worksans text-[11px] text-navy-dark/60 tracking-wide font-semibold">
          {branch.detail}
        </span>
      </div>
    </motion.div>
  );
}
