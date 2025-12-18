// import React, { useEffect, useRef, useState } from 'react';
// import Button from './Button';
// import { TiLocationArrow } from 'react-icons/ti';
// import { useWindowScroll } from 'react-use';
// import gsap from 'gsap';
// import { Link } from 'react-router-dom';

// const navItems = [
//   { label: 'Nexus', href: '#nexus' },
//   { label: 'Vault', href: '#vault' },
//   { label: 'Education', to: 'education' },
//   { label: 'Bot IA', to: '/bot' },
//   { label: 'Se connectez', to: '/login' },
// ];

// function Navbar() {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isIndicatorActive, setIsIndicatorActive] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isNavVisible, setIsNavVisible] = useState(true);

//   const navContainerRef = useRef(null);
//   const audioElementRef = useRef(null);

//   const { y: currentScrollY } = useWindowScroll();

//   // =========================
//   // SCROLL BEHAVIOR
//   // =========================
//   useEffect(() => {
//     if (currentScrollY === 0) {
//       setIsNavVisible(true);
//       navContainerRef.current.classList.remove('floating-nav');
//     } else if (currentScrollY > lastScrollY) {
//       setIsNavVisible(false);
//       navContainerRef.current.classList.add('floating-nav');
//     } else {
//       setIsNavVisible(true);
//       navContainerRef.current.classList.add('floating-nav');
//     }

//     setLastScrollY(currentScrollY);
//   }, [currentScrollY, lastScrollY]);

//   // =========================
//   // GSAP ANIMATION
//   // =========================
//   useEffect(() => {
//     gsap.to(navContainerRef.current, {
//       y: isNavVisible ? 0 : -100,
//       opacity: isNavVisible ? 1 : 0,
//       duration: 0.2,
//     });
//   }, [isNavVisible]);

//   // =========================
//   // AUDIO INDICATOR
//   // =========================
//   const toggleAudioIndicator = () => {
//     setIsAudioPlaying((prev) => !prev);
//     setIsIndicatorActive((prev) => !prev);
//   };

//   useEffect(() => {
//     if (isAudioPlaying) {
//       audioElementRef.current.play();
//     } else {
//       audioElementRef.current.pause();
//     }
//   }, [isAudioPlaying]);

//   return (
//     <div
//       ref={navContainerRef}
//       className="fixed inset-x-0 z-50 h-16 transition-all duration-700 border-none top-4 sm:inset-x-6"
//     >
//       <header className="absolute w-full -translate-y-1/2 top-1/2">
//         <nav className="flex items-center justify-between p-4 size-full">
          
//           {/* LEFT */}
//           <div className="flex items-center gap-7">
//             <img
//               src="/img/logo.png"
//               alt="logo"
//               className="w-10"
//             />

// <Link to="/bot">
//   <Button
//     id="product-button"
//     title="Bot IA"
//     rightIcon={<TiLocationArrow />}
//     containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
//   />
// </Link>

//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center h-full">
//             <div className="hidden md:block">
//               {navItems.map((item) =>
//                 item.to ? (
//                   <Link
//                     key={item.label}
//                     to={item.to}
//                     className="nav-hover-btn"
//                   >
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <a
//                     key={item.label}
//                     href={item.href}
//                     className="nav-hover-btn"
//                   >
//                     {item.label}
//                   </a>
//                 )
//               )}
//             </div>

//             {/* AUDIO */}
//             <button
//               className="ml-10 flex items-center space-x-0.5"
//               onClick={toggleAudioIndicator}
//             >
//               <audio
//                 ref={audioElementRef}
//                 className="hidden"
//                 src="/audio/loop.mp3"
//                 loop
//               />
//               {[1, 2, 3, 4].map((bar) => (
//                 <div
//                   key={bar}
//                   className={`indicator-line ${
//                     isIndicatorActive ? 'active' : ''
//                   }`}
//                   style={{ animationDelay: `${bar * 0.1}s` }}
//                 />
//               ))}
//             </button>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Navbar;
