import { useEffect, useState } from "react";
import "./Landing.css";

import frame1 from "../../assets/landing/frame1.png";
import frame2 from "../../assets/landing/frame2.png";
import frame3 from "../../assets/landing/frame3.png";
import frame4 from "../../assets/landing/frame4.png";
import frame5 from "../../assets/landing/frame5.png";
import frame6 from "../../assets/landing/frame6.png";
import frame7 from "../../assets/landing/frame7.png";
import frame8 from "../../assets/landing/frame8.png";
import frame9 from "../../assets/landing/frame9.png";
import frame10 from "../../assets/landing/frame10.png";
import frame11 from "../../assets/landing/frame11.png";
import frame12 from "../../assets/landing/frame12.png";
import frame13 from "../../assets/landing/frame13.png";
import frame14 from "../../assets/landing/frame14.png";
import frame15 from "../../assets/landing/frame15.png";
import frame16 from "../../assets/landing/frame16.png";
import frame17 from "../../assets/landing/frame17.png";
import frame18 from "../../assets/landing/frame18.png";
import frame19 from "../../assets/landing/frame19.png";
import frame20 from "../../assets/landing/frame20.png";
import frame21 from "../../assets/landing/frame21.png";
import frame22 from "../../assets/landing/frame22.png";

const frames = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
  frame10,
  frame11,
  frame12,
  frame13,
  frame14,
  frame15,
  frame16,
  frame17,
  frame18,
  frame19,
  frame20,
  frame21,
  frame22,
];

export default function Landing({ onComplete }) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= frames.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete?.();
          }, 200);

          return prev;
        }

        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="landing-container">
      <img
        src={frames[currentFrame]}
        alt="Landing Animation"
        className="landing-image"
      />
    </div>
  );
}