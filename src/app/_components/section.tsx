"use client";

import Image from "next/image";
import { RefObject } from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

interface ServicesProps {
  servicesSectionRef: RefObject<HTMLElement>;
  headingRef: RefObject<HTMLHeadingElement>;
  subheadingRef: RefObject<HTMLParagraphElement>;
  servicesData: ServiceItem[];
}

export default function ServicesSection({
  servicesSectionRef,
  headingRef,
  subheadingRef,
  servicesData,
}: ServicesProps) {
  return (
    <section
      ref={servicesSectionRef}
      className="bg-zinc-950 py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12"
    >
      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center opacity-0 translate-y-8 transition-all duration-700 ease-out reveal-element"
      >
        All Services
      </h1>
      <p
        ref={subheadingRef}
        className="text-sm sm:text-base md:text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto opacity-0 translate-y-6 transition-all duration-700 delay-150 ease-out reveal-element"
      >
        Explore the range of solutions we offer to elevate your projects and
        transform your digital presence with our expertise.
      </p>

      <div className="space-y-20 md:space-y-24 lg:space-y-32 max-w-7xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className={`service-item-container flex flex-col md:flex-row items-center gap-8 md:gap-12 border-t border-white/20 pt-10 md:pt-16 opacity-0 translate-y-12 transition-all duration-700 ease-out reveal-element`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="service-content-wrapper flex-1 md:w-2/5 py-4 order-2 md:order-1">
              <h2 className="service-title text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
                {service.title}
              </h2>
              <p className="service-desc text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
                {service.description}
              </p>
            </div>

            <div className="service-image-wrapper md:w-3/5 w-full h-[250px] sm:h-[280px] md:h-[320px] rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src={service.imageUrl}
                alt={service.altText}
                width={800}
                height={500}
                className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-700"
                loading={service.id === 1 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
