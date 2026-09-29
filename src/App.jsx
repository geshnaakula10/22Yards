import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SceneTrack from "./components/scroll/SceneTrack";
import ScrollSection from "./components/scroll/ScrollSection";
import PersistentBall from "./components/ball/PersistentBall";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import Hero from "./components/sections/Hero";
import Welcome from "./components/sections/Welcome";
import WhatsNew from "./components/sections/WhatsNew";
import About from "./components/sections/About";
import Stats, { statsEnter } from "./components/sections/Stats";
import VisionMission from "./components/sections/VisionMission";
import Programs from "./components/sections/Programs";
import Gallery from "./components/sections/Gallery";
import LaneRentals from "./components/sections/LaneRentals";
import "./styles/globals.css";

export default function App() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <Header />
      <main id="main">
        <SceneTrack
          overlay={
            <>
              <PersistentBall />
              <ScrollProgressBar />
            </>
          }
        >
          <ScrollSection id="hero" hold={1.2}>
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
          <ScrollSection id="facilities" extendEnter={statsEnter}>
            <Stats />
          </ScrollSection>
          <ScrollSection id="mission">
            <VisionMission />
          </ScrollSection>
          <ScrollSection id="coaching">
            <Programs />
          </ScrollSection>
          <ScrollSection id="gallery">
            <Gallery />
          </ScrollSection>
          <ScrollSection id="lane-rentals">
            <LaneRentals />
          </ScrollSection>
        </SceneTrack>
      </main>
      <Footer />
    </>
  );
}
