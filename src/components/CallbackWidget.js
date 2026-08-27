"use client";

import { useState } from "react";
import { FiPhoneCall, FiX } from "react-icons/fi";

export default function CallbackWidget({ isOpen, onToggle, hidden }) {
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          phone,
          email: "",
          source: "Callback Request",
          property: "",
          budget: "",
          message: bestTime ? `Best time to call: ${bestTime}` : "",
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (error) {
      console.error("Callback request failed:", error);
      setStatus("error");
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen && (
        <div className="w-72 bg-white border border-[#DDD8CC] rounded-lg shadow-xl p-4 mb-3">
          {status === "success" ? (
            <div>
              <p className="font-serif font-semibold text-[#1C2B2E] mb-1">Request received</p>
              <p className="text-sm text-[#6B6F6C]">We'll call you back soon.</p>
            </div>
          ) : (
            <>
              <p className="font-serif font-semibold text-[#1C2B2E] mb-3">Request a callback</p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full text-sm border border-[#DDD8CC] rounded-md px-3 py-2 outline-none focus:border-[#B08D57]"
                />
                <input
                  type="text"
                  placeholder="Best time to call (optional)"
                  value={bestTime}
                  onChange={(e) => setBestTime(e.target.value)}
                  className="w-full text-sm border border-[#DDD8CC] rounded-md px-3 py-2 outline-none focus:border-[#B08D57]"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#B08D57] text-white text-sm font-medium py-2 rounded-md disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Request Callback"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-600">Something went wrong — please try again.</p>
                )}
              </form>
            </>
          )}
        </div>
      )}

      {!hidden && (
        <button
          onClick={onToggle}
          className="bg-[#4B6650] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-lg"
        >
          {isOpen ? <FiX /> : <FiPhoneCall size={18} />}
        </button>
      )}
    </div>
  );
}