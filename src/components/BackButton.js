"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm text-[#6B6F6C] hover:text-[#1C2B2E] mb-6"
    >
      <FiArrowLeft />
      Back
    </button>
  );
}