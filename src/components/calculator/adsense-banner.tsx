"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseBanner() {
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    // Pequeno delay para dar tempo do script carregar
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdReady(true);
      } catch (e) {
        console.error("AdSense error:", e);
        setAdReady(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 mb-4">
      {!adReady && (
        <div className="w-full min-h-[100px] bg-[#111827]/50 border border-[#1e2d45] rounded-[11px] flex items-center justify-center">
          <p className="font-sans text-[10px] text-[#4d6a88] text-center px-4">
            — Anúncio —
          </p>
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: adReady ? "block" : "none" }}
        data-ad-client="ca-pub-1815564810673303"
        data-ad-slot="5935621443"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
