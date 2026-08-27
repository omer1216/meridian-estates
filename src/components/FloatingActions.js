"use client";

import { useState, useRef, useEffect } from "react";
import ChatWidget from "./ChatWidget";
import CallbackWidget from "./CallbackWidget";

export default function FloatingActions() {
  const [openWidget, setOpenWidget] = useState(null); // null | "chat" | "callback"
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenWidget(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef}>
      <CallbackWidget
        isOpen={openWidget === "callback"}
        onToggle={() => setOpenWidget(openWidget === "callback" ? null : "callback")}
        hidden={openWidget === "chat"}
      />
      <ChatWidget
        isOpen={openWidget === "chat"}
        onToggle={() => setOpenWidget(openWidget === "chat" ? null : "chat")}
        hidden={openWidget === "callback"}
      />
    </div>
  );
}