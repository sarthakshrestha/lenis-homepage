import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface MenuElements {
  menuButton: HTMLButtonElement | null;
  menuDialog: HTMLDivElement | null;
  menuItems: HTMLDivElement | null;
}

interface WelcomeElements extends MenuElements {
  welcomeOverlay: HTMLDivElement | null;
}

interface MenuToggleOptions extends MenuElements {
  isOpen: boolean;
}

/**
 * Initialize menu animations and set up initial states
 */
export const initMenuAnimations = ({
  menuButton,
  menuDialog,
  menuItems,
}: MenuElements) => {
  // Exit if any required element is missing
  if (!menuButton || !menuDialog || !menuItems) return () => {};

  // Set initial states
  gsap.set(menuButton, {
    opacity: 0, // Hide menu button initially
    y: -20,
  });

  gsap.set(menuDialog, {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top center",
    pointerEvents: "none",
  });

  // Get menu components
  const menuLinks = menuItems.querySelectorAll(".menu-link");
  const menuLines = menuButton.querySelectorAll(".menu-line");

  // Set initial state for menu links and underlines
  gsap.set(menuLinks, {
    y: 20,
    opacity: 0,
  });

  gsap.set(".menu-link-underline", {
    width: 0,
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as Element;
    if (
      menuDialog.style.opacity !== "0" &&
      !menuButton.contains(target) &&
      !menuDialog.contains(target)
    ) {
      const closeEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      menuButton.dispatchEvent(closeEvent);
    }
  });

  // Return cleanup function
  return () => {
    // Kill any active animations
    gsap.killTweensOf(menuDialog);
    gsap.killTweensOf(menuLinks);
    gsap.killTweensOf(menuLines);
    gsap.killTweensOf(".menu-link-underline");
  };
};

/**
 * Play welcome animation with large FLM Studios text
 */
export const playWelcomeAnimation = ({
  welcomeOverlay,
  menuButton,
  menuDialog,
  menuItems,
}: WelcomeElements) => {
  // Exit if any required element is missing
  if (!welcomeOverlay || !menuButton) return;

  // Get welcome text element
  const welcomeText = welcomeOverlay.querySelector(".welcome-text");

  // Create a timeline for the welcome animation
  const welcomeTl = gsap.timeline({
    onComplete: () => {
      // After welcome animation completes, show the menu button
      gsap.to(menuButton, {
        opacity: 1,
        y: 0,
        duration: 0.13,
      });
    },
  });

  // Set initial state for welcome overlay
  gsap.set(welcomeText, {
    opacity: 0,
  });

  // Animate welcome text in
  welcomeTl.to(welcomeText, {
    opacity: 1,
    y: 0,
  });

  // Hold for a moment
  welcomeTl.to({}, { duration: 0.3 });

  // Fade out welcome overlay
  welcomeTl.to(welcomeOverlay, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      // Remove overlay from DOM after animation
      gsap.set(welcomeOverlay, { display: "none" });
    },
  });

  return welcomeTl;
};

/**
 * Play an intro animation sequence when the site loads
 */
