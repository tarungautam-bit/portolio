import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SunriseEffect.css";

const SunriseEffect = () => {
  const glowRef = useRef(null);
  const sunRef = useRef(null);
  const raysRef = useRef(null);
  const overlayRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const sun = sunRef.current;
    const rays = raysRef.current;
    const overlay = overlayRef.current;

    if (!glow || !sun || !rays || !overlay) {
      return;
    }

    const sunrise = () => {
      const timeline = gsap.timeline();

      timeline
        .set(overlay, {
          opacity: 0,
        })
        .set(sun, {
          opacity: 0,
          y: 120,
          scale: 0.65,
        })
        .set(glow, {
          opacity: 0,
          scale: 0.5,
        })
        .set(rays, {
          opacity: 0,
          rotation: -20,
          scale: 0.7,
        })

        .to(overlay, {
          opacity: 0.08,
          duration: 0.8,
          ease: "sine.out",
        })

        .to(
          glow,
          {
            opacity: 0.75,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
          },
          "<"
        )

        .to(
          sun,
          {
            opacity: 0.95,
            y: 0,
            scale: 1,
            duration: 2,
            ease: "power3.out",
          },
          "-=1.4"
        )

        .to(
          rays,
          {
            opacity: 0.45,
            rotation: 0,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
          },
          "-=1.6"
        )

        .to(
          sun,
          {
            y: -8,
            scale: 1.03,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          }
        )

        .to(
          rays,
          {
            rotation: 8,
            scale: 1.06,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          "<"
        )

        .to(
          [sun, glow, rays, overlay],
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          }
        );

      timerRef.current = gsap.delayedCall(
        gsap.utils.random(8, 14),
        sunrise
      );
    };

    timerRef.current = gsap.delayedCall(
      gsap.utils.random(3, 6),
      sunrise
    );

    return () => {
      if (timerRef.current) {
        timerRef.current.kill();
      }

      gsap.killTweensOf([
        glow,
        sun,
        rays,
        overlay,
      ]);
    };
  }, []);

  return (
    <div
      className="sunrise-effect"
      aria-hidden="true"
    >
      <div
        ref={overlayRef}
        className="sunrise-overlay"
      />

      <div
        ref={glowRef}
        className="sunrise-glow"
      />

      <div
        ref={raysRef}
        className="sunrise-rays"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div
        ref={sunRef}
        className="sunrise-sun"
      />
    </div>
  );
};

export default SunriseEffect;