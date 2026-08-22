import { useEffect } from "react";
import gsap from "gsap";
import './Banner.css'

function Banner() {
useEffect(() => {
  const wave = document.querySelector(".banner-wave");
  const bannerImage = document.querySelector(".banner-image");

  if (!wave || !bannerImage) return;

  /* =====================================
     WAVE MOTION
  ===================================== */

  const waveAnimation = gsap.to(wave, {
    backgroundPositionX: "900px",
    duration: 20,
    ease: "none",
    repeat: -1,
  });

  // const waveVerticalAnimation = gsap.to(wave, {
  //   backgroundPositionY: "25px",
  //   duration: 1,
  //   ease: "sine.inOut",
  //   repeat: -1,
  //   yoyo: true,
  // });

  /* =====================================
     BANNER — UNCHANGED
  ===================================== */

  const bannerAnimation = gsap.to(bannerImage, {
    rotationY: 8,
    rotationX: -1,
    y: -4,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  return () => {
    waveAnimation.kill();
    // waveVerticalAnimation.kill();
    bannerAnimation.kill();
  };
}, []);
  

  return (
    <section
      className="banner"
      style={{
        position: "relative",
        width: "100%",
        perspective: "1200px",
        overflow: "visible",
        padding: 0,
        margin: 0,
      }}
    >
      {/* =========================
          BANNER IMAGE
      ========================== */}

      <div
        className="banner-image"
        style={{
          position: "relative",

          width: "90%",
          maxWidth: "1250px",

          margin: "0 auto",

          padding: "10px",

          background: "#fff",

          boxSizing: "border-box",

          zIndex: 2,

          transformStyle: "preserve-3d",

          boxShadow:
            "0 20px 45px rgba(0, 0, 0, 0.18)",
        }}
      >
        <img
          src="/images/home_banner.webp"
          alt="Portfolio Banner"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: 0,
          }}
        />
      </div>

      {/* =========================
          FULL WIDTH WAVE
      ========================== */}

      <div
        className="banner-wave"
        style={{
          position: "absolute",

          /*
           * Force wave to viewport width
           */
          width: "200vw",

          /*
           * Start at absolute viewport left
           */
          left: "50%",

          transform: "translateX(-50%)",

          /*
           * Put wave directly against banner
           */
          top: "calc(100% - 180px)",

          height: "360px",

          backgroundImage:
            "url('/images/ukiyo-waves.webp')",

          backgroundRepeat: "repeat-x",

          backgroundSize: "850px auto",

          backgroundPosition: "0 top",

          overflow: "hidden",

          zIndex: 3,

          pointerEvents: "none",
        }}
      />
    </section>
  );
}

export default Banner;