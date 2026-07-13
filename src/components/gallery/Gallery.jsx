import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../frame/Frame";
import GalleryAmbience from "./GalleryAmbience";
import { usePortalTransition } from "../../context/usePortalTransition";
import { projects } from "../../data/projects";
import "./Gallery.css";

function updateFrameProximity(gallery, frameRefs) {
  const center = gallery.scrollLeft + gallery.clientWidth / 2;
  const falloff = gallery.clientWidth * 0.5;

  frameRefs.current.forEach((el) => {
    if (!el) return;
    const frameCenter = el.offsetLeft + el.clientWidth / 2;
    const distance = Math.abs(center - frameCenter);
    const proximity = Math.max(0, 1 - distance / falloff);
    el.style.setProperty("--proximity", proximity.toFixed(3));
  });
}

export default function Gallery() {
  const galleryRef = useRef(null);
  const frameRefs = useRef([]);
  const isScrollingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const navigate = useNavigate();
  const { play } = usePortalTransition();

  const syncScrollState = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    updateFrameProximity(gallery, frameRefs);

    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      const frameCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(center - frameCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  const scrollToIndex = useCallback((index) => {
    const gallery = galleryRef.current;
    const frame = frameRefs.current[index];
    if (!gallery || !frame) return;

    isScrollingRef.current = true;
    setActiveIndex(index);

    const left =
      frame.offsetLeft - gallery.clientWidth / 2 + frame.clientWidth / 2;

    gallery.scrollTo({ left, behavior: "smooth" });

    window.setTimeout(() => {
      isScrollingRef.current = false;
      syncScrollState();
    }, 550);
  }, [syncScrollState]);

  const enterProject = useCallback(
    (project, originEl) => {
      const rect = originEl.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      play(origin, () => {
        navigate(`/project/${project.slug}`);
      });
    },
    [play, navigate]
  );

  const handleFrameClick = useCallback(
    (index, project, event) => {
      if (index === activeIndex) {
        enterProject(project, event.currentTarget);
      } else {
        scrollToIndex(index);
      }
    },
    [activeIndex, enterProject, scrollToIndex]
  );

  useEffect(() => {
    scrollToIndex(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const onScroll = () => {
      updateFrameProximity(gallery, frameRefs);
      if (isScrollingRef.current) return;
      syncScrollState();
    };

    const onResize = () => {
      updateFrameProximity(gallery, frameRefs);
    };

    gallery.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      gallery.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [syncScrollState]);

  return (
    <div className="gallery-scene">
      <GalleryAmbience />

      <div className="gallery-vignette" aria-hidden="true" />
      <div className="gallery-spotlight" aria-hidden="true" />

      <div className="gallery-scroll" ref={galleryRef}>
        <div className="track">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              ref={(el) => {
                frameRefs.current[index] = el;
              }}
              className="frame-wrap"
              style={{ "--proximity": 0 }}
              title={
                index === activeIndex
                  ? "Click to enter this project"
                  : undefined
              }
              onClick={(event) => handleFrameClick(index, project, event)}
            >
              <Frame
                title={project.title}
                link={project.link}
                active={index === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
