import GooglePayButton from "@google-pay/button-react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../AppContext/Appcontext";
import { useNavigate } from "react-router-dom";

export const GooglePay = () => {

    const navigate = useNavigate()
    const {carttotal, paymentStatus,handleOrderPlacment} = useContext(AppContext)

    const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,

        allowedPaymentMethods: [
            {
                type: "CARD",

                parameters: {
                    allowedAuthMethods: [
                        "PAN_ONLY",
                        "CRYPTOGRAM_3DS"
                    ],

                    allowedCardNetworks: [
                        "MASTERCARD",
                        "VISA"
                    ]
                },

                tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",

                    parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId"
                    }
                }
            }
        ],

        merchantInfo: {
            merchantName: "My Vegetable Store"
        },

        transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: String(carttotal.total),
            currencyCode: "INR",
            countryCode: "IN"
        }
    };

    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={paymentRequest}

            onLoadPaymentData={(paymentData) => {
                console.log("✅ PAYMENT DATA RECEIVED");
                console.log(paymentData);

                if(!paymentData) return toast.error('Payment Failed!')

                handleOrderPlacment(paymentStatus, carttotal.total)

                setTimeout( () => {
                    navigate('/myorders')
                },2000)
                

                toast.success("✅ Payment Successful.")

                console.log(
                    "TOKEN:",
                    paymentData.paymentMethodData
                        ?.tokenizationData?.token
                );
            }}

            onError={(error) => {
                console.error("❌ GOOGLE PAY ERROR");
                toast.error("❌ GOOGLE PAY ERROR")
                console.error(error);
            }}

            onCancel={(reason) => {
                console.log("⚠️ PAYMENT CANCELLED");
                toast("⚠️ PAYMENT CANCELLED")
                console.log(reason);
            }}
        />
    );
};