import { useLayoutEffect, useRef } from "react";
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
import { useProjectaApi } from "../hook/ProjectHook";

gsap.registerPlugin(ScrollTrigger);

function Mission() {
  const rootRef = useRef(null);

  const { isPending, projectData } = useProjectaApi();

  /*
  ============================================================
  PROJECT DATA
  ============================================================
  */

  const projects = Array.isArray(projectData)
    ? [...projectData].sort(
        (a, b) =>
          Number(a.sort_order || 0) -
          Number(b.sort_order || 0)
      )
    : [];

  const featuredProjects = projects.filter(
    (project) => project.featured === true
  );

  const archiveProjects = projects.filter(
    (project) => project.featured !== true
  );

  const featuredProject = featuredProjects[0];

  const collectionProjects =
    featuredProjects.slice(1);

  /*
  ============================================================
  GSAP / SCROLLTRIGGER
  ============================================================
  */

  useLayoutEffect(() => {
    if (
      isPending ||
      !Array.isArray(projectData) ||
      projectData.length === 0
    ) {
      return;
    }

    let ctx = null;

    let frameOne = null;
    let frameTwo = null;
    let refreshTimer = null;

    const samuraiTimers = [];
    const samuraiTimelines = [];

    /*
    ============================================================
    REFRESH
    ============================================================
    */

    const refreshScrollTrigger = () => {
      clearTimeout(refreshTimer);

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    /*
    ============================================================
    INITIALIZE
    ============================================================
    */

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        if (!rootRef.current) {
          return;
        }

        /*
        ========================================================
        GSAP CONTEXT
        ========================================================
        */

        ctx = gsap.context(() => {
          /*
          ======================================================
          HERO
          ======================================================
          */

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

          /*
          ======================================================
          HERO ART FLOAT
          ======================================================
          */

          gsap.to(
            ".projects-hero-art-wrapper",
            {
              y: -15,
              rotation: 1,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );

          /*
          ======================================================
          SAMURAI
          ======================================================
          */

          const samurai =
            gsap.utils.toArray(
              ".weapon-flash"
            );

          const pageSections =
            gsap.utils.toArray(
              [
                ".projects-hero",
                ".featured-section",
                ".projects-collection",
                ".archive-projects-section",
                ".project-philosophy",
                ".projects-closing",
              ].join(",")
            );

          /*
          ------------------------------------------------------
          CURRENT SECTION
          ------------------------------------------------------
          */

          const getCurrentSection = () => {
            if (!pageSections.length) {
              return null;
            }

            const viewportCenter =
              window.innerHeight / 2;

            let closestSection = null;
            let closestDistance = Infinity;

            pageSections.forEach(
              (section) => {
                const rect =
                  section.getBoundingClientRect();

                if (
                  viewportCenter >= rect.top &&
                  viewportCenter <= rect.bottom
                ) {
                  closestSection = section;
                  closestDistance = 0;
                  return;
                }

                const distance =
                  viewportCenter < rect.top
                    ? rect.top -
                      viewportCenter
                    : viewportCenter -
                      rect.bottom;

                if (
                  distance <
                  closestDistance
                ) {
                  closestDistance =
                    distance;
                  closestSection =
                    section;
                }
              }
            );

            return closestSection;
          };

          /*
          ------------------------------------------------------
          SHOW SAMURAI
          ------------------------------------------------------
          */

          const showSamurai = () => {
            if (!samurai.length) {
              return;
            }

            const currentSection =
              getCurrentSection();

            if (!currentSection) {
              return;
            }

            const sectionRect =
              currentSection.getBoundingClientRect();

            if (
              sectionRect.bottom <= 0 ||
              sectionRect.top >=
                window.innerHeight
            ) {
              return;
            }

            const character =
              samurai[
                Math.floor(
                  Math.random() *
                    samurai.length
                )
              ];

            const isMobile =
              window.innerWidth <= 768;

            const scale = isMobile
              ? 0.7 +
                Math.random() * 0.18
              : 0.88 +
                Math.random() * 0.18;

            const imageHeight =
              character.offsetHeight *
              scale;

            const visibleTop = Math.max(
              sectionRect.top,
              20
            );

            const visibleBottom = Math.min(
              sectionRect.bottom,
              window.innerHeight - 20
            );

            const visibleHeight =
              visibleBottom - visibleTop;

            if (
              visibleHeight <
              Math.min(
                180,
                imageHeight || 180
              )
            ) {
              return;
            }

            const randomX =
              8 + Math.random() * 84;

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
                safeBottom - safeTop
              );

            const viewportY =
              safeTop +
              Math.random() *
                usableHeight;

            const documentY =
              window.scrollY + viewportY;

            const rotation =
              -5 + Math.random() * 10;

            const direction =
              Math.random() > 0.5
                ? 1
                : -1;

            const startX =
              direction *
              (100 +
                Math.random() * 100);

            const startY =
              -20 +
              Math.random() * 40;

            const driftX =
              -15 +
              Math.random() * 30;

            const driftY =
              -15 +
              Math.random() * 30;

            const opacity = isMobile
              ? 0.68
              : 0.78;

            /*
            INITIAL
            */

            gsap.set(character, {
              left: `${randomX}%`,
              top: documentY,
              x: startX,
              y: startY,
              scale: scale * 0.88,
              rotation:
                rotation +
                direction * 4,
              opacity: 0,
              filter:
                "blur(4px) drop-shadow(0 14px 20px rgba(0,0,0,0.18))",
              transformOrigin:
                "50% 60%",
            });

            /*
            TIMELINE
            */

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

            /*
            APPEAR
            */

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

            /*
            IMPACT
            */

            timeline.to(character, {
              scale: scale * 1.035,
              duration: 0.14,
              ease: "power2.out",
            });

            /*
            SETTLE
            */

            timeline.to(character, {
              scale,
              duration: 0.22,
              ease: "sine.out",
            });

            /*
            MOVEMENT
            */

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

            /*
            FADE
            */

            timeline.to(character, {
              opacity: 0,
              scale: scale * 0.96,
              y: driftY - 20,
              duration: 0.75,
              ease: "power2.in",
            });
          };

          /*
          ------------------------------------------------------
          SAMURAI LOOP
          ------------------------------------------------------
          */

          const scheduleSamurai = () => {
            showSamurai();

            const timer =
              gsap.delayedCall(
                1 +
                  Math.random() * 3.5,
                scheduleSamurai
              );

            samuraiTimers.push(timer);
          };

          const initialTimer =
            gsap.delayedCall(
              0.5,
              scheduleSamurai
            );

          samuraiTimers.push(
            initialTimer
          );

          /*
          ======================================================
          SECTION HEADINGS
          ======================================================
          */

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

          /*
          ======================================================
          PROJECT CARDS
          ======================================================
          */

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

                /*
                CARD
                */

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

                /*
                IMAGE PARALLAX
                */

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
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                      },
                    }
                  );
                }

                /*
                CONTENT
                */

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
                      start: "top 82%",
                      toggleActions:
                        "play none none reverse",
                    },
                  });
                }
              }
            );

          /*
          ======================================================
          FEATURED IMAGE
          ======================================================
          */

          const featuredImage =
            rootRef.current.querySelector(
              ".featured-project-image img"
            );

          const featuredProjectElement =
            rootRef.current.querySelector(
              ".featured-project"
            );

          if (
            featuredImage &&
            featuredProjectElement
          ) {
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
                    featuredProjectElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }

          /*
          ======================================================
          ARCHIVE
          ======================================================
          */

          gsap.utils
            .toArray(".archive-project")
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
                    start: "top 88%",
                    toggleActions:
                      "play none none reverse",
                  },
                });
              }
            );

          /*
          ======================================================
          PHILOSOPHY
          ======================================================
          */

          const philosophy =
            rootRef.current.querySelector(
              ".project-philosophy-inner"
            );

          const philosophySection =
            rootRef.current.querySelector(
              ".project-philosophy"
            );

          if (
            philosophy &&
            philosophySection
          ) {
            gsap.from(philosophy, {
              y: 70,
              opacity: 0,
              duration: 1.1,
              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  philosophySection,
                start: "top 82%",
                toggleActions:
                  "play none none reverse",
              },
            });
          }

          /*
          ======================================================
          CLOSING
          ======================================================
          */

          const closingContent =
            rootRef.current.querySelector(
              ".projects-closing-content"
            );

          const closingSection =
            rootRef.current.querySelector(
              ".projects-closing"
            );

          if (
            closingContent &&
            closingSection
          ) {
            gsap.from(
              closingContent,
              {
                y: 70,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",

                scrollTrigger: {
                  trigger:
                    closingSection,
                  start: "top 80%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }

          /*
          ======================================================
          INITIAL REFRESH
          ======================================================
          */

          ScrollTrigger.refresh();
        }, rootRef);

        /*
        ========================================================
        SECOND REFRESH
        ========================================================
        */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        /*
        ========================================================
        IMAGE LOAD
        ========================================================
        */

        const images =
          rootRef.current.querySelectorAll(
            "img"
          );

        images.forEach((image) => {
          if (!image.complete) {
            image.addEventListener(
              "load",
              refreshScrollTrigger
            );
          }
        });
      });
    });

    /*
    ============================================================
    RESIZE
    ============================================================
    */

    const handleResize = () => {
      clearTimeout(refreshTimer);

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
    ============================================================
    CLEANUP
    ============================================================
    */

    return () => {
      if (frameOne) {
        cancelAnimationFrame(
          frameOne
        );
      }

      if (frameTwo) {
        cancelAnimationFrame(
          frameTwo
        );
      }

      clearTimeout(refreshTimer);

      window.removeEventListener(
        "resize",
        handleResize
      );

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

      /*
      IMPORTANT:
      Only clean this component's GSAP.
      */

      if (ctx) {
        ctx.revert();
      }
    };
  }, [projectData, isPending]);

  /*
  ============================================================
  LOADER
  ============================================================
  */

  if (isPending) {
    return (
      <main
        ref={rootRef}
        className="projects-page"
      >
        <ThunderEffect />

        <div className="section-loader">
          <div className="section-loader-circle" />
        </div>
      </main>
    );
  }

  /*
  ============================================================
  PAGE
  ============================================================
  */

  return (
    <main
      ref={rootRef}
      className="projects-page"
    >
      <ThunderEffect />

      {/* =====================================================
          SAMURAI
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

      {featuredProject && (
        <section className="featured-section">
          <div className="projects-section-heading">
            <span>
              01 — FEATURED WORK
            </span>

            <h2>
              Featured Work
            </h2>

            <p>
              A selection of digital
              experiences and applications
              crafted through code,
              interaction, and design.
            </p>
          </div>

          <article className="featured-project">
            <div className="featured-project-image">
              <img
                src={
                  featuredProject.image
                }
                alt={
                  featuredProject.title
                }
                loading="eager"
                decoding="async"
              />

              <div className="featured-number">
                01
              </div>
            </div>

            <div className="featured-project-info">
              <div>
                <span className="project-category">
                  {featuredProject.tech_stack
                    ?.slice(0, 3)
                    .join(" · ")}
                </span>

                <h3>
                  {featuredProject.title}
                </h3>

                <h4>
                  {featuredProject.title}
                </h4>

                <p>
                  {
                    featuredProject.description
                  }
                </p>
              </div>

              <div className="project-actions">
                {featuredProject.live_link && (
                  <a
                    href={
                      featuredProject.live_link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action"
                  >
                    VIEW PROJECT
                    <ArrowUpRight
                      size={17}
                    />
                  </a>
                )}

               
              </div>
            </div>
          </article>
        </section>
      )}

      {/* =====================================================
          COLLECTION
      ===================================================== */}

      {collectionProjects.length >
        0 && (
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
            {collectionProjects.map(
              (project, index) => {
                const isLarge =
                  index === 0 ||
                  index % 3 === 0;

                return (
                  <article
                    key={project.id}
                    className={`project-card ${
                      isLarge
                        ? "project-card-large"
                        : ""
                    }`}
                  >
                    <div className="project-card-image">
                      <img
                        src={project.image}
                        alt={
                          project.title
                        }
                        loading="lazy"
                        decoding="async"
                      />

                      <span className="project-number">
                        {String(
                          index + 2
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div className="project-hover">
                        {project.live_link && (
                          <a
                            href={project.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} live`}
                          >
                            <ArrowUpRight size={32} />
                          </a>
                        )}

                     
                      </div>

                        
                    
                    </div>

                    <div className="project-card-content">
                      <span>
                        {project.tech_stack
                          ?.slice(0, 3)
                          .join(
                            " · "
                          )}
                      </span>

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {
                          project.description
                        }
                      </p>

                 
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ARCHIVE
      ===================================================== */}

      {archiveProjects.length > 0 && (
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
            {archiveProjects.map(
              (project, index) => {
                const icons = [
                  Code2,
                  Database,
                  Smartphone,
                  Globe,
                ];

                const Icon =
                  icons[
                    index %
                      icons.length
                  ];

                return (
                  <article
                    key={project.id}
                    className="archive-project"
                  >
                    <div className="archive-project-number">
                      {String(
                        index +
                          collectionProjects.length +
                          2
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="archive-project-icon">
                      <Icon
                        size={30}
                      />
                    </div>

                    <div className="archive-project-content">
                      <span>
                        {project.tech_stack
                          ?.slice(0, 2)
                          .join(
                            " · "
                          )}
                      </span>

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {
                          project.description
                        }
                      </p>
                    </div>

                    <div className="archive-project-actions">
                      {project.live_link && (
                        <a
                          href={
                            project.live_link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action"
                        >
                          VIEW PROJECT
                          <ArrowUpRight
                            size={
                              17
                            }
                          />
                        </a>
                      )}

                   
                      
                    </div>
                    <a href={project.live_link} target="_blank">
                    <ArrowUpRight
                      className="archive-arrow"
                      size={25}
                    />
                    </a>
                  </article>
                );
              }
            )}
          </div>
        </section>
      )}

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
            <ArrowUpRight
              size={18}
            />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Mission;