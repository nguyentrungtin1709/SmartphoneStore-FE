import CircularProgress from "@mui/material/CircularProgress";
import {Link} from "react-router-dom";
import {ViewButton} from "../../components/ViewButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {UpdateButton} from "../../components/UpdateButton.jsx";

export function Brands() {
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState()
    const authAxios = useAuthAxios()

    useEffect(() => {
        authAxios
            .get("/api/v1/brands")
            .then(response => {
                setBrands(response.data)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleDeleteBrand = (brandId) => {
        authAxios
            .delete(`/api/v1/admin/brands/${brandId}`)
            .then(response => {
                authAxios
                    .get("/api/v1/brands")
                    .then(response => {
                        setBrands(response.data)
                    })
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
                    <div className="flex flex-row items-center justify-between my-3">
                        <div className="flex flex-row">
                        </div>
                        <div>
                            <Link
                                to="/admin/brands/form"
                                className="flex flex-row items-center justify-center w-fit h-fit px-2 py-1 text-green-600 hover:bg-green-700 hover:text-white rounded-lg"
                            >
                                Thêm thương hiệu
                            </Link>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 bg-white">
                            <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Mã số
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên thương hiệu
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                brands?.map(brand =>
                                    <tr key={brand.id} className="bg-white border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {brand.id}
                                        </th>
                                        <td className="px-4 py-3">
                                            {brand.name}
                                        </td>
                                        <td className="flex flex-row px-4 py-3">
                                            <ViewButton
                                                url={`/admin/brands/${brand.id}`}
                                            />
                                            <UpdateButton
                                              url={`/admin/brands/form?id=${brand.id}`}
                                            />
                                            <DeleteButton
                                                onClick={() => handleDeleteBrand(brand.id)}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}