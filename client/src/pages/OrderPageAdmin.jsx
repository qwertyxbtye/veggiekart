import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../AppContext/Appcontext";

export const OrderPageAdmin = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  useEffect(() => {
    handlegetuserorders();
  }, []);

  const { orders, setOrders, handlegetuserorders } = useContext(AppContext);
  const statusOptions = [
    "Placed",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

  const formatPhone = (phone) => {
    if (!phone) return "";
    const digits = String(phone).replace(/\D/g, "");
    if (digits.length !== 10) return phone;
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  };

  const handleStatusChange = async (orderid, status) => {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/order/updateorderstatus",
      { orderid, status },
      { withCredentials: true },
    );
    handlegetuserorders();
  };
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
          <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">Manage</span>
        </div>
        <h2 className="text-2xl font-medium text-[#1A1A18] mb-6">
          Orders
        </h2>

        <div className="space-y-4">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="w-full flex flex-col md:grid md:grid-cols-[2fr_1.5fr_0.7fr_1.2fr] md:items-center gap-5 p-5 rounded-xl border border-[#E5E3DB] bg-white text-[#1A1A18] hover:shadow-sm transition-shadow duration-200"
            >
              {/* Products */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EDF5E7] flex items-center justify-center flex-shrink-0">
                  <img
                    className="w-6 h-6 object-contain"
                    src={boxIcon}
                    alt="box"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  {order?.items.map((item, index) => (
                    <p key={index} className="font-medium text-sm">
                      {item?.product?.name}

                      {item.quantity > 0 && (
                        <span className="text-[#22392C] ml-1 text-xs">
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Customer / Address */}
              <div className="flex flex-col mr-10">
                <span className="font-medium text-sm text-[#1A1A18] mb-1.5">
                  {order.customer_id?.name}
                </span>
                <p className="text-sm text-[#6B6B66] leading-snug mb-1.5">
                  {order.delivery_address}
                </p>
                <span className="text-xs text-[#9A988F]">
                  <span>phone: </span>
                  {formatPhone(order.customer_id?.phone)}
                </span>
              </div>

              {/* Amount */}
              <p className="font-medium text-base text-[#1A1A18]">
                ₹{order.totalAmount}
              </p>

              {/* Order information */}
              <div className="flex flex-col text-sm gap-1.5">
                <p className="text-[#6B6B66]">
                  Date:{" "}
                  <span className="text-[#1A1A18]">
                    {order.createdAt.split('T')[0].split('-').reverse().join('/')}
                  </span>
                </p>

                <p className="text-[#6B6B66]">
                  Payment:{" "}
                  <span
                    className={
                      order.payment_status === "Cash on Delivery"
                        ? "text-[#B8481F] font-medium"
                        : "text-green-400 font-medium"
                    }
                  >
                    {order.payment_status === "Cash on Delivery"
                      ? "Pending"
                      : "Paid"}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-[#6B6B66]">Status:</span>
                  <div className="relative inline-block">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-full border cursor-pointer outline-none transition-colors
                ${order.status === "Delivered" ? "bg-[#22392C]/10 text-[#22392C] border-[#22392C]/30" : ""}
                ${order.status === "Cancelled" ? "bg-[#C1502E]/10 text-[#C1502E] border-[#C1502E]/30" : ""}
                ${order.status === "Out for delivery" ? "bg-[#1A4D8F]/10 text-[#1A4D8F] border-[#1A4D8F]/30" : ""}
                ${order.status === "Placed" ? "bg-[#9A988F]/10 text-[#6B6B66] border-[#9A988F]/30" : ""}
            `}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <svg
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-current opacity-60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};