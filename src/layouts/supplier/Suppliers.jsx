import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate} from "react-router-dom";
import {ViewButton} from "../../components/ViewButton.jsx";
import {UpdateButton} from "../../components/UpdateButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function Suppliers() {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [suppliers, setSuppliers] = useState()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    useEffect(() => {
        authAxios
            .get(`/api/v1/admin/suppliers?page=${page}`)
            .then(response => {
                setSuppliers(response.data)
            })
            .catch(errors => {
                console.log(errors)
            })
    }, [page]);

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleDeleteSupplier = (supplierId) => {
        authAxios
            .delete(`/api/v1/admin/suppliers/${supplierId}`)
            .then(res => {
                authAxios
                    .get(`/api/v1/admin/suppliers?page=${page}`)
                    .then(response => {
                        setSuppliers(response.data)
                    })
                    .catch(errors => {
                        console.log(errors)
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
                    <h1
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600 cursor-pointer"
                        onClick={() => {
                            setPage(0)
                            navigate("/admin/suppliers")
                        }}
                    >
                        Nhà cung cấp
                    </h1>
                    <div className="flex flex-row items-center justify-between my-3">
                        <div className="flex flex-row">
                        </div>
                        <div>
                            <Link
                                to="/admin/suppliers/form"
                                className="flex flex-row items-center justify-center w-fit h-fit px-2 py-1 text-green-600 hover:bg-green-700 hover:text-white rounded-lg"
                            >
                                Thêm nhà cung cấp
                            </Link>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 bg-white">
                            <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Mã số
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tên công ty
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                suppliers?.content.map(supplier =>
                                    <tr key={supplier.id} className="bg-white border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {supplier.id}
                                        </th>
                                        <td className="px-4 py-3">
                                            {supplier.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {supplier.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            {supplier.phone}
                                        </td>
                                        <td className="px-4 py-3">
                                            {getDate(supplier.createdAt)}
                                        </td>
                                        <td className="flex flex-row px-4 py-3">
                                            <ViewButton
                                                url={`/admin/suppliers/${supplier.id}`}
                                            />
                                            <UpdateButton
                                                url={`/admin/suppliers/form?id=${supplier.id}`}
                                            />
                                            <DeleteButton
                                                onClick={() => handleDeleteSupplier(supplier.id)}
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
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${suppliers?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                            disabled={suppliers?.first}
                            onClick={() => {
                                if (page <= 0) {
                                    setPage(0)
                                } else {
                                    setPage(page - 1)
                                }
                            }}
                        >
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                            {page}
                        </span>
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${suppliers?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                            disabled={suppliers?.last}
                            onClick={() => {
                                setPage(page + 1)
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