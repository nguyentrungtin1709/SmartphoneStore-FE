import {useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import {useNavigate} from "react-router-dom";

export function PasswordUpdating() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const { logout } = useAuthFeatures()
    const [errors, setErrors] = useState({
        oldPass: "",
        newPass: "",
        conPass: ""
    })

    const handleChangePassword = () => {
        const data = {
            oldPassword,
            newPassword,
            confirm: conPassword
        }
        if (newPassword !== conPassword){
            return setErrors({
                ...errors,
                conPass: "Mật khẩu không khớp"
            })
        } else {
            setErrors({
                ...errors,
                conPass: ""
            })
        }
        authAxios
            .put("/api/v1/account/profile/password", data)
            .then(response => {
                logout()
                navigate("/login")
            })
            .catch(error => {
                const status = error.response.status
                const data = error.response.data
                if (status === 403){
                    setErrors({
                        ...errors,
                        oldPass: "Mật khẩu không chính xác"
                    })
                }
                if (status === 400){
                    setErrors({
                        newPass: data?.newPassword,
                        oldPass: data?.oldPassword,
                        conPass: data?.confirm
                    })
                }
            })
    }

    return (
        <div className="flex flex-col w-full bg-white px-4 py-4 xl:col-span-2">
            <h1 className="font-bold text-2xl">
                Thay đổi mật khẩu
            </h1>
            <div className="flex justify-center mt-20 md:mt-32 w-full h-full">
                <div className="flex flex-col border h-fit px-6 py-8 rounded-lg">
                    <div className="mb-6">
                        <input
                            className="outline-0 border border-stone-400 px-2 py-1 rounded-lg w-72 lg:w-80 xl:w-96"
                            type="password"
                            value={oldPassword}
                            placeholder="Mật khẩu hiện tại"
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        {errors.oldPass !== "" &&
                            <p
                                className="mt-2 text-red-500 w-72 md:w-80 xl:w-96"
                            >
                                {errors.oldPass}
                            </p>
                        }
                    </div>
                    <div className="mb-6">
                        <input
                            className="outline-0 border border-stone-400 px-2 py-1 rounded-lg w-72 lg:w-80 xl:w-96"
                            type="password"
                            value={newPassword}
                            placeholder="Mật khẩu mới"
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        {errors.newPass !== "" &&
                            <p
                                className="mt-2 text-red-500 w-72 md:w-80 xl:w-96"
                            >
                                {errors.newPass}
                            </p>
                        }
                    </div>
                    <div className="mb-6">
                        <input
                            className="outline-0 border border-stone-400 px-2 py-1 rounded-lg w-72 lg:w-80 xl:w-96"
                            type="password"
                            value={conPassword}
                            placeholder="Nhập lại mật khẩu"
                            onChange={e => setConPassword(e.target.value)}
                        />
                        {errors.conPass !== "" &&
                            <p
                                className="mt-2 text-red-500 w-72 md:w-80 xl:w-96"
                            >
                                {errors.conPass}
                            </p>
                        }
                    </div>
                    <button
                        className="px-2 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-800 hover:text-gray-300 disabled:bg-gray-500"
                        onClick={handleChangePassword}
                        disabled={oldPassword === "" || newPassword === "" || conPassword === ""}
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    )
}