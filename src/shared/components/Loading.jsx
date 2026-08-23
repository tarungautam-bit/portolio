import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const loaderRef = useRef(null);
  const wheelRef = useRef(null);
  const leavesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main wheel rotation
      gsap.to(wheelRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      // Individual leaves
      leavesRef.current.forEach((leaf, index) => {
        if (!leaf) return;

        const angle = (360 / leavesRef.current.length) * index;

        gsap.set(leaf, {
          rotation: angle,
          transformOrigin: "50% 50%",
        });

        gsap.to(leaf, {
          rotation: angle + 360,
          duration: 6 + index * 0.3,
          repeat: -1,
          ease: "none",
        });
      });

      // Soft breathing animation
      gsap.to(".loader-core", {
        scale: 1.15,
        opacity: 0.65,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Entrance
      gsap.fromTo(
        loaderRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
      "
    >
      <div className="relative h-44 w-44">
        {/* Outer rotating structure */}
        <div
          ref={wheelRef}
          className="
            absolute
            inset-0
            rounded-full
            border
            border-current/20
          "
        >
          {/* Radial spokes */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current/15" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-45 bg-current/15" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-90 bg-current/15" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-[135deg] bg-current/15" />

          {/* Inner ring */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-24
              w-24
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-current/20
            "
          />
        </div>

        {/* Floating leaves */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              leavesRef.current[index] = el;
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-full
              w-full
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-0
                h-2
                w-1
                -translate-x-1/2
                rounded-full
                bg-current/40
              "
            />
          </div>
        ))}

        {/* Center */}
        <div
          className="
            loader-core
            absolute
            left-1/2
            top-1/2
            h-4
            w-4
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-current/60
          "
        />

        {/* Small orbiting dot */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-32
            w-32
            -translate-x-1/2
            -translate-y-1/2
            animate-spin
            rounded-full
            border border-transparent
            border-t-current/40
            duration-[3s]
          "
        />
      </div>
    </div>
  );
};

export default Loading;