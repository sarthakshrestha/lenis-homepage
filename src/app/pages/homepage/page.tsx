"use client";

import { useEffect } from "react";
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";
import Services from "@/app/_components/services";

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
  // Simple observer for footer animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe footer elements
    document.querySelectorAll(".footer-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full text-white">
      {/* Hero Section - Simplified without parallax */}
      <section
        className="w-full h-screen overflow-hidden relative"
        aria-label="Hero Section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.63)), url('/assets/images/hero.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
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
                  delay: 0.2,
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
                  delay: 0.6,
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
                delay: 0.8,
              }}
            >
              Creating digital experiences that inspire and elevate your brand
            </VerticalCutReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services servicesData={servicesData} />

      {/* Footer Section - Simplified */}
      <section
        className="w-full h-screen relative overflow-hidden"
        aria-label="Footer Image"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/footer.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-out footer-reveal">
              Let's Create Something Amazing
            </h2>
            <a className="inline-block cursor-pointer px-8 py-3 bg-[#ff5941] text-white rounded-full text-lg font-medium hover:bg-[#ff3921] transition-all duration-700 ease-out opacity-0 translate-y-8 footer-reveal">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
