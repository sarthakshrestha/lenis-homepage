"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  initMenuAnimations,
  animateMenuToggle,
  playIntroAnimation,
  playWelcomeAnimation, // New import for welcome animation
} from "@/utils/menuUtil";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const welcomeOverlayRef = useRef<HTMLDivElement>(null); // New ref for welcome overlay
  const hasAnimatedRef = useRef(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Init animations and play welcome/intro sequence on component mount
  useEffect(() => {
    const cleanup = initMenuAnimations({
      menuButton: menuButtonRef.current,
      menuDialog: menuDialogRef.current,
      menuItems: menuItemsRef.current,
    });

    // Play welcome animation followed by intro animation only once
    if (!hasAnimatedRef.current) {
      // Short delay to ensure elements are fully mounted
      const timer = setTimeout(() => {
        playWelcomeAnimation({
          welcomeOverlay: welcomeOverlayRef.current,
          menuButton: menuButtonRef.current,
          menuDialog: menuDialogRef.current,
          menuItems: menuItemsRef.current,
        });
        hasAnimatedRef.current = true;
      }, 800);

      return () => {
        clearTimeout(timer);
        cleanup();
      };
    }

    return cleanup;
  }, []);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    animateMenuToggle({
      isOpen: newState,
      menuButton: menuButtonRef.current,
      menuDialog: menuDialogRef.current,
      menuItems: menuItemsRef.current,
    });
  };

  return (
    <>
      {/* Welcome Overlay */}
      <div
        ref={welcomeOverlayRef}
        className="welcome-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-3xl"
      >
        <h1
          className="welcome-text text-white font-bold text-center"
          style={{ fontSize: "14vw" }}
        >
          MAXSTUDIOS
        </h1>
      </div>

      {/* Pill-shaped floating menu button */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="menu-button flex items-center cursor-pointer  backdrop-blur-lg rounded-full px-4 py-2 md:px-5 md:py-3 hover:bg-white/15 transition-colors duration-300"
          aria-expanded={isMenuOpen}
        >
          <span className="menu-label text-sm md:text-base font-medium text-white uppercase tracking-wider">
            Menu
          </span>
          <div className="menu-icon ml-2  w-5 h-5 md:w-6 md:h-6 relative flex items-center justify-center">
            <span className="menu-line absolute h-0.5 w-full bg-white rounded-full transition-all duration-300"></span>
            <span className="menu-line absolute h-0.5 w-full bg-white rounded-full transition-all duration-300 rotate-90"></span>
          </div>
        </button>

        {/* Dropdown dialog menu */}
        <div
          ref={menuDialogRef}
          className="menu-dialog absolute top-full mt-4 w-64 sm:w-80 md:w-96 lg:w-[30rem] bg-black/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden origin-top scale-y-0 opacity-0 pointer-events-none"
        >
          <div
            ref={menuItemsRef}
            className="menu-content w-full px-6 py-8 md:px-8 md:py-10 lg:py-12"
          >
            <nav className="menu-nav flex flex-col items-center space-y-4 md:space-y-4 lg:space-y-4">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="menu-item overflow-hidden w-full"
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="menu-link block text-center text-xl md:text-2xl lg:text-3xl font-medium text-white hover:text-gray-300 transition-colors relative py-2 md:py-3"
                    data-index={index}
                  >
                    {item.name}
                    <span className="menu-link-underline absolute left-0 bottom-0 w-0 h-0.5 md:h-[0.15rem] bg-white transform origin-left transition-all duration-300"></span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
