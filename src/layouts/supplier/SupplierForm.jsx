import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate} from "react-router-dom";
import {AdminInput} from "../../components/AdminInput.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function SupplierForm() {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleCreateSupplier = () => {
        const data = {
            name,
            email,
            phone
        }
        authAxios
            .post("/api/v1/admin/suppliers", data)
            .then(response => {
                navigate("/admin/suppliers")
            })
            .catch(errors => {
                console.log(errors.response.data)
                setErrors(errors.response.data)
            })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full h-full">
                    <CircularProgress />
                </div> :
                <div className="w-full flex flex-col items-center px-3 py-3">
                    <Link
                        to="/admin/suppliers"
                        className="w-full flex flex-row justify-start items-center text-lg font-bold hover:text-purple-600"
                    >
                        Nhà cung cấp
                    </Link>
                    <h1 className="flex justify-center my-3 font-bold text-xl text-purple-600">
                        Thêm nhà cung cấp
                    </h1>
                    <div className="flex flex-col w-fit">
                        <AdminInput
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Tên công ty"
                            className={"my-3"}
                        />
                        {
                            errors != null &&
                            <span className="text-red-500 mb-3">
                                {errors?.name}
                            </span>
                        }
                    </div>
                    <div className="flex flex-col w-fit">
                        <AdminInput
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Địa chỉ email"
                            className={"my-3"}
                        />
                        {
                            errors != null &&
                            <span className="text-red-500 mb-3">
                                {errors?.email}
                            </span>
                        }
                    </div>
                    <div className="flex flex-col w-fit">
                        <AdminInput
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="Số điện thoại"
                            className={"my-3"}
                        />
                        {
                            errors != null &&
                            <span className="text-red-500 mb-3">
                                {errors?.phone}
                            </span>
                        }
                    </div>
                    <div
                        className="my-2"
                    >
                        <AdminButton
                            disabled={name === "" || email === "" || phone === ""}
                            onClick={handleCreateSupplier}
                        >
                            Tạo mới
                        </AdminButton>
                    </div>
                </div>
            }
        </>
    )
}