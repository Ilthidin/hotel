import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import FeaturedRooms from "../components/sections/FeaturedRooms";
import Experiences from "../components/sections/Experiences";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import CallToAction from "../components/sections/CallToAction";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedRooms />
      <Experiences />
      <Gallery />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
