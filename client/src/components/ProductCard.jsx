import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../AppContext/Appcontext";

export const ProductCard = ({ product }) => {

    const { cart, setCart, getcartitems1, handleAddToCart, handledecreaseQuantity, handleRemoveFromCart } = useContext(AppContext)


    useEffect(() => {

        getcartitems1()
    }, [])



    const cartItem = cart?.find(item => item.product._id === product._id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="border border-[#E5E3DB] rounded-xl px-3.5 py-3.5 bg-white w-full transition-shadow duration-200 hover:shadow-sm">

            {/* Image */}
            <div className="group cursor-pointer flex items-center justify-center h-28 rounded-lg bg-[#EDF5E7] mb-2.5">
                <img
                    className="group-hover:scale-105 transition max-h-24 max-w-[80%] object-contain"
                    src={product.img}
                    alt={product.name}
                />
            </div>

            {/* Details */}
            <div>

                <p className="text-[11px] text-[#9A988F]">{product.weight} {product.category}</p>

                <p className="text-[#1A1A18] font-medium text-sm truncate w-full mb-2">
                    {product.name.split('/')[0]}/<span className="text-[10px] text-gray-400">{product.name.split('/')[1]}</span>
                </p>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-[#22392C]">
                        ₹{product.price}
                        <span className="text-[#9A988F] text-[11px] line-through ml-1">
                            ₹{Math.ceil(product.price + (product.price * 0.1))}
                        </span>
                    </p>

                    <div>

                        {quantity === 0 ? (
                            <button
                                className="bg-[#22392C] text-white text-xs font-medium px-3.5 py-1.5 rounded-md hover:bg-[#2E4A38] transition-colors duration-200"
                                onClick={() => { const newquantity = quantity + 1; handleAddToCart(product._id, newquantity) }}
                            >
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 bg-[#22392C]/[0.05] rounded-md px-2 py-1">

                                <button
                                    onClick={() => {
                                        if (quantity <= 0) return;
                                        if (quantity === 1) { return handleRemoveFromCart(product._id) }
                                        handledecreaseQuantity(product._id);
                                    }}
                                    className="cursor-pointer text-[#22392C] text-sm w-4 text-center"
                                >
                                    -
                                </button>

                                <span className="text-xs text-[#22392C] min-w-[10px] text-center">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => {
                                        const newquantity = quantity + 1;
                                        handleAddToCart(product._id, newquantity)
                                    }}
                                    className="cursor-pointer text-[#22392C] text-sm w-4 text-center"
                                >
                                    +
                                </button>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};