export const playIntroAnimation = ({
  menuButton,
  menuDialog,
  menuItems,
}: MenuElements) => {
  // Exit if any required element is missing
  if (!menuButton || !menuDialog || !menuItems) return;

  // Get menu components
  const menuLinks = menuItems.querySelectorAll(".menu-link");
  const menuLines = menuButton.querySelectorAll(".menu-line");
  const menuLabel = menuButton.querySelector(".menu-label");

  // Create a timeline for the intro animation
  const introTl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Stage 1: Button entrance animation
  introTl.fromTo(
    menuButton,
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }
  );

  // Stage 2: Open the dialog
  introTl.to(
    menuDialog,
    {
      opacity: 1,
      scaleY: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      pointerEvents: "auto",
    },
    "-=0.3"
  );

  // Stage 3: Transform plus into X
  introTl.to(
    menuLines[0],
    {
      rotate: 45,
      duration: 0.4,
    },
    "<"
  );

  introTl.to(
    menuLines[1],
    {
      rotate: -45,
      duration: 0.4,
    },
    "<"
  );

  // Stage 4: Show menu items with stagger
  introTl.to(
    menuLinks,
    {
      y: 0,
      opacity: 1,
      stagger: 0.06,
      duration: 0.4,
    },
    "-=0.2"
  );

  // Add a brief pause to showcase the menu
  introTl.to({}, { duration: 0.6 });

  // Stage 5: Close everything back up
  introTl.to(menuLinks, {
    y: 20,
    opacity: 0,
    stagger: 0.04,
    duration: 0.3,
    ease: "power2.in",
  });

  introTl.to(
    menuDialog,
    {
      opacity: 0,
      scaleY: 0,
      duration: 0.4,
      ease: "power2.in",
      pointerEvents: "none",
    },
    "-=0.2"
  );

  // Return to plus icon
  introTl.to(
    menuLines[0],
    {
      rotate: 0,
      duration: 0.3,
    },
    "<"
  );

  introTl.to(
    menuLines[1],
    {
      rotate: 90,
      duration: 0.3,
    },
    "<"
  );

  return introTl;
};

/**
 * Animate menu opening and closing
 */
export const animateMenuToggle = ({
  isOpen,
  menuButton,
  menuDialog,
  menuItems,
}: MenuToggleOptions) => {
  // Exit if any required element is missing
  if (!menuButton || !menuDialog || !menuItems) return;

  // Get menu elements
  const menuLinks = menuItems.querySelectorAll(".menu-link");
  const menuLines = menuButton.querySelectorAll(".menu-line");
  const menuLabel = menuButton.querySelector(".menu-label");

  // Create animation timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: "power3.out",
    },
  });

  if (isOpen) {
    // When opening the menu

    // Enable pointer events first
    gsap.set(menuDialog, { pointerEvents: "auto" });

    // Animate dropdown opening
    tl.to(menuDialog, {
      opacity: 1,
      scaleY: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
    });

    // Transform plus into X
    tl.to(
      menuLines[0],
      {
        rotate: 45,
        duration: 0.3,
      },
      "-=0.3"
    );

    tl.to(
      menuLines[1],
      {
        rotate: -45,
        duration: 0.3,
      },
      "<"
    );

    // Change label text
    if (menuLabel) {
      tl.to(
        menuLabel,
        {
          opacity: 0.5,
          duration: 0.2,
        },
        "<"
      );

      tl.add(() => {
        if (menuLabel) menuLabel.textContent = "Close";
      });

      tl.to(menuLabel, {
        opacity: 1,
        duration: 0.2,
      });
    }

    // Stagger in menu items
    tl.to(
      menuLinks,
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );
  } else {
    // When closing the menu

    // Stagger out menu items
    tl.to(menuLinks, {
      y: 10,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
    });

    // Animate dropdown closing
    tl.to(
      menuDialog,
      {
        opacity: 0,
        scaleY: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );

    // Change label text
    if (menuLabel) {
      tl.to(
        menuLabel,
        {
          opacity: 0.5,
          duration: 0.2,
        },
        "<"
      );

      tl.add(() => {
        if (menuLabel) menuLabel.textContent = "Menu";
      });

      tl.to(menuLabel, {
        opacity: 1,
        duration: 0.2,
      });
    }

    // Transform X back into plus
    tl.to(
      menuLines[0],
      {
        rotate: 0,
        duration: 0.3,
      },
      "-=0.3"
    );

    tl.to(
      menuLines[1],
      {
        rotate: 90,
        duration: 0.3,
      },
      "<"
    );

    // Disable pointer events last
    tl.add(() => {
      gsap.set(menuDialog, { pointerEvents: "none" });
    });
  }

  return tl;
};
