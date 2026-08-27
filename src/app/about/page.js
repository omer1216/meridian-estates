export default function AboutPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
            <span className="inline-block bg-[#4B6650]/15 text-[#2E4A31] text-xs font-medium px-3 py-1 rounded mb-4">
              Our Story
            </span>

            <h1 className="font-serif font-bold text-3xl text-[#1C2B2E] mb-6 max-w-lg">
              Built by people tired of watching buyers get strung along
            </h1>

            <div className="max-w-2xl text-sm leading-relaxed text-[#3A3F3D] space-y-4 mb-12">
              <p>
                Meridian Estates was founded in 2019 by a small team of former
                real estate agents who had grown frustrated watching buyers —
                especially those overseas — get strung along by unresponsive
                dealers, vague listings, and properties that didn&apos;t match
                what was promised.
              </p>
              <p>
                We started with a simple rule: every listing on our site is
                personally verified before it goes live. No exceptions. That
                rule is still the foundation of how we operate today, whether
                you&apos;re buying your first plot in Islamabad or building
                your dream home from abroad.
              </p>
              <p>
                Today, we focus specifically on Islamabad and Rawalpindi&apos;s
                new housing societies — DHA, Bahria Town, Gulberg Greens, and
                Capital Smart City — because deep knowledge of a few areas
                beats shallow coverage of everywhere.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
              <div className="bg-white border border-[#DDD8CC] rounded-lg p-5">
                <p className="font-serif font-bold text-2xl text-[#1C2B2E]">150+</p>
                <p className="text-xs text-[#6B6F6C] mt-1">Verified listings</p>
              </div>
              <div className="bg-white border border-[#DDD8CC] rounded-lg p-5">
                <p className="font-serif font-bold text-2xl text-[#1C2B2E]">6 yrs</p>
                <p className="text-xs text-[#6B6F6C] mt-1">In business</p>
              </div>
              <div className="bg-white border border-[#DDD8CC] rounded-lg p-5">
                <p className="font-serif font-bold text-2xl text-[#1C2B2E]">2 hrs</p>
                <p className="text-xs text-[#6B6F6C] mt-1">Avg. response time</p>
              </div>
            </div>
        </div>
    </main>
  );
}