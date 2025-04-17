import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Lenis smooth scrolling
 * @returns Configured Lenis instance
 */
export const initSmoothScroll = () => {
  // Create a new Lenis instance with optimized settings
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP's ticker for synchronized animations
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Update ScrollTrigger on Lenis scroll
  lenis.on("scroll", ScrollTrigger.update);

  // Make ScrollTrigger use Lenis's scroll position
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value as number);
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? "transform" : "fixed",
  });

  // Update ScrollTrigger on window resize
  const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
  });

  resizeObserver.observe(document.body);

  // Return Lenis instance for potential external control
  return lenis;
};

// Add this to your existing pageUtil.ts file

interface ParallaxElements {
  heroSection: HTMLElement | null;
  heroImage: HTMLElement | null;
  footerSection: HTMLElement | null;
  footerImage: HTMLElement | null;
  serviceItems: NodeListOf<Element> | null;
}

/**
 * Sets up parallax scrolling effects using Lenis
 * @param elements - All elements that will have parallax effects applied
 * @returns Cleanup function to remove event listeners and kill animations
 */
export const setupParallaxEffects = (elements: ParallaxElements) => {
  const { heroSection, heroImage, footerSection, footerImage, serviceItems } =
    elements;

  // Exit if required elements are missing
  if (!heroSection || !heroImage || !footerSection || !footerImage) {
    return () => {};
  }

  // Store all animations for later cleanup
  const animations: gsap.core.Tween[] = [];

  // Create hero entry animation
  const heroEntryTl = gsap.timeline();
  const heroTitle = heroSection.querySelector(".hero-title");
  const heroSubtitle = heroSection.querySelector(".hero-subtitle");

  if (heroTitle && heroSubtitle) {
    heroEntryTl
      .to(heroTitle, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        heroSubtitle,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );
  }

  // Create footer entry animation
  const footerEntryTl = gsap.timeline({
    scrollTrigger: {
      trigger: footerSection,
      start: "top bottom",
      end: "top center",
      scrub: false,
      once: true,
    },
  });

  const footerTitle = footerSection.querySelector(".footer-title");
  const footerCta = footerSection.querySelector(".footer-cta");

  if (footerTitle && footerCta) {
    footerEntryTl
      .to(footerTitle, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(
        footerCta,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );
  }

  // Set up parallax scrolling effect for hero image
  const heroParallax = ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "bottom top",
    scrub: true,
  });

  // Set up parallax scrolling effect for footer image
  const footerParallax = ScrollTrigger.create({
    trigger: footerSection,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  });

  // Function to update parallax positions
  // Function to update parallax positions
  const updateParallax = () => {
    // Get hero section progress
    if (heroParallax.progress !== undefined) {
      const heroProgress = heroParallax.progress;

      // Calculate blur based on scroll progress - starts at 0, increases to 15px
      const blurAmount = Math.min(15, heroProgress * 25);

      gsap.set(heroImage, {
        y: heroProgress * 150, // Move down as we scroll
        scale: 1.15 - heroProgress * 0.15, // Slightly reduce scale
        filter: `blur(${blurAmount}px)`, // Dynamic blur effect
      });
    }

    // Get footer section progress
    if (footerParallax.progress !== undefined) {
      const footerProgress = footerParallax.progress;
      gsap.set(footerImage, {
        y: -100 + footerProgress * 100, // Move up as we scroll
        scale: 1.15 - footerProgress * 0.15, // Slightly reduce scale
      });
    }
  };
  // Apply parallax to service images
  if (serviceItems && serviceItems.length > 0) {
    serviceItems.forEach((img, index) => {
      // Different parallax speed for each image
      const speed = 0.1 + index * 0.05;

      ScrollTrigger.create({
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(img, {
            y: self.progress * 50 * speed, // Subtle movement
            scale: 1 + (1 - self.progress) * 0.1, // Subtle scale change
          });
        },
      });
    });
  }

  // Add event listener for scroll to update parallax
  // Add event listener for refresh
  ScrollTrigger.addEventListener("refresh", updateParallax);

  // Use GSAP ticker for continuous updates
  gsap.ticker.add(updateParallax);

  // Initial call to set positions
  updateParallax();

  // Return cleanup function
  // Return cleanup function
  return () => {
    // Only remove the valid event type
    ScrollTrigger.removeEventListener("refresh", updateParallax);

    // For updating on scroll, we need to use the ticker instead
    gsap.ticker.remove(updateParallax);

    // Clean up animations
    animations.forEach((anim) => anim.kill());

    // Kill ScrollTrigger instances
    if (heroParallax) heroParallax.kill();
    if (footerParallax) footerParallax.kill();
  };
};

/**
 * Sets up sophisticated scroll animations for service items
 * @param servicesSectionRef - Reference to the services section element
 * @returns Cleanup function to kill animations and remove listeners
 */
export const setupServiceAnimations = (
  servicesSectionRef: React.RefObject<HTMLElement>
) => {
  // Initialize Lenis smooth scroll
  const lenis = initSmoothScroll();

  // Exit if section reference is not available
  if (!servicesSectionRef.current) return () => {};

  // Get all service containers
  const serviceItems = gsap.utils.toArray<HTMLDivElement>(
    servicesSectionRef.current.querySelectorAll(".service-item-container")
  );

  // Get all text elements that need reveal animations
  const textElements = gsap.utils.toArray<HTMLElement>(
    servicesSectionRef.current.querySelectorAll(".text-reveal")
  );

  // Store all animations for later cleanup
  const animations: ScrollTrigger[] = [];
  const timelines: gsap.core.Timeline[] = [];

  // Set initial states for all text elements
  gsap.set(textElements, {
    y: 50,
    autoAlpha: 0,
  });

  // Handle main section heading and subheading animation
  const headerElements = [
    servicesSectionRef.current.querySelector("h1"),
    servicesSectionRef.current.querySelector("p.text-reveal"),
  ];

  const headerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: servicesSectionRef.current,
      start: "top bottom-=10%",
      end: "top center",
      scrub: 0.6,
    },
  });

  // Stagger the header animations
  headerTimeline.to(headerElements, {
    y: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2,
  });

  timelines.push(headerTimeline);

  // Create staggered animations for each service item
  serviceItems.forEach((item) => {
    // Find text elements within this service item
    const title = item.querySelector(".service-title");
    const desc = item.querySelector(".service-desc");
    const textGroup = [title, desc];

    // Image element
    const imageWrapper = item.querySelector<HTMLDivElement>(
      ".service-image-wrapper"
    );
    const image = imageWrapper?.querySelector("img");

    // Create timeline for this service item
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=15%",
        end: "center center+=20%",
        scrub: 0.8,
      },
    });

    // Set initial image state
    if (image) {
      gsap.set(image, {
        scale: 1.1,
        autoAlpha: 0.8,
      });

      // Image reveal animation
      tl.to(
        image,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );
    }

    // Text reveal animations with stagger
    tl.to(
      textGroup,
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      },
      0.2
    );

    // Border animation
    tl.from(
      item,
      {
        borderTopColor: "rgba(255,255,255,0)",
        duration: 0.8,
      },
      0
    );

    timelines.push(tl);
  });

  // Return cleanup function
  return () => {
    animations.forEach((st) => st.kill());
    timelines.forEach((tl) => tl.kill());

    if (lenis) {
      lenis.destroy();
    }

    ScrollTrigger.getAll().forEach((st) => st.kill());
    ScrollTrigger.clearMatchMedia();
    gsap.killTweensOf("*");
  };
};
