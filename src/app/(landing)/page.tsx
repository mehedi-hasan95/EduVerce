import { LandingMenuItem } from "./_components/landing-menu-item";
import { LandingPrice } from "./_components/landing-price";
import { LandingScrollSection } from "./_components/landing-scroll";

export default function Home() {
  return (
    <div>
      <LandingMenuItem />
      <LandingScrollSection />
      <LandingPrice />
    </div>
  );
}
