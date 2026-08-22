import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  Code2,
  Database,
  Smartphone,
  Globe,
  GitBranch,
} from "lucide-react";

import "./Mission.css";
import ThunderEffect from "../../../shared/components/ThunderEffect";

gsap.registerPlugin(ScrollTrigger);

function Mission() {
  useLayoutEffect(() => {
    const samuraiTimers = [];
    const samuraiTimelines = [];

    const ctx = gsap.context(() => {

      /* =====================================================
         HERO
      ===================================================== */

      const heroTimeline = gsap.timeline();

      heroTimeline
        .from(".projects-kicker", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".projects-title",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".projects-description",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".projects-kanji",
          {
            scale: 0,
            rotation: -20,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );


      /* =====================================================
         HERO ART FLOAT
      ===================================================== */

      gsap.to(".projects-hero-art-wrapper", {
        y: -15,
        rotation: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });


      /* =====================================================
         SAMURAI
         
         IMPORTANT:
         Samurai are NOT positioned using page height.

         We find the section currently under the viewport
         and place the samurai INSIDE THAT SECTION.
      ===================================================== */

      const samurai = gsap.utils.toArray(
        ".weapon-flash"
      );

      /*
        These are the actual content sections of the page.

        The samurai will only appear inside one of these.
      */

      const pageSections = gsap.utils.toArray(
        [
          ".projects-hero",
          ".featured-section",
          ".projects-collection",
          ".archive-projects-section",
          ".project-philosophy",
          ".projects-closing",
        ].join(",")
      );


      /* =====================================================
         FIND CURRENT SECTION
      ===================================================== */

      const getCurrentSection = () => {

        if (!pageSections.length) {
          return null;
        }

        /*
          Use the CENTER of the viewport.

          This means if the user is looking at the middle
          of a section, that section becomes the active one.
        */

        const viewportCenter =
          window.innerHeight / 2;


        let closestSection = null;

        let closestDistance = Infinity;


        pageSections.forEach((section) => {

          const rect =
            section.getBoundingClientRect();


          /*
            Is viewport center actually inside
            this section?
          */

          if (
            viewportCenter >= rect.top &&
            viewportCenter <= rect.bottom
          ) {
            closestSection = section;
            closestDistance = 0;
            return;
          }


          /*
            If the center is between sections,
            find the closest section.
          */

          const distance =
            viewportCenter < rect.top
              ? rect.top - viewportCenter
              : viewportCenter - rect.bottom;


          if (
            distance < closestDistance
          ) {
            closestDistance = distance;
            closestSection = section;
          }

        });


        return closestSection;
      };


      /* =====================================================
         CREATE SAMURAI
      ===================================================== */

      const showSamurai = () => {

        if (!samurai.length) return;


        const currentSection =
          getCurrentSection();


        if (!currentSection) return;


        /*
          Get section position RELATIVE TO VIEWPORT.
        */

        const sectionRect =
          currentSection.getBoundingClientRect();


        /*
          If the section is not meaningfully visible,
          don't spawn.
        */

        if (
          sectionRect.bottom <= 0 ||
          sectionRect.top >= window.innerHeight
        ) {
          return;
        }


        /* =================================================
           RANDOM SAMURAI
        ================================================= */

        const character =
          samurai[
            Math.floor(
              Math.random() * samurai.length
            )
          ];


        /* =================================================
           RESPONSIVE
        ================================================= */

        const isMobile =
          window.innerWidth <= 768;


        /* =================================================
           SAMURAI SIZE
        ================================================= */

        const scale =
          isMobile
            ? 0.70 +
              Math.random() * 0.18
            : 0.88 +
              Math.random() * 0.18;


        /* =================================================
           IMAGE HEIGHT

           We need to know roughly how much vertical
           space the character needs.
        ================================================= */

        const imageHeight =
          character.offsetHeight *
          scale;


        /* =================================================
           SECTION VISIBLE AREA
        ================================================= */

        const visibleTop =
          Math.max(
            sectionRect.top,
            20
          );


        const visibleBottom =
          Math.min(
            sectionRect.bottom,
            window.innerHeight - 20
          );


        const visibleHeight =
          visibleBottom -
          visibleTop;


        /*
          Not enough room for the character.
        */

        if (
          visibleHeight <
          Math.min(
            180,
            imageHeight || 180
          )
        ) {
          return;
        }


        /* =================================================
           RANDOM X
        ================================================= */

        const randomX =
          8 +
          Math.random() * 84;


        /* =================================================
           RANDOM Y
           
           This is RELATIVE TO THE CURRENT SECTION.
        ================================================= */

        const safeTop =
          visibleTop + 20;


        const safeBottom =
          visibleBottom -
          Math.min(
            imageHeight * 0.45,
            180
          );


        const usableHeight =
          Math.max(
            50,
            safeBottom -
              safeTop
          );


        const viewportY =
          safeTop +
          Math.random() *
            usableHeight;


        /*
          Convert viewport position into
          document position.

          This is still inside the CURRENT SECTION.
        */

        const documentY =
          window.scrollY +
          viewportY;


        /* =================================================
           ROTATION
        ================================================= */

        const rotation =
          -5 +
          Math.random() * 10;


        /* =================================================
           ENTRY DIRECTION
        ================================================= */

        const direction =
          Math.random() > 0.5
            ? 1
            : -1;


        const startX =
          direction *
          (
            100 +
            Math.random() * 100
          );


        const startY =
          -20 +
          Math.random() * 40;


        /* =================================================
           DRIFT
        ================================================= */

        const driftX =
          -15 +
          Math.random() * 30;


        const driftY =
          -15 +
          Math.random() * 30;


        /* =================================================
           OPACITY
        ================================================= */

        const opacity =
          isMobile
            ? 0.68
            : 0.78;


        /* =================================================
           INITIAL
        ================================================= */

        gsap.set(character, {

          left: `${randomX}%`,

          top: documentY,

          x: startX,

          y: startY,

          scale:
            scale * 0.88,

          rotation:
            rotation +
            direction * 4,

          opacity: 0,

          filter:
            "blur(4px) drop-shadow(0 14px 20px rgba(0,0,0,0.18))",

          transformOrigin:
            "50% 60%",
        });


        /* =================================================
           TIMELINE
        ================================================= */

        const timeline =
          gsap.timeline({

            onComplete: () => {

              const index =
                samuraiTimelines.indexOf(
                  timeline
                );

              if (index !== -1) {
                samuraiTimelines.splice(
                  index,
                  1
                );
              }

            },

          });


        samuraiTimelines.push(
          timeline
        );


        /* =================================================
           APPEAR
        ================================================= */

        timeline.to(character, {

          x: 0,

          y: 0,

          scale,

          rotation,

          opacity,

          filter:
            "blur(0px) drop-shadow(0 14px 20px rgba(0,0,0,0.18))",

          duration: 0.65,

          ease: "power3.out",

        });


        /* =================================================
           SMALL IMPACT
        ================================================= */

        timeline.to(character, {

          scale:
            scale * 1.035,

          duration: 0.14,

          ease: "power2.out",

        });


        /* =================================================
           SETTLE
        ================================================= */

        timeline.to(character, {

          scale,

          duration: 0.22,

          ease: "sine.out",

        });


        /* =================================================
           GENTLE MOVEMENT
        ================================================= */

        timeline.to(character, {

          x: driftX,

          y: driftY,

          rotation:
            rotation +
            (-2 +
              Math.random() * 4),

          duration: 2.2,

          ease: "sine.inOut",

        });


        /* =================================================
           FADE OUT
        ================================================= */

        timeline.to(character, {

          opacity: 0,

          scale:
            scale * 0.96,

          y:
            driftY - 20,

          duration: 0.75,

          ease: "power2.in",

        });

      };


      /* =====================================================
         SCHEDULE
      ===================================================== */

      const scheduleSamurai = () => {

        showSamurai();


        const timer =
          gsap.delayedCall(
            1 +
              Math.random() * 3.5,
            scheduleSamurai
          );


        samuraiTimers.push(
          timer
        );

      };


      /* =====================================================
         FIRST SAMURAI
      ===================================================== */

      const initialTimer =
        gsap.delayedCall(
          .5,
          scheduleSamurai
        );


      samuraiTimers.push(
        initialTimer
      );


      /* =====================================================
         SECTION HEADINGS
      ===================================================== */

      gsap.utils
        .toArray(
          ".projects-section-heading"
        )
        .forEach((heading) => {

          gsap.from(heading, {

            y: 60,

            opacity: 0,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

              trigger: heading,

              start: "top 85%",

              toggleActions:
                "play none none reverse",

            },

          });

        });


      /* =====================================================
         PROJECT CARDS
      ===================================================== */

      gsap.utils
        .toArray(".project-card")
        .forEach(
          (card, index) => {

            const image =
              card.querySelector(
                ".project-card-image img"
              );


            const content =
              card.querySelector(
                ".project-card-content"
              );


            /* CARD */

            gsap.from(card, {

              y: 100,

              opacity: 0,

              duration: 1,

              delay:
                index * 0.08,

              ease: "power3.out",

              scrollTrigger: {

                trigger: card,

                start: "top 88%",

                toggleActions:
                  "play none none reverse",

              },

            });


            /* IMAGE PARALLAX */

            if (image) {

              gsap.fromTo(

                image,

                {
                  yPercent: -8,
                },

                {

                  yPercent: 8,

                  ease: "none",

                  scrollTrigger: {

                    trigger: card,

                    start:
                      "top bottom",

                    end:
                      "bottom top",

                    scrub: 1,

                  },

                }

              );

            }


            /* CONTENT */

            if (content) {

              gsap.from(content, {

                y: 35,

                opacity: 0,

                duration: 0.7,

                delay:
                  index * 0.08 +
                  0.15,

                ease: "power3.out",

                scrollTrigger: {

                  trigger: card,

                  start:
                    "top 82%",

                  toggleActions:
                    "play none none reverse",

                },

              });

            }

          }
        );


      /* =====================================================
         FEATURED IMAGE
      ===================================================== */

      const featuredImage =
        document.querySelector(
          ".featured-project-image img"
        );


      if (featuredImage) {

        gsap.fromTo(

          featuredImage,

          {
            scale: 1.15,
          },

          {

            scale: 1,

            ease: "none",

            scrollTrigger: {

              trigger:
                ".featured-project",

              start:
                "top bottom",

              end:
                "bottom top",

              scrub: 1,

            },

          }

        );

      }


      /* =====================================================
         ARCHIVE
      ===================================================== */

      gsap.utils
        .toArray(
          ".archive-project"
        )
        .forEach(
          (project, index) => {

            gsap.from(project, {

              x:
                index % 2 === 0
                  ? -60
                  : 60,

              opacity: 0,

              duration: 0.9,

              ease: "power3.out",

              scrollTrigger: {

                trigger: project,

                start:
                  "top 88%",

                toggleActions:
                  "play none none reverse",

              },

            });

          }
        );


      /* =====================================================
         PHILOSOPHY
      ===================================================== */

      gsap.from(
        ".project-philosophy-inner",
        {

          y: 70,

          opacity: 0,

          duration: 1.1,

          ease: "power3.out",

          scrollTrigger: {

            trigger:
              ".project-philosophy",

            start:
              "top 82%",

            toggleActions:
              "play none none reverse",

          },

        }
      );


      /* =====================================================
         CLOSING
      ===================================================== */

      gsap.from(
        ".projects-closing-content",
        {

          y: 70,

          opacity: 0,

          duration: 1.2,

          ease: "power3.out",

          scrollTrigger: {

            trigger:
              ".projects-closing",

            start:
              "top 80%",

            toggleActions:
              "play none none reverse",

          },

        }
      );


      /* =====================================================
         REFRESH
      ===================================================== */

      ScrollTrigger.refresh();

    });


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {

      samuraiTimers.forEach(
        (timer) => {
          timer.kill();
        }
      );


      samuraiTimelines.forEach(
        (timeline) => {
          timeline.kill();
        }
      );


      gsap.killTweensOf(
        ".weapon-flash"
      );


      ctx.revert();

    };

  }, []);


  return (
    <main className="projects-page">

<ThunderEffect/>
      {/* =====================================================
          SAMURAI LAYER
      ===================================================== */}

      <div
        className="weapon-flashes"
        aria-hidden="true"
      >

        <img
          className="weapon-flash"
          src="/images/samurai.webp"
          alt=""
          draggable="false"
        />

        <img
          className="weapon-flash"
          src="/images/samurai1.webp"
          alt=""
          draggable="false"
        />

        <img
          className="weapon-flash"
          src="/images/samurai2.webp"
          alt=""
          draggable="false"
        />

        <img
          className="weapon-flash"
          src="/images/samurai3.webp"
          alt=""
          draggable="false"
        />

        <img
          className="weapon-flash"
          src="/images/samurai4.webp"
          alt=""
          draggable="false"
        />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="projects-hero">

        <div className="projects-hero-art-wrapper">

          <img
            className="projects-hero-art"
            src="/images/project-banner.webp"
            alt=""
            draggable="false"
          />

          <div className="projects-art-overlay">
            作品
          </div>

        </div>


        <div className="projects-hero-content">

          <span className="projects-kicker">
            THE ARCHIVE
          </span>


          <h1 className="projects-title">
            Selected
            <span>
              Works
            </span>
          </h1>


          <div className="projects-kanji">
            作
          </div>


          <div className="projects-ink-line" />


          <p className="projects-description">
            A collection of digital
            experiences, applications,
            interfaces, and systems
            crafted through code and
            design.
          </p>

        </div>

      </section>


      {/* =====================================================
          FEATURED
      ===================================================== */}

      <section className="featured-section">

        <div className="projects-section-heading">

          <span>
            01 — FEATURED WORK
          </span>

          <h2>
            Dragon's Roar
          </h2>

          <p>
            A complete digital identity
            and experience inspired by
            the movement and power of
            traditional Japanese dragon
            artwork.
          </p>

        </div>


        <article className="featured-project">

          <div className="featured-project-image">

            <img
              src="/images/project-01.webp"
              alt="Dragon's Roar"
            />

            <div className="featured-number">
              01
            </div>

          </div>


          <div className="featured-project-info">

            <div>

              <span className="project-category">
                BRAND IDENTITY · DIGITAL
              </span>

              <h3>
                龍の咆哮
              </h3>

              <h4>
                Dragon's Roar
              </h4>

              <p>
                A visual experience
                combining traditional
                Japanese aesthetics with
                a modern digital interface.
              </p>

            </div>


            <div className="project-actions">

              <a
                href="#"
                className="project-action"
              >
                VIEW PROJECT
                <ArrowUpRight size={17} />
              </a>


              <a
                href="#"
                className="project-action"
              >
                SOURCE
                <GitBranch size={17} />
              </a>

            </div>

          </div>

        </article>

      </section>


      {/* =====================================================
          COLLECTION
      ===================================================== */}

      <section className="projects-collection">

        <div className="projects-section-heading">

          <span>
            02 — DIGITAL WORKS
          </span>

          <h2>
            The Collection
          </h2>

        </div>


        <div className="projects-grid">

          <article className="project-card project-card-large">

            <div className="project-card-image">

              <img
                src="/images/project-02.webp"
                alt="Floating World"
              />

              <span className="project-number">
                02
              </span>

              <div className="project-hover">
                <ArrowUpRight size={32} />
              </div>

            </div>


            <div className="project-card-content">

              <span>
                UI / UX · DEVELOPMENT
              </span>

              <h3>
                Floating World
              </h3>

              <p>
                An immersive digital
                experience inspired by
                Ukiyo-e compositions.
              </p>

            </div>

          </article>


          <article className="project-card">

            <div className="project-card-image">

              <img
                src="/images/project-03.webp"
                alt="Chashitsu Store"
              />

              <span className="project-number">
                03
              </span>

              <div className="project-hover">
                <ArrowUpRight size={32} />
              </div>

            </div>


            <div className="project-card-content">

              <span>
                E-COMMERCE
              </span>

              <h3>
                Chashitsu Store
              </h3>

              <p>
                A refined e-commerce
                interface inspired by
                Japanese tea culture.
              </p>

            </div>

          </article>


          <article className="project-card">

            <div className="project-card-image">

              <img
                src="/images/project-04.webp"
                alt="Origami UI Kit"
              />

              <span className="project-number">
                04
              </span>

              <div className="project-hover">
                <ArrowUpRight size={32} />
              </div>

            </div>


            <div className="project-card-content">

              <span>
                DESIGN SYSTEM
              </span>

              <h3>
                Origami UI Kit
              </h3>

              <p>
                A modular interface system
                built around geometric
                Japanese forms.
              </p>

            </div>

          </article>


          <article className="project-card project-card-large">

            <div className="project-card-image">

              <img
                src="/images/project-05.webp"
                alt="Modern Samurai"
              />

              <span className="project-number">
                05
              </span>

              <div className="project-hover">
                <ArrowUpRight size={32} />
              </div>

            </div>


            <div className="project-card-content">

              <span>
                WEB APPLICATION
              </span>

              <h3>
                Modern Samurai
              </h3>

              <p>
                A modern web application
                balancing structured
                interfaces with expressive
                visual storytelling.
              </p>

            </div>

          </article>

        </div>

      </section>


      {/* =====================================================
          ARCHIVE
      ===================================================== */}

      <section className="archive-projects-section">

        <div className="projects-section-heading">

          <span>
            03 — THE ARCHIVE
          </span>

          <h2>
            Other Works
          </h2>

        </div>


        <div className="archive-project-list">

          <article className="archive-project">

            <div className="archive-project-number">
              06
            </div>

            <div className="archive-project-icon">
              <Code2 size={30} />
            </div>

            <div className="archive-project-content">

              <span>
                FULLSTACK
              </span>

              <h3>
                Digital Commerce
              </h3>

              <p>
                Fullstack commerce
                experience with
                authentication, APIs,
                products, orders, and
                payments.
              </p>

            </div>

            <ArrowUpRight
              className="archive-arrow"
              size={25}
            />

          </article>


          <article className="archive-project">

            <div className="archive-project-number">
              07
            </div>

            <div className="archive-project-icon">
              <Database size={30} />
            </div>

            <div className="archive-project-content">

              <span>
                BACKEND
              </span>

              <h3>
                API Architecture
              </h3>

              <p>
                Structured backend systems
                with authentication,
                databases, caching, and
                API integrations.
              </p>

            </div>

            <ArrowUpRight
              className="archive-arrow"
              size={25}
            />

          </article>


          <article className="archive-project">

            <div className="archive-project-number">
              08
            </div>

            <div className="archive-project-icon">
              <Smartphone size={30} />
            </div>

            <div className="archive-project-content">

              <span>
                RESPONSIVE
              </span>

              <h3>
                Mobile Experience
              </h3>

              <p>
                Responsive interfaces
                designed to remain
                expressive across every
                screen.
              </p>

            </div>

            <ArrowUpRight
              className="archive-arrow"
              size={25}
            />

          </article>


          <article className="archive-project">

            <div className="archive-project-number">
              09
            </div>

            <div className="archive-project-icon">
              <Globe size={30} />
            </div>

            <div className="archive-project-content">

              <span>
                WEB
              </span>

              <h3>
                Interactive Portfolio
              </h3>

              <p>
                Experimental interfaces
                combining animation,
                interaction, and
                traditional visual
                references.
              </p>

            </div>

            <ArrowUpRight
              className="archive-arrow"
              size={25}
            />

          </article>

        </div>

      </section>


      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="project-philosophy">

        <div className="project-philosophy-inner">

          <div className="project-philosophy-kanji">
            技
          </div>

          <span>
            THE CRAFT
          </span>

          <h2>
            Code is the brush.
            <br />
            The interface is the canvas.
          </h2>

          <p>
            Every project begins with
            structure, then evolves
            through interaction, motion,
            and visual composition.
          </p>

        </div>

      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="projects-closing">

        <div className="projects-closing-content">

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Let's create something
            <br />
            worth remembering.
          </h2>

          <a
            href="/contact"
            className="projects-contact-button"
          >
            START A CONVERSATION
            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Mission;