import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate} from "react-router-dom";
import {AdminInput} from "../../components/AdminInput.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function CustomerForm() {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [phone, setPhone] = useState("")
    const [roleIdx, setRoleIdx] = useState(0)
    const roleList = ["CUSTOMER", "ADMIN"]
    const [errors, setErrors] = useState()
    const authAxios = useAuthAxios()
    const navigate = useNavigate()
    const isActiveButton = name !== "" && email !== "" && password !== "" && confirm !== "" && phone !== ""

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleCreateAccount = () => {
        if (password !== confirm){
            setErrors({
                ...errors,
                confirm: "Mật khẩu không khớp"
            })
            return
        }
        const data = {
            name,
            email,
            password,
            phone
        }
        authAxios
            .post(`/api/v1/admin/accounts?role=${roleList[roleIdx]}`, data)
            .then(response => {
                navigate("/admin/customers")
            })
            .catch(error => {
                setErrors(error.response.data)
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
                        to="/admin/customers"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Người dùng
                    </Link>
                    <div className="flex flex-col w-full my-4">
                        <div className="flex flex-row justify-center items-center mb-4">
                            <h1 className="font-bold text-2xl text-purple-600">
                                Tạo tài khoản
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center items-center py-2">
                            <div className="flex flex-col items-start">
                                <AdminInput placeholder="Họ và tên" value={name} onChange={e => setName(e.target.value)} type={"text"}/>
                                {errors != null &&
                                    <p className="text-red-500 px-1 py-1 w-72 md:w-80 xl:w-96">
                                        {errors.name}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <div className="flex flex-col items-start">
                                <AdminInput placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type={"text"}/>
                                {errors != null &&
                                    <p className="text-red-500 px-1 py-1 w-72 md:w-80 xl:w-96">
                                        {errors.email}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <div className="flex flex-col items-start">
                                <AdminInput placeholder="Mật khẩu" type={"password"} value={password} onChange={e => setPassword(e.target.value)} />
                                {errors != null &&
                                    <p className="text-red-500 px-1 py-1 w-72 md:w-80 xl:w-96">
                                        {errors.password}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <div className="flex flex-col items-start">
                                <AdminInput placeholder="Nhập lại mật khẩu" type={"password"} value={confirm} onChange={e => setConfirm(e.target.value)} />
                                {errors != null &&
                                    <p className="text-red-500 px-1 py-1 w-72 md:w-80 xl:w-96">
                                        {errors.confirm}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <div className="flex flex-col items-start">
                                <AdminInput placeholder="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} type={"text"}/>
                                {errors != null &&
                                    <p className="text-red-500 px-1 py-1 w-72 md:w-80 xl:w-96">
                                        {errors.phone}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <select
                                className="flex w-72 md:w-80 xl:w-96 px-2 py-1 border border-gray-400 rounded-lg text-stone-900"
                                value={roleIdx}
                                onChange={e => setRoleIdx(Number(e.target.value))}
                            >
                                <option
                                    value={0}
                                >
                                    Khách hàng
                                </option>
                                <option
                                    value={1}
                                >
                                    Quản trị viên
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-row justify-center items-center py-2">
                            <AdminButton
                                disabled={!isActiveButton}
                                onClick={handleCreateAccount}
                            >
                                Tạo tài khoản
                            </AdminButton>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}