import { properties } from "@/data/properties";
import { notFound } from "next/navigation";
import  BackButton  from '@/components/BackButton';

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;

  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="bg-[#FAF8F4] min-h-screen px-6 md:px-12 py-16">
        <BackButton />
      <span className="inline-block bg-[#B08D57]/15 text-[#7A5F3A] text-xs font-medium px-2 py-1 rounded mb-4">
        {property.type} &middot; {property.status}
      </span>

      <h1 className="font-serif font-bold text-3xl text-[#1C2B2E] mb-2">
        {property.title}
      </h1>
      <p className="text-sm text-[#6B6F6C] mb-6">{property.location}</p>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
        <div>
          <p className="text-xs text-[#6B6F6C]">Price</p>
          <p className="font-serif font-semibold text-[#1C2B2E]">{property.price}</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6F6C]">Size</p>
          <p className="font-serif font-semibold text-[#1C2B2E]">{property.size}</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6F6C]">Type</p>
          <p className="font-serif font-semibold text-[#1C2B2E]">{property.type}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed max-w-xl mb-10">
        {property.description}
      </p>

      <a
        target='_blank'
        rel='noopener noreferrer'
        href="https://wa.me/923394808084"
        className="inline-block bg-[#25D366] text-white px-5 py-2.5 rounded-md text-sm font-medium"
      >
        Ask about this property on WhatsApp
      </a>
    </main>
  );
}