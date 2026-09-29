import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SceneTrack from "./components/scroll/SceneTrack";
import ScrollSection from "./components/scroll/ScrollSection";
import PersistentBall from "./components/ball/PersistentBall";
import PitchRuler from "./components/ui/PitchRuler";
import Backdrop from "./components/ui/Backdrop";
import Hero from "./components/sections/Hero";
import Welcome from "./components/sections/Welcome";
import WhatsNew from "./components/sections/WhatsNew";
import About from "./components/sections/About";
import Stats, { statsEnter } from "./components/sections/Stats";
import Amenities from "./components/sections/Amenities";
import VisionMission from "./components/sections/VisionMission";
import Programs from "./components/sections/Programs";
import Coaches from "./components/sections/Coaches";
import Events from "./components/sections/Events";
import Testimonials from "./components/sections/Testimonials";
import Gallery from "./components/sections/Gallery";
import LaneRentals from "./components/sections/LaneRentals";
import Faq from "./components/sections/Faq";
import { heroExit } from "./animations/hero/heroIntro";
import { initPointerFx } from "./animations/interactions/pointerFx";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/big-shoulders-display";
import "./styles/globals.css";

export default function App() {
  useEffect(() => initPointerFx(), []);

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <Header />
      <main id="main">
        <SceneTrack
          overlay={
            <>
              <PersistentBall />
              <PitchRuler />
            </>
          }
        >
          <ScrollSection id="hero" hold={1.1} extendExit={heroExit}>
            <Hero />
          </ScrollSection>
          <ScrollSection id="welcome">
            <Welcome />
          </ScrollSection>
          <ScrollSection id="whats-new">
            <WhatsNew />
          </ScrollSection>
          <ScrollSection id="about">
            <About />
          </ScrollSection>
          <ScrollSection id="facilities" tone="dark" backdrop={<Backdrop photo="lanes" />} extendEnter={statsEnter}>
            <Stats />
          </ScrollSection>
          <ScrollSection id="amenities">
            <Amenities />
          </ScrollSection>
          <ScrollSection id="mission">
            <VisionMission />
          </ScrollSection>
          <ScrollSection id="coaching">
            <Programs />
          </ScrollSection>
          <ScrollSection id="coaches" tone="dark" backdrop={<Backdrop variant="night" />}>
            <Coaches />
          </ScrollSection>
          <ScrollSection id="events">
            <Events />
          </ScrollSection>
          <ScrollSection id="testimonials" tone="dark" backdrop={<Backdrop variant="blue" />}>
            <Testimonials />
          </ScrollSection>
          <ScrollSection id="gallery">
            <Gallery />
          </ScrollSection>
          <ScrollSection id="lane-rentals">
            <LaneRentals />
          </ScrollSection>
          <ScrollSection id="faq">
            <Faq />
          </ScrollSection>
        </SceneTrack>
      </main>
      <Footer />
    </>
  );
}
