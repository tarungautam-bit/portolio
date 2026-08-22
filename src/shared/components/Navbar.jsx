import { NavLink } from "react-router";
import { useEffect, useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navbarRef = useRef(null);
  const navbarInnerRef = useRef(null);
  const logoRef = useRef(null);

  /*
   * ==========================================
   * NAVBAR SCROLL / SIZE ANIMATION
   * ==========================================
   */
  useLayoutEffect(() => {
    const navbar = navbarRef.current;
    const navbarInner = navbarInnerRef.current;
    const logo = logoRef.current;

    if (!navbar || !navbarInner || !logo) return;

    const getFloatingWidth = () => {
      if (window.innerWidth <= 600) {
        return "calc(100% - 20px)";
      }

      if (window.innerWidth <= 900) {
        return "calc(100% - 40px)";
      }

      return "min(1100px, 90vw)";
    };

    const getFloatingPadding = () => {
      if (window.innerWidth <= 600) {
        return "15px 10px 0";
      }

      if (window.innerWidth <= 900) {
        return "20px";
      }

      return "25px 5vw 0";
    };

    const getFloatingRadius = () => {
      return window.innerWidth <= 600 ? "12px" : "18px";
    };

    /*
     * ==========================================
     * FIXED NAVBAR
     * ==========================================
     */
    const setFixed = () => {
      navbar.dataset.fixed = "true";

      gsap.to(navbar, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(navbarInner, {
        width: "100%",
        borderRadius: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      /*
       * Fixed navbar:
       * logo becomes normal size
       *
       * IMPORTANT:
       * No overwrite:true here.
       * The glow animation controls FILTER.
       * This animation only controls SCALE.
       */
      gsap.to(logo, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    /*
     * ==========================================
     * FLOATING NAVBAR
     * ==========================================
     */
    const setFloating = () => {
      navbar.dataset.fixed = "false";

      gsap.to(navbar, {
        position: "relative",
        top: "auto",
        left: "auto",
        width: "100%",
        padding: getFloatingPadding(),
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(navbarInner, {
        width: getFloatingWidth(),
        borderRadius: getFloatingRadius(),
        duration: 0.4,
        ease: "power3.out",
      });

      /*
       * Floating navbar:
       * logo becomes bigger
       */
      gsap.to(logo, {
        scale: 1.5,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    /*
     * ==========================================
     * INITIAL STATE
     * ==========================================
     */
    gsap.set(navbarInner, {
      width: getFloatingWidth(),
      borderRadius: getFloatingRadius(),
    });

    gsap.set(logo, {
      scale: 1.5,
    });

    navbar.dataset.fixed = "false";

    /*
     * ==========================================
     * SCROLL TRIGGER
     * ==========================================
     */
    const trigger = ScrollTrigger.create({
      trigger: navbar,
      start: "top top",

      onEnter: setFixed,
      onLeaveBack: setFloating,
    });

    /*
     * ==========================================
     * RESIZE
     * ==========================================
     */
    const handleResize = () => {
      if (navbar.dataset.fixed !== "true") {
        gsap.set(navbarInner, {
          width: getFloatingWidth(),
          borderRadius: getFloatingRadius(),
        });
      }

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    /*
     * ==========================================
     * CLEANUP
     * ==========================================
     */
    return () => {
      trigger.kill();

      window.removeEventListener("resize", handleResize);

      gsap.killTweensOf(navbar);
      gsap.killTweensOf(navbarInner);
      gsap.killTweensOf(logo);
    };
  }, []);

  /*
   * ==========================================
   * LOGO GLOW ANIMATION
   * ==========================================
   *
   * This animation ONLY changes FILTER.
   *
   * It does NOT change SCALE.
   *
   * Therefore the scroll animation and glow
   * animation can run at the same time.
   */
  useEffect(() => {
    const logo = logoRef.current;

    if (!logo) return;

    const glowTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    glowTimeline
      .to(logo, {
        filter: "brightness(1.3) contrast(1.08) saturate(1.1)",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(logo, {
        filter: "brightness(1) contrast(1) saturate(1)",
        duration: 0.7,
        ease: "power2.inOut",
      });

    return () => {
      glowTimeline.kill();
    };
  }, []);

  return (
    <header ref={navbarRef} className="navbar">
      <div ref={navbarInnerRef} className="navbar-inner">

        {/* =================================
            LOGO
        ================================= */}
        <NavLink to="/" className="navbar-logo">
          <img
            ref={logoRef}
            className="logo"
            src="/images/logo.png"
            alt="Website Logo"
          />
        </NavLink>

        {/* =================================
            NAVIGATION
        ================================= */}
        <nav className="navbar-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            Contact
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;