'use client'
import { FaWhatsapp } from 'react-icons/fa';
import {FiSearch, FiMessageCircle} from 'react-icons/fi';
import Image from "next/image";
import Link from "next/link";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import TestimonialMarquee from "@/components/TestimonialMarquee";

export default function Home() {
  const featured = properties.slice(0, 3);
  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      <section className="relative overflow-hidden px-6 md:px-12 py-16">
        {/* Plot-grid background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#B08D57 0.6px, transparent 0.6px), linear-gradient(90deg, #B08D57 0.6px, transparent 0.6px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative max-w-xl">
          <span className="inline-block bg-[#4B6650]/15 text-[#2E4A31] text-xs font-medium px-3 py-1 rounded mb-4">
            For overseas &amp; first-time buyers
          </span>
        
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#1C2B2E] leading-tight mb-4">
            Verified plots and homes across Islamabad &amp; Rawalpindi
          </h1>
        
          <p className="text-sm md:text-base leading-relaxed mb-6">
            Browse listings by sector, talk to our AI assistant about payment
            plans, and buy with confidence from anywhere in the world.
          </p>
        
          <div className="flex flex-wrap gap-3 mb-10">
            <Link className="flex items-center gap-2 bg-[#B08D57] text-[#FAF8F4] px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#967344] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              href = "/properties">
              <FiSearch className='text-base'/>
              Browse properties
            </Link>
        
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/923394808084"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#1ebe5d] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
            >
              <FaWhatsapp className='text-lg'/>
              WhatsApp us
            </a>
        
            <Link className="flex items-center gap-2 border border-[#1C2B2E] text-[#1C2B2E] px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-[#1C2B2E] hover:text-white hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              href = '/contact'>              
              <FiMessageCircle className='text-base'/>
              Ask a question
            </Link>
          </div>
        </div>
        
        {/* Trust stats bar */}
        <div className="relative grid grid-cols-3 border-t border-b border-[#DDD8CC] py-5">
          <div className="text-center border-r border-[#DDD8CC]">
            <p className="font-serif font-bold text-xl text-[#1C2B2E]">150+</p>
            <p className="text-xs text-[#6B6F6C] mt-0.5">verified listings</p>
          </div>
        
          <div className="text-center border-r border-[#DDD8CC]">
            <p className="font-serif font-bold text-xl text-[#1C2B2E]">6 yrs</p>
            <p className="text-xs text-[#6B6F6C] mt-0.5">
              serving Islamabad &amp; Rawalpindi
            </p>
          </div>
        
          <div className="text-center">
            <p className="font-serif font-bold text-xl text-[#1C2B2E]">&lt; 2 hrs</p>
            <p className="text-xs text-[#6B6F6C] mt-0.5">
              average response time
            </p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="px-6 md:px-12 mb-10">
          <h2 className="font-serif font-bold text-2xl text-[#1C2B2E] mb-2">
            What our buyers say
          </h2>
          <p className="text-sm text-[#6B6F6C]">
            Real experiences from overseas and first-time buyers
          </p>
        </div>

        <TestimonialMarquee testimonials={testimonials} />
      </section>


      <section className="px-6 md:px-12 py-16">
        <h2 className="font-serif font-bold text-2xl text-[#1C2B2E] mb-2">
          Featured properties
        </h2>
        <p className="text-sm text-[#6B6F6C] mb-10">
          A few of our verified listings, updated regularly
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((property) => (
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
                <h3 className="font-serif font-semibold text-base text-[#1C2B2E] mb-1">
                  {property.title}
                </h3>
                <p className="text-sm text-[#3A3F3D]">{property.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}