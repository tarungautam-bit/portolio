import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Banner from "../../../shared/components/Banner";
import "./Homepage.css";
import SunriseEffect from "../../../shared/components/SunriseEffect";

gsap.registerPlugin(ScrollTrigger);

function Homepage() {
  useEffect(() => {
    /* =====================================================
       GSAP CONTEXT
    ===================================================== */

    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL PAGE LOAD ANIMATION
      ===================================================== */

      const pageIntro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      gsap.set(".home-page", {
        opacity: 0,
      });

      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-title",
          ".hero-description",
          ".hero-section .banner",
          ".hero-section .banner-wrapper",
          ".hero-wave",
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(".hero-eyebrow", {
        y: 25,
      });

      gsap.set(".hero-title", {
        y: 55,
      });

      gsap.set(".hero-description", {
        y: 35,
      });

      gsap.set(
        [
          ".hero-section .banner",
          ".hero-section .banner-wrapper",
        ],
        {
          y: 30,
          scale: 0.96,
        }
      );

      gsap.set(".hero-wave", {
        scale: 0.94,
        y: 20,
      });

      pageIntro
        .to(".home-page", {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        })

        /* HERO WAVES */

        .to(
          ".hero-wave",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.1"
        )

        /* EYEBROW */

        .to(
          ".hero-eyebrow",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.75"
        )

        /* TITLE */

        .to(
          ".hero-title",
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.55"
        )

        /* DESCRIPTION */

        .to(
          ".hero-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
          },
          "-=0.65"
        )

        /* BANNER */

        .to(
          ".hero-section .banner, .hero-section .banner-wrapper",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );

      /* =====================================================
         LEFT / RIGHT WAVES
      ===================================================== */

      const leftWave = document.querySelector(".left-wave");
      const rightWave = document.querySelector(".right-wave");

      const leftAnimation = leftWave
        ? gsap.to(leftWave, {
            x: 12,
            y: -6,
            rotation: 2,
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          })
        : null;

      const rightAnimation = rightWave
        ? gsap.to(rightWave, {
            x: -12,
            y: -6,
            rotation: -2,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          })
        : null;

      /* =====================================================
         FISH / BUBBLES / ALGAE
      ===================================================== */

      const fishContainer = document.querySelector(
        ".ocean-fish-container"
      );

      const fishAnimations = [];
      const delayedCalls = [];

      if (fishContainer) {
        const fishes = fishContainer.querySelectorAll(
          ".ocean-fish"
        );

        fishes.forEach((fish, index) => {
          const moveFish = () => {
            const oceanWidth = fishContainer.offsetWidth;

            const scale =
              0.7 + Math.random() * 0.8;

            const startTop =
              Math.random() * 50;

            const y1 =
              -40 + Math.random() * 80;

            const y2 =
              -60 + Math.random() * 120;

            const y3 =
              -50 + Math.random() * 100;

            const duration =
              14 + Math.random() * 8;

            gsap.set(fish, {
              left: "-150px",
              top: `${startTop}%`,
              x: 0,
              y: 0,
              scale,
              rotation:
                -5 + Math.random() * 10,
              opacity: 0,
            });

            const timeline = gsap.timeline({
              onComplete: moveFish,
            });

            fishAnimations.push(timeline);

            /* FADE IN */

            timeline.to(fish, {
              opacity: 0.75,
              duration: 1,
              ease: "power2.out",
            });

            /* LEFT → RIGHT */

            timeline.to(fish, {
              x: oceanWidth * 0.3,
              y: y1,
              rotation:
                -8 + Math.random() * 16,
              duration: duration * 0.3,
              ease: "sine.inOut",
            });

            timeline.to(fish, {
              x: oceanWidth * 0.6,
              y: y2,
              rotation:
                -10 + Math.random() * 20,
              duration: duration * 0.3,
              ease: "sine.inOut",
            });

            timeline.to(fish, {
              x: oceanWidth + 250,
              y: y3,
              rotation:
                -8 + Math.random() * 16,
              duration: duration * 0.4,
              ease: "sine.inOut",
            });

            /* FADE OUT */

            timeline.to(fish, {
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            });
          };

          const delayedCall = gsap.delayedCall(
            index * 1.8,
            moveFish
          );

          delayedCalls.push(delayedCall);
        });
      }

      /* =====================================================
         ARTISAN CONTENT
      ===================================================== */

      const artisanContent =
        document.querySelector(".artisan-content");

      const scrollAnimations = [];

      if (artisanContent) {
        const animation = gsap.from(
          artisanContent,
          {
            y: 100,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: artisanContent,
              start: "top 82%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        scrollAnimations.push(animation);
      }

      /* =====================================================
         ARTISAN GALLERY
      ===================================================== */

      const galleryImages =
        document.querySelectorAll(
          ".artisan-gallery .gallery-image"
        );

      galleryImages.forEach((image, index) => {
        const animation = gsap.from(image, {
          y: 90,
          opacity: 0,
          rotation:
            index % 2 === 0 ? -3 : 3,
          duration: 1,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 88%",
            toggleActions:
              "play none none reverse",
          },
        });

        scrollAnimations.push(animation);
      });

      /* =====================================================
         PHILOSOPHY
      ===================================================== */

      const philosophy =
        document.querySelector(
          ".philosophy-inner"
        );

      if (philosophy) {
        const animation = gsap.from(
          philosophy,
          {
            y: 90,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: philosophy,
              start: "top 82%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        scrollAnimations.push(animation);
      }

      /* =====================================================
         ARCHIVE HEADER
      ===================================================== */

      const archiveHeader =
        document.querySelector(
          ".archive-header"
        );

      if (archiveHeader) {
        const animation = gsap.from(
          archiveHeader,
          {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: archiveHeader,
              start: "top 85%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        scrollAnimations.push(animation);
      }

      /* =====================================================
         PROJECT CARDS
      ===================================================== */

      const projects =
        document.querySelectorAll(
          ".archive-grid .project"
        );

      projects.forEach((project, index) => {
        const animation = gsap.from(
          project,
          {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        scrollAnimations.push(animation);
      });

      /* =====================================================
         COMMISSION
      ===================================================== */

      const commission =
        document.querySelector(
          ".commission-inner"
        );

      if (commission) {
        const animation = gsap.from(
          commission,
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: commission,
              start: "top 82%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        scrollAnimations.push(animation);
      }

      /* =====================================================
         REFRESH SCROLLTRIGGER
      ===================================================== */

      ScrollTrigger.refresh();

      /* =====================================================
         CLEANUP
      ===================================================== */

      return () => {
        pageIntro.kill();

        if (leftAnimation) {
          leftAnimation.kill();
        }

        if (rightAnimation) {
          rightAnimation.kill();
        }

        fishAnimations.forEach(
          (animation) => {
            animation.kill();
          }
        );

        delayedCalls.forEach(
          (call) => {
            call.kill();
          }
        );

        scrollAnimations.forEach(
          (animation) => {
            animation.kill();

            if (animation.scrollTrigger) {
              animation.scrollTrigger.kill();
            }
          }
        );

        gsap.killTweensOf(".ocean-fish");

        ScrollTrigger
          .getAll()
          .forEach((trigger) => {
            trigger.kill();
          });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page">
<SunriseEffect/>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <img
          className="hero-wave hero-wave-left left-wave"
          src="/images/wave1.webp"
          alt=""
          draggable="false"
        />

        <img
          className="hero-wave hero-wave-right right-wave"
          src="/images/wave2.webp"
          alt=""
          draggable="false"
        />

        <div className="hero-eyebrow">
          FullStack Developer (MERN & PHP)
        </div>

        <h1 className="hero-title">
          Tarun Gautam
        </h1>

        <p className="hero-description">
          Crafting digital experiences with the
          patience and structural elegance of Edo
          period masters. A portfolio shaped by the
          timeless aesthetics of Ukiyo-e (浮世絵).
        </p>

        <Banner />

      </section>


      {/* =====================================================
          OCEAN
      ===================================================== */}

      <section className="ocean-section">

        {/* =================================================
            FISH / BUBBLES / ALGAE
        ================================================= */}

        <div className="ocean-fish-container">

          <img
            className="ocean-fish"
            src="/images/fish.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/algae1.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish4.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish2.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish3.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/bubble.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/algae1.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/algae1.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/fish.webp"
            alt=""
            draggable="false"
          />

          <img
            className="ocean-fish"
            src="/images/algae1.webp"
            alt=""
            draggable="false"
          />

        </div>


        {/* =================================================
            ARTISAN PATH
        ================================================= */}

        <section className="artisan-section">

          <div className="artisan-content">

            <span className="section-number">
              01
            </span>

            <h2>
              The Artisan's Path
            </h2>

            <div className="section-line"></div>

            <p>
              My journey as a FullStack Developer
              has been shaped by building practical
              web applications across PHP and
              JavaScript ecosystems. I work with
              Laravel, PHP, JavaScript, React,
              Node.js, MySQL, and MongoDB, focusing
              on building clean, reliable, and
              maintainable digital experiences.
            </p>

            <p>
              From backend APIs and database-driven
              applications to modern React
              interfaces, I enjoy working across
              the full development stack. My
              experience has taught me to value
              strong fundamentals, thoughtful
              architecture, and simple solutions
              that perform well in the real world.
            </p>

            <a
              href="#contact"
              className="outline-button"
            >
              GET IN TOUCH
            </a>

          </div>


          <div className="artisan-gallery">

            <div className="gallery-image gallery-image-large">
              <img
                src="/images/project1.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="gallery-image gallery-image-small">
              <img
                src="/images/project2.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="gallery-image gallery-image-card">
              <img
                src="/images/project3.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>

        </section>


        {/* =================================================
            PHILOSOPHY
        ================================================= */}

        <section className="philosophy-section">

          <div className="philosophy-inner">

            <span className="section-eyebrow">
              THE PHILOSOPHY
            </span>

            <h2>
              Simplicity is not the absence
              <br />
              of detail.
            </h2>

            <p>
              It is the careful arrangement of
              every detail. Every interface should
              feel deliberate, balanced, and
              quietly alive.
            </p>

          </div>

        </section>


        {/* =================================================
            SELECTED ARCHIVE
        ================================================= */}

        <section className="archive-section">

          <div className="archive-header">

            <div>

              <span className="section-eyebrow">
                SELECTED WORK
              </span>

              <h2>
                Selected Archive
              </h2>

            </div>

            <a
              href="/projects"
              className="view-all"
            >
              VIEW ALL →
            </a>

          </div>


          <div className="archive-grid">

            {/* PROJECT 01 */}

            <article className="project project-large">

              <div className="project-image">

                <img
                  src="/images/project-01.webp"
                  alt="Dragon project"
                  loading="lazy"
                  decoding="async"
                />

                <span className="project-number">
                  01
                </span>

              </div>

              <div className="project-info">

                <h3>
                  龍の咆哮
                </h3>

                <p>
                  Dragon's Roar
                </p>

                <span>
                  BRAND IDENTITY · DIGITAL
                </span>

              </div>

            </article>


            {/* PROJECT 02 */}

            <article className="project project-offset">

              <div className="project-image">

                <img
                  src="/images/project-02.webp"
                  alt="Japanese inspired project"
                  loading="lazy"
                  decoding="async"
                />

                <span className="project-number">
                  02
                </span>

              </div>

              <div className="project-info">

                <h3>
                  Floating World
                </h3>

                <p>
                  Digital Experience
                </p>

                <span>
                  UI / UX · DEVELOPMENT
                </span>

              </div>

            </article>


            {/* PROJECT 03 */}

            <article className="project">

              <div className="project-image">

                <img
                  src="/images/project-03.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

              </div>

              <div className="project-info">

                <h3>
                  Chashitsu Store
                </h3>

                <span>
                  E-COMMERCE
                </span>

              </div>

            </article>


            {/* PROJECT 04 */}

            <article className="project">

              <div className="project-image">

                <img
                  src="/images/project-04.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

              </div>

              <div className="project-info">

                <h3>
                  Origami UI Kit
                </h3>

                <span>
                  DESIGN SYSTEM
                </span>

              </div>

            </article>

          </div>

        </section>


        {/* =================================================
            COMMISSION
        ================================================= */}

        <section
          id="contact"
          className="commission-section"
        >

          <div className="commission-inner">

            <span className="section-eyebrow">
              AVAILABLE FOR SELECT PROJECTS
            </span>

            <h2>
              Commission a Work
            </h2>

            <p>
              Currently accepting inquiries for
              digital product design, aesthetic
              direction, and thoughtful web
              experiences.
            </p>

           <a
            href="/contact"
            className="projects-contact-button"
          >
              START A CONVERSATION →
            </a>

          </div>

        </section>

      </section>

    </div>
  );
}

export default Homepage;