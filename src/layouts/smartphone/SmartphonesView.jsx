import CircularProgress from "@mui/material/CircularProgress";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {useAxios} from "../../hooks/useAxios.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {ViewButton} from "../../components/ViewButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";
import {UpdateButton} from "../../components/UpdateButton.jsx";
import {getPrice} from "../../utils/getPrice.jsx";

export function SmartphonesView() {
    const [loading, setLoading] = useState(true)
    const [smartphones, setSmartphones] = useState()
    const [brands, setBrands] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [text, setText] = useState("")
    const key = searchParams.get("key")
    const page = searchParams.get("page")
    const brand = searchParams.get("brand")
    const min = searchParams.get("min")
    const max = searchParams.get("max")
    const sort = searchParams.get("sort")
    const prices = [
        {
            value: {
                min: "0",
                max: "100"
            },
            label: 'Giá bán'
        },
        {
            value: {
                min: "0",
                max: "2"
            },
            label: 'Dưới 2 triệu'
        },
        {
            value: {
                min: "2",
                max: "4"
            },
            label: 'Từ 2 - 4 triệu'
        },
        {
            value: {
                min: "4",
                max: "7"
            },
            label: 'Từ 4 - 7 triệu'
        },
        {
            value: {
                min: "7",
                max: "13"
            },
            label: 'Từ 7 - 13 triệu'
        },
        {
            value: {
                min: "13",
                max: "100"
            },
            label: 'Từ 13 triệu'
        },
    ]
    const sortTypeList = [
        { name: 'Mới nhất' },
        { name: 'Giá: Thấp đến cao' },
        { name: 'Giá: Cao đến thấp' },
    ]
    const authAxios = useAuthAxios()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    useEffect(() => {
        authAxios
            .get("/api/v1/brands")
            .then(response => {
                setBrands(response.data)
            })
        if (key != null) {
            const url = `/api/v1/smartphones/search?key=${key}${page != null ? `&page=${page}` : "&page=0"}`
            authAxios
                .get(url)
                .then(response => {
                    setSmartphones(response.data)
                })
        } else {
            const url = `/api/v1/smartphones${page != null ? `?page=${page}` : "?page=0"}${brand != null ? `&brand=${brand}` : ""}${min != null ? `&min=${min}` : ""}${max != null ? `&max=${max}` : ""}${sort != null ? `&sort=${sort}` : ""}`
            authAxios
                .get(url)
                .then(response => {
                    setSmartphones(response.data)
                })
        }
    }, [key, page, brand, min, max, sort]);

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleSearch = () => {
        setSearchParams({
            key: text
        })
    }

    const handleBrandFilter = (brandId) => {
        if (brandId === "0") {
            setSearchParams(prev => {
                prev.delete("page")
                prev.delete("brand")
                return prev
            })
        } else {
            setSearchParams(prev => {
                prev.delete("page")
                prev.set("brand", brandId)
                return prev
            })
        }
    }

    const handlePriceFilter = (priceIdx) => {
        const index = Number(priceIdx)
        const price = prices[index]
        setSearchParams(prev => {
            prev.delete("page")
            if (index === 0){
                prev.delete("min")
                prev.delete("max")
            } else {
                prev.set("min", price.value.min)
                prev.set("max", price.value.max)
            }
            return prev
        })
    }

    const handleSort = (sortIdx) => {
        setSearchParams(prev => {
            prev.delete("page")
            prev.set("sort", sortIdx)
            return prev
        })
    }

    const handleDeleteProduct = ( id ) => {
        authAxios
            .delete(`/api/v1/admin/smartphones/${id}`)
            .then(response => {
                if (key != null) {
                    const url = `/api/v1/smartphones/search?key=${key}${page != null ? `&page=${page}` : "&page=0"}`
                    authAxios
                        .get(url)
                        .then(response => {
                            setSmartphones(response.data)
                        })
                } else {
                    const url = `/api/v1/smartphones${page != null ? `?page=${page}` : "?page=0"}${brand != null ? `&brand=${brand}` : ""}${min != null ? `&min=${min}` : ""}${max != null ? `&max=${max}` : ""}${sort != null ? `&sort=${sort}` : ""}`
                    authAxios
                        .get(url)
                        .then(response => {
                            setSmartphones(response.data)
                        })
                }
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
                    <div className="flex flex-row items-center justify-between">
                        <Link
                            to="/admin/smartphones"
                            className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                        >
                            Sản phẩm
                        </Link>
                        <Link
                            to="/admin/smartphones/form"
                            className="hidden md:flex flex-row items-center justify-center w-fit h-fit px-2 py-1 text-green-600 hover:bg-green-700 hover:text-white rounded-lg"
                        >
                            Thêm sản phẩm
                        </Link>
                    </div>
                    <div className="flex flex-row justify-between flex-wrap my-3">
                        <div
                            className="flex flex-row items-center"
                        >
                            <input
                                className="w-72 md:w-80 xl:w-96 px-2 py-1.5 h-fit border border-purple-600 rounded-tl-full rounded-bl-full"
                                placeholder="Hãy nhập tên sản phẩm"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <button
                                className="flex items-center px-2 py-1.5 text-purple-600 border border-purple-600 rounded-tr-full rounded-br-full hover:bg-purple-600 hover:text-white disabled:bg-inherit disabled:border-gray-400 disabled:text-gray-600"
                                disabled={text === ""}
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                        <div className="flex flex-row flex-wrap">
                            <select
                                defaultValue={0}
                                className="flex border border-gray-400 rounded-lg mx-1 my-1 text-sm"
                                onChange={e => handleBrandFilter(e.target.value)}
                            >
                                <option
                                    value={"0"}
                                >
                                    Nhãn hiệu
                                </option>
                                {brands?.map(brand =>
                                    <option
                                        key={brand.id}
                                        value={`${brand.id}`}
                                    >
                                        {brand.name}
                                    </option>
                                )}
                            </select>
                            <select
                                defaultValue={"0"}
                                className="flex border border-gray-400 rounded-lg mx-1 my-1 text-sm"
                                onChange={e => handlePriceFilter(e.target.value)}
                            >
                                {prices.map((price, index) =>
                                    <option
                                        key={index}
                                        value={`${index}`}
                                    >
                                        {price.label}
                                    </option>
                                )}
                            </select>
                            <select
                                defaultValue={"0"}
                                className="flex border border-gray-400 rounded-lg mx-1 my-1 text-sm"
                                onChange={e => handleSort(e.target.value)}
                            >
                                {sortTypeList.map((sortType, index) =>
                                    <option
                                        key={index}
                                        value={`${index}`}
                                    >
                                        {sortType.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    {
                        (smartphones == null || smartphones?.content.length === 0) ?
                        <div className="flex flex-row justify-center items-center h-56">
                            <p>
                                Không có sản phẩm
                            </p>
                        </div> :
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 bg-white">
                                <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        Mã số
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Tên sản phẩm
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Giá bán
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Thương hiệu
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Ngày tạo
                                    </th>
                                    <th scope="col" className="px-4 py-3">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    smartphones?.content.map(smartphone =>
                                        <tr key={smartphone.id} className="bg-white border-b">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {smartphone.id}
                                            </th>
                                            <td className="px-4 py-3">
                                                {smartphone.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getPrice(smartphone.price)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {smartphone.quantityInStock}
                                            </td>
                                            <td className="px-4 py-3">
                                                {smartphone.brand.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getDate(smartphone.createdAt)}
                                            </td>
                                            <td className="flex flex-row px-4 py-3">
                                                <ViewButton
                                                    url={`/admin/smartphones/${smartphone.id}`}
                                                />
                                                <UpdateButton
                                                    url={`/admin/smartphones/form?id=${smartphone.id}`}
                                                />
                                                <DeleteButton
                                                    onClick={() => handleDeleteProduct(smartphone.id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    }
                    <div className="flex flex-row items-center justify-center w-full h-full my-3">
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${smartphones?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                            disabled={smartphones?.first}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const prevPage = Number(curPage) - 1
                                setSearchParams(prev => {
                                    prev.set("page", prevPage)
                                    return prev
                                })
                            }}
                        >
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                            {page == null ? "0" : page}
                        </span>
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${smartphones?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                            disabled={smartphones?.last}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const nextPage = Number(curPage) + 1
                                setSearchParams(prev => {
                                    prev.set("page", nextPage)
                                    return prev
                                })
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