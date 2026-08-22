import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext/Appcontext";
import { Loading } from "../components/Loading";
import { GooglePay } from "../components/GooglePay";
import NumberFlow, { continuous } from '@number-flow/react'

export const CartPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [isgpay, setIsGpay] = useState(false);
  const navigate = useNavigate();
  const { handleRemoveFromCart, getcartitems2, address, setAddress, carttotal, setCartTotal, calculateTotal, cart, setCart, paymentStatus, setPaymentStatus, isloading, setIsLoading,handleOrderPlacment ,getLocation,livelocation} = useContext(AppContext)


  useEffect(() => {
    getcartitems2();
  }, []);

  const handleOrderPlacmentCOD = async (paymentStatus, total) => {
    
        if (!cart) return toast('Cart Is Empty!', { icon: '⚠️' });
    
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/order/placeorder', { paymentStatus, total }, { withCredentials: true })
        console.log('order_response', response);
        setIsLoading(true)
    
        setTimeout(() => {
          navigate('/myorders')
          toast.success('Order Placed Successfully')
          setIsLoading(false)
        }, 3000);
    }


  return (
    <>
      {isloading && <Loading overlay text="Processing Order...." />}
      <div className="flex flex-col md:flex-row py-16  w-full px-6 mx-auto bg-[#FAFAF8]">
        <div className="flex-1 px-40 py-2 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6 text-[#1A1A18]">
            Shopping Cart{" "}
            <span className="text-sm text-[#9A988F]">{cart?.length} Items</span>
          </h1>

          {!cart || cart.length === 0 ? (
            <div className="text-base text-[#1A1A18]">Cart Empty. <span className="text-[#9A988F] text-xs">No Items in the Cart.</span></div>
          ) : (
            <>
              <div className="grid grid-cols-[2fr_1fr_1fr] text-[#9A988F] text-sm font-medium pb-3 uppercase tracking-wide">
                <p className="text-left">Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Remove</p>
              </div>

              {cart?.map((p, index) => (
                <div
                  key={p._id || index}
                  className="grid grid-cols-[2fr_1fr_1fr] text-[#6B6B66] items-center text-sm md:text-base font-medium pt-4 border-t border-[#E5E3DB] mt-4 first:border-t-0 first:mt-0 first:pt-0"
                >
                  <div className="flex items-center md:gap-6 gap-3">
                    <div className="cursor-pointer w-24 h-24 flex items-center justify-center bg-[#EDF5E7] rounded-lg overflow-hidden">
                      <img
                        className="max-w-[80%] h-auto object-contain"
                        src={p.product.img}
                        alt={p.product.name}
                      />
                    </div>

                    <div>
                      <p className="hidden md:block font-medium text-[#1A1A18]">
                        {p.product.name}
                      </p>

                      <div className="font-normal text-[#9A988F] text-sm">
                        <p>1 {p.product.category}</p>

                        <div className="flex items-center gap-1 mt-1">
                          <p>Qty:</p>

                          <select
                            className="outline-none bg-transparent text-[#22392C] font-medium"
                            value={p.quantity}
                            onChange={(e) => {
                              // update quantity here
                            }}
                          >
                            {Array(10)
                              .fill("")
                              .map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[#1A1A18] font-medium">₹{p.product.price * p.quantity}</p>

                  <button
                    className="cursor-pointer mx-auto p-2 rounded-full hover:bg-[#22392C]/5 transition-colors duration-200"
                    onClick={() => handleRemoveFromCart(p.product._id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 7.5L7.5 12.5M7.5 7.5L12.5 12.5"
                        stroke="#C1502E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="10"
                        cy="10"
                        r="8.333"
                        stroke="#C1502E"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )}

          <button
            className="group cursor-pointer flex items-center mt-8 gap-2 text-[#6B6B66] font-medium hover:text-[#22392C] transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="max-w-[360px] max-h-[520px] w-full bg-white rounded-xl p-6 max-md:mt-16 border border-[#E5E3DB]">
          <h2 className="text-xl font-medium text-[#1A1A18]">Order Summary</h2>
          <hr className="border-[#E5E3DB] my-5" />

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#22392C]">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-[#6B6B66] text-sm">{address}</p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-[#22392C] text-sm hover:underline cursor-pointer flex-shrink-0"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-[#E5E3DB] rounded-lg text-sm w-full shadow-sm z-10">
                  <p
                    className="text-[#6B6B66] p-2 hover:bg-[#EDF5E7] cursor-pointer"
                  >
                      {livelocation?.village}, {livelocation?.road}, {livelocation?.city} {livelocation?.town}, {livelocation?.state_district}, {livelocation?.postcode}
                  </p>
                  <p
                    onClick={() => {getLocation()}}
                    className="text-[#22392C] font-medium text-center cursor-pointer p-2 hover:bg-[#EDF5E7]"
                  >
                    Get Live Location
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-[#22392C] mt-6">Payment Method</p>

            <select
              className="w-full border border-[#E5E3DB] bg-white rounded-md px-3 py-2.5 mt-2 outline-none text-sm text-[#1A1A18] focus:border-[#22392C] transition-colors duration-200"
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="Cash on Delivery">Cash On Delivery</option>
              <option value="Paid">Online Payment</option>
            </select>
          </div>

          <hr className="border-[#E5E3DB]" />

          <div className="text-[#6B6B66] mt-4 space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Price</span>
              <span>₹<NumberFlow plugins={[continuous]} value={carttotal.priceadd} /></span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span>₹<NumberFlow plugins={[continuous]} value={carttotal.deliveryfee} /></span>
            </p>
            <p className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{Number.isNaN(Number(carttotal?.platformfee)) ? 0 : Number(carttotal?.platformfee).toFixed(0)}</span>
            </p>
            <p className="flex justify-between text-base font-medium mt-3 text-[#1A1A18]">
              <span>Total Amount:</span>
              <span>₹<span className="text-[#22392C]"><NumberFlow plugins={[continuous]} value={carttotal.total} /></span></span>
            </p>
          </div>

        { paymentStatus === 'Paid' ? <div className="px-8 py-4"> <GooglePay /> </div> :    
          (<button
            className="w-full py-3.5 mt-6 cursor-pointer bg-[#22392C] text-white font-medium rounded-md hover:bg-[#2E4A38] transition-colors duration-300"
            onClick={() => handleOrderPlacmentCOD(paymentStatus, carttotal.total)}
          >
            Place Order
          </button>)}  
        </div>
      </div>
    </>
  );
};