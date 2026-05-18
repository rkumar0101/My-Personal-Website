import { Hero } from "@/components/sections/Hero";
import { LogoStripe } from "@/components/sections/LogoStripe";
import { Bio } from "@/components/sections/Bio";
import { Skills } from "@/components/sections/Skills";
import { HowIWork } from "@/components/sections/HowIWork";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Now } from "@/components/sections/Now";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStripe />
      <Bio />
      <Skills />
      <HowIWork />
      <Portfolio />
      <Services />
      <Stats />
      <BlogPreview />
      <Now />
      <About />
      <Contact />
    </>
  );
}
