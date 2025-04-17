"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { setupServiceAnimations, setupParallaxEffects } from "@/utils/pageUtil";
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Crafting responsive and performant websites tailored to your needs. Our expert team combines cutting-edge technologies with user-centered design principles to deliver web solutions that drive engagement and business growth.",
    imageUrl: "/assets/images/img1.jpg",
    altText: "Abstract digital art representing web development",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Designing intuitive and engaging user interfaces for seamless experiences. We transform complex user requirements into elegant design solutions that delight users while meeting business objectives through meticulous research and creative innovation.",
    imageUrl: "/assets/images/img2.jpg",
    altText: "Wireframes and design elements indicating UI/UX design",
  },
  {
    id: 3,
    title: "Cloud Solutions",
    description:
      "Leveraging cloud platforms for scalable and reliable infrastructure. Our cloud expertise enables businesses to modernize operations, improve security, and optimize costs while ensuring maximum availability and performance of critical applications.",
    imageUrl: "/assets/images/img3.jpg",
    altText: "Stylized cloud graphic symbolizing cloud solutions",
  },
];

export default function Home() {
  const servicesSectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLElement>(null);
  const footerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up service animations
    const cleanupServiceAnimations = setupServiceAnimations(
      servicesSectionRef as React.RefObject<HTMLElement>
    );

    // Set up parallax effects
    const cleanupParallaxEffects = setupParallaxEffects({
      heroSection: heroSectionRef.current,
      heroImage: heroImageRef.current,
      footerSection: footerSectionRef.current,
      footerImage: footerImageRef.current,
      serviceItems: document.querySelectorAll(".service-image-wrapper img"),
    });

    return () => {
      cleanupServiceAnimations();
      cleanupParallaxEffects();
    };
  }, []);

  return (
    <main className="w-full text-white">
      {/* Hero Section with Parallax */}
      <section
        ref={heroSectionRef}
        className="w-full h-screen overflow-hidden relative"
        aria-label="Hero Section"
      >
        <div
          ref={heroImageRef}
          className="parallax-element absolute inset-0 scale-[1.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.63)), url('/assets/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.05)", // Slightly larger scale to prevent blur edges
            // Dark overlay is now part of the background image
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex justify-center items-baseline mb-6">
              <VerticalCutReveal
                containerClassName="text-6xl text-[#ff5941] sm:text-7xl md:text-8xl lg:text-[16rem] xl:text-[18rem] font-bold inline-block"
                splitBy="characters"
                staggerDuration={0.05}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                }}
              >
                MAX
              </VerticalCutReveal>
              <VerticalCutReveal
                containerClassName="font-light serif text-white text-6xl sm:text-7xl md:text-8xl lg:text-[16rem] xl:text-[18rem] inline-block"
                splitBy="characters"
                staggerDuration={0.05}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                  delay: 0.2, // Start after MAX
                }}
              >
                studios
              </VerticalCutReveal>
              <VerticalCutReveal
                containerClassName="text-[#ff5941] text-6xl sm:text-7xl md:text-8xl lg:text-[16rem] xl:text-[18rem] font-bold inline-block"
                splitBy="characters"
                staggerDuration={0.05}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                  delay: 0.6, // Start after studios
                }}
              >
                .
              </VerticalCutReveal>
            </div>

            <VerticalCutReveal
              containerClassName="text-2xl sm:text-3xl md:text-4xl max-w-5xl mx-auto block"
              splitBy="words"
              staggerDuration={0.04}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 26,
                delay: 0.8, // Start after the title animation
              }}
            >
              Creating digital experiences that inspire and elevate your brand
            </VerticalCutReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-zinc-950 py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-reveal">
          All Services
        </h1>
        <p className="text-sm sm:text-base md:text-3xl xl:text-3xl text-gray-300 text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto text-reveal">
          Explore the range of solutions we offer to elevate your projects and
          transform your digital presence with our expertise.
        </p>

        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 xl:space-y-40 max-w-7xl mx-auto">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-item-container flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 border-t border-white/20 pt-8 sm:pt-10 md:pt-16 lg:pt-20 xl:pt-24"
            >
              <div className="service-content-wrapper flex-1 md:flex-[3] flex flex-col justify-center py-2 md:py-4 order-2 md:order-1">
                <div>
                  <h2 className="service-title text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-reveal">
                    {service.title}
                  </h2>
                  <p className="service-desc text-sm sm:text-base md:text-xl leading-relaxed text-gray-300 mb-4 sm:mb-5 md:mb-6 max-w-xl text-reveal">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="service-image-wrapper flex-1 md:flex-[4] w-full md:w-auto h-[250px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] rounded-lg overflow-hidden order-1 md:order-2 relative">
                <Image
                  src={service.imageUrl}
                  alt={service.altText}
                  fill={true}
                  className="object-cover parallax-image"
                  priority={service.id === 1}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Image with Parallax */}
      <section
        ref={footerSectionRef}
        className="w-full h-screen relative overflow-hidden"
        aria-label="Footer Image"
      >
        <div
          ref={footerImageRef}
          className="parallax-element absolute inset-0 scale-[1.15]"
          style={{
            backgroundImage: "url('/assets/images/footer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transform translate-y-8 opacity-0 footer-title">
              Let's Create Something Amazing
            </h2>
            <a className="inline-block cursor-pointer px-8 py-3 bg-[#ff5941] text-white rounded-full text-lg font-medium hover:bg-[#ff3921] transition-colors transform translate-y-8 opacity-0 footer-cta">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
