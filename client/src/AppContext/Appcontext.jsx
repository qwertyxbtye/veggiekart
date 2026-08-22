import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [islogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [userdata, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Cash on Delivery");
  const [livelocation, setLiveLocation] = useState(null);
  const [carttotal, setCartTotal] = useState({
    priceadd: 0,
    platformfee: 0,
    total: 0,
  });

  {
    /*Cart operation*/
  }
  const getcartitems1 = async (params) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/cart/getcartitems",
        { withCredentials: true },
      );
      setCart(response.data.userbag);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productid, quantity) => {
    if (quantity < 1) return console.log("quantity", quantity);

    if (!productid) return console.log("no productid", productid);

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + `/cart/addtocart/${productid}`,
      {},
      { withCredentials: true },
    );

    toast.success(response.data.msg, `tamatr`);

    getcartitems1();
  };

  const handledecreaseQuantity = async (productid) => {
    if (!productid) return console.log("no productid", productid);

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + `/cart/decreasequantity/${productid}`,
      {},
      { withCredentials: true },
    );
    console.log(response.data);

    toast.success(response.data.msg);

    getcartitems1();
  };

  const handleRemoveFromCart = async (productid) => {
    if (!productid) return console.log("no productid", productid);

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + `/cart/removefromcart/${productid}`,
      {},
      { withCredentials: true },
    );

    const filteredcart = response.data.bag?.filter((p) => p.quantity > 0);

    toast.success("item removed from cart");

    setCart(filteredcart);

    calculateTotal(filteredcart);

    getcartitems2();
  };

  const getcartitems2 = async (params) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/cart/getcartitems",
        { withCredentials: true },
      );

      const filteredcart = response.data.userbag?.filter((p) => p.quantity > 0);

      setCart(filteredcart);

      setAddress(response.data.address);

      calculateTotal(filteredcart);
    } catch (error) {
      console.log(error);
    }
  };
  {
    /*Cart operation*/
  }

  const calculateTotal = async (currentcart) => {
    const priceadd = currentcart
      ?.map((p) => p.product.price * p.quantity)
      .reduce((price, a) => {
        return price + a;
      }, 0);

    const platformfee = priceadd * 0.02;
    const deliveryfee = 15;

    const total = Math.ceil(priceadd + platformfee + deliveryfee);

    setCartTotal({ priceadd, platformfee, deliveryfee, total });
  };

  const getallproducts = async () => {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/product/getallproducts",
      { withCredentials: true },
    );
    return response;
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    getallproducts()
      .then((res) => {
        setProducts(
          res.data.allproduct
            .filter((p) => p.isAvailable)
            .filter((p) =>
              p.name.toLowerCase().includes(e.target.value?.toLowerCase()),
            ),
        );
      })
      .catch((err) => console.log(err));
  };

  const handlegetuserorders = async () => {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/order/getallorders",
      { withCredentials: true },
    );
    console.log(response.data.detailedOrders);
    setOrders(response.data.detailedOrders);
  };

  const handleOrderPlacment = async (paymentStatus, total) => {
    if (!cart) return toast("Cart Is Empty!", { icon: "⚠️" });

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/order/placeorder",
      { paymentStatus, total },
      { withCredentials: true },
    );
    console.log("order_response", response);
    setIsLoading(true);

    setTimeout(() => {
      toast.success("Order Placed Successfully");
      setIsLoading(false);
    }, 3000);
  };

  const getLocation = async () => {

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log('lat', lat);
        console.log('lng', lng);

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);

        const data = await response.json();

        console.log('FULL ADDRESS OBJECT:', data.address); // ← check this
        setLiveLocation(data.address)

      },
      (error) => {
        console.error(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );    
    
  };

  const value = {
    islogin,
    setIsLogin,
    register,
    setRegister,
    quantity,
    setQuantity,
    cart,
    setCart,
    getcartitems1,
    getcartitems2,
    handleAddToCart,
    handledecreaseQuantity,
    handleRemoveFromCart,
    address,
    setAddress,
    carttotal,
    setCartTotal,
    calculateTotal,
    products,
    setProducts,
    search,
    setSearch,
    getallproducts,
    handleSearch,
    userdata,
    setUserData,
    paymentStatus,
    setPaymentStatus,
    orders,
    setOrders,
    handlegetuserorders,
    isloading,
    setIsLoading,
    handleOrderPlacment,
    getLocation,
    livelocation,
    setLiveLocation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
