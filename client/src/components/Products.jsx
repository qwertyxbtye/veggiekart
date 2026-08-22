import React, { useContext, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";
import { AppContext } from "../AppContext/Appcontext";
import { Loading } from "./Loading";

export const Products = () => {

    const { products, setProducts, search, setSearch, getallproducts } = useContext(AppContext)

    useEffect(() => {

        getallproducts()
            .then(res => {
                setProducts(res.data.allproduct.filter(p => p.isAvailable).filter(p => p.name.includes(search)))
            })
            .catch(err =>
                console.log("Product error", err)
            )

    }, [])

    return (
        <div className="min-h-screen bg-[#FAFAF8] py-10">

            {/* Heading */}
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
                    <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">Fresh daily</span>
                </div>

                <h1 className="text-2xl font-medium text-[#1A1A18]">
                    Today's fresh harvest
                </h1>

                <p className="text-sm text-[#6B6B66] mt-1">
                    Shop everything from leafy greens to hearty root vegetables
                </p>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">

                    {products?.length === 0 ?
                        (<div className="flex w-full text-[#9A988F]">No items Available.</div>)
                        :
                        products?.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                </div>
            </div>
        </div>
    );
};