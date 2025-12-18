import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomEffect() {
  const sectionFuturRef = useRef(null);
  const circleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom global du cercle
      gsap.to(circleRef.current, {
        scale: 2.5,
        opacity : 0,
        ease: "none",
        duration : 1,
        scrollTrigger: {
          trigger: sectionFuturRef.current,
          start: "600% center",
          end: "1000% top",
          scrub: true,
        },
      });

      // Zoom de l’image à l’intérieur du cercle
      gsap.to(imageRef.current, {
        scale: 2,
        opacity : 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionFuturRef.current,
          start: "600% center",
          end: "1000% top",
          scrub: true,
        },
      });

      // Mouvement du texte
      gsap.to(
        textRef.current,
        {
            y: "-50vh",
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionFuturRef.current,
            start: "800% top",
            end: "1100% 20%",
            scrub: true,
            // markers:true
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionFuturRef}
      className="relative flex items-center justify-center h-screen w-full bg-black overflow-hidden"
    >
      {/* Cercle principal */}
      <div
        ref={circleRef}
        className="relative w-[550px] h-[550px] rounded-full overflow-hidden flex items-center justify-center"
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="aerial"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: "center center" }}
        />

        <div className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] bg-black rounded-full z-10" />
      </div>

      {/* Texte */}
      <div
        ref={textRef}
        className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{ width: "100%" }}
      >
        <h1 className="font-serif leading-none" style={{ lineHeight: 0.9 }}>
          <span
          className="font-general"
            style={{
              display: "inline-block",
              fontSize: "15rem",
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.8)",
              fontWeight: 300,
              marginRight: "0.6rem",
            }}
          >
            Outlook
          </span>
          <span
          className=" text-blue-50"
            style={{
              display: "inline-block",
              fontSize: "15rem",
              fontFamily: "circular-web, sans-serif",
              fontWeight: 600,
            }}
          >
            
            A<b>b</b>ove
          </span>
        </h1>

        <p
          className="text-sm text-white/70 w-[20%] text-center opacity-50 mt-4"
          style={{
            display: "inline-block",
            fontSize: "1.2rem",
            color: "white",
            fontWeight: 600,
          }}
        >
          A showcase of the world’s best aerial photography
        </p>
      </div>
    </section>
  );
}
