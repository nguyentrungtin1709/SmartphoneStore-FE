import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function Brand() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const brand = useLoaderData()
    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleDeleteBrand = () => {
        authAxios
            .delete(`/api/v1/admin/brands/${brand.id}`)
            .then(response => {
                navigate("/admin/brands")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-rows-min w-full h-full px-3 py-3">
                    <Link
                        to="/admin/brands"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Thương hiệu
                    </Link>
                    <div className="flex flex-row justify-center items-center w-full h-full">
                        <div className="flex flex-col px-4 py-2 border rounded-lg w-full md:w-1/2">
                            <h1 className="flex justify-center font-bold text-2xl text-purple-600 mb-3">
                                {brand.name}
                            </h1>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Mã số
                                </span>
                                <span className="text-purple-600">
                                    {brand.id}
                                </span>
                            </div>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Tên thương hiệu
                                </span>
                                <span className="text-purple-600">
                                    {brand.name}
                                </span>
                            </div>
                            <div className="flex flex-row justify-center items-center my-3">
                                <Link
                                    to={`/admin/brands/form?id=${brand.id}`}
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-yellow-600 hover:bg-yellow-500 hover:text-stone-900 rounded-lg"
                                >
                                    <i className="uil uil-edit"></i>
                                    <span className="ml-1">
                                        Chỉnh sữa
                                    </span>
                                </Link>
                                <button
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-red-600 hover:bg-red-500 hover:text-white rounded-lg"
                                    onClick={handleDeleteBrand}
                                >
                                    <i className="uil uil-trash-alt"></i>
                                    <span className="ml-1">
                                        Xóa
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}