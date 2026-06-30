import "./Gallery.css";
import { useState } from "react";
import Frame from "../frame/Frame";

function Gallery() {
  const [activeFrame, setActiveFrame] = useState(null);

  return (
    <section className="gallery">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Frame
          key={i}
          onClick={() => setActiveFrame(i)}
        />
      ))}
    </section>
  );
}

export default Gallery;