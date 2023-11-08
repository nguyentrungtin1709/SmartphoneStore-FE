import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {AdminInput} from "../../components/AdminInput.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function SupplierForm() {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const supplierId = searchParams.get("id")
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
        if (supplierId != null){
            authAxios
                .get(`/api/v1/admin/suppliers/${supplierId}`)
                .then(response => {
                    const data = response.data
                    setId(data.id)
                    setName(data.name)
                    setEmail(data.email)
                    setPhone(data.phone)
                })
                .catch(errors => {
                    console.log(errors)
                })
        }
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
                setErrors(errors.response.data)
            })
    }

    const handleUpdateSupplier = () => {
        const data = {
            name,
            email,
            phone
        }
        authAxios
            .put(`/api/v1/admin/suppliers/${id}`, data)
            .then(response => {
                navigate("/admin/suppliers")
            })
            .catch(errors => {
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
                        {supplierId == null ? "Thêm nhà cung cấp" : "Chỉnh sửa"}
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
                        {
                            supplierId == null ?
                            <AdminButton
                                disabled={name === "" || email === "" || phone === ""}
                                onClick={handleCreateSupplier}
                            >
                                Tạo mới
                            </AdminButton> :
                            <AdminButton
                                disabled={name === "" || email === "" || phone === ""}
                                onClick={handleUpdateSupplier}
                            >
                                Cập nhật
                            </AdminButton>
                        }
                    </div>
                </div>
            }
        </>
    )
}