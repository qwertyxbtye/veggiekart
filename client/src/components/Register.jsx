import React, { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../AppContext/Appcontext'
import toast from "react-hot-toast";

export const Register = () => {

    const {setRegister} = useContext(AppContext)
    const [role, setRole] = useState("user");
    const [registerdata, setRegisterData] = useState({ img: null, name: '', email: '', password: '',role: role, address:'', phone:''})
    const navigate = useNavigate()
    const handleRegister = async (e) => {

        e.preventDefault()

        if(!registerdata.name || !registerdata.email || !registerdata.password || !registerdata.address || !registerdata.phone ) return toast.error('enter details properly')
        
        try {

            const formdata = new FormData()

            formdata.append('img', registerdata.img)
            formdata.append('name', registerdata.name)
            formdata.append('email', registerdata.email)
            formdata.append('password', registerdata.password)
            formdata.append('role', registerdata.role)
            formdata.append('address', registerdata.address)
            formdata.append('phone', registerdata.phone)

            for ( const [key,value] of formdata.entries()) {
                console.log(key , value);   
            }

            
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/register' , formdata , { withCredentials: true })
            console.log(response);

            toast.success(response.data.msg)

            navigate('/')
            
        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <form onSubmit={handleRegister} className="bg-white text-gray-500 max-w-[420px] w-full mx-4 p-6 md:p-7 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">

                {/* Heading */}
                <h2 className="text-2xl font-bold mb-7 text-center text-gray-800">
                    Create Account
                </h2>

                {/* Profile Image */}
                <div className="flex flex-col items-center mb-5">
                    <label
                        htmlFor="profileImage"
                        className="w-20 h-20 rounded-full bg-indigo-500/10 border-2 border-dashed border-indigo-400 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-indigo-500/20 transition"
                    >
                        <svg
                            className="w-8 h-8 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 20.25a7.5 7.5 0 0115 0"
                            />
                        </svg>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={ (e) => { setRegisterData({...registerdata, img: e.target.files[0]})}}

                        />
                    </label>

                    <p className="text-xs text-gray-400 mt-2">
                        Upload profile image
                    </p>
                </div>

                {/* Name */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 20.25a7.5 7.5 0 0115 0"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="text"
                        placeholder="Full Name"
                        required
                        value={registerdata.name}
                        onChange={ (e) => setRegisterData({...registerdata, name: e.target.value})}
                    />
                </div>

                {/* Email */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6.75l7.5 5.25a2.25 2.25 0 002.998 0L21 6.75"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="email"
                        placeholder="Email"
                        required
                        value={registerdata.email}
                        onChange={ (e) => setRegisterData({...registerdata, email: e.target.value})}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V7.125a4.125 4.125 0 00-8.25 0V10.5"
                        />
                        <rect
                            x="4.5"
                            y="10.5"
                            width="15"
                            height="10"
                            rx="2"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="password"
                        placeholder="Password"
                        required
                        value={registerdata.password}
                        onChange={ (e) => setRegisterData({...registerdata, password: e.target.value})}
                    />
                </div>

                {/* Address */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="text"
                        placeholder="Address"
                        required
                        value={registerdata.address}
                        onChange={ (e) => setRegisterData({...registerdata, address: e.target.value})}
                    />
                </div>

                {/* Phone */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.243-7.243 1.125 1.125 0 01.38-1.21l1.293-.97c.363-.272.529-.73.417-1.173L6.91 3.102A1.125 1.125 0 005.819 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={registerdata.phone}
                        onChange={ (e) => setRegisterData({...registerdata, phone: e.target.value})}
                    />
                </div>

                {/* Role Switch */}
                <div className="mt-5 mb-6">
                    <p className="text-gray-600 font-medium mb-2">
                        Account Type
                    </p>

                    <div className="flex items-center bg-indigo-500/5 border border-gray-500/10 rounded-lg p-1">

                        <button
                            type="button"
                            onClick={() => setRegisterData({...registerdata, role: 'user'})}
                            className={`flex-1 py-2 rounded-md transition-all ${
                                role === "user"
                                    ? "bg-indigo-500 text-white shadow"
                                    : "text-gray-500"
                            }`}
                        >
                            User
                        </button>

                        <button
                            type="button"
                            onClick={() => setRegisterData({...registerdata, role: 'vendor'})}
                            className={`flex-1 py-2 rounded-md transition-all ${
                                role === "vendor"
                                    ? "bg-indigo-500 text-white shadow"
                                    : "text-gray-500"
                            }`}
                        >
                            Vendor
                        </button>

                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
                    
                >
                    Create Account
                </button>

                {/* Login */}
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="text-blue-500 underline"
                        onClick={ () => setRegister(false)}
                    >
                        Login
                    </a>
                </p>

            </form>
        </div>
    );
};