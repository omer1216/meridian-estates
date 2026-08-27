"use client";

import { motion } from "motion/react";

export default function TestimonialMarquee({ testimonials }) {
  const looped = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {looped.map((t, i) => (
          <div
            key={i}
            className="bg-white border border-[#DDD8CC] rounded-lg p-5 w-80 shrink-0"
          >
            <p className="text-sm text-[#3A3F3D] leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-serif font-semibold text-sm text-[#1C2B2E]">
              {t.name}
            </p>
            <p className="text-xs text-[#6B6F6C]">{t.location}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}