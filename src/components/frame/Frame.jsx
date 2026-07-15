import "./Frame.css";
import frameImg from "../../assets/frame.png";

export default function Frame({
  title,
  image,
  link,
  active = false,
}) {
  return (
    <div className={`frame-card ${active ? "active" : ""}`}>
      <div className="frame-glow" aria-hidden="true" />

      <div className="frame-shell">
        <img
  src={image}
  alt={title}
  className="frame-portrait"
  draggable={false}
/>
        <img
          src={frameImg}
          alt=""
          className="frame-image"
          draggable={false}
        />
      </div>

      <h2 className="frame-title">{title}</h2>

      {link && (
        <a
          href={link}
          className="frame-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="frame-link-icon" aria-hidden="true">✦</span>
          View Project
          <span className="frame-link-arrow" aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}
