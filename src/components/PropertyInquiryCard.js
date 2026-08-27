"use client";

import { useState } from "react";

export default function PropertyInquiryCard({ propertyTitle, propertyPrice }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          source: "Property Inquiry",
          property: propertyTitle,
          budget: "",
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (error) {
      console.error("Inquiry submit failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 sticky top-6">
        <p className="font-serif font-semibold text-[#1C2B2E] mb-1">Thank you!</p>
        <p className="text-sm text-[#6B6F6C]">
          Your inquiry has been received — one of our advisors will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 sticky top-6">
      <p className="text-xs text-[#6B6F6C] mb-1">Interested in this property?</p>
      <p className="font-serif font-semibold text-xl text-[#1C2B2E] mb-4">{propertyPrice}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full text-sm border border-[#DDD8CC] rounded-md px-3 py-2 outline-none focus:border-[#B08D57]"
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full text-sm border border-[#DDD8CC] rounded-md px-3 py-2 outline-none focus:border-[#B08D57]"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-sm border border-[#DDD8CC] rounded-md px-3 py-2 outline-none focus:border-[#B08D57]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#B08D57] text-white text-sm font-medium py-2.5 rounded-md disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "I'm Interested"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-600">
            Something went wrong — please try again or reach us on WhatsApp below.
          </p>
        )}
      </form>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://wa.me/923394808084"
        className="mt-3 w-full inline-block text-center bg-[#25D366] text-white px-4 py-2.5 rounded-md text-sm font-medium"
      >
        Ask on WhatsApp
      </a>
    </div>
  );
}