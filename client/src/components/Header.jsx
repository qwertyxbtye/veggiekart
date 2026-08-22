import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../AppContext/Appcontext";

export const Header = () => {
  const {
    islogin,
    setIsLogin,
    cart,
    search,
    setSearch,
    getallproducts,
    products,
    setProducts,
    handleSearch,
    userdata,
    setUserData
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/#" },
    { name: "All Product", path: "/#all-products" },
    { name: "About Us", path: "/#aboutus" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {

    if (islogin && !(Object.keys(userdata).includes('name'))) {
      const user = JSON.parse(localStorage.getItem('user'))
      setUserData(user)
    }
  }, [])

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/logout",
        {},
        { withCredentials: true },
      );
      toast.success(response.data.msg);
      setIsDropdownOpen(false);
      setIsLogin(false);
      setUserData({})
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-23 overflow-y-scroll">
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)] text-[#22392C] py-3 md:py-4"
            : "bg-[#22392C] text-[#F0EAD8] py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/brand-logo.png"
            alt="VeggiKart"
            className="w-15 object-contain ring-1 ring-black/5 h-11 bg-[#F0EAD8] rounded-lg p-1 "
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link, i) => (
            <HashLink
              key={i}
              to={link.path}
              className="group flex flex-col gap-1 font-medium text-sm tracking-wide"
            >
              {link.name}
              <div
                className={`h-[2px] w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? "bg-[#22392C]" : "bg-[#F0EAD8]"
                }`}
              />
            </HashLink>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors duration-300 ${
              isScrolled
                ? "bg-white border-gray-200 focus-within:border-[#22392C]"
                : "bg-white/10 border-white/20 focus-within:border-white/50"
            }`}
          >
            <input
              type="text"
              placeholder="Search fresh veggies..."
              className={`w-32 lg:w-48 bg-transparent outline-none text-sm ${
                isScrolled
                  ? "text-gray-800 placeholder-gray-400"
                  : "text-[#F0EAD8] placeholder-[#F0EAD8]/50"
              }`}
              value={search}
              onChange={handleSearch}
              onFocus={() => {
                document
                  .getElementById("all-products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            <svg
              className={`h-4 w-4 flex-shrink-0 ${isScrolled ? "text-gray-400" : "text-[#F0EAD8]/60"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Cart */}
          <button
            className={`relative transition-all duration-300 cursor-pointer p-2 rounded-full ${
              isScrolled ? "hover:bg-black/5" : "hover:bg-white/10"
            }`}
            onClick={() => navigate("/cart")}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-8 4a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>

            {cart?.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E85D3D] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* Login / User Dropdown */}
          {islogin ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 ml-2 pl-1 pr-3 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
                  isScrolled ? "hover:bg-black/5" : "hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ring-2 ${
                    isScrolled
                      ? "bg-[#22392C]/10 ring-[#22392C]/30"
                      : "bg-white/15 ring-white/30"
                  }`}
                >
                  {userdata?.img ? (
                    <img
                      src={userdata.img}
                      alt={userdata?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className={`text-xs font-semibold ${isScrolled ? "text-[#22392C]" : "text-[#F0EAD8]"}`}>
                      {userdata?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm">
                  {userdata?.name || "User"}
                </span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""} ${isScrolled ? "text-gray-400" : "text-[#F0EAD8]/60"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu — always light, regardless of nav state */}
              <div
                className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg shadow-black/5 border border-gray-100 py-1.5 origin-top-right transition-all duration-200 text-gray-700 ${
                  isDropdownOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/myorders");
                  }}
                  className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-8 4a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  My Orders
                </button>
                <button
                  onClick={() => { handleLogout(); localStorage.removeItem('user') }}
                  className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-[#E85D3D] hover:bg-red-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`px-5 py-2.5 rounded-full ml-2 font-medium text-sm transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "bg-[#22392C] text-white hover:bg-[#2E4A38]"
                  : "bg-[#F0EAD8] text-[#22392C] hover:bg-white"
              }`}
              onClick={() => navigate("/auth")}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-6 w-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#22392C] text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-[#F0EAD8] transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          {islogin ? (
            <>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/orders");
                }}
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="bg-[#E85D3D] text-white px-8 py-2.5 rounded-full transition-all duration-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/auth");
              }}
              className="bg-[#F0EAD8] text-[#22392C] px-8 py-2.5 rounded-full transition-all duration-500"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};