"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: "Contact Form",
          property: "",
          budget: "",
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (error) {
      console.error("Contact form submit failed:", error);
      setStatus("error");
    }
  }

  return (
    <main className="bg-[#FAF8F4] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif font-bold text-3xl text-[#1C2B2E] mb-2">
          Get in touch
        </h1>
        <p className="text-sm text-[#6B6F6C] mb-10 max-w-md">
          Have a question about a property or the buying process? Send us a
          message, or reach us directly on WhatsApp.
        </p>

        {status === "success" ? (
          <div className="bg-white border border-[#4B6650]/30 rounded-lg p-6 max-w-md">
            <p className="font-serif font-semibold text-[#1C2B2E] mb-1">
              Message received
            </p>
            <p className="text-sm text-[#3A3F3D]">
              Thanks, {formData.name.split(" ")[0]} — our team will get back to
              you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
              <label className="block text-xs text-[#6B6F6C] mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#DDD8CC] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#6B6F6C] mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#DDD8CC] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#6B6F6C] mb-1">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#DDD8CC] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#B08D57] text-[#FAF8F4] px-5 py-2.5 rounded-md text-sm font-medium disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>

            {status === "error" && (
              <p className="text-xs text-red-600">
                Something went wrong — please try again or reach us on WhatsApp.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}