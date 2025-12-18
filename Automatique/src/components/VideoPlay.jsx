
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const TOTAL_FRAMES = 75;

export default function VideoPlay() {

    const canvasRef = useRef(null);
    const [images, setImage] = useState([]);

    useEffect(() => {
      const frameImages = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `video/frames/frame_${String(i).padStart(4, "0")}.png`;
        frameImages.push(img);
      }
      setImage(frameImages);
    }, [])

    useEffect(() => {

        if (images.length == 0 ) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scale = window.devicePixelRatio || 1;
        canvas.width = 1928 * scale;
        canvas.height = 1000 * scale;
        context.scale(scale,scale);

        const frameState = {frame : 0};

        const render = () =>{
            const img = images[frameState.frame];
            if(img?.complete){
                context.clearRect(0,0,canvas.width, canvas.height);
                context.drawImage(
                    img,
                    0,
                    0,
                    canvas.width / scale,
                    canvas.height / scale
                )
            }
        }

        gsap.to(frameState,{
            frame : TOTAL_FRAMES - 1,
            snap: "frame",
            ease:"none",
            scrollTrigger:{
                start : "20% -90%",
                end :  "+=450%",
                scrub: true,
                // markers:true
            },
            onUpdate : render,
        });

        images[0].onload = render;
        if(images[0].complete) render();
   
    }, [images])
    
    


  return (
    <div className="relative">
        <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0"
        />
    </div>
  )
}
