

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BentoCard from './BentoCard';
import AnimatedTitle from './AnimatedTitle.';
import { BentoTilt } from './BentoTilt';
import VideoPlay from "./VideoPlay";
import ZoomEffect from "./ZoomEffect";

gsap.registerPlugin(ScrollTrigger);

function Futur() {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const bgVideoRef = useRef(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=450%", 
            pin: true,
            pinSpacing: true,
            // markers:true
        });
        gsap.fromTo(
            bgVideoRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "top 0%",
                    scrub: true,
                },
            }
        );

        // SECTION TWO SLIDE (reste identique)
        gsap.fromTo(
            "#section-two",
            { y: "100%" },
            {
                y: "0%",
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center 45%",
                    end: "500%",
                    pin: true,
                    scrub: true,
                    toggleActions: "play none none reverse",
                    //   markers: true,
                },
            }
        );

        
    });


    return (
        <section ref={containerRef} className=" font-general bg-black relative h-screen w-full overflow-hidden">

            <VideoPlay />

            {/* SECTION ONE */}
            <div id="section-one" className="relative z-10 h-screen w-screen text-white text-4xl">
                <AnimatedTitle
                    title="Disc<b>o</b>ver the world's <br/> l<b>a</b>rgest shared adventures"
                    containerClass="mt-8 !text-white text-center"
                />
            </div>

            {/* SECTION TWO (unchanged) */}
            <div
                id="section-two"
                className="absolute inset-0 h-screen z-[7000] flex bg-black items-center justify-center text-black text-4xl"
            >
                <ZoomEffect />


            </div>
        </section>
    );
}

export default Futur;