import {useLoaderData, useNavigate} from "react-router-dom";
import Rating from "@mui/material/Rating";
import {useState} from "react";
import {getPrice} from "../utils/getPrice.jsx";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";

export function RatingEdit() {
    const rating = useLoaderData()
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
    const [star, setStar] = useState(() => getStar(rating.star))
    const [comment, setComment] = useState(rating.comment)
    const [errors, setErrors] = useState({
        message: ""
    })
    const authAxios = useAuthAxios()
    const navigate = useNavigate()

    const handleUpdateRating = () => {
        const data = {
            star: getNumber(star),
            comment
        }
        authAxios
            .put(`/api/v1/account/ratings/${rating.id}`, data)
            .then(response => {
                navigate(-1)
            })
            .catch(error => {
                setErrors({
                    message: error.response.data.comment
                })
            })
    }

    return (
        <div className="xl:col-span-2 flex flex-col w-full h-full bg-white px-4 py-4 rounded-lg">
            <div className="flex flex-row justify-start items-start mb-2">
                <img
                    src={rating.smartphone.imageUrl}
                    alt={rating.smartphone.name}
                    className="w-20"
                />
                <div className="flex flex-col">
                    <h1>
                        {rating.smartphone.name}
                    </h1>
                    <h3 className="text-red-500">
                        {getPrice(rating.smartphone.price)} <span className="underline">đ</span>
                    </h3>
                </div>
            </div>
            <div
                className={`flex flex-col items-start px-2 py-2 mx-2 my-2 border rounded-lg w-full`}
            >
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
                        onClick={handleUpdateRating}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    )
}