"use client";

import dynamic from "next/dynamic";

// I want to load this component only on the client side because almost everything here needs
// to access localStorage. I was getting weird hydration errors So, I'm using dynamic import with ssr: false.

const CSRPage = dynamic(() => import("../components/CSRPage"), {
  ssr: false,
});

export default function Home() {
  return <CSRPage />;
}
