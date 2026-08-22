import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../AppContext/Appcontext";

export const OrderPageUser = () => {
    const boxIcon =
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

    useEffect(() => {

        const handlegetuserorders = async () => {

            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/order/getmyorders', { withCredentials: true })
            console.log(response.data.detailedOrders);
            setOrders(response.data.detailedOrders)
        }

        handlegetuserorders()



    }, [])

    const { orders, setOrders } = useContext(AppContext)


    return (
        <div className="min-h-screen bg-[#FAFAF8] py-10 px-4">

            <div className="max-w-5xl mx-auto">

                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
                    <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">Order history</span>
                </div>

                <h2 className="text-2xl font-medium text-[#1A1A18] mb-6">
                    Your orders
                </h2>

                <div className="space-y-4">

                    {orders?.map((order) => (
                        <div
                            key={order._id}
                            className="w-full flex flex-col md:grid md:grid-cols-[2fr_1.5fr_0.7fr_1.2fr] md:items-center gap-5 p-5 rounded-xl border border-[#E5E3DB] bg-white text-[#1A1A18] hover:shadow-sm transition-shadow duration-200"
                        >

                            <div className="flex gap-4">

                                <div className="w-12 h-12 rounded-lg bg-[#EDF5E7] flex items-center justify-center flex-shrink-0">
                                    <img
                                        className="w-6 h-6 object-contain"
                                        src={boxIcon}
                                        alt="box"
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    {order.items.map((item, index) => (
                                        <p
                                            key={index}
                                            className="font-medium text-sm"
                                        >
                                            {item.product.name}

                                            {item.quantity > 0 && (
                                                <span className="text-[#22392C] ml-1 text-xs">
                                                    x {item.quantity}
                                                </span>
                                            )}
                                        </p>
                                    ))}
                                </div>

                            </div>

                            <div className="text-sm mr-10 text-[#6B6B66]">
                                <p>{order.delivery_address}</p>
                            </div>

                            <p className="font-medium text-base text-[#1A1A18]">
                                ₹{order.totalAmount}
                            </p>

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
                                            order.payment_status === 'Cash on Delivery'
                                                ? "text-[#B8481F] font-medium"
                                                : "text-green-400 font-medium"
                                        }
                                    >
                                        {order.payment_status === 'Cash on Delivery'
                                            ? "Pending"
                                            : "Paid"}
                                    </span>
                                </p>
                                <p className="text-[#6B6B66]">
                                    Status:{" "}
                                    <span className={`
                                        inline-block px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${order.status === "Delivered" ? "bg-[#22392C]/10 text-[#22392C]" : ""}
                                        ${order.status === "Cancelled" ? "bg-[#C1502E]/10 text-[#C1502E]" : ""}
                                        ${order.status === "Out for delivery" ? "bg-[#1A4D8F]/10 text-[#1A4D8F]" : ""}
                                        ${order.status === "Placed" ? "bg-[#9A988F]/10 text-[#6B6B66]" : ""}
                                    `}>
                                        {order.status}
                                    </span>
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};