"use client";

import Tourism from "@/app/(root)/_components/tourism";
import BackToTop from "@/components/back-to-top";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar-home";
import { Suspense } from "react";
import { Features } from "./(root)/_components/feature";
import Hero from "./(root)/_components/hero";
import PopularRoute from "./(root)/_components/popular-routes";
import Promo from "./(root)/_components/promo";
import TopDestination from "./(root)/_components/top-destination";

export default function Home() {
  return (
    <>
      <Navbar isHidable={false} transparent />
      <main className="flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <Hero />
        </Suspense>
        <Promo />
        {/* <ShortPromo /> */}
        <Tourism />

        <Features />
        <TopDestination />
        {/* <Memories /> */}

        <PopularRoute />
        {/* <ChooseTour /> */}
        {/* <Faq /> */}
        <BackToTop />
      </main>
      <Footer />
    </>
  );
}
