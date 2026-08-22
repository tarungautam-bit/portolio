import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  MessageCircle,
  Clock,
} from "lucide-react";

import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* =========================================
         HERO
      ========================================= */

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

      /* =========================================
         WAVE / ART FLOAT
      ========================================= */

      gsap.to(".contact-art", {
        y: -12,
        rotation: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================
         SECTION HEADINGS
      ========================================= */

      gsap.utils
        .toArray(".contact-section-heading")
        .forEach((heading) => {
          gsap.from(heading, {
            y: 55,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions:
                "play none none reverse",
            },
          });
        });

      /* =========================================
         CONTACT CARDS
      ========================================= */

      gsap.utils
        .toArray(".contact-info-card")
        .forEach((card, index) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions:
                "play none none reverse",
            },
          });
        });

      /* =========================================
         FORM
      ========================================= */

      gsap.from(".contact-form-wrapper", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".contact-form-wrapper",
          start: "top 80%",
          toggleActions:
            "play none none reverse",
        },
      });

      gsap.from(".contact-form-field", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".contact-form-wrapper",
          start: "top 75%",
          toggleActions:
            "play none none reverse",
        },
      });

      /* =========================================
         AVAILABILITY
      ========================================= */

      gsap.from(".availability-content", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".availability-section",
          start: "top 80%",
          toggleActions:
            "play none none reverse",
        },
      });

      /* =========================================
         CLOSING
      ========================================= */

      gsap.from(".contact-closing-content", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".contact-closing",
          start: "top 80%",
          toggleActions:
            "play none none reverse",
        },
      });

      ScrollTrigger.refresh();

    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="contact-page"
    >

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-art-frame">

          <div className="contact-art-label">
            繋
            <span>CONNECTION</span>
          </div>

          <img
            className="contact-art"
            src="/images/contact-art.webp"
            alt=""
            draggable="false"
          />

          <div className="contact-art-caption">
            縁
            <span>THE CONNECTION</span>
          </div>

        </div>


        <div className="contact-hero-content">

          <span className="contact-kicker">
            LET'S CONNECT
          </span>

          <h1 className="contact-title">
            Contact
            <span>Me</span>
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


      {/* =========================================
          CONTACT AREA
      ========================================= */}

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

          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}

          <div className="contact-information">


            {/* EMAIL */}

            <a
              href="mailto:hello@example.com"
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
                  hello@example.com
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


            {/* PHONE */}

            <a
              href="tel:+910000000000"
              className="contact-info-card"
            >

              <div className="contact-info-icon">
                <Phone size={25} />
              </div>

              <div className="contact-info-content">

                <span>
                  PHONE
                </span>

                <h3>
                  +91 00000 00000
                </h3>

                <p>
                  Available for professional discussions.
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


          {/* =====================================
              FORM
          ===================================== */}

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


      {/* =========================================
          AVAILABILITY
      ========================================= */}

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


      {/* =========================================
          CLOSING
      ========================================= */}

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
            href="mailto:hello@example.com"
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