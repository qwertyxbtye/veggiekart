import React, { useContext, useState } from "react";
import { OrderPageAdmin } from "./OrderPageAdmin";
import { AddProduct } from "../components/AddProduct";
import { Inventory } from "../components/Inventory";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../AppContext/Appcontext";
import { useEffect } from "react";

export const Dashboard = () => {

  const { userdata, setUserData, setIsLogin, islogin } = useContext(AppContext)
  const [dashboardoption, setDashboardOption] = useState(0)
  const navigate = useNavigate()

  const addProductIcon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 10c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4v2.5c0 3-2.5 5.5-5.5 5.5S6 15.5 6 12.5V10h1Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6c0-2 1.5-3 3.5-3-.2 1.8-1.3 3-3.5 3Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M19 14v6m-3-3h6"
      />
    </svg>
  );

  const inventoryIcon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 10h16l-1.5 9H5.5L4 10Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 10c0-4 2-6 5-6s5 2 5 6"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.5 10c-.8-1.5-.3-3 1-3.8 1.3.8 1.8 2.3 1 3.8"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 10c-.5-1.8.5-3.2 2-3.5 1 .9 1 2.5 0 3.5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.5 10c-.2-1.5.7-2.8 2-3.2 1.1 1.1.9 2.6 0 3.2"
      />
    </svg>
  );

  const ordersIcon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4h2l1.5 10h11L20 7H6"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 18h9"
      />
      <circle cx="8" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 11c.5-2.5 2.5-3.5 5-3.5-.3 2.5-1.8 4-4.5 4"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M11 11v2"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add Veggies", path: "/admin", icon: addProductIcon, index: 0 },
    { name: "Inventory", path: "/admin/inventory", icon: inventoryIcon, index: 1 },
    { name: "Orders", path: "/admin/orders", icon: ordersIcon, index: 2 },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/logout",
        {},
        { withCredentials: true },
      );
      toast.success(response.data.msg);
      setIsLogin(false)
      navigate('/auth')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if (islogin && !(Object.keys(userdata).includes('name'))) {
      const user = JSON.parse(localStorage.getItem('user'))
      setUserData(user)
    }
  }, [])

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-[#E5E3DB] py-3 bg-white transition-all duration-300">
        <NavLink to='/admin'>
          <img
            className="h-9"
            src="/images/brand-logo.png"
            alt="dummyLogoColored"
          />
        </NavLink>
        <div className="flex items-center gap-5">
          {/* User avatar + name + admin label */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#EDF5E7] flex items-center justify-center ring-2 ring-[#22392C]/20">
              {userdata?.img ? (
                <img
                  src={userdata.img}
                  alt={userdata?.name || "Admin"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-[#22392C]">
                  {userdata?.name?.charAt(0)?.toUpperCase() || "A"}
                </span>
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-[#1A1A18]">
                {userdata?.name || "Admin"}
              </span>
              <span className="text-[10px] text-[#9A988F]">admin</span>
            </div>
          </div>
          <button
            className="border border-[#E5E3DB] rounded-full text-sm px-4 py-1.5 text-[#6B6B66] hover:bg-[#22392C]/5 hover:text-[#22392C] hover:border-[#22392C]/30 transition-colors duration-200"
            onClick={() => { handleLogout(); localStorage.removeItem('user') }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r border-[#E5E3DB] h-screen text-base pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={(e) => setDashboardOption(index)}
              className={`flex items-center py-3 px-4 gap-3 
                            ${
                              index === dashboardoption
                                ? "border-r-4 md:border-r-[6px] bg-[#22392C]/8 border-[#22392C] text-[#22392C]"
                                : "hover:bg-[#22392C]/5 border-white text-[#6B6B66]"
                            }`}
            >
              {item.icon}
              <p className="md:block hidden text-center text-sm font-medium">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <div className="w-full bg-[#FAFAF8]">
          <Outlet />
        </div>
      </div>
    </>
  );
};