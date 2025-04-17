"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations when component mounts
    if (!footerRef.current) return;

    // Get footer elements for animation
    const footer = footerRef.current;
    const title = titleRef.current;
    const links = linksRef.current;

    // Set initial states for the title - blurry and semi-transparent
    gsap.set(title, {
      opacity: 0.3,
      filter: "blur(10px)",
    });

    // Set initial states for links
    // Create the footer reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom", // Start when top of footer reaches bottom of viewport
        end: "top center", // End when top of footer reaches center of viewport
        scrub: true, // Smooth scrubbing effect tied to scroll position
      },
    });

    // Animated title reveal - clearing blur
    tl.to(title, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out",
    });

    // Staggered links reveal

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={footerRef}
      className="w-full bg-[#efefef] items-center justify-center h-full overflow-auto"
    >
      {/* add relative positioning to the main conent */}

      {/* Sticky footer. The only important thing here is the z-index, the sticky position and the bottom value */}
      <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-zinc-950 flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
          <div
            ref={linksRef}
            className="flex flex-row space-x-12 sm:pace-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl"
          >
            <ul>
              <li className="cursor-pointer transition duration-300 hover:brightness-125">
                Home
              </li>
              <li className="cursor-pointer transition duration-300 hover:brightness-125">
                About
              </li>
            </ul>
            <ul>
              <li className="cursor-pointer transition duration-300 hover:brightness-125">
                Github
              </li>
              <li className="cursor-pointer transition duration-300 hover:brightness-125">
                Instagram
              </li>
            </ul>
          </div>
          <h2
            ref={titleRef}
            className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#ff5941] font-calendas"
          >
            MAXSTUDIOS
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
