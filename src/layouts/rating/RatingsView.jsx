import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {getPrice} from "../../utils/getPrice.jsx";
import {ViewButton} from "../../components/ViewButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";

export function RatingsView() {
    const [loading, setLoading] = useState(true)
    const [ratings, setRatings] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const page = searchParams.get("page")
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    useEffect(() => {
        authAxios
            .get(`/api/v1/admin/ratings${page == null ? "" : `?page=${page}`}`)
            .then(response => {
                setRatings(response.data)
            })
            .catch(errors => {
                console.log(errors)
            })
    }, [page]);

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

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

    const handleDeleteRating = ( ratingId ) => {
        authAxios
            .delete(`/api/v1/admin/ratings/${ratingId}`)
            .then(response => {
                authAxios
                    .get(`/api/v1/admin/ratings${page == null ? "" : `?page=${page}`}`)
                    .then(response => {
                        if (response.data.content.length === 0){
                            navigate("/admin/ratings")
                        }
                        setRatings(response.data)
                    })
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
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600 mb-4"
                    >
                        Đánh giá
                    </Link>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 bg-white">
                            <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Mã số
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tài khoản
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Số sao
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Nội dung
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" className="px-4 py-3">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                ratings?.content.map(rating =>
                                    <tr key={rating.id} className="bg-white border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {rating.id}
                                        </th>
                                        <td className="px-4 py-3">
                                            {rating.account.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            {rating.smartphone.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {(rating.star === "ONE" || rating.star === "TWO") &&
                                                <span className="text-red-500 font-bold text-lg">
                                                    {getNumberFromStar(rating.star)}
                                                </span>
                                            }
                                            {(rating.star === "FOUR" || rating.star === "FIVE") &&
                                                <span className="text-green-500 font-bold text-lg">
                                                    {getNumberFromStar(rating.star)}
                                                </span>
                                            }
                                            {(rating.star === "THREE") &&
                                                <span className="text-yellow-500 font-bold text-lg">
                                                    {getNumberFromStar(rating.star)}
                                                </span>
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            {rating.comment}
                                        </td>
                                        <td className="px-4 py-3">
                                            {getDate(rating.createdAt)}
                                        </td>
                                        <td className="flex flex-row px-4 py-3">
                                            <ViewButton
                                                url={`/admin/ratings/${rating.id}`}
                                            />
                                            <DeleteButton
                                                onClick={() => handleDeleteRating(rating.id)}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full h-full my-3">
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                            disabled={ratings?.first}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const prevPage = Number(curPage) - 1
                                setSearchParams(prev => {
                                    prev.set("page", prevPage)
                                    return prev
                                })
                            }}
                        >
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                            {page == null ? "0" : page}
                        </span>
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                            disabled={ratings?.last}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const nextPage = Number(curPage) + 1
                                setSearchParams(prev => {
                                    prev.set("page", nextPage)
                                    return prev
                                })
                            }}
                        >
                            <i className="uil uil-arrow-right"></i>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}