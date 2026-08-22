import React from 'react'

export const Footer = () => {
  return (
    <footer className="px-6 pt-12 md:px-16 lg:px-36 w-full text-[#F0EAD8]/70 bg-[#22392C]">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-[#F0EAD8]/15 pb-10">
        <div className="md:max-w-96">
          <img
            alt="VeggiKart"
            className="h-11 bg-[#F0EAD8] rounded-lg p-1 object-contain"
            src="/images/brand-logo.png"
          />
          <p className="mt-6 text-sm leading-6">
            Fresh vegetables sourced directly from local farms, delivered to your
            door the same day they're picked. No middlemen, no cold storage weeks —
            just fresh produce.
          </p>
          <div className="flex items-center gap-2 mt-5">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="google play"
              className="h-10 w-auto rounded opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="app store"
              className="h-10 w-auto rounded opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-16 md:gap-32">
          <div>
            <h2 className="font-medium text-[#F0EAD8] mb-5 text-sm tracking-wide uppercase">Company</h2>
            <ul className="text-sm space-y-3">
              <li><a href="#" className="hover:text-[#F0EAD8] transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-[#F0EAD8] transition-colors duration-200">About us</a></li>
              <li><a href="#" className="hover:text-[#F0EAD8] transition-colors duration-200">Contact us</a></li>
              <li><a href="#" className="hover:text-[#F0EAD8] transition-colors duration-200">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-[#F0EAD8] mb-5 text-sm tracking-wide uppercase">Get in touch</h2>
            <div className="text-sm space-y-3">
              <p className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +1-234-567-890
              </p>
              <p className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                contact@veggikart.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-6 text-center text-xs pb-6 text-[#F0EAD8]/50">
        Copyright {new Date().getFullYear()} © VeggiKart. All rights reserved.
      </p>
    </footer>
  )
}