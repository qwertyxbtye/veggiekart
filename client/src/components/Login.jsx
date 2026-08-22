import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../AppContext/Appcontext'

export const Login = () => {

    const {setRegister,setIsLogin,setUserData} = useContext(AppContext)
    const [logindata, setLoginData] = useState({ email: '', password: ''})
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password} = logindata

        if(!email || !password) return toast('plz enter proper details') 

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/login', logindata,{ withCredentials: true })
            console.log(response.data.user);
            console.log(response.data);
            if(! response.data.user) return toast.error(response.data.msg)
            setUserData({ name: response?.data.user.name, img: response?.data.user.img })
            localStorage.setItem('user',JSON.stringify({ name: response.data.user.name, img: response.data.user.img }))
            toast.success(response.data.msg)


            if ( response.data.user.role === 'vendor') {
                console.log('vendor'); 
                setLoginData({ email: '', password: ''})
                navigate('/admin')
            } else if ( response.data.user.role === 'user') {
                setLoginData({ email: '', password: ''})
                setIsLogin(true)
                navigate('/')
            } else {
                toast.error('User role not found')
            }

            

        } catch (error) {
            console.log('No response from backend',error);
            
        }   
    }

  return (
    <>

    <div className="flex flex-col h-150 items-center justify-center bg-grey-800">
        <form
                className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
            >
                <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
                    Welcome Back
                </h2>

                {/* Email */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
                            stroke="#6B7280"
                            strokeOpacity=".6"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
                            stroke="#6B7280"
                            strokeOpacity=".6"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="email"
                        placeholder="Email"
                        required
                        value={logindata.email}
                        onChange={ (e) => setLoginData({...logindata, email: e.target.value})}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <svg
                        width="13"
                        height="17"
                        viewBox="0 0 13 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                            fill="#6B7280"
                        />
                    </svg>

                    <input
                        className="w-full outline-none bg-transparent py-2.5"
                        type="password"
                        placeholder="Password"
                        required
                        value={logindata.password}
                        onChange={ (e) => setLoginData({...logindata, password: e.target.value})}
                    />
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                        <input
                            id="checkbox"
                            type="checkbox"
                        />

                        <label htmlFor="checkbox">
                            Remember me
                        </label>
                    </div>

                    <a
                        className="text-blue-600 underline"
                        href="#"
                    >
                        Forgot Password
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
                    onClick={handleLogin}
                >
                    Log In
                </button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="text-blue-500 underline"
                        onClick={ () => setRegister(true)}
                    >
                        Signup
                    </a>
                </p>

        </form>
    </div>
    </>
  )
}
