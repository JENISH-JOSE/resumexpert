import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import Domains from "@/components/Domains";
import CTA from "@/components/CTA";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AuthSessionHandler from "@/components/AuthSessionHandler";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AuthSessionHandler />
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <Domains />
      <CTA />
      <About />
      <Footer />
    </div>
  );
}
