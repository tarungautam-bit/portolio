import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ButterflyEffect.css";

const ButterflyEffect = () => {
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const butterflies = [
      "/images/butterfly-1.webp",
      "/images/butterfly-2.webp",
      "/images/butterfly-3.webp",
      "/images/butterfly-4.webp",
      "/images/butterfly-5.webp",
      "/images/butterfly-6.webp",
    

  
    ];

    const random = (min, max) =>
      gsap.utils.random(min, max);

    const createButterfly = () => {
      const butterfly =
        document.createElement("img");

      butterfly.className =
        "ukiyo-butterfly";

      butterfly.src =
        butterflies[
          Math.floor(
            Math.random() *
              butterflies.length
          )
        ];

      butterfly.alt = "";

      butterfly.draggable = false;

      container.appendChild(
        butterfly
      );

      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      const size = random(
        38,
        72
      );

      const startSide =
        Math.floor(
          Math.random() * 4
        );

      let startX;
      let startY;

      if (startSide === 0) {
        startX = -100;
        startY = random(
          10,
          85
        );
      } else if (startSide === 1) {
        startX = width + 100;
        startY = random(
          10,
          85
        );
      } else if (startSide === 2) {
        startX = random(
          5,
          95
        ) * (width / 100);
        startY = -100;
      } else {
        startX = random(
          5,
          95
        ) * (width / 100);
        startY = height + 100;
      }

      const endX =
        random(5, 95) *
        (width / 100);

      const endY =
        random(10, 88) *
        (height / 100);

      const rotation =
        random(-18, 18);

      const drift =
        random(
          -140,
          140
        );

      gsap.set(butterfly, {
        width: size,
        left: startX,
        top: startY,
        x: 0,
        y: 0,
        rotation,
        opacity: 0,
        scale: random(
          0.7,
          0.9
        ),
        transformOrigin:
          "50% 50%",
        filter:
          "drop-shadow(0 5px 8px rgba(0,0,0,.16))",
      });

      const timeline =
        gsap.timeline({
          onComplete: () => {
            butterfly.remove();
          },
        });

      gsap.set(butterfly, {
        rotationY: 90,
      });

      timeline
        .to(butterfly, {
          opacity: random(
            0.72,
            0.9
          ),
          rotationY: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        })
        .to(
          butterfly,
          {
            x:
              endX -
              startX,
            y:
              endY -
              startY,
            rotation:
              rotation +
              random(
                -12,
                12
              ),
            duration: random(
              6,
              10
            ),
            ease: "sine.inOut",
          }
        );

      const wingFlutter =
        gsap.timeline({
          repeat: -1,
          yoyo: true,
        });

      wingFlutter.to(
        butterfly,
        {
          rotationY: 55,
          scaleX: 0.82,
          duration: 0.18,
          ease: "sine.inOut",
        }
      );

      wingFlutter.to(
        butterfly,
        {
          rotationY: 0,
          scaleX: 1,
          duration: 0.22,
          ease: "sine.inOut",
        }
      );

      timeline.eventCallback(
        "onComplete",
        () => {
          wingFlutter.kill();
          butterfly.remove();
        }
      );

      gsap.delayedCall(
        random(4, 7),
        () => {
          gsap.to(
            butterfly,
            {
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            }
          );
        }
      );
    };

    const scheduleButterfly =
      () => {
        timerRef.current =
          gsap.delayedCall(
            random(2.5, 5),
            () => {
              createButterfly();

              scheduleButterfly();
            }
          );
      };

    timerRef.current =
      gsap.delayedCall(
        2,
        () => {
          createButterfly();
          scheduleButterfly();
        }
      );

    return () => {
      if (timerRef.current) {
        timerRef.current.kill();
      }

      gsap.killTweensOf(
        container.querySelectorAll(
          ".ukiyo-butterfly"
        )
      );

      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ukiyo-butterfly-effect"
      aria-hidden="true"
    />
  );
};

export default ButterflyEffect;