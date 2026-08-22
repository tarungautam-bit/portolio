import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
  MessageCircle,
  Clock,
} from "lucide-react";

import "./Contact.css";
import ButterflyEffect from "../../../shared/components/ButterflYEffect";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx;
    let initTimer;
    let refreshTimer;

    let scrollHandler = null;
    let firstLadyTimer = null;
    let randomLadyTimer = null;

    const ladyAnimations = [];

    /*
    =====================================================
    WAIT UNTIL CONTACT ROUTE IS MOUNTED
    =====================================================
    */

    initTimer = setTimeout(() => {
      const page = pageRef.current;

      if (!page) return;

      /*
      =====================================================
      RESET SCROLL
      =====================================================
      */

      window.scrollTo(0, 0);

      /*
      =====================================================
      GSAP CONTEXT
      =====================================================
      */

      ctx = gsap.context(() => {
        /*
        =====================================================
        HERO
        =====================================================
        */

        const heroTimeline = gsap.timeline();

        heroTimeline
          .from(".contact-kicker", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          })

          .from(
            ".contact-title",
            {
              y: 80,
              opacity: 0,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.3"
          )

          .from(
            ".contact-description",
            {
              y: 35,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          )

          .from(
            ".contact-kanji",
            {
              scale: 0,
              rotation: -25,
              opacity: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            "-=0.5"
          );

        /*
        =====================================================
        CONTACT ART FLOAT
        =====================================================
        */

        gsap.to(".contact-art-frame", {
          y: -12,
          rotation: 1,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        /*
        =====================================================
        RANDOM UKIYO-E LADIES
        =====================================================

        IMPORTANT:

        - NOT connected to contact hero
        - NOT controlled by hero ScrollTrigger
        - Can appear anywhere in viewport
        - Appears while scrolling
        - Can also appear while user pauses
        - Random image
        - Random position
        - Random direction
        - Random rotation
        - Small but detailed
        =====================================================
        */

        // const ladies = page.querySelectorAll(
        //   ".contact-ukiyo-lady"
        // );

        // const random = (min, max) => {
        //   return gsap.utils.random(min, max);
        // };

        // /*
        // =====================================================
        // RANDOM LADY
        // =====================================================
        // */

        // const getRandomLady = () => {
        //   if (!ladies.length) {
        //     return null;
        //   }

        //   const availableLadies =
        //     Array.from(ladies).filter(
        //       (lady) =>
        //         !lady.classList.contains(
        //           "lady-active"
        //         )
        //     );

        //   const pool =
        //     availableLadies.length
        //       ? availableLadies
        //       : Array.from(ladies);

        //   return pool[
        //     Math.floor(
        //       Math.random() * pool.length
        //     )
        //   ];
        // };

        // /*
        // =====================================================
        // SHOW RANDOM LADY
        // =====================================================
        // */

        // const showRandomLady = () => {
        //   const lady = getRandomLady();

        //   if (!lady) {
        //     return;
        //   }

        //   /*
        //   ---------------------------------------------------
        //   VIEWPORT
        //   ---------------------------------------------------
        //   */

        //   const viewportWidth =
        //     window.innerWidth;

        //   const viewportHeight =
        //     window.innerHeight;

        //   /*
        //   ---------------------------------------------------
        //   SMALL SIZE
          
        //   CSS controls base width.
        //   GSAP adds a subtle random scale.
        //   ---------------------------------------------------
        //   */

        //   const scale = random(
        //     0.78,
        //     0.94
        //   );

        //   /*
        //   ---------------------------------------------------
        //   RANDOM POSITION

        //   Keep characters away from extreme edges.
        //   ---------------------------------------------------
        //   */

        //   const maxX = Math.max(
        //     30,
        //     viewportWidth - 210
        //   );

        //   const maxY = Math.max(
        //     80,
        //     viewportHeight - 300
        //   );

        //   const x = random(
        //     25,
        //     maxX
        //   );

        //   const y = random(
        //     75,
        //     maxY
        //   );

        //   /*
        //   ---------------------------------------------------
        //   RANDOM ROTATION
        //   ---------------------------------------------------
        //   */

        //   const rotation = random(
        //     -8,
        //     8
        //   );

        //   /*
        //   ---------------------------------------------------
        //   RANDOM ENTRANCE DIRECTION
        //   ---------------------------------------------------
        //   */

        //   const directions = [
        //     {
        //       x: -180,
        //       y: random(-80, 80),
        //     },

        //     {
        //       x: 180,
        //       y: random(-80, 80),
        //     },

        //     {
        //       x: random(-80, 80),
        //       y: -180,
        //     },

        //     {
        //       x: random(-80, 80),
        //       y: 180,
        //     },
        //   ];

        //   const direction =
        //     directions[
        //       Math.floor(
        //         Math.random() *
        //           directions.length
        //       )
        //     ];

        //   /*
        //   ---------------------------------------------------
        //   STOP PREVIOUS ANIMATION
        //   ---------------------------------------------------
        //   */

        //   gsap.killTweensOf(lady);

        //   lady.classList.add(
        //     "lady-active"
        //   );

        //   /*
        //   ---------------------------------------------------
        //   INITIAL STATE
        //   ---------------------------------------------------
        //   */

        //   gsap.set(lady, {
        //     position: "fixed",

        //     left: x,
        //     top: y,

            
        //     x: direction.x,
        //     y: direction.y,

        //     rotation:
        //       rotation +
        //       random(-4, 4),

        //     scale:
        //       scale * 0.78,

        //     opacity: 0,

        //     zIndex: 50,

        //     transformOrigin:
        //       "center center",
        //   });

        //   /*
        //   ---------------------------------------------------
        //   TIMELINE
        //   ---------------------------------------------------
        //   */

        //   const timeline =
        //     gsap.timeline({
        //       onComplete: () => {
        //         lady.classList.remove(
        //           "lady-active"
        //         );
        //       },
        //     });

        //   ladyAnimations.push(
        //     timeline
        //   );

        //   /*
        //   ===================================================
        //   1. ENTER
        //   ===================================================
        //   */

        //   timeline.to(lady, {
        //     x: 0,
        //     y: 0,

        //     opacity: random(
        //       0.78,
        //       0.94
        //     ),

        //     scale,

        //     rotation,

        //     duration: random(
        //       0.8,
        //       1.2
        //     ),

        //     ease: "power3.out",
        //   });

        //   /*
        //   ===================================================
        //   2. FLOAT
        //   ===================================================
        //   */

        //   timeline.to(lady, {
        //     y: random(
        //       -10,
        //       10
        //     ),

        //     rotation:
        //       rotation +
        //       random(-2, 2),

        //     duration: random(
        //       2.4,
        //       3.6
        //     ),

        //     ease: "sine.inOut",

        //     yoyo: true,

        //     repeat: 1,
        //   });

        //   /*
        //   ===================================================
        //   3. HOLD
        //   ===================================================
        //   */

        //   timeline.to({}, {
        //     duration: random(
        //       0.8,
        //       1.6
        //     ),
        //   });

        //   /*
        //   ===================================================
        //   4. EXIT
        //   ===================================================
        //   */

        //   timeline.to(lady, {
        //     opacity: 0,

        //     x:
        //       direction.x *
        //       0.35,

        //     y:
        //       direction.y *
        //       0.35,

        //     scale:
        //       scale * 0.88,

        //     duration: random(
        //       0.7,
        //       1.1
        //     ),

        //     ease: "power2.in",
        //   });
        // };

        /*
        =====================================================
        SCROLL-BASED RANDOM SPAWN
        =====================================================
        */

        let lastScrollY =
          window.scrollY;

        let scrollDistance = 0;

        let lastSpawnTime = 0;

        scrollHandler = () => {
          const currentScrollY =
            window.scrollY;

          const difference =
            Math.abs(
              currentScrollY -
                lastScrollY
            );

          scrollDistance +=
            difference;

          lastScrollY =
            currentScrollY;

          const now =
            performance.now();

          /*
          -----------------------------------------------
          DON'T SPAWN TOO FREQUENTLY
          -----------------------------------------------
          */

          if (
            now -
              lastSpawnTime <
            1800
          ) {
            return;
          }

          /*
          -----------------------------------------------
          SPAWN AFTER ~400PX SCROLL
          -----------------------------------------------
          */

          if (
            scrollDistance <
            400
          ) {
            return;
          }

          scrollDistance = 0;

          lastSpawnTime = now;

          showRandomLady();
        };

        window.addEventListener(
          "scroll",
          scrollHandler,
          {
            passive: true,
          }
        );

        /*
        =====================================================
        FIRST LADY
        =====================================================
        */

        firstLadyTimer =
          gsap.delayedCall(
            2.5,
            () => {
              showRandomLady();
            }
          );

        /*
        =====================================================
        RANDOM OCCASIONAL SPAWN
        =====================================================

        This makes the characters appear even if
        the visitor stays on the same section.
        =====================================================
        */

        const scheduleRandomLady =
          () => {
            randomLadyTimer =
              gsap.delayedCall(
                random(5, 8),
                () => {
                  showRandomLady();

                  scheduleRandomLady();
                }
              );
          };

        scheduleRandomLady();

        /*
        =====================================================
        SECTION HEADINGS
        =====================================================
        */

        gsap.utils
          .toArray(
            ".contact-section-heading"
          )
          .forEach((heading) => {
            gsap.fromTo(
              heading,

              {
                y: 60,
                opacity: 0,
              },

              {
                y: 0,
                opacity:1,

                duration: 1,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: heading,

                  start: "top 85%",

                  toggleActions:
                    "play none none reverse",

                  invalidateOnRefresh:
                    true,
                },
              }
            );
          });

        /*
        =====================================================
        CONTACT INFORMATION CARDS
        =====================================================
        */

        gsap.utils
          .toArray(
            ".contact-info-card"
          )
          .forEach(
            (card, index) => {
              gsap.fromTo(
                card,

                {
                  y: 60,
                  opacity: 0,
                },

                {
                  y: 0,
                  opacity: 1,

                  duration: 0.8,

                  delay:
                    index * 0.1,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: card,

                    start: "top 88%",

                    toggleActions:
                      "play none none reverse",

                    invalidateOnRefresh:
                      true,
                  },
                }
              );
            }
          );

        /*
        =====================================================
        FORM
        =====================================================
        */

        const formWrapper =
          page.querySelector(
            ".contact-form-wrapper"
          );

        if (formWrapper) {
          gsap.fromTo(
            formWrapper,

            {
              x: 80,
              opacity: 0,
            },

            {
              x: 0,
              opacity: 1,

              duration: 1,

              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  formWrapper,

                start: "top 80%",

                toggleActions:
                  "play none none reverse",

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }

        /*
        =====================================================
        FORM FIELDS
        =====================================================
        */

        const formFields =
          page.querySelectorAll(
            ".contact-form-field"
          );

        formFields.forEach(
          (field, index) => {
            gsap.fromTo(
              field,

              {
                y: 30,
                opacity: 0,
              },

              {
                y: 0,
                opacity: 1,

                duration: 0.6,

                delay:
                  index * 0.1,

                ease: "power3.out",

                scrollTrigger: {
                  trigger:
                    formWrapper ||
                    field,

                  start: "top 82%",

                  toggleActions:
                    "play none none reverse",

                  invalidateOnRefresh:
                    true,
                },
              }
            );
          }
        );

        /*
        =====================================================
        AVAILABILITY
        =====================================================
        */

        const availabilitySection =
          page.querySelector(
            ".availability-section"
          );

        const availabilityContent =
          page.querySelector(
            ".availability-content"
          );

        if (
          availabilitySection &&
          availabilityContent
        ) {
          gsap.fromTo(
            availabilityContent,

            {
              y: 70,
              opacity: 0,
            },

            {
              y: 0,
              opacity: 1,

              duration: 1,

              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  availabilitySection,

                start: "top 80%",

                toggleActions:
                  "play none none reverse",

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }

        /*
        =====================================================
        CLOSING
        =====================================================
        */

        const closing =
          page.querySelector(
            ".contact-closing"
          );

        const closingContent =
          page.querySelector(
            ".contact-closing-content"
          );

        if (
          closing &&
          closingContent
        ) {
          gsap.fromTo(
            closingContent,

            {
              y: 70,
              opacity: 0,
            },

            {
              y: 0,
              opacity: 1,

              duration: 1.1,

              ease: "power3.out",

              scrollTrigger: {
                trigger: closing,

                start: "top 80%",

                toggleActions:
                  "play none none reverse",

                invalidateOnRefresh:
                  true,
              },
            }
          );
        }

        /*
        =====================================================
        INITIAL REFRESH
        =====================================================
        */

        ScrollTrigger.refresh(true);

      }, page);

      /*
      =====================================================
      REFRESH AFTER ROUTE / LAYOUT SETTLES
      =====================================================
      */

      refreshTimer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });

        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      }, 300);

    }, 0);

    /*
    =====================================================
    CLEANUP
    =====================================================
    */

    return () => {
      clearTimeout(initTimer);
      clearTimeout(refreshTimer);

      if (scrollHandler) {
        window.removeEventListener(
          "scroll",
          scrollHandler
        );
      }

      if (firstLadyTimer) {
        firstLadyTimer.kill();
      }

      if (randomLadyTimer) {
        randomLadyTimer.kill();
      }

      ladyAnimations.forEach(
        (animation) => {
          animation.kill();
        }
      );

      if (pageRef.current) {
        pageRef.current
          .querySelectorAll(
            ".contact-ukiyo-lady"
          )
          .forEach((lady) => {
            gsap.killTweensOf(lady);

            lady.classList.remove(
              "lady-active"
            );
          });
      }

      if (ctx) {
        ctx.revert();
      }
    };

  }, []);

  return (
    <main
      ref={pageRef}
      className="contact-page"
    >
      <ButterflyEffect/>

      {/* =====================================================
          RANDOM UKIYO-E CHARACTERS

          IMPORTANT:
          Moved OUTSIDE contact-hero.

          They are now a viewport overlay and can appear
          regardless of which Contact section is visible.
      ===================================================== */}

      <div
        className="contact-ukiyo-ladies"
        aria-hidden="true"
      >

        <img
          className="
            contact-ukiyo-lady
            contact-ukiyo-lady-01
          "
          src="/images/lady-1.webp"
          alt=""
          draggable="false"
        />

        <img
          className="
            contact-ukiyo-lady
            contact-ukiyo-lady-02
          "
          src="/images/lady-2.webp"
          alt=""
          draggable="false"
        />

        <img
          className="
            contact-ukiyo-lady
            contact-ukiyo-lady-03
          "
          src="/images/lady-3.webp"
          alt=""
          draggable="false"
        />

        <img
          className="
            contact-ukiyo-lady
            contact-ukiyo-lady-4
          "
          src="/images/lady-4.webp"
          alt=""
          draggable="false"
        />

        <img
          className="
            contact-ukiyo-lady
            contact-ukiyo-lady-5
          "
          src="/images/lady-5.webp"
          alt=""
          draggable="false"
        />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        {/* =================================================
            ART FRAME
        ================================================= */}

        <div className="contact-art-frame">

          <div className="contact-art-label">
            繋

            <span>
              CONNECTION
            </span>
          </div>

          <img
            className="contact-art"
            src="/images/contact-art.webp"
            alt=""
            draggable="false"
          />

          <div className="contact-art-caption">
            縁

            <span>
              THE CONNECTION
            </span>
          </div>

        </div>


        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="contact-hero-content">

          <span className="contact-kicker">
            LET'S CONNECT
          </span>

          <h1 className="contact-title">
            Contact

            <span>
              Me
            </span>
          </h1>

          <div className="contact-kanji">
            連
          </div>

          <div className="contact-ink-line" />

          <p className="contact-description">
            Have an idea, a project, or simply want to
            start a conversation? Send me a message.
          </p>

        </div>

      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section className="contact-main">

        <div className="contact-section-heading">

          <span>
            01 — GET IN TOUCH
          </span>

          <h2>
            Start a Conversation
          </h2>

          <p>
            Whether you have a project in mind or want
            to discuss an opportunity, I'm always open
            to a meaningful conversation.
          </p>

        </div>


        <div className="contact-layout">

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="contact-information">

            {/* EMAIL */}

            <a
              href="mailto:tgautam8126@gmail.com"
              className="contact-info-card"
            >

              <div className="contact-info-icon">
                <Mail size={25} />
              </div>

              <div className="contact-info-content">

                <span>
                  EMAIL
                </span>

                <h3>
                  tgautam8126@gmail.com
                </h3>

                <p>
                  Send me an email anytime.
                </p>

              </div>

              <ArrowUpRight
                className="contact-info-arrow"
                size={22}
              />

            </a>


            {/* LOCATION */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <MapPin size={25} />
              </div>

              <div className="contact-info-content">

                <span>
                  LOCATION
                </span>

                <h3>
                  Dehradun, India
                </h3>

                <p>
                  Open to opportunities across India.
                </p>

              </div>

            </div>


            {/* RESPONSE */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <Clock size={25} />
              </div>

              <div className="contact-info-content">

                <span>
                  RESPONSE TIME
                </span>

                <h3>
                  Within 24–48 Hours
                </h3>

                <p>
                  I'll get back to you as soon as possible.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <div className="contact-form-wrapper">

            <div className="form-header">

              <MessageCircle size={25} />

              <div>

                <span>
                  SEND A MESSAGE
                </span>

                <h3>
                  Tell me about your idea.
                </h3>

              </div>

            </div>


            <form>

              {/* NAME */}

              <div className="contact-form-field">

                <label htmlFor="name">
                  YOUR NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                />

              </div>


              {/* EMAIL */}

              <div className="contact-form-field">

                <label htmlFor="email">
                  EMAIL ADDRESS
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />

              </div>


              {/* SUBJECT */}

              <div className="contact-form-field">

                <label htmlFor="subject">
                  SUBJECT
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                />

              </div>


              {/* MESSAGE */}

              <div className="contact-form-field">

                <label htmlFor="message">
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project..."
                />

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="contact-submit"
              >
                SEND MESSAGE

                <Send size={18} />
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          AVAILABILITY
      ===================================================== */}

      <section className="availability-section">

        <div className="availability-content">

          <div className="availability-kanji">
            今
          </div>

          <span>
            CURRENTLY AVAILABLE
          </span>

          <h2>
            Let's build something
            <br />
            meaningful.
          </h2>

          <p>
            I'm currently open to selected freelance
            projects, collaborations, and full-time
            opportunities.
          </p>

          <div className="availability-status">

            <span className="status-dot" />

            <span>
              AVAILABLE FOR SELECT PROJECTS
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="contact-closing">

        <div className="contact-closing-content">

          <span>
            THE FINAL STROKE
          </span>

          <h2>
            Every great work
            <br />
            begins with a conversation.
          </h2>

          <a
            href="mailto:tgautam8126@gmail.com"
            className="contact-closing-button"
          >
            SAY HELLO

            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Contact;