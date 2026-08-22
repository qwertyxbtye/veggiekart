import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loading } from './Loading'
import { AppContext } from '../AppContext/Appcontext'

export const AddProduct = () => {

    const [product, setProduct] = useState({ img: null, name: '', weight: '', category: '', price: '' })
    const {isloading, setIsLoading } = useContext(AppContext)
    const navigate = useNavigate()

    const handleAddProduct = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const { img, name, weight, category, price } = product

        if (!name || !img || !category || !price || !weight) return console.log("enter details properly", product);

        try {
            const formdata = new FormData()

            formdata.append('img', product.img)
            formdata.append('name', product.name)
            formdata.append('category', product.category)
            formdata.append('price', product.price)
            formdata.append('weight', product.weight)

            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/product/register', formdata, { withCredentials: true })
            console.log(response.data.msg);
            if(!response.data.createdproduct) return toast.error(response.data.msg)
            toast.success(response.data.msg)
            navigate('/admin/inventory')

            setProduct({ img: null, name: '', category: '', weight: '', price: '' })

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isloading && <Loading overlay text="Adding Product...."/>}
            <div className="min-h-screen bg-[#FAFAF8] py-10 px-4 flex justify-center">
                <form
                    className="w-full h-157 max-w-lg bg-white border border-[#E5E3DB] rounded-xl shadow-sm p-6 md:p-8 space-y-6"
                    onSubmit={handleAddProduct}
                >
                    <h2 className="text-xl font-medium text-[#1A1A18]">Add new product</h2>

                    {/* Image upload */}
                    <div>
                        <p className="text-sm font-medium text-[#1A1A18] mb-2">Product image</p>
                        <label
                            htmlFor="image0"
                            className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-[#E5E3DB] rounded-lg cursor-pointer hover:border-[#22392C]/40 transition overflow-hidden bg-[#EDF5E7]"
                        >
                            <input
                                accept="image/*"
                                type="file"
                                id="image0"
                                hidden
                                onChange={(e) => setProduct({ ...product, img: e.target.files[0] })}
                            />
                            {product.img ? (
                                <img
                                    className="w-full h-full object-cover"
                                    src="/images/vegetable-hero.png"
                                    alt="preview"
                                />
                            ) : (
                                <img
                                    className="w-10 h-10 opacity-50"
                                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                    alt="uploadArea"
                                />
                            )}
                        </label>
                    </div>

                    {/* Product name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-[#1A1A18]" htmlFor="product-name">
                            Product name
                        </label>
                        <input
                            id="product-name"
                            type="text"
                            placeholder="e.g. Tomato"
                            className="outline-none py-2.5 px-3 rounded-md border border-[#E5E3DB] text-sm focus:border-[#22392C] transition"
                            required
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                    </div>

                    {/* Weight/count + Unit — side by side */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-[#1A1A18]" htmlFor="weight-count">
                                Count
                            </label>
                            <select
                                id="weight-count"
                                className="outline-none py-2.5 px-3 rounded-md border border-[#E5E3DB] text-sm bg-white focus:border-[#22392C] transition"
                                value={product.weight}
                                onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                            >
                                <option value="" disabled>Select count</option>
                                {['1', '250', '500'].map((no, index) => (
                                    <option key={index} value={no}>{no}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-[#1A1A18]" htmlFor="category">
                                Unit
                            </label>
                            <select
                                id="category"
                                className="outline-none py-2.5 px-3 rounded-md border border-[#E5E3DB] text-sm bg-white focus:border-[#22392C] transition"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                <option value="" disabled>Select unit</option>
                                {['kg', 'gm', 'dozen'].map((weight, index) => (
                                    <option key={index} value={weight}>{weight}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1.5 max-w-[160px]">
                        <label className="text-sm font-medium text-[#1A1A18]" htmlFor="product-price">
                            Price (₹)
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none py-2.5 px-3 rounded-md border border-[#E5E3DB] text-sm focus:border-[#22392C] transition"
                            required
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                    </div>

                    <button
                        className={`w-full py-3 bg-[#22392C] hover:bg-[#2E4A38] text-white font-medium rounded-md transition cursor-pointer }`}
                        type="submit"
                    >
                        Add product
                    </button>
                </form>
            </div>
        </>
    )
}