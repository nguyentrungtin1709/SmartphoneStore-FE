import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function Supplier() {
    const [loading, setLoading] = useState(true)
    const [supplier, setSupplier] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)

        const supplierId = params.supplierId
        authAxios
            .get(`/api/v1/admin/suppliers/${supplierId}`)
            .then(response => {
                setSupplier(response.data)
            })
            .catch(errors => {
                console.log(errors)
            })
    },[])

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleDeleteSupplier = () => {
        authAxios
            .delete(`/api/v1/admin/suppliers/${supplier.id}`)
            .then(response => {
                navigate("/admin/suppliers")
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
                        to="/admin/suppliers"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Nhà cung cấp
                    </Link>
                    <div className="flex flex-row justify-center items-center w-full h-full">
                        <div className="flex flex-col px-4 py-2 border rounded-lg w-full md:w-1/2">
                            <h1 className="flex justify-center font-bold text-2xl text-purple-600 mb-3">
                                Nhà cung cấp
                            </h1>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Mã số:
                                </span>
                                <span className="text-purple-600">
                                    {supplier?.id}
                                </span>
                            </div>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Tên công ty:
                                </span>
                                <span className="text-purple-600">
                                    {supplier?.name}
                                </span>
                            </div>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Địa chỉ email:
                                </span>
                                <span className="text-purple-600">
                                    {supplier?.email}
                                </span>
                            </div>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Số điện thoại:
                                </span>
                                <span className="text-purple-600">
                                    {supplier?.phone}
                                </span>
                            </div>
                            <div className="flex justify-between my-1">
                                <span className="font-bold">
                                    Ngày tạo:
                                </span>
                                <span className="text-purple-600">
                                    {getDate(supplier?.createdAt)}
                                </span>
                            </div>
                            <div className="flex flex-row justify-center items-center my-3">
                                <Link
                                    to={`/admin/suppliers/form?id=${supplier?.id}`}
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-yellow-600 hover:bg-yellow-500 hover:text-stone-900 rounded-lg"
                                >
                                    <i className="uil uil-edit"></i>
                                    <span className="ml-1">
                                        Chỉnh sữa
                                    </span>
                                </Link>
                                <button
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-red-600 hover:bg-red-500 hover:text-white rounded-lg"
                                    onClick={handleDeleteSupplier}
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