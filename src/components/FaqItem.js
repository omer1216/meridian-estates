"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#DDD8CC] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-serif font-semibold text-[#1C2B2E] text-sm md:text-base">
          {question}
        </span>
        <FiChevronDown
          className={`text-[#6B6F6C] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <p className="text-sm text-[#3A3F3D] leading-relaxed mt-3 max-w-2xl">
          {answer}
        </p>
      )}
    </div>
  );
}