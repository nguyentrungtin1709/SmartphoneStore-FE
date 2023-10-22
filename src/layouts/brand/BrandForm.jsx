import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {ViewButton} from "../../components/ViewButton.jsx";
import {UpdateButton} from "../../components/UpdateButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {AdminInput} from "../../components/AdminInput.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function BrandForm() {
    const brand = useLoaderData()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()
    const [name, setName] = useState(() => {
        if (brand == null){
            return ""
        } else {
            return brand.name
        }
    })
    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleCreateBrand = () => {
        const data = {
            name
        }
        authAxios
            .post("/api/v1/admin/brands", data)
            .then(response => {
                navigate("/admin/brands")
            })
            .catch(error => {
                setErrors({
                    message: error.response.data.name || error.response.data.message
                })
            })
    }

    const handleUpdateBrand = () => {
        const data = {
            name
        }
        authAxios
            .put(`/api/v1/admin/brands/${brand.id}`, data)
            .then(response => {
                navigate("/admin/brands")
            })
            .catch(error => {
                setErrors({
                    message: error.response.data.name || error.response.data.message
                })
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
                        to="/admin/brands"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Thương hiệu
                    </Link>
                    <div className="flex flex-row justify-center items-center w-full h-full">
                        <div className="flex flex-col">
                            <h1 className="flex justify-center my-3 font-bold text-xl text-purple-600">
                                Thêm thương hiệu
                            </h1>
                            <div className="flex flex-row w-fit">
                                <AdminInput
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Tên thương hiệu"
                                    className={"my-3"}
                                />
                            </div>
                            {
                                errors != null &&
                                <span className="text-red-500 mb-3">
                                    {errors.message}
                                </span>
                            }
                            <div className="flex justify-center">
                                {brand == null ?
                                    <AdminButton
                                        disabled={name === ""}
                                        onClick={handleCreateBrand}
                                    >
                                        Tạo mới
                                    </AdminButton> :
                                    <AdminButton
                                        disabled={name === "" || name === brand.name}
                                        onClick={handleUpdateBrand}
                                    >
                                        Chỉnh sửa
                                    </AdminButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}