import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "../../components/Table.jsx";
import {getPrice} from "../../utils/getPrice.jsx";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import {UpdateButton} from "../../components/UpdateButton.jsx";


export function SmartphoneView() {
    const smartphone = useLoaderData()
    const [ratings, setRatings] = useState()
    const [statistic, setStatistic] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const authAxios = useAuthAxios()

    useEffect(() => {
        authAxios
            .get(`/api/v1/ratings/smartphone/${smartphone.id}?page=${page}`)
            .then(response => {
                setRatings(response.data)
            })
        authAxios
            .get(`/api/v1/ratings/smartphone/${smartphone.id}/rate`)
            .then(response => {
                setStatistic(response.data)
            })
    },[page])

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const getStar = (star) => {
        switch (star){
            case "ONE":
                return 1
            case  "TWO":
                return 2
            case "THREE":
                return 3
            case "FOUR":
                return 4
            case "FIVE":
                return 5
        }
    }

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleDeleteProduct = () => {
        authAxios
            .delete(`/api/v1/admin/smartphones/${smartphone.id}`)
            .then(response => {
                navigate("/admin/smartphones")
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
                <main className="grid grid-cols-1 lg:grid-cols-2 2xl:px-10 items-center lg:justify-between sm:gap-2 w-full bg-white text-gray-600">
                    <div className="col-span-1 flex flex-col items-center h-full py-8 2xl:py-10">
                        <h2 className="text-lg">
                            Hình ảnh
                        </h2>
                        <div className="flex justify-center items-center px-3 py-3 my-6 border-2 border-dashed rounded-lg">
                            <img src={smartphone.imageUrl} alt={smartphone.name} className="w-96"/>
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center w-full h-full py-8 2xl:py-10 border-t lg:border-l">
                        <div className="flex flex-col px-8 w-full items-center">
                            <h1 className="text-lg w-full flex flex-row justify-center">
                                Chi tiết sản phẩm
                            </h1>
                            <div className="flex flex-col w-full md:px-8 my-2">
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Mã sản phẩm:
                                    </span>
                                    <span>
                                        {smartphone.id}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Tên sản phẩm:
                                    </span>
                                    <span>
                                        {smartphone.name}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Thương hiệu:
                                    </span>
                                    <span>
                                        {smartphone.brand.name}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Giá bán:
                                    </span>
                                    <span>
                                        {getPrice(smartphone.price)} đ
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Số lượng:
                                    </span>
                                    <span>
                                        {smartphone.quantityInStock}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Màn hình:
                                    </span>
                                    <span>
                                        {smartphone.screen}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Hệ điều hành:
                                    </span>
                                    <span>
                                        {smartphone.operatingSystem}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Camera sau:
                                    </span>
                                    <span>
                                        {smartphone.rearCamera}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Camera trước:
                                    </span>
                                    <span>
                                        {smartphone.frontCamera}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Chip xử lý:
                                    </span>
                                    <span>
                                        {smartphone.chip}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        RAM:
                                    </span>
                                    <span>
                                        {smartphone.ram}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Dung lượng:
                                    </span>
                                    <span>
                                        {smartphone.storageCapacity}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Sim:
                                    </span>
                                    <span>
                                        {smartphone.sim}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Pin:
                                    </span>
                                    <span>
                                        {smartphone.pin}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        SKU:
                                    </span>
                                    <span>
                                        {smartphone.sku}
                                    </span>
                                </div>
                                <div className="flex flex-row my-1.5">
                                    <span className="font-bold min-w-[130px]">
                                        Ngày tạo:
                                    </span>
                                    <span>
                                        {getDate(smartphone.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row my-4 w-full justify-center">
                                <Link
                                    to={`/admin/smartphones/form?id=${smartphone.id}`}
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-yellow-600 hover:bg-yellow-500 hover:text-stone-900 rounded-lg"
                                >
                                    Chỉnh sửa
                                </Link>
                                <button
                                    className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-red-600 hover:bg-red-500 hover:text-white rounded-lg"
                                    onClick={handleDeleteProduct}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex w-full border-t">
                        <div className="flex flex-col items-start w-full px-2 py-2 my-2 border rounded-lg">
                            <h1 className="font-bold text-sm md:text-xl">
                                Đánh giá {smartphone.name}
                            </h1>
                            <div className="flex flex-row items-center my-4">
                                <h1 className="mx-2 font-bold text-xl text-yellow-600">
                                    {(statistic == null || statistic.rate === "NaN") ? 0 : statistic.rate.toFixed(2)}
                                </h1>
                                <Rating name="read-only" value={(statistic == null || statistic.rate === "NaN") ? 0 : Number(statistic.rate.toFixed(1)) } precision={0.1} readOnly />
                                <p className="flex mx-2 text-purple-600">
                                    {statistic?.quantity} đánh giá
                                </p>
                            </div>
                            <div className="flex flex-row flex-wrap items-start">
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        5 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.five})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        4 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.four})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        3 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.three})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        2 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.two})
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center px-2 py-1 border rounded-lg mx-2">
                                    <p className="flex flex-row items-center justify-center mr-1 text-yellow-500 font-bold text-lg">
                                        1 <i className="uil uil-favorite"></i>
                                    </p>
                                    <p className="flex items-center text-lg">
                                        - ({statistic?.one})
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full my-4">
                                {ratings?.content.map(rating =>
                                    <div key={rating.id} className="flex flex-col px-2 py-2 w-full border rounded-sm my-1">
                                        <div className="flex flex-col md:flex-row md:justify-between">
                                            <div className="flex flex-row">
                                                <div className="flex mx-2">
                                                    {
                                                        rating.account.imageUrl == null ?
                                                            <Avatar
                                                                sx={{
                                                                    bgcolor: deepPurple[500],
                                                                    width: 30,
                                                                    height: 30
                                                                }}
                                                            >
                                                                {rating.account.name[0]}
                                                            </Avatar> :
                                                            <Avatar
                                                                alt="Avatar"
                                                                src={rating.account.imageUrl}
                                                                sx={{
                                                                    width: 30,
                                                                    height: 30
                                                                }}
                                                            />
                                                    }
                                                </div>
                                                <div className="mr-2">
                                                    {rating.account.name}
                                                </div>
                                                <Rating name="read-only" value={getStar(rating.star)} precision={0.1} readOnly />
                                            </div>
                                            <div className="flex flex-row items-center ml-12 md:ml-0">
                                                <p>{getDate(rating.createdAt)}</p>
                                                <UpdateButton
                                                    url={`/admin/ratings/${rating.id}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <p className="mx-8 text-stone-900">
                                                {rating.comment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row items-center justify-center w-full">
                                <button
                                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                                    disabled={ratings?.first}
                                    onClick={() => setPage(page - 1)}
                                >
                                    <i className="uil uil-arrow-left"></i>
                                </button>
                                <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                                    {page}
                                </span>
                                <button
                                    className={`flex items-center justify-center text-2xl px-2 rounded-lg ${ratings?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                                    disabled={ratings?.last}
                                    onClick={() => setPage(page + 1)}
                                >
                                    <i className="uil uil-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}