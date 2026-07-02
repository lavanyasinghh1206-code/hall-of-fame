import { useMemo } from "react";
import wallTexture from "../../assets/gallery-wall.png";
import "./GalleryAmbience.css";

const BOKEH_COUNT = 18;
const DUST_COUNT = 22;

export default function GalleryAmbience() {
  const bokeh = useMemo(
    () =>
      Array.from({ length: BOKEH_COUNT }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${8 + Math.random() * 75}%`,
        size: 40 + Math.random() * 80,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
        opacity: 0.04 + Math.random() * 0.08,
      })),
    []
  );

  const dust = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="gallery-ambience" aria-hidden="true">
      <div
        className="gallery-wallpaper"
        style={{ backgroundImage: `url(${wallTexture})` }}
      />
      <div className="gallery-wallpaper-overlay" />
      <div className="gallery-stripes" />
      <div className="gallery-grain" />

      <div className="gallery-silhouettes">
        <div className="silhouette silhouette--one" />
        <div className="silhouette silhouette--two" />
        <div className="silhouette silhouette--three" />
      </div>

      <div className="gallery-bokeh">
        {bokeh.map((b) => (
          <span
            key={b.id}
            className="bokeh-orb"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="gallery-dust">
        {dust.map((d) => (
          <span
            key={d.id}
            className="dust-mote"
            style={{
              left: d.left,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
