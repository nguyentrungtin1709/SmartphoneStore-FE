import {useLoaderData, useNavigate} from "react-router-dom";
import Table from "../components/Table.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import Rating from '@mui/material/Rating';
import {useState} from "react";
import Quantity from "../components/Quantity.jsx";
import {useCart} from "../hooks/useCart.jsx";

function Smartphone() {
    const smartphone = useLoaderData()
    const [quantity, setQuantity] = useState(1)
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const navigate = useNavigate()

    const handleAddProductIntoCart = (smartphone, quantity) => {
        setProductIntoCart(smartphone, quantity)
        navigate("/cart")
    }

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 2xl:px-16 items-center lg:justify-between sm:gap-2 w-full bg-white text-gray-600">
            <div className="flex flex-col items-center h-full py-8 2xl:py-10">
                    <h1 className="w-full flex justify-center items-center text-center text-3xl font-bold">
                        {smartphone.name}
                    </h1>
                    <div className="flex justify-center items-center mt-6">
                        <img src={smartphone.imageUrl} alt={smartphone.name} className="w-96"/>
                    </div>
            </div>
            <div className="flex items-center justify-center w-full h-full py-8 2xl:py-10 border-t lg:border-l">
                <div className="flex flex-col px-8">
                    <h1 className="text-xl font-bold mb-4">
                        Cấu hình {smartphone.name}
                    </h1>
                    <Table smartphone={smartphone} />
                    <div className="flex flex-col mt-4">
                        <h1 className="font-bold text-red-500 text-2xl relative">
                            Giá bán: {getPrice(smartphone.price)}
                            <span className="absolute top-0 text-sm">
                                ₫
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between w-full mt-6">
                        <div className="flex flex-row w-full mb-6 md:mb-0">
                            <span className="font-bold mr-6 md:mr-4">
                                Số lượng:
                            </span>
                            <Quantity quantity={quantity} setQuantity={setQuantity} />
                        </div>
                        <div className="flex flex-row justify-center md:justify-end items-center w-full">
                            <button
                                className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-3 rounded-lg"
                                onClick={() => handleAddProductIntoCart(smartphone, quantity)}
                            >
                                Mua hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 flex justify-center items-center">
                <div className="flex flex-row items-center my-2">
                            <span className="mr-1 text-xl font-bold text-orange-400">
                                4.3
                            </span>
                    <Rating name="smartphone-rating" defaultValue={4.3} precision={0.1} readOnly />
                    <p className="ml-1 text-purple-600">
                        337 đánh giá
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Smartphone