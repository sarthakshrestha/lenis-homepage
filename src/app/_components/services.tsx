"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

interface ServicesProps {
  servicesData: ServiceItem[];
}

function Services({ servicesData }: ServicesProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    // Select elements to observe
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="bg-zinc-950 py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center opacity-0 translate-y-8 transition-all duration-700 ease-out animate-on-scroll">
        All Services
      </h1>
      <p className="text-sm sm:text-base md:text-3xl xl:text-3xl text-gray-300 text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out animate-on-scroll">
        Explore the range of solutions we offer to elevate your projects and
        transform your digital presence with our expertise.
      </p>

      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 xl:space-y-40 max-w-7xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="service-item-container flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 border-t border-white/20 pt-8 sm:pt-10 md:pt-16 lg:pt-20 xl:pt-24 opacity-0 translate-y-12 transition-all duration-700 ease-out animate-on-scroll"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="service-content-wrapper flex-1 md:flex-[3] flex flex-col justify-center py-2 md:py-4 order-2 md:order-1">
              <div>
                <h2 className="service-title text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                  {service.title}
                </h2>
                <p className="service-desc text-sm sm:text-base md:text-xl leading-relaxed text-gray-300 mb-4 sm:mb-5 md:mb-6 max-w-xl">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="service-image-wrapper flex-1 md:flex-[4] w-full md:w-auto h-[250px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] rounded-lg overflow-hidden order-1 md:order-2 relative">
              <Image
                src={service.imageUrl}
                alt={service.altText}
                fill={true}
                className="object-cover transition-transform duration-700 hover:scale-105"
                loading={service.id === 1 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
