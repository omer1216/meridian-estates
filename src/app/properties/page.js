import Link from "next/link";
import { properties } from "@/data/properties";
import Image from "next/image";


export default function PropertiesPage() {
  return (
    <main className="bg-[#FAF8F4] min-h-screen px-6 md:px-12 py-16">
      <h1 className="font-serif font-bold text-3xl text-[#1C2B2E] mb-2">
        Browse Properties
      </h1>
      <p className="text-sm text-[#3A3F3D] mb-10">
        {properties.length} verified listings across Islamabad &amp; Rawalpindi
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.slug}
            href={`/properties/${property.slug}`}
            className="bg-white border border-[#DDD8CC] rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full h-44">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="inline-block bg-[#B08D57]/15 text-[#7A5F3A] text-xs font-medium px-2 py-1 rounded mb-3">
                {property.location.split(",")[0]}
              </span>
              <h2 className="font-serif font-semibold text-base text-[#1C2B2E] mb-1">
                {property.title}
              </h2>
              <p className="text-sm text-[#3A3F3D]">{property.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}