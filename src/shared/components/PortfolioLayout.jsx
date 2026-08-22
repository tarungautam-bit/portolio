import { Outlet, useLocation } from "react-router";
import { useLayoutEffect } from "react";

import Navbar from "./Navbar";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PortfolioLayout = () => {
  const location = useLocation();

  /*
  =====================================================
  ROUTE CHANGE
  =====================================================
  */

  useLayoutEffect(() => {
    /*
    Reset browser scroll
    */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    /*
    Reset possible internal scroll container
    */
    const content = document.querySelector(
      ".portfolio-content"
    );

    if (content) {
      content.scrollTop = 0;
    }

    /*
    Wait until React has committed the new route
    and the browser has calculated layout.
    */

    const refresh = () => {
      ScrollTrigger.refresh(true);
    };

    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        refresh();

        /*
        One additional refresh after images/layout
        have had a chance to settle.
        */

        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      });

      return frame2;
    });

    return () => {
      cancelAnimationFrame(frame1);
    };

  }, [location.pathname]);


  /*
  =====================================================
  NAVBAR
  =====================================================
  */

  useLayoutEffect(() => {
    const navbar =
      document.querySelector(".portfolio-navbar");

    if (!navbar) return;

    gsap.set(navbar, {
      opacity: 0,
    });

    const animation = gsap.to(navbar, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    return () => {
      animation.kill();
    };

  }, []);


  return (
    <>
      <Navbar />

      <main className="portfolio-content">
        <Outlet />
      </main>
    </>
  );
};

export default PortfolioLayout;