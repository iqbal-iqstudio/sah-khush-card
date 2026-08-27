import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import BentoGrid from "@/components/home/BentoGrid";
import BrandsMarquee from "@/components/home/BrandsMarquee";
import SummerEdit from "@/components/home/SummerEdit";
import EditorialBanner from "@/components/home/EditorialBanner";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <TrustBadges />
      </Reveal>
      <Reveal>
        <BentoGrid />
      </Reveal>
      <Reveal>
        <BrandsMarquee />
      </Reveal>
      <Reveal>
        <SummerEdit />
      </Reveal>
      <Reveal>
        <EditorialBanner />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <InstagramFeed />
      </Reveal>
    </>
  );
}
