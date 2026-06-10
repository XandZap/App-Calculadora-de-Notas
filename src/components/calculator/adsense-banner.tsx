"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseBanner() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Delay para garantir que o DOM já renderizou com largura > 0
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense:", e);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 mb-4 w-full">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-client="ca-pub-1815564810673303"
        data-ad-slot="5935621443"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
