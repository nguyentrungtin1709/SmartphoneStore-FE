import {Link, useLoaderData, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Rating from "@mui/material/Rating";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";

export function Ratings() {
    const data = useLoaderData()
    const [ratings, setRatings] = useState(data)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 0
    const authAxios = useAuthAxios()

    useEffect(() => {
        setRatings(data)
    },[data])

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

    const handleDeleteRating = (ratingId) => {
        authAxios
            .delete(`/api/v1/account/ratings/${ratingId}`)
            .then(response => {
                setSearchParams({
                    page: page
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    return (
        <div className="xl:col-span-2 flex flex-col w-full h-full bg-white px-4 py-4 rounded-lg">
            <h1 className="flex items-center justify-start h-fit font-bold text-xl">
                Danh sách đánh giá
            </h1>
            <div className="flex flex-col w-full h-full my-2">
                {ratings.content.map(rating =>
                    <div key={rating.id} className="flex flex-col xl:flex-row xl:items-center xl:justify-between px-1 py-2 my-1 border rounded-lg">
                        <div className="flex flex-row">
                            <img
                                src={rating.smartphone.imageUrl}
                                alt={rating.smartphone.name}
                                className="w-16 h-fit"
                            />
                            <div className="flex flex-col mx-1">
                                <h1>
                                    {rating.smartphone.name}
                                </h1>
                                <Rating name="read-only" value={getStar(rating.star)} precision={1} readOnly />
                                <p className="flex xl:hidden">
                                    {getDate(rating.createdAt)}
                                </p>
                                {rating.comment !== "" && <p className="flex flex-row mx-1 my-2 px-1 py-2 rounded-lg border xl:w-[600px]">
                                    {rating.comment}
                                </p>}
                            </div>
                        </div>
                        <div className="flex flex-col h-full">
                            <div className="flex flex-row justify-center py-1">
                                <p className="hidden xl:flex">
                                    {getDate(rating.createdAt)}
                                </p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Link
                                    to="/account/ratings/edit"
                                    className="border text-yellow-600 border-yellow-500 px-2 py-1 rounded-lg hover:bg-yellow-500 hover:text-stone-900 mx-2"
                                >
                                    Chỉnh sửa
                                </Link>
                                <button
                                    className="text-red-500 border border-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white mx-2"
                                    onClick={() => handleDeleteRating(rating.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-row items-center justify-center">
                <button
                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                    disabled={ratings.first}
                    onClick={() => setSearchParams({
                        page: page - 1
                    })}
                >
                    <i className="uil uil-arrow-left"></i>
                </button>
                <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                    {page}
                </span>
                <button
                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                    disabled={ratings.last}
                    onClick={() => setSearchParams({
                        page: page + 1
                    })}
                >
                    <i className="uil uil-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}