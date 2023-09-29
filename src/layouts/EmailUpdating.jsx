import {useNavigate, useOutletContext} from "react-router-dom";
import {useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";

export function EmailUpdating() {

    const [account] = useOutletContext()
    const [email, setEmail] = useState(account.email)
    const [error, setError] = useState("")
    const isdisable = account.email === email
    const { logout } = useAuthFeatures()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    const handleChangeEmail = () => {
        const data = {
            email
        }
        authAxios
            .put("/api/v1/account/profile/email", data)
            .then(() => {
                logout()
                navigate("/login")
            })
            .catch(error => {
                const data = error.response.data
                setError(data.email)
            })
    }

    return (
        <div className="flex flex-col w-full bg-white px-4 py-4 xl:col-span-2">
            <h1 className="font-bold text-2xl">
                Cập nhật địa chỉ email
            </h1>
            <div className="flex justify-center mt-20 md:mt-32 w-full h-full">
               <div className="flex flex-col border h-fit px-6 py-8 rounded-lg">
                   <p className="font-bold mb-4">
                       Địa chỉ email
                   </p>
                   <input
                        className="outline-0 border border-stone-400 px-2 py-1 rounded-lg w-72 mb-3"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                   />
                   {error !== "" &&
                       <p
                        className="mb-6 text-red-500"
                       >
                            {error}
                       </p>
                   }
                   <button
                    className="px-2 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-800 hover:text-gray-300 disabled:bg-gray-500"
                    disabled={isdisable}
                    onClick={handleChangeEmail}
                   >
                       Lưu thay đổi
                   </button>
               </div>
            </div>
        </div>
    )
}