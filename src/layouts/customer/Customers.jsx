import {Link, useSearchParams} from "react-router-dom";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {ViewButton} from "../../components/ViewButton.jsx";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export function Customers() {
    const [users, setUsers] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get("keyword")
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState("")
    const authAxios = useAuthAxios()

    useEffect(() => {
        if (keyword != null) {
            authAxios
                .get(`/api/v1/admin/accounts/search?page=${page}&key=${keyword}`)
                .then(response => {
                    setUsers(response.data)
                })
        } else {
            authAxios
                .get(`/api/v1/admin/accounts?page=${page}`)
                .then(response => {
                    setUsers(response.data)
                })
        }
    },[page, keyword])

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleDeleteUser = (userId) => {
        authAxios
            .delete(`/api/v1/admin/accounts/${userId}`)
            .then(response => {
                authAxios
                    .get(`/api/v1/admin/accounts?page=${page}`)
                    .then(response => {
                        setUsers(response.data)
                    })
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full h-full">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-cols-auto w-full h-full px-3 py-3">
                    <Link
                        to="/admin/customers"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Người dùng
                    </Link>
                    <div className="flex flex-row items-center justify-between my-6">
                        <div className="flex flex-row">
                            <input
                                className="w-72 md:w-80 xl:w-96 px-3 py-1 border border-purple-600 rounded-tl-full rounded-bl-full"
                                placeholder="Hãy nhập email"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <button
                                className="flex items-center md:px-2 md:py-1 text-purple-600 border border-purple-600 rounded-tr-full rounded-br-full hover:bg-purple-600 hover:text-white disabled:bg-inherit disabled:border-gray-400 disabled:text-gray-600"
                                disabled={text === ""}
                                onClick={() => {
                                    setSearchParams({
                                        keyword: text
                                    })
                                }}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                        <div>
                            <Link
                                to="/admin/customers/form"
                                className="hidden md:flex flex-row items-center justify-center w-fit h-fit px-2 py-1 text-green-600 hover:bg-green-700 hover:text-white rounded-lg"
                            >
                                Thêm người dùng
                            </Link>
                            <Link
                                to="/admin/customers/form"
                                className="flex md:hidden flex-row items-center justify-center w-fit h-fit text-3xl px-2 py-1 text-green-600 hover:bg-green-700 hover:text-white rounded-lg"
                            >
                                <i className="uil uil-user-plus"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 bg-white">
                            <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Họ và tên
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Role
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
                                users?.content.map(user =>
                                    <tr key={user.id} className="bg-white border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {user.email}
                                        </th>
                                        <td className="px-4 py-3">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.phone}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.role}
                                        </td>
                                        <td className="px-4 py-3">
                                            {getDate(user.createdAt)}
                                        </td>
                                        <td className="flex flex-row px-4 py-3">
                                            <ViewButton
                                                url={`/admin/customers/${user.id}`}
                                            />
                                            <DeleteButton
                                                onClick={() => handleDeleteUser(user.id)}
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
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${users?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                            disabled={users?.first}
                            onClick={() => {
                                setPage(page - 1)
                            }}
                        >
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                            {page}
                        </span>
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${users?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                            disabled={users?.last}
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