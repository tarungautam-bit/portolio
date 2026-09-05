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
import useContact from "../hook/useContact";

gsap.registerPlugin(ScrollTrigger);

function Contact() {

    const pageRef = useRef(null);

    const { register,
    handleSubmit,
    errors,
    reset,
    submitContactForm,
    apiError,
    apiErrors,
    isSubmitting,
    successMessage} = useContact()

    useEffect(() => {

        const page = pageRef.current;

        if (!page) return;

        let ctx;
        let refreshTimer;
        let ladyTimer;
        let scrollHandler;

        window.scrollTo(0, 0);

        ctx = gsap.context(() => {

            /*
            ========================================================
            HERO
            ========================================================
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
            ========================================================
            CONTACT ART FLOAT
            ========================================================
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
            ========================================================
            LADIES
            ========================================================
            */

            const ladies = gsap.utils.toArray(
                ".contact-ukiyo-lady"
            );

            const sections = gsap.utils.toArray(
                ".contact-hero, .contact-main, .availability-section, .contact-closing"
            );

            let currentSection = null;
            let pairIndex = 0;
            let pairTimeline = null;


            gsap.set(ladies, {
                opacity: 0,
                scale: 0.9,
                y: 30,
                position: "absolute",
                pointerEvents: "none",
            });


            const getCurrentSection = () => {

                const viewportCenter =
                    window.innerHeight / 2;

                let closestSection = null;
                let closestDistance = Infinity;


                sections.forEach((section) => {

                    const rect =
                        section.getBoundingClientRect();


                    if (
                        rect.bottom <= 0 ||
                        rect.top >= window.innerHeight
                    ) {
                        return;
                    }


                    const sectionCenter =
                        rect.top +
                        rect.height / 2;


                    const distance =
                        Math.abs(
                            viewportCenter -
                            sectionCenter
                        );


                    if (
                        distance <
                        closestDistance
                    ) {

                        closestDistance =
                            distance;

                        closestSection =
                            section;

                    }

                });


                return closestSection;
            };


            const showLadies = () => {

                const section =
                    getCurrentSection();


                if (!section) {
                    return;
                }


                if (pairTimeline) {
                    pairTimeline.kill();
                }


                gsap.set(ladies, {
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                });


                currentSection =
                    section;


                const firstIndex =
                    (pairIndex * 2) %
                    ladies.length;


                const secondIndex =
                    (pairIndex * 2 + 1) %
                    ladies.length;


                const firstLady =
                    ladies[firstIndex];


                const secondLady =
                    ladies[secondIndex];


                const pair = [
                    firstLady,
                    secondLady,
                ];


                const positions = [

                    {
                        left: "7%",
                        top: "22%",
                        rotation: -5,
                    },

                    {
                        right: "7%",
                        top: "52%",
                        rotation: 5,
                    },

                ];


                pair.forEach(
                    (lady, index) => {

                        if (
                            lady.parentElement !==
                            section
                        ) {

                            section.appendChild(
                                lady
                            );

                        }


                        gsap.set(lady, {

                            left:
                                positions[index].left ||
                                "auto",

                            right:
                                positions[index].right ||
                                "auto",

                            top:
                                positions[index].top,

                            rotation:
                                positions[index].rotation,

                            opacity: 0,

                            scale: 0.9,

                            y: 30,

                            zIndex: 30,

                        });

                    }
                );


                pairTimeline =
                    gsap.timeline({

                        onComplete: () => {

                            pairIndex =
                                (
                                    pairIndex + 1
                                ) %
                                Math.ceil(
                                    ladies.length / 2
                                );

                            showLadies();

                        },

                    });


                pairTimeline

                    .to(pair, {

                        opacity: 1,

                        scale: 1,

                        y: 0,

                        duration: 0.4,

                        stagger: 0.08,

                        ease: "power3.out",

                    })

                    .to({}, {

                        duration: 2,

                    })

                    .to(pair, {

                        opacity: 0,

                        scale: 0.94,

                        y: -20,

                        duration: 0.35,

                        stagger: 0.05,

                        ease: "power2.in",

                    });

            };


            if (ladies.length) {

                ladyTimer =
                    gsap.delayedCall(
                        1,
                        showLadies
                    );


                scrollHandler = () => {

                    const section =
                        getCurrentSection();


                    if (
                        section &&
                        section !==
                        currentSection
                    ) {

                        currentSection =
                            section;

                        pairIndex = 0;


                        if (pairTimeline) {
                            pairTimeline.kill();
                        }


                        gsap.set(ladies, {
                            opacity: 0,
                        });


                        showLadies();

                    }

                };


                window.addEventListener(
                    "scroll",
                    scrollHandler,
                    {
                        passive: true,
                    }
                );

            }


            /*
            ========================================================
            SECTION HEADINGS
            ========================================================
            */

            gsap.utils
                .toArray(".contact-section-heading")
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

                                invalidateOnRefresh:
                                    true,
                            },

                        }
                    );

                });


            /*
            ========================================================
            CONTACT INFORMATION CARDS
            ========================================================
            */

            gsap.utils
                .toArray(".contact-info-card")
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
            ========================================================
            FORM
            ========================================================
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
                            trigger: formWrapper,

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
            ========================================================
            FORM FIELDS
            ========================================================
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
            ========================================================
            AVAILABILITY
            ========================================================
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
            ========================================================
            CLOSING
            ========================================================
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


            ScrollTrigger.refresh(true);


            refreshTimer =
                setTimeout(() => {

                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "instant",
                    });

                    ScrollTrigger.refresh(true);
                    ScrollTrigger.update();

                }, 300);

        }, page);


        return () => {

            clearTimeout(refreshTimer);


            if (ladyTimer) {
                ladyTimer.kill();
            }


            if (scrollHandler) {

                window.removeEventListener(
                    "scroll",
                    scrollHandler
                );

            }


            if (pageRef.current) {

                pageRef.current
                    .querySelectorAll(
                        ".contact-ukiyo-lady"
                    )
                    .forEach((lady) => {

                        gsap.killTweensOf(lady);

                        gsap.set(lady, {
                            opacity: 0,
                        });

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

            <ButterflyEffect />


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
                        contact-ukiyo-lady-04
                    "
                    src="/images/lady-4.webp"
                    alt=""
                    draggable="false"
                />

                <img
                    className="
                        contact-ukiyo-lady
                        contact-ukiyo-lady-05
                    "
                    src="/images/lady-5.webp"
                    alt=""
                    draggable="false"
                />

            </div>


            <section className="contact-hero">

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

                    <div className="contact-information">

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


                       <form onSubmit={handleSubmit(submitContactForm)}>

                            {successMessage&&<p>{successMessage}</p>}

                            {/* BACKEND / API ERROR */}
                            {apiError && (
                                <div className="contact-form-error">
                                {apiError}

                                {Object.keys(apiErrors).length > 0 && (
                                    <ul>
                                    {Object.entries(apiErrors).map(([field, messages]) => (
                                        <li key={field}>
                                        {messages?.[0]}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                                </div>
                            )}

                            <div className="contact-form-field">
                                <label htmlFor="name">
                                YOUR NAME
                                </label>

                                <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                />

                                {errors.name && (
                                <span className="field-error">
                                    {errors.name.message}
                                </span>
                                )}
                            </div>


                            <div className="contact-form-field">
                                <label htmlFor="email">
                                EMAIL ADDRESS
                                </label>

                                <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address",
                                    },
                                })}
                                />

                                {errors.email && (
                                <span className="field-error">
                                    {errors.email.message}
                                </span>
                                )}
                            </div>


                            <div className="contact-form-field">
                                <label htmlFor="subject">
                                SUBJECT
                                </label>

                                <input
                                id="subject"
                                type="text"
                                placeholder="What would you like to discuss?"
                                {...register("subject", {
                                    required: "Subject is required",
                                })}
                                />

                                {errors.subject && (
                                <span className="field-error">
                                    {errors.subject.message}
                                </span>
                                )}
                            </div>


                            <div className="contact-form-field">
                                <label htmlFor="message">
                                MESSAGE
                                </label>

                                <textarea
                                id="message"
                                rows="6"
                                placeholder="Tell me about your project..."
                                {...register("message", {
                                    required: "Message is required",
                                })}
                                />

                                {errors.message && (
                                <span className="field-error">
                                    {errors.message.message}
                                </span>
                                )}
                            </div>


                            <button
                                type="submit"
                                className="contact-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}

                                {!isSubmitting && <Send size={18} />}
                            </button>

                    </form>

                    </div>

                </div>

            </section>


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