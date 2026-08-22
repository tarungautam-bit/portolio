import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { markFirstVisit } from "../state/entryThunk";

import { useEffect ,useState} from "react";
import { gsap } from "gsap";


const VillageGate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [muted, setMuted] = useState(false);


    useEffect(() => {

        gsap.to(".gate-decoration--top-right", {
            x: 6,
            y: 3,
            rotation: 5,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(".gate-decoration--top-left", {
            x: -6,
            y: 3,
            rotation: 5,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(".gate-decoration--bottom-right", {
            x: 5,
            y: -4,
            rotation: 5,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(".gate-decoration--bottom-left", {
            x: -5,
            y: -4,
            rotation: 5,
            duration: 4.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });



        const artworkAnimation = gsap.timeline({
            repeat: -1,
            yoyo: true
        });

        artworkAnimation.to(".image-section", {

            x: 12,
            y: -6,

            rotationY: 7,
            rotationX: -3,

            scale: 1.02,

            duration: 3,

            ease: "sine.inOut"

        });


        artworkAnimation.to(".image-section", {

            x: -12,
            y: 6,

            rotationY: -7,
            rotationX: 3,

            scale: 0.99,

            duration: 3.5,

            ease: "sine.inOut"

        });


        const createPetal = () => {

            const petal = document.createElement("div");

            petal.className = "falling-petal";

            const size = gsap.utils.random(5, 11);

            petal.style.width = `${size}px`;
            petal.style.height = `${size * 0.65}px`;
            petal.style.left = `${gsap.utils.random(0, 100)}%`;

            document
                .querySelector(".gate-main-div")
                .appendChild(petal);

            const startX = gsap.utils.random(-20, 20);
            const driftX = gsap.utils.random(-100, 100);

            gsap.set(petal, {
                x: startX,
                y: -30,
                rotation: gsap.utils.random(0, 360),
                opacity: 0
            });

            const timeline = gsap.timeline({
                onComplete: () => {
                    petal.remove();
                }
            });

            timeline
                .to(petal, {
                    opacity: gsap.utils.random(0.4, 0.8),
                    duration: 0.8
                })
                .to(petal, {
                    x: driftX,
                    y: window.innerHeight + 100,
                    rotation: gsap.utils.random(360, 900),
                    duration: gsap.utils.random(8, 13),
                    ease: "none"
                }, 0);
        };

        const petalInterval = setInterval(
            createPetal,
            300
        );

        return () => {

            artworkAnimation.kill();

            gsap.killTweensOf([
                ".gate-decoration--top-right",
                ".gate-decoration--top-left",
                ".gate-decoration--bottom-right",
                ".gate-decoration--bottom-left",
                ".image-section img"
            ]);

             clearInterval(petalInterval);
             document
                .querySelectorAll(".falling-petal")
                .forEach((petal) => petal.remove());
        };

    }, []);



    const handleEnter = async () => {

        try {

            await dispatch(markFirstVisit()).unwrap();

            const dragon = document.createElement("div");

            dragon.className = "dragon-transition";

            dragon.innerHTML = `
                <div class="dragon-art">

                    <img
                        src="/images/dragon.png"
                        alt=""
                        class="dragon-transition__image"
                    />

                    <span class="dragon-eye dragon-eye--left"></span>
                    <span class="dragon-eye dragon-eye--right"></span>

                </div>
            `;

            document.body.appendChild(dragon);

            const dragonArt =
                dragon.querySelector(".dragon-art");

            const dragonImage =
                dragon.querySelector(".dragon-transition__image");

            const eyes =
                dragon.querySelectorAll(".dragon-eye");


            gsap.set(dragon, {
                opacity: 0
            });

            gsap.set(dragonArt, {
                opacity: 0,
                scale: 0.92,
                y: 20
            });

            gsap.set(eyes, {
                opacity: 0,
                scale: 0.5
            });


            const transition = gsap.timeline();


            transition

                // 1. Dissolve current page
                .to(".gate-main-div", {
                    opacity: 0,
                    scale: 0.96,
                    duration: 0.8,
                    ease: "power2.inOut"
                })

                // 2. Show dragon background
                .to(dragon, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // 3. Dragon appears
                .to(dragonArt, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                })

                // 4. Eyes appear AFTER dragon
                .to(eyes, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: "power2.out",
                    stagger: 0.08
                })

                // 5. Small pause
                .to({}, {
                    duration: 0.4
                })

                // 6. Dragon comes alive
                .to(dragonArt, {
                    y: -7,
                    scale: 1.015,
                    rotation: 0.6,
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1
                })

                // 7. Eye glow
                .to(eyes, {
                    opacity: 1,
                    scale: 2,
                    duration: 1.2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1
                }, "<")

                // 8. Dragon disappears
                .to(dragonArt, {
                    opacity: 0,
                    scale: 1.04,
                    y: -15,
                    duration: 0.7,
                    ease: "power2.inOut"
                })

                // 9. Go home
                .to(dragon, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {

                        dragon.remove();

                        navigate("/");

                    }
                });

        } catch (error) {

            console.error(
                "Failed to mark first visit:",
                error
            );

        }
    };


    return (
        <div className="gate-main-div">

            <img
                className="gate-decoration gate-decoration--top-right"
                src="/images/vine1.png"
                alt=""
            />

            <img
                className="gate-decoration gate-decoration--top-left"
                src="/images/vine2.png"
                alt=""
            />

            <img
                className="gate-decoration gate-decoration--bottom-right"
                src="/images/blossom2.png"
                alt=""
            />

            <img
                className="gate-decoration gate-decoration--bottom-left"
                src="/images/blossom1.png"
                alt=""
            />


            <header className="header-div">

                <p className="header-eyebrow">
                    Welcome to my portfolio
                </p>

                <h1>
                    Tarun Gautam
                </h1>

                <p className="header-description">
                    A digital portfolio shaped by the timeless aesthetics of
                    <span> Ukiyo-e (浮世絵)</span> — traditional Japanese woodblock art.
                </p>

            </header>


            <section className="image-section">

                <img
                    src="/images/village-gate.png"
                    alt="Gate Image"
                />

            </section>


            <div className="gate-action">

                <button
                    // type="button"
                    onClick={handleEnter}
                >
                    <span>
                        ENTER PORTFOLIO
                    </span>

                    <span className="gate-action__arrow">
                        →
                    </span>
                </button>

            </div>

        </div>
    );
};


export default VillageGate;