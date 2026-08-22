import React, { useState, useEffect } from "react";

const slides = [
  {
    img: "/images/vegetable-hero.png",
    eyebrow: "ALL NATURAL PRODUCTS",
    heading: (
      <>
        Fresh and Healthy
        <br />
        <span className="font-bold text-[#22392C]">Veggies</span>
        <span className="font-light"> Organic</span>
        <br />
        <span className="font-light">Market</span>
      </>
    ),
    text: "Organic food is food produced by methods that comply with the standard of farming.",
  },
  {
    img: "/images/vegetable-hero-2.png",
    eyebrow: "SOURCED DAILY",
    heading: (
      <>
        Picked at dawn,
        <br />
        <span className="font-bold text-[#22392C]">delivered</span>
        <span className="font-light"> by</span>
        <br />
        <span className="font-light">evening</span>
      </>
    ),
    text: "We work directly with local farmers so nothing sits in storage before it reaches you.",
  },
  {
    img: "/images/vegetable-hero-3.png",
    eyebrow: "NO MIDDLEMEN",
    heading: (
      <>
        Fair prices for
        <br />
        <span className="font-bold text-[#22392C]">farmers</span>
        <span className="font-light">, fresh</span>
        <br />
        <span className="font-light">produce for you</span>
      </>
    ),
    text: "Cutting out the middlemen means better prices at the farm and at your doorstep.",
  },
];

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setActiveIndex(index);
  };

  return (
    <main className="bg-[#FAFAF8]">
      {/* Hero Section */}
      <section className="px-4 md:px-8 lg:px-16 pt-15 pb-10">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-sm bg-[#EDF5E7] min-h-[500px]">
          {/* Sliding image track */}
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${activeIndex * (100 / slides.length)}%)`,
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.img}
                alt="Fresh organic vegetables"
                className="w-full h-full object-cover flex-shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              />
            ))}
          </div>

          {/* Light overlay on left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EDF5E7]/95 via-[#EDF5E7]/60 to-transparent"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center min-h-[500px] px-8 md:px-12 lg:px-14">
            <div className="max-w-xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="transition-all duration-500"
                  style={{
                    display: index === activeIndex ? "block" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
                    <p className="text-sm md:text-base font-semibold text-[#22392C] tracking-wide">
                      {slide.eyebrow}
                    </p>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-[#1A1A18]">
                    {slide.heading}
                  </h1>

                  <p className="mt-6 max-w-md text-sm md:text-base leading-6 text-[#6B6B66]">
                    {slide.text}
                  </p>

                  <button
                    className="mt-8 bg-[#22392C] hover:bg-[#2E4A38]
                    text-white font-semibold
                    px-10 py-4 rounded-md
                    transition duration-300"
                  >
                    SHOP NOW
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex
                    ? "w-6 bg-[#22392C]"
                    : "w-2 bg-[#22392C]/30"
                }`}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
