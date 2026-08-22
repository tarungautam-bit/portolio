import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ThunderEffect.css";

const ThunderEffect = () => {
  const flashRef = useRef(null);
  const boltRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const flash = flashRef.current;
    const bolt = boltRef.current;

    if (!flash || !bolt) return;

    const triggerThunder = () => {
      const timeline = gsap.timeline();

      timeline
        .set(flash, {
          opacity: 0,
        })
        .set(bolt, {
          opacity: 0,
          scale: 0.92,
          x: 0,
        })
        .to(flash, {
          opacity: 0.22,
          duration: 0.05,
          ease: "none",
        })
        .to(flash, {
          opacity: 0,
          duration: 0.08,
          ease: "none",
        })
        .to(
          bolt,
          {
            opacity: 1,
            scale: 1,
            duration: 0.08,
            ease: "power2.out",
          },
          "-=0.03"
        )
        .to(bolt, {
          opacity: 0,
          duration: 0.12,
          ease: "power2.in",
        })
        .to(flash, {
          opacity: 0.12,
          duration: 0.04,
          ease: "none",
        })
        .to(flash, {
          opacity: 0,
          duration: 0.12,
          ease: "none",
        });

      timerRef.current = gsap.delayedCall(
        gsap.utils.random(4, 7),
        triggerThunder
      );
    };

    timerRef.current = gsap.delayedCall(
      1.5,
      triggerThunder
    );

    return () => {
      if (timerRef.current) {
        timerRef.current.kill();
      }

      gsap.killTweensOf(flash);
      gsap.killTweensOf(bolt);
    };
  }, []);

  return (
    <div
      className="thunder-effect"
      aria-hidden="true"
    >
      <div
        ref={flashRef}
        className="thunder-flash"
      />

      <svg
        ref={boltRef}
        className="thunder-bolt"
        viewBox="0 0 300 800"
        preserveAspectRatio="none"
      >
        <path
          d="
            M178 0
            L125 145
            L160 145
            L88 320
            L132 320
            L38 510
            L112 430
            L75 430
            L168 245
            L128 245
            L215 82
            L178 82
            Z
          "
        />
      </svg>
    </div>
  );
};

export default ThunderEffect;