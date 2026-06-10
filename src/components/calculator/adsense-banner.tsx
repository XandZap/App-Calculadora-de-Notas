"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseBanner() {
  const initialized = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    // Espera o DOM renderizar o <ins>, depois chama push uma única vez
    const timer = setTimeout(() => {
      if (!initialized.current && mounted.current) {
        initialized.current = true;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.warn("AdSense:", e);
        }
      }
    }, 500);

    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1815564810673303"
      data-ad-slot="5935621443"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
