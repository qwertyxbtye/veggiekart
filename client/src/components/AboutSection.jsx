import React from 'react'

export const AboutSection = () => {
  return (
    <section className="bg-[#FAFAF8] px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto px-40">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-[#EDF5E7] aspect-[4/3]">
              <img
                src="/images/vegetable-hero.png"
                alt="Farmers harvesting fresh vegetables"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl border border-[#E5E3DB] px-5 py-4 shadow-sm hidden sm:block">
              <p className="text-2xl font-semibold text-[#22392C]">500+</p>
              <p className="text-xs text-[#6B6B66] mt-0.5">Local farmers partnered</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
              <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">
                About VeggiKart
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A18] leading-tight">
              From the farm to
              <br />
              your kitchen, faster
            </h2>

            <p className="mt-5 text-sm md:text-base text-[#6B6B66] leading-6 max-w-md">
              We work directly with local farmers to bring you vegetables harvested
              the same day they're delivered. No middlemen, no cold storage weeks —
              just fresh produce, picked at its peak.
            </p>

            {/* Feature list */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDF5E7] flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22392C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A18]">Sourced daily</p>
                  <p className="text-xs text-[#6B6B66] mt-0.5">Fresh stock arrives every morning from nearby farms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDF5E7] flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22392C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A18]">Delivered in hours</p>
                  <p className="text-xs text-[#6B6B66] mt-0.5">Ordered before noon, at your door by evening.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDF5E7] flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22392C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A18]">No middlemen</p>
                  <p className="text-xs text-[#6B6B66] mt-0.5">Fair prices for farmers, fresh produce for you.</p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-[#22392C] hover:bg-[#2E4A38] text-white font-medium text-sm px-8 py-3 rounded-md transition-colors duration-300">
              Learn our story
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}