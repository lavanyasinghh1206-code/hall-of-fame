import { useState } from "react";
import Landing from "../landing/Landing";
import Gallery from "./Gallery";

export default function GalleryWithLanding() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return (
      <Landing
        onComplete={() => setShowLanding(false)}
      />
    );
  }

  return <Gallery />;
}