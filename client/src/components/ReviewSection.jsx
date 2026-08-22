import React, { useState, useEffect } from 'react'

const reviews = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The vegetables arrive so fresh, it genuinely feels like I picked them from a farm myself. Delivery is always on time too."
  },
  {
    name: "Rohan Mehta",
    location: "Pune",
    rating: 5,
    text: "Switched from my local vendor to VeggiKart and haven't looked back. Quality is consistent and prices are fair."
  },
  {
    name: "Ananya Iyer",
    location: "Bangalore",
    rating: 4,
    text: "Love that I can see exactly what's in season. The spinach and carrots taste noticeably better than store-bought."
  },
  {
    name: "Karan Desai",
    location: "Delhi",
    rating: 5,
    text: "Ordering is quick and the app is simple to use. My weekly grocery run now takes two minutes instead of an hour."
  }
]

export const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => {
    setActiveIndex(index)
  }

  return (
    <section className="bg-[#FAFAF8] px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-2 mb-1 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
          <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">
            What people say
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A18] text-center mb-12">
          Loved by home cooks everywhere
        </h2>

        {/* Card stack */}
        <div className="relative max-w-md mx-auto h-72">
          {reviews.map((review, index) => {
            const offset =
              (index - activeIndex + reviews.length) % reviews.length

            if (offset > 2) return null

            const isActive = offset === 0

            return (
              <div
                key={index}
                className="absolute inset-0 bg-white border border-[#E5E3DB] rounded-2xl p-7 transition-all duration-700 ease-out"
                style={{
                  transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05})`,
                  zIndex: reviews.length - offset,
                  opacity: offset === 0 ? 1 : offset === 1 ? 0.7 : 0.4,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#EDF5E7] flex items-center justify-center text-[#22392C] font-medium text-sm flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A18]">{review.name}</p>
                    <p className="text-xs text-[#9A988F]">{review.location}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array(5).fill('').map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={i < review.rating ? "#22392C" : "none"}
                      stroke="#22392C"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-[#6B6B66] leading-6">
                  {review.text}
                </p>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? "w-6 bg-[#22392C]" : "w-1.5 bg-[#22392C]/25"
              }`}
              aria-label={`Show review ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}