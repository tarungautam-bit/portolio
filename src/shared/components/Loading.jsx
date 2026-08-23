import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const loaderRef = useRef(null);
  const mountainRef = useRef(null);
  const mistRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance
      gsap.fromTo(
        loaderRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Mountain reveal
      gsap.fromTo(
        mountainRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 1.08,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      // Main text
      gsap.fromTo(
        textRef.current,
        {
          y: 20,
          opacity: 0,
          letterSpacing: "0.8em",
        },
        {
          y: 0,
          opacity: 1,
          letterSpacing: "0.35em",
          duration: 1.8,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      // Mist movement
      gsap.to(mistRef.current, {
        xPercent: -15,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating dots
      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        gsap.to(dot, {
          y: -20 - index * 4,
          x: index % 2 === 0 ? 8 : -8,
          opacity: 0.2,
          duration: 2 + index * 0.4,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "sine.inOut",
        });
      });

      // Loading dots
      gsap.to(".loading-dot", {
        opacity: 0.2,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#08100f] text-white"
    >
      {/* Sky */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#19352d_0%,#0d211d_35%,#08100f_75%)]" />

      {/* Moon */}
      <div className="absolute right-[12%] top-[12%] h-16 w-16 rounded-full bg-[#d9d5b8] opacity-80 shadow-[0_0_50px_rgba(220,215,180,0.2)] sm:h-20 sm:w-20" />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            ref={(el) => (dotsRef.current[index] = el)}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#d9d5b8]"
            style={{
              left: `${5 + ((index * 37) % 90)}%`,
              top: `${8 + ((index * 29) % 55)}%`,
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      {/* Mist */}
      <div
        ref={mistRef}
        className="absolute bottom-[18%] left-[-15%] h-32 w-[130%] rounded-[50%] bg-[#c7d1c6]/10 blur-3xl"
      />

      {/* Mountains */}
      <div
        ref={mountainRef}
        className="absolute bottom-0 left-0 w-full opacity-0"
      >
        {/* Back mountain */}
        <div
          className="
            absolute bottom-0 left-[-10%]
            h-[45vh] w-[70%]
            bg-[#122a25]
            [clip-path:polygon(0_100%,0_65%,22%_30%,38%_52%,55%_18%,75%_48%,100%_25%,100%_100%)]
          "
        />

        {/* Middle mountain */}
        <div
          className="
            absolute bottom-0 right-[-15%]
            h-[52vh] w-[75%]
            bg-[#0e211d]
            [clip-path:polygon(0_100%,0_55%,20%_35%,35%_52%,55%_15%,72%_45%,88%_25%,100%_42%,100%_100%)]
          "
        />

        {/* Front mountain */}
        <div
          className="
            absolute bottom-0 left-[-5%]
            h-[35vh] w-[110%]
            bg-[#091512]
            [clip-path:polygon(0_100%,0_70%,15%_50%,30%_67%,45%_38%,62%_65%,78%_48%,100%_68%,100%_100%)]
          "
        />

        {/* Village */}
        <div className="absolute bottom-[8vh] left-1/2 flex -translate-x-1/2 items-end gap-2 opacity-80 sm:gap-4">
          {/* House 1 */}
          <VillageHouse size="small" />

          {/* House 2 */}
          <VillageHouse size="large" />

          {/* House 3 */}
          <VillageHouse size="medium" />

          {/* House 4 */}
          <VillageHouse size="small" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Small decorative line */}
        <div className="mb-6 flex items-center gap-3 opacity-60">
          <span className="h-px w-8 bg-[#b8ad82]" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#c9c19d]">
            Entering
          </span>
          <span className="h-px w-8 bg-[#b8ad82]" />
        </div>

        {/* Title */}
        <h1
          ref={textRef}
          className="
            font-serif
            text-4xl
            font-light
            uppercase
            text-[#d7d0ad]
            drop-shadow-[0_0_20px_rgba(215,208,173,0.15)]
            sm:text-6xl
            md:text-7xl
          "
        >
          UKHIYO
        </h1>

        <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-[#9ba89d] sm:text-xs">
          A journey through the mountains
        </p>

        {/* Loading indicator */}
        <div className="mt-10 flex items-center gap-2">
          <span className="loading-dot h-1 w-1 rounded-full bg-[#d7d0ad]" />
          <span className="loading-dot h-1 w-1 rounded-full bg-[#d7d0ad]" />
          <span className="loading-dot h-1 w-1 rounded-full bg-[#d7d0ad]" />
        </div>
      </div>

      {/* Bottom atmospheric gradient */}
      <div className="absolute bottom-0 left-0 h-[35%] w-full bg-gradient-to-t from-[#050b09] to-transparent" />
    </div>
  );
};

const VillageHouse = ({ size }) => {
  const sizes = {
    small: {
      width: "w-8 sm:w-10",
      height: "h-8 sm:h-10",
      roof: "border-b-[10px] sm:border-b-[13px]",
    },
    medium: {
      width: "w-10 sm:w-14",
      height: "h-10 sm:h-14",
      roof: "border-b-[12px] sm:border-b-[16px]",
    },
    large: {
      width: "w-12 sm:w-16",
      height: "h-12 sm:h-16",
      roof: "border-b-[14px] sm:border-b-[18px]",
    },
  };

  const current = sizes[size];

  return (
    <div className="relative flex flex-col items-center">
      {/* Roof */}
      <div
        className={`
          relative
          h-0
          w-0
          border-l-[18px] border-r-[18px]
          border-l-transparent
          border-r-transparent
          ${current.roof}
          border-b-[#101b17]
          sm:border-l-[25px]
          sm:border-r-[25px]
        `}
      />

      {/* House */}
      <div
        className={`
          relative
          ${current.width}
          ${current.height}
          bg-[#111d19]
          shadow-[0_0_20px_rgba(0,0,0,0.4)]
        `}
      >
        {/* Window */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-2
            w-2
            -translate-x-1/2
            -translate-y-1/2
            bg-[#b9a85f]
            shadow-[0_0_10px_rgba(185,168,95,0.8)]
            sm:h-3
            sm:w-3
          "
        />

        {/* Door */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-[40%]
            w-[25%]
            -translate-x-1/2
            bg-[#080f0d]
          "
        />
      </div>
    </div>
  );
};

export default Loading;