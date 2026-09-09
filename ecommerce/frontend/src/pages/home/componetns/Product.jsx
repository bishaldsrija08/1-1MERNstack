import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../../http"

export default function Product() {
    const [products, setProducts] = useState([])

    const fetchProducts = async ()=>{
        // const response = await axios.get("http://localhost:3000/api/globals/products/")
        const response = await API.get("/globals/products/")
        if(response.status==200){
            setProducts(response.data.data)
        }
    }

    useEffect(()=>{
        fetchProducts();
    }, [])
    return (
        <div className="relative w-full">
            <div className="relative bg-white-50">
                <div className="container px-6 pt-20 m-auto md:px-12 lg:px-7">
                    <h1 className="text-2xl font-bold text-yellow-900 md:text-3xl lg:w-10/12">Our Popular Foods</h1>

                    <div className="flex flex-wrap justify-between gap-8 mt-10">
                        {products.map((product) => (
                            <Link to={`/productdetails/${product._id}`} key={product._id}>
                                <div className="mx-auto overflow-hidden duration-300 transform bg-white rounded-lg shadow-md w-80 hover:scale-105 hover:shadow-lg">
                                    <img className="object-cover object-center w-full h-48" src={product.productImageUrl} alt={product.productName} />
                                    <div className="p-4">
                                        <h2 className="mb-2 text-lg font-medium text-gray-900">{product.productName}</h2>
                                        <p className="mb-4 text-base text-gray-700">{product.productDescription}</p>
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900">${product.productPrice.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">New launch</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}