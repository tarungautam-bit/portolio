import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Code2,
  Braces,
  Database,
  Server,
  Palette,
  Terminal,
  GitBranch,
  Send,
  Cpu,
  Layers,
  Monitor,
  GraduationCap,
  Award,
  Plane,
  Pencil,
  Clapperboard,
} from "lucide-react";

import "./Profile.css";

gsap.registerPlugin(ScrollTrigger);

function Profile() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx;
    let initTimer;
    let refreshTimer;

    /*
    =====================================================
    WAIT UNTIL ABOUT ROUTE IS MOUNTED
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
          .from(".about-kicker", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          })
          .from(
            ".about-title",
            {
              y: 70,
              opacity: 0,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.3"
          )
          .from(
            ".about-intro",
            {
              y: 35,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.45"
          )
          .from(
            ".about-japanese-mark",
            {
              scale: 0,
              rotation: -30,
              opacity: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            "-=0.5"
          );


        /*
        =====================================================
        FIRE ART
        =====================================================
        */

        gsap.to(".about-art-frame", {
          y: -12,
          rotation: 1,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });


        /*
        =====================================================
        GLOBAL FLOATING FLAMES
        =====================================================
        */

        gsap.utils
          .toArray(".floating-flame")
          .forEach((flame, index) => {

            const delay = index * 0.25;

            gsap.set(flame, {
              opacity: 0,
              scale: 0.7 + Math.random() * 0.5,
            });

            gsap.to(flame, {
              opacity: 0.35 + Math.random() * 0.35,
              duration: 1.2 + Math.random() * 0.8,
              delay,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

            gsap.to(flame, {
              x: -15 + Math.random() * 30,
              y: -25 + Math.random() * 50,
              rotation: -8 + Math.random() * 16,
              scale: 0.8 + Math.random() * 0.4,
              duration: 2.5 + Math.random() * 2,
              delay,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

          });


        /*
        =====================================================
        SECTION HEADINGS
        =====================================================
        */

        gsap.utils
          .toArray(".about-section-heading")
          .forEach((heading) => {

            gsap.fromTo(
              heading,
              {
                y: 60,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: heading,
                  start: "top 85%",
                  toggleActions:
                    "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );

          });


        /*
        =====================================================
        EXPERIENCE LINE
        =====================================================
        */

        const experienceSection =
          page.querySelector(".experience-section");

        const progress =
          page.querySelector(
            ".experience-line-progress"
          );

        if (experienceSection && progress) {

          gsap.fromTo(
            progress,
            {
              scaleY: 0,
              transformOrigin: "top center",
            },
            {
              scaleY: 1,
              ease: "none",

              scrollTrigger: {
                trigger: experienceSection,
                start: "top 70%",
                end: "bottom 70%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );

        }


        /*
        =====================================================
        EXPERIENCE CARDS
        =====================================================
        */

        gsap.utils
          .toArray(".experience-item")
          .forEach((item, index) => {

            const card =
              item.querySelector(
                ".experience-card"
              );

            const dot =
              item.querySelector(
                ".experience-dot"
              );

            const direction =
              index % 2 === 0 ? -80 : 80;


            if (card) {

              gsap.fromTo(
                card,
                {
                  x: direction,
                  opacity: 0,
                },
                {
                  x: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions:
                      "play none none reverse",
                    invalidateOnRefresh: true,
                  },
                }
              );

            }


            if (dot) {

              gsap.fromTo(
                dot,
                {
                  scale: 0,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: "back.out(2)",

                  scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions:
                      "play none none reverse",
                    invalidateOnRefresh: true,
                  },
                }
              );

            }

          });


        /*
        =====================================================
        SKILLS
        =====================================================
        */

        gsap.utils
          .toArray(".skill-item")
          .forEach((skill, index) => {

            gsap.fromTo(
              skill,
              {
                y: 50,
                opacity: 0,
                scale: 0.9,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay: index * 0.04,
                ease: "back.out(1.4)",

                scrollTrigger: {
                  trigger: skill,
                  start: "top 90%",
                  toggleActions:
                    "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );

          });


        /*
        =====================================================
        EDUCATION
        =====================================================
        */

        const educationSection =
          page.querySelector(
            ".education-section"
          );

        const educationCard =
          page.querySelector(
            ".education-card"
          );

        if (educationSection && educationCard) {

          gsap.fromTo(
            educationCard,
            {
              y: 80,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: educationSection,
                start: "top 80%",
                toggleActions:
                  "play none none reverse",
                invalidateOnRefresh: true,
              },
            }
          );

        }


        /*
        =====================================================
        EDUCATION SMALL CARDS
        =====================================================
        */

        gsap.utils
          .toArray(".education-small-card")
          .forEach((card, index) => {

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
                delay: index * 0.12,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions:
                    "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );

          });


        /*
        =====================================================
        CERTIFICATES
        =====================================================
        */

        gsap.utils
          .toArray(".certificate-card")
          .forEach((card, index) => {

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
                delay: index * 0.12,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions:
                    "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );

          });


        /*
        =====================================================
        INTERESTS
        =====================================================
        */

        gsap.utils
          .toArray(".interest-item")
          .forEach((item, index) => {

            gsap.fromTo(
              item,
              {
                y: 40,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: index * 0.1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions:
                    "play none none reverse",
                  invalidateOnRefresh: true,
                },
              }
            );

          });


        /*
        =====================================================
        CLOSING
        =====================================================
        */

        const closing =
          page.querySelector(
            ".about-closing"
          );

        const closingContent =
          page.querySelector(
            ".about-closing-content"
          );

        if (closing && closingContent) {

          gsap.fromTo(
            closingContent,
            {
              y: 70,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",

              scrollTrigger: {
                trigger: closing,
                start: "top 80%",
                toggleActions:
                  "play none none reverse",
                invalidateOnRefresh: true,
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

      if (ctx) {
        ctx.revert();
      }

    };

  }, []);


  return (
    <main
      ref={pageRef}
      className="about-page"
    >

      {/* =====================================================
          GLOBAL FLOATING FLAMES
      ===================================================== */}

      <div
        className="global-flames"
        aria-hidden="true"
      >

        <img
          className="floating-flame flame-1"
          src="/images/flame.png"
          alt=""
          draggable="false"
        />

        <img
          className="floating-flame flame-2"
          src="/images/flame2.png"
          alt=""
          draggable="false"
        />

        <img
          className="floating-flame flame-3"
          src="/images/flame3.png"
          alt=""
          draggable="false"
        />

        <img
          className="floating-flame flame-4"
          src="/images/flame4.png"
          alt=""
          draggable="false"
        />

        <img
          className="floating-flame flame-5"
          src="/images/flame.png"
          alt=""
          draggable="false"
        />

        <img
          className="floating-flame flame-6"
          src="/images/flame.png"
          alt=""
          draggable="false"
        />

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-art-frame">

          <div className="about-art-label">
            炎
            <span>THE SPIRIT</span>
          </div>

          <img
            className="about-fire-art"
            src="/images/about_banner.png"
            alt=""
            draggable="false"
          />

          <div className="about-art-caption">
            火
            <span>UKIYO-E FIRE</span>
          </div>

        </div>


        <div className="about-hero-content">

          <span className="about-kicker">
            THE ARTISAN
          </span>

          <h1 className="about-title">
            About
            <span>Me</span>
          </h1>

          <div className="about-japanese-mark">
            創
          </div>

          <div className="about-ink-line" />

          <p className="about-intro">
            Hi, I'm Tarun Gautam — a Fullstack Developer
            focused on building thoughtful digital
            experiences with strong backend foundations
            and expressive frontend interfaces.
          </p>

          <p className="about-intro-small">
            I work across PHP, Laravel, Node.js, React,
            databases, APIs, and modern web technologies.
          </p>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="experience-section">

        <div className="about-section-heading">

          <span>
            01 — THE JOURNEY
          </span>

          <h2>
            Experience
          </h2>

          <p>
            From backend systems and APIs to full-stack
            applications and production web platforms.
          </p>

        </div>


        <div className="experience-timeline">

          <div className="experience-line">
            <div className="experience-line-progress" />
          </div>


          <article className="experience-item">

            <div className="experience-dot" />

            <div className="experience-card">

              <span className="experience-date">
                APRIL 2023 — JUNE 2023
              </span>

              <span className="experience-type">
                INTERNSHIP
              </span>

              <h3>
                Etechmy
              </h3>

              <h4>
                Backend Development
              </h4>

              <p>
                Developed and maintained backend systems,
                APIs, and admin panels for multiple web and
                mobile applications, including e-commerce
                platforms.
              </p>

            </div>

          </article>


          <article className="experience-item">

            <div className="experience-dot" />

            <div className="experience-card">

              <span className="experience-date">
                JULY 2023 — APRIL 2024
              </span>

              <span className="experience-type">
                FULL TIME
              </span>

              <h3>
                Rajshi Solutions
              </h3>

              <h4>
                Fullstack Developer
              </h4>

              <p>
                Spearheaded development of BegunOnline's
                e-commerce platform with a strong focus on
                user experience.
              </p>

              <p>
                Implemented OTP authentication, mobile
                recharge APIs, and real-time WhatsApp/SMS
                notifications.
              </p>

            </div>

          </article>


          <article className="experience-item">

            <div className="experience-dot" />

            <div className="experience-card">

              <span className="experience-date">
                MARCH 2025 — PRESENT
              </span>

              <span className="experience-type">
                FULL TIME
              </span>

              <h3>
                Intouch Quality Services
              </h3>

              <h4>
                Developer
              </h4>

              <p>
                Design, build, and maintain web applications
                and APIs while writing clean, reusable, and
                secure backend and frontend code.
              </p>

              <p>
                Work with databases, debug and optimize
                application performance, collaborate with
                designers, testers, and product managers,
                and maintain technical documentation.
              </p>

            </div>

          </article>

        </div>

      </section>


      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section className="skills-section">

        <div className="about-section-heading">

          <span>
            02 — THE TOOLS
          </span>

          <h2>
            Skills
          </h2>

          <p>
            The tools and technologies I use to build,
            connect, and ship digital products.
          </p>

        </div>


        <div className="skills-grid">

          <Skill
            icon={<Code2 />}
            name="HTML5"
          />

          <Skill
            icon={<Palette />}
            name="CSS3"
          />

          <Skill
            icon={<Layers />}
            name="Bootstrap"
          />

          <Skill
            icon={<Braces />}
            name="JavaScript"
          />

          <Skill
            icon={<Code2 />}
            name="jQuery"
          />

          <Skill
            icon={<Server />}
            name="PHP"
          />

          <Skill
            icon={<Layers />}
            name="Laravel"
          />

          <Skill
            icon={<Database />}
            name="MySQL"
          />

          <Skill
            icon={<Database />}
            name="MongoDB"
          />

          <Skill
            icon={<Server />}
            name="Node.js"
          />

          <Skill
            icon={<Server />}
            name="Express.js"
          />

          <Skill
            icon={<Monitor />}
            name="React.js"
          />

          <Skill
            icon={<Cpu />}
            name="Java"
          />

          <Skill
            icon={<Send />}
            name="Postman"
          />

          <Skill
            icon={<GitBranch />}
            name="Git"
          />

          <Skill
            icon={<GitBranch />}
            name="GitHub"
          />

 

        </div>

      </section>


      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section className="education-section">

        <div className="about-section-heading">

          <span>
            03 — THE FOUNDATION
          </span>

          <h2>
            Education
          </h2>

        </div>


        <div className="education-card">

          <div className="education-icon">
            <GraduationCap size={42} />
          </div>

          <div className="education-year">
            2022
          </div>

          <div className="education-content">

            <span>
              BACHELOR'S DEGREE
            </span>

            <h3>
              Bachelor of Technology
            </h3>

            <p>
              Computer Science Engineering
            </p>

            <strong>
              Uttaranchal University
            </strong>

          </div>

          <div className="education-kanji">
            学
          </div>

        </div>


        <div className="education-small-grid">

          <div className="education-small-card">

            <span>
              2017
            </span>

            <h3>
              Intermediate
            </h3>

            <p>
              Jaswant Modern Sr. Sec. School
            </p>

            <small>
              CBSE
            </small>

          </div>


          <div className="education-small-card">

            <span>
              2015
            </span>

            <h3>
              High School
            </h3>

          </div>

        </div>

      </section>


      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      <section className="certificates-section">

        <div className="about-section-heading">

          <span>
            04 — CONTINUOUS LEARNING
          </span>

          <h2>
            Certifications
          </h2>

        </div>


        <div className="certificates-grid">

          <article className="certificate-card">

            <Award size={28} />

            <span>
              UDEMY
            </span>

            <h3>
              PHP Full Stack Web Development
            </h3>

          </article>


          <article className="certificate-card">

            <Award size={28} />

            <span>
              NPTEL · IIT KHARAGPUR
            </span>

            <h3>
              Programming in Java
            </h3>

            <strong>
              Elite + Silver
            </strong>

          </article>


          <article className="certificate-card">

            <Award size={28} />

            <span>
              UDEMY
            </span>

            <h3>
              Learn Java Programming
            </h3>

            <strong>
              Abdul Bari
            </strong>

          </article>

        </div>

      </section>


      {/* =====================================================
          INTERESTS
      ===================================================== */}

      <section className="interests-section">

        <div className="about-section-heading">

          <span>
            05 — BEYOND CODE
          </span>

          <h2>
            Interests
          </h2>

        </div>


        <div className="interests-list">

          <div className="interest-item">

            <Pencil size={25} />

            <span>
              Sketching
            </span>

          </div>


          <div className="interest-item">

            <Plane size={25} />

            <span>
              Traveling
            </span>

          </div>


          <div className="interest-item">

            <Clapperboard size={25} />

            <span>
              Animation
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="about-closing">

        <div className="about-closing-content">

          <div className="about-closing-kanji">
            道
          </div>

          <p>
            The journey is the work.
          </p>

          <span>
            THE PATH CONTINUES
          </span>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   SKILL COMPONENT
========================================================= */

function Skill({ icon, name }) {
  return (
    <div className="skill-item">

      <div className="skill-icon">
        {icon}
      </div>

      <span>
        {name}
      </span>

    </div>
  );
}

export default Profile;