import { useLoaderData, useNavigate} from "react-router-dom";
import Table from "../components/Table.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react";
import Quantity from "../components/Quantity.jsx";
import {useCart} from "../hooks/useCart.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {useAxios} from "../hooks/useAxios.jsx";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";

function Smartphone() {
    const smartphone = useLoaderData()
    const [quantity, setQuantity] = useState(1)
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const [ratings, setRatings] = useState()
    const [statistic, setStatistic] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const axios = useAxios()

    const handleAddProductIntoCart = (smartphone, quantity) => {
        setProductIntoCart(smartphone, quantity)
        navigate("/cart")
    }

    useEffect(() => {
        axios
            .get(`/api/v1/ratings/smartphone/${smartphone.id}?page=${page}`)
            .then(response => {
                setRatings(response.data)
            })
        axios
            .get(`/api/v1/ratings/smartphone/${smartphone.id}/rate`)
            .then(response => {
                setStatistic(response.data)
            })
    },[page])

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const getStar = (star) => {
        switch (star){
            case "ONE":
                return 1
            case  "TWO":
                return 2
            case "THREE":
                return 3
            case "FOUR":
                return 4
            case "FIVE":
                return 5
        }
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
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
                    <div className="lg:col-span-2 flex w-full border-t">
                        <div className="flex flex-col items-start w-full px-2 py-2 my-2 border rounded-lg">
                            <h1 className="font-bold text-sm md:text-xl">
                                Đánh giá {smartphone.name}
                            </h1>
                            <div className="flex flex-row items-center my-4">
                                <h1 className="mx-2 font-bold text-xl text-yellow-600">
                                    {statistic.rate === "NaN" ? 0 : statistic.rate.toFixed(2)}
                                </h1>
                                <Rating name="read-only" value={statistic.rate} precision={0.1} readOnly />
                                <p className="flex mx-2 text-purple-600">
                                    {statistic.quantity} đánh giá
                                </p>
                            </div>
                            <div className="flex flex-col items-start mx-2">
                                <div className="flex flex-row items-center">
                                    <p className="flex flex-row items-center mx-1">
                                        <Rating name="read-only" value={5} size={"small"} readOnly />
                                    </p>
                                    <p>
                                        - ({statistic.five})
                                    </p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="flex flex-row items-center mx-1">
                                        <Rating name="read-only" value={4} size={"small"} readOnly />
                                    </p>
                                    <p>
                                        - ({statistic.four})
                                    </p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="flex flex-row items-center mx-1">
                                        <Rating name="read-only" value={3} size={"small"} readOnly />
                                    </p>
                                    <p>
                                        - ({statistic.three})
                                    </p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="flex flex-row items-center mx-1">
                                        <Rating name="read-only" value={2} size={"small"} readOnly />
                                    </p>
                                    <p>
                                        - ({statistic.two})
                                    </p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="flex flex-row items-center mx-1">
                                        <Rating name="read-only" value={1} size={"small"} readOnly />
                                    </p>
                                    <p>
                                        - ({statistic.one})
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full my-4">
                                {ratings?.content.map(rating =>
                                    <div key={rating.id} className="flex flex-col px-2 py-2 w-full border rounded-sm my-1">
                                        <div className="flex flex-row">
                                            <div className="flex mx-2">
                                                {
                                                    rating.account.imageUrl == null ?
                                                        <Avatar
                                                            sx={{
                                                                bgcolor: deepPurple[500],
                                                                width: 30,
                                                                height: 30
                                                            }}
                                                        >
                                                            {rating.account.name[0]}
                                                        </Avatar> :
                                                        <Avatar
                                                            alt="Avatar"
                                                            src={rating.account.imageUrl}
                                                            sx={{
                                                                width: 30,
                                                                height: 30
                                                            }}
                                                        />
                                                }
                                            </div>
                                            <div className="mr-2">
                                                {rating.account.name}
                                            </div>
                                            <Rating name="read-only" value={getStar(rating.star)} precision={0.1} readOnly />
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <p className="mx-8">
                                                {rating.comment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row items-center justify-center w-full">
                                <button
                                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                                    disabled={ratings?.first}
                                    onClick={() => setPage(page - 1)}
                                >
                                    <i className="uil uil-arrow-left"></i>
                                </button>
                                <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                                    {page}
                                </span>
                                <button
                                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                                    disabled={ratings?.last}
                                    onClick={() => setPage(page + 1)}
                                >
                                    <i className="uil uil-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

export default Smartphone