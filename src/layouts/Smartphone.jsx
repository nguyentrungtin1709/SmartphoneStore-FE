import { useLoaderData, useNavigate} from "react-router-dom";
import Table from "../components/Table.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react";
import {useCart} from "../hooks/useCart.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {useAxios} from "../hooks/useAxios.jsx";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import useAccount from "../hooks/useAccount.jsx";

function Smartphone() {
    const smartphone = useLoaderData()
    const [quantity, setQuantity] = useState(1)
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const [ratings, setRatings] = useState()
    const [statistic, setStatistic] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [star, setStar] = useState(0)
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const authAxios = useAuthAxios()
    const [errors, setErrors] = useState({
        message: ""
    })
    const account = useAccount()
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

    const getNumber = (number) => {
        switch (star){
            case 1:
                return "ONE"
            case 2:
                return "TWO"
            case 3:
                return "THREE"
            case 4:
                return "FOUR"
            case 5:
                return "FIVE"
        }
    }

    const handleRating = () => {
        const data = {
            smartphone: smartphone,
            star: getNumber(star),
            comment: comment
        }
        if (account == null){
            setErrors({
                message: "Hãy đăng nhập để thực hiện đánh giá"
            })
            return
        }
        authAxios
            .post("/api/v1/account/ratings", data)
            .then(response => {
                axios
                    .get(`/api/v1/ratings/smartphone/${smartphone.id}?page=0`)
                    .then(response => {
                        setRatings(response.data)
                    })
                setComment("")
                setStar(0)
                setErrors({
                    message: ""
                })
            })
            .catch(errors => {
                setErrors({
                    message: errors.response.data.message || errors.response.data.comment
                })
                setStar(0)
                setComment("")
            })
    }

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main className="grid grid-cols-1 lg:grid-cols-3 lg:px-4 items-center lg:justify-between sm:gap-2 w-full bg-white text-gray-600">
                    <h1 className="lg:col-span-3 flex px-4 lg:px-0 flex-row justify-start items-center w-full my-3 text-xl lg:text-2xl font-bold">
                        {smartphone.name}
                    </h1>
                    <div className="lg:col-span-1 flex flex-col items-center border h-full py-8 2xl:py-10 rounded-md">
                        <div className="flex justify-center items-center mt-6">
                            <img src={smartphone.imageUrl} alt={smartphone.name} className="w-96"/>
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex items-center justify-center w-full h-full px-4 md:px-0 py-8 2xl:py-10 border rounded-md">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold mb-4">
                                Cấu hình chi tiết
                            </h1>
                            <Table smartphone={smartphone} />
                            <div className="flex flex-col mt-4">
                                <h1 className="text-red-500 text-xl">
                                    Giá bán: {getPrice(smartphone.price)}
                                    <span className="ml-1">
                                        đ
                                    </span>
                                </h1>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between w-full mt-4">
                                <div className="flex flex-row w-full mb-4 md:mb-0">
                                    <span className="font-bold mr-3">
                                        Số lượng:
                                    </span>
                                    <div className="flex flex-row justify-center items-center">
                                        <button
                                            className="flex items-center justify-center px-2 py-1 border rounded-bl-xl rounded-tl-xl hover:text-white hover:bg-purple-500"
                                            onClick={() => {
                                                if (quantity <= 1) {
                                                    setQuantity(1)
                                                } else {
                                                    setQuantity(quantity - 1)
                                                }
                                            }}
                                        >
                                            <i className="uil uil-minus"></i>
                                        </button>
                                        <div className="flex items-center justify-center px-3 py-1 border text-purple-600 font-bold">
                                            {quantity}
                                        </div>
                                        <button
                                            className="flex items-center justify-center px-2 py-1 border rounded-br-xl rounded-tr-xl hover:text-white hover:bg-purple-500"
                                            onClick={() => {
                                                setQuantity(quantity + 1)
                                            }}
                                        >
                                            <i className="uil uil-plus"></i>
                                        </button>
                                    </div>
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
                    <div className="lg:col-span-3 flex w-full">
                        <div className="flex flex-col items-start w-full px-2 py-2 my-2 border border-stone-300 rounded-lg">
                            <h1 className="font-bold text-sm md:text-xl">
                                Đánh giá {smartphone.name}
                            </h1>
                            <div className="flex flex-row items-center my-4">
                                <h1 className="mx-2 font-bold text-xl text-yellow-600">
                                    {(statistic == null || statistic.rate === "NaN") ? 0 : statistic.rate.toFixed(2)}
                                </h1>
                                <Rating name="read-only" value={(statistic == null || statistic.rate === "NaN") ? 0 : Number(statistic.rate.toFixed(1)) } precision={0.1} readOnly />
                                <p className="flex mx-2 text-purple-600">
                                    {statistic?.quantity} đánh giá
                                </p>
                            </div>
                            <div className="flex flex-row flex-wrap items-start">
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        5 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.five})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        4 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.four})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        3 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.three})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        2 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.two})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        1 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.one})
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-start mx-2">
                                <button
                                    className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-3 my-2 rounded-lg"
                                    onClick={() => setShow(!show)}
                                >
                                    Đánh giá {show ? <i className="uil uil-angle-up"></i>: <i className="uil uil-angle-down"></i>}
                                </button>
                            </div>
                            <div className={`${show ? "flex" : "hidden"} flex-col items-start px-2 py-2 mx-2 my-2 border rounded-lg w-full`}>
                                <div className="flex items-center">
                                    <span className="w-20">
                                        Số sao:
                                    </span>
                                    <Rating
                                        name="rating-controlled"
                                        value={star}
                                        onChange={(event) => {
                                            setStar(
                                                Number(event.target.value)
                                            );
                                        }}
                                    />
                                    <span className="flex mx-2 text-sm text-red-500">
                                        (Bắt buộc)
                                    </span>
                                </div>
                                <div className="flex items-start w-full my-2">
                                    <span className="w-20">
                                        Đánh giá:
                                    </span>
                                    <textarea
                                        className="flex w-full h-36 outline-0 border border-gray-400 rounded-lg placeholder-gray-400"
                                        placeholder={"Mời bạn chia sẻ thêm cảm nhận ... "}
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <div>
                                        {errors.message !== "" && <p className="pl-20 text-red-500">{errors.message}</p>}
                                    </div>
                                    <button
                                        className="bg-purple-600 hover:bg-purple-800 disabled:bg-gray-500 text-white py-2 px-3 rounded-lg"
                                        disabled={star === 0}
                                        onClick={handleRating}
                                    >
                                        Gửi
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full my-4">
                                {ratings?.content.map(rating =>
                                    <div key={rating.id} className="flex flex-col px-2 py-2 w-full border rounded-sm my-1">
                                        <div className="flex flex-col md:flex-row md:justify-between">
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
                                            <div className="hidden md:flex">
                                                <p>{getDate(rating.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mx-12">
                                            <p className="text-stone-900">
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