import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthPage } from "../pages/AuthPage";
import Home from "../pages/Home";
import { CartPage } from "../pages/CartPage";
import { Dashboard } from "../pages/Dashboard";
import { AddProduct } from "../components/AddProduct";
import { Inventory } from "../components/Inventory";
import { OrderPageUser } from "../pages/OrderPageUser";
import { OrderPageAdmin } from "../pages/OrderPageAdmin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path:'/', element: <Home />},
            { path:'/auth', element: <AuthPage />},
            { path:'/cart', element: <CartPage/>},
            { path:'/myorders', element: <OrderPageUser/>},
           
        ]
    },
    {
        path: '/admin',
        element: <Dashboard />,
        children: [
            { path:'/admin', element: <AddProduct />},
            { path:'/admin/inventory', element: <Inventory />},
            { path:'/admin/orders', element: <OrderPageAdmin/>},
            
        ]
    },
    {
        path: '*',
        element: <Dashboard />,
    }
])

export default router