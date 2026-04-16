"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import RAGVisualization from "./components/RAGVisualization";
import FeaturesSection from "./components/FeaturesSection";
import WhyRAGSection from "./components/WhyRAGSection";
import SecuritySection from "./components/SecuritySection";
import CTASection from "./components/CTASection";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <HeroSection />
      <RAGVisualization />
      <FeaturesSection />
      <WhyRAGSection />
      <SecuritySection />
      <CTASection />

      {/* Chat Widget */}
      {isHydrated && <ChatWidget />}
    </>
  );
}
