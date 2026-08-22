import React, { useEffect, useState } from "react";
import axios from "axios";

export const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/product/getallproducts",
          { withCredentials: true },
        );

        if (!response) return console.log("couldnt fetch inventory items");

        return response;
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata()
      .then((result) => {
        setProducts(result.data.allproduct);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleIsAvailable = async (id, checked) => {

    setProducts((prev) => {
      const updated = prev.map((p) =>
        p._id === id ? { ...p, isAvailable: checked } : p,
      );
      return updated;
    });

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/product/update/${id}`,
        { isAvailable: checked },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 py-8 px-40 flex flex-col justify-between bg-[#FAFAF8]">
      <div className="w-full md:p-10 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22392C]"></span>
          <span className="text-xs font-semibold text-[#22392C] tracking-wide uppercase">Stock</span>
        </div>
        <h2 className="pb-4 text-lg font-medium text-[#1A1A18]">All products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl bg-white border border-[#E5E3DB]">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-[#1A1A18] text-sm text-left bg-[#EDF5E7]/50">
              <tr>
                <th className="px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate hidden md:block">
                  Selling price
                </th>
                <th className="px-4 py-3 font-medium truncate">In stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#6B6B66]">
              {products?.map((product, index) => (
                <tr key={index} className="border-t border-[#E5E3DB]">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-[#EDF5E7] rounded-lg overflow-hidden w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img src={product.img} alt="Product" className="w-9 h-9 object-contain" />
                    </div>
                    <span className="truncate max-sm:hidden w-full text-[#1A1A18] font-medium">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden text-[#1A1A18]">₹{product.price}</td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-[#1A1A18] gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={Boolean(product.isAvailable)}
                        onChange={(e) =>
                          handleIsAvailable(product._id, e.target.checked)
                        }
                      />
                      <div className="w-12 h-7 bg-[#E5E3DB] rounded-full peer peer-checked:bg-[#22392C] transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};