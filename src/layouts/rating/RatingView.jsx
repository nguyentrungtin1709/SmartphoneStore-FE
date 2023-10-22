import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ViewButton} from "../../components/ViewButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {getPrice} from "../../utils/getPrice.jsx";
import Rating from "@mui/material/Rating";

export function RatingView() {
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        authAxios
            .get(`/api/v1/admin/ratings/${params.ratingId}`)
            .then(response => {
                setRating(response.data)
            })
            .catch(errors => {
                console.log(errors)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const getNumberFromStar = (star) => {
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

    const handleDeleteRating = () => {
        authAxios
            .delete(`/api/v1/admin/ratings/${rating.id}`)
            .then(response => {
                navigate("/admin/ratings")
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full h-full">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-rows-min w-full h-full px-3 py-3">
                    <Link
                        to="/admin/ratings"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600 mb-2"
                    >
                        Đánh giá
                    </Link>
                    <div className="flex flex-col items-center w-full">
                        <div className="flex flex-row justify-center items-center w-full mb-3">
                            <h2 className="text-xl">
                                Chi tiết đánh giá
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
                            <div className="col-span-1 flex flex-col w-full px-3 border rounded-md">
                                <div className="flex flex-row justify-center items-center w-full my-2">
                                    <h2 className="font-bold text-purple-600">
                                        Thông tin người dùng
                                    </h2>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Email:
                                    </span>
                                    <span>
                                        {rating.account.email}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Họ và tên:
                                    </span>
                                    <span>
                                        {rating.account.name}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Số điện thoại:
                                    </span>
                                    <span>
                                        {rating.account.phone}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    <Link
                                        to={`/admin/customers/${rating.account.id}`}
                                        className="flex flex-row justify-center items-center my-2 text-purple-600 hover:translate-x-2 hover:duration-500"
                                    >
                                        Thông tin chi tiết
                                        <i className="uil uil-arrow-right mx-1 text-lg"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col w-full px-3 border rounded-md">
                                <div className="flex flex-row justify-center items-center w-full my-2">
                                    <h2 className="font-bold text-purple-600">
                                        Thông tin sản phẩm
                                    </h2>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Mã sản phẩm:
                                    </span>
                                    <span>
                                        {rating.smartphone.id}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Tên sản phẩm
                                    </span>
                                    <span>
                                        {rating.smartphone.name}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center my-2">
                                    <span className="font-bold">
                                        Giá bán:
                                    </span>
                                    <span>
                                        {getPrice(rating.smartphone.price)} đ
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    <Link
                                        to={`/admin/smartphones/${rating.smartphone.id}`}
                                        className="flex flex-row justify-center items-center my-2 text-purple-600 hover:translate-x-2 hover:duration-500"
                                    >
                                        Thông tin chi tiết
                                        <i className="uil uil-arrow-right mx-1 text-lg"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full border rounded-md my-1 px-3 py-2">
                            <div className="flex flex-row justify-start items-center my-1">
                                <span className="font-bold mr-2">
                                    Số sao:
                                </span>
                                <Rating
                                    name="rating-detail"
                                    value={getNumberFromStar(rating.star)}
                                    precision={1}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row justify-start items-center my-1">
                                <span className="flex font-bold mr-2">
                                    Nội dung:
                                </span>
                                <span>
                                    {rating.comment}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center my-4">
                            <button
                                className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-red-600 border border-red-500 hover:bg-red-500 hover:text-white rounded-lg"
                                onClick={handleDeleteRating}
                            >
                                Xóa đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}