import {Link, useParams, useSearchParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export function SearchSmartphones() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [smartphones, setSmartphones] = useState()
    const [loading, setLoading] = useState(true)
    const authAxios = useAuthAxios()
    const keyword = params.keyword
    const size = searchParams.get("size")

    useEffect(() => {
        authAxios
            .get(`/api/v1/smartphones/search?key=${keyword}&${size == null ? "size=12" : `size=${size}`}`)
            .then(response => {
                setSmartphones(response.data)
            })
    }, [size]);

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <div className="flex flex-col w-full px-4 py-6">
                    <Link
                        to="/smartphones"
                        className="text-4xl font-bold text-gray-900 hover:text-purple-600"
                    >
                        Sản phẩm
                    </Link>
                    <div className="grid w-full my-2">
                        <div className="flex flex-row justify-start w-full my-2 items-center text-lg">
                            <span className="font-bold mr-2">
                                Từ khóa:
                            </span>
                                    <span>
                                {keyword}
                            </span>
                        </div>
                        {
                            smartphones?.content.length === 0 ?
                                <div className="flex flex-row w-full justify-center items-center h-72">
                                    <h1>
                                        Không tìm thấy sản phẩm
                                    </h1>
                                </div> :
                                <div className="bg-white border rounded-sm">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                            {smartphones?.content.map((smartphone) => (
                                                <Link key={smartphone.id} to={`/smartphones/${smartphone.id}`} className="group border px-2 py-2 rounded-md">
                                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                        <img
                                                            src={smartphone.imageUrl}
                                                            alt={smartphone.name}
                                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                        />
                                                    </div>
                                                    <h3 className="mt-4 h-12 text-sm text-gray-700">{smartphone.name}</h3>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">{getPrice(smartphone.price)} đ</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        }
                        <div className="flex flex-row justify-center items-center my-3">
                            <button className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white bg-purple-500 text-white disabled:bg-gray-400 disabled:text-stone-900"
                                    disabled={smartphones?.last}
                                    onClick={() => {
                                        const number = 8
                                        const pageSize = smartphones?.numberOfElements
                                        const nextPageSize = pageSize + number
                                        setSearchParams({
                                            size: nextPageSize
                                        })
                                    }}
                            >
                                Xem thêm
                                {!smartphones?.last &&
                                    <span className="ml-1">
                                ({smartphones?.totalElements - smartphones?.numberOfElements})
                            </span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}