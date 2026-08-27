import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C2B2E] text-[#C9CFCC] mt-auto px-6 md:px-12 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-serif font-bold text-[#FAF8F4] text-lg">
            Meridian Estates
          </span>
          <p className="text-sm mt-2 max-w-xs">
            Verified plots and homes across Islamabad &amp; Rawalpindi, for
            overseas and first-time buyers.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <Link href="/properties">Properties</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="text-sm">
          <p>WhatsApp: +92 339 4808084</p>
          <p className="mt-1">Islamabad, Pakistan</p>
        </div>
      </div>

      <p className="text-xs text-[#6B6F6C] mt-8 pt-6 border-t border-[#2E3B3E]">
        © 2026 Meridian Estates. All rights reserved.
      </p>
    </footer>
  );
}