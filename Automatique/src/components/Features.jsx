import React from 'react'
import BentoCard from './BentoCard'
import { TiLocationArrow } from 'react-icons/ti'
import { BentoTilt } from './BentoTilt'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

function Features() {
     useGSAP(() =>{
        
        gsap.utils.toArray(".slider .image").forEach((img,i) => {
            gsap.fromTo(img,{
                clipPath :"inset(0% 100% 0% 0%"
            },{
                clipPath: "inset(0% 0% 0% 0%)",
                duration : 1,
                ease : "power1.inOut",
                scrollTrigger:{
                    trigger:img,
                    start: 'clamp(top bottom)',
                    end: "clamp(top top)",
                    scrub: true
                }
            }
        )
        });
        
     })
    return (
        <section className='bg-black pb-52'>
            <div className="container slider px-3 mx-auto md:px-10">
                <div className="px-5 py-32">
                    <p className='text-lg font-circular-web text-blue-50'>Into the Metagame Layer</p>
                    <p className="max-w-md text-lg opacity-50 font-circular-web text-blue-50">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant
                        array of products converge into an interconnected overlay experience
                        on your world.
                    </p>
                </div>

                <BentoTilt className='image border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>radia<b>n</b>t</>
                        }
                        description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
                        isComingSoon
                    />
                </BentoTilt>
                <div className="grid image h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="row-span-1 rounded-md border-hsla bento-tilt_1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={
                                <>zigma</>
                            }
                            description="An anime and automatique-inspired NFT collection - the IP primed for expansion."
                            isComingSoon
                        />
                    </BentoTilt>
                    <BentoTilt className=' image row-span-1 rounded-md border-hsla bento-tilt_1 ms-32 md:col-span-1 md:ms-0'>
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={
                                <>n<b>e</b>xus</>
                            }
                            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                            isComingSoon
                        />
                    </BentoTilt>
                    <BentoTilt className='image rounded-md border-hsla bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={
                                <>
                                    az<b>u</b>l
                                </>
                            }
                            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                            isComingSoon
                        />
                    </BentoTilt>
                    <div className='bento-tilt_2'>
                        <BentoTilt className="image flex flex-col justify-between p-5 size-full bg-violet-300">
                            <h1 className="text-black bento-title special-font max-w-64">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </h1>

                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </BentoTilt>
                    </div>
                    <BentoTilt className=' image bento-tilt_2'>
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            autoPlay
                            muted
                            className='object-cover object-center size-full'
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    )
}

export default Features