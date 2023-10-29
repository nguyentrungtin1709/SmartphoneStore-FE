import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link} from "react-router-dom";
import {ViewButton} from "../components/ViewButton.jsx";
import {DeleteButton} from "../components/DeleteButton.jsx";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {BarChart, LineChart, PieChart} from "@mui/x-charts";
import {getPrice} from "../utils/getPrice.jsx";

export function DashBoard() {
    const [loading, setLoading] = useState(true)
    const [saleStatistic, setSaleStatistic] = useState()
    const [accountsToday, setAccountToday] = useState()
    const [accountsTotal, setAccountsTotal] = useState()
    const [ordersTotal, setOrdersTotal] = useState()
    const [ordersToday, setOrdersToday] = useState()
    const [ratingsToday, setRatingsToday] = useState()
    const [ratingsTotal, setRatingsTotal] = useState()
    const [productsTotal, setProductsTotal] = useState()
    const [star, setStar] = useState()
    const [topSellers, setTopSellers] = useState()
    const [ordersStatusList, setOrdersStatusList] = useState()
    const [brands, setBrands] = useState()
    const brandsList = brands?.map((brand, index) => {
        return {
            id: index,
            value: Number(brand.quantity),
            label: brand.name
        }
    })
    const starList = [
        {
            id: 1,
            value: Number(star?.ONE),
            label: "Một sao",
            color: "#e65100"
        },
        {
            id: 2,
            value: Number(star?.TWO),
            label: "Hai sao",
            color: "#ffa726"
        },
        {
            id: 3,
            value: Number(star?.THREE),
            label: "Ba sao",
            color: "#ffee58"
        },
        {
            id: 4,
            value: Number(star?.FOUR),
            label: "Bốn sao",
            color: "#b3e5fc"
        },
        {
            id: 5,
            value: Number(star?.FIVE),
            label: "Năm sao",
            color: "#29b6f6"
        }
    ]
    const authAxios = useAuthAxios()
    useEffect(() => {
        authAxios
            .get("/api/v1/admin/orders/sales-statistic")
            .then(response => {
                setSaleStatistic(response.data)
            })
        authAxios
            .get("/api/v1/admin/accounts/number-of-accounts")
            .then(response => {
                setAccountsTotal(response.data)
            })
        authAxios
            .get("/api/v1/admin/accounts/number-of-accounts-today")
            .then(response => {
                setAccountToday(response.data)
            })
        authAxios
            .get("/api/v1/admin/smartphones/number-of-smartphones")
            .then(response => {
                setProductsTotal(response.data)
            })
        authAxios
            .get("/api/v1/admin/smartphones/number-of-smartphones-by-brand")
            .then(response => {
                setBrands(response.data)
            })
        authAxios
            .get("/api/v1/admin/smartphones/best-sellers?top=5")
            .then(response => {
                setTopSellers(response.data)
            })
        authAxios
            .get("/api/v1/admin/orders/number-of-orders-today")
            .then(response => {
                setOrdersToday(response.data)
            })
        authAxios
            .get("/api/v1/admin/orders/number-of-orders")
            .then(response => {
                setOrdersTotal(response.data)
            })
        authAxios
            .get("/api/v1/admin/orders/number-of-orders-by-status")
            .then(response => {
                setOrdersStatusList(response.data)
            })
        authAxios
            .get("/api/v1/admin/ratings/number-of-ratings")
            .then(response => {
                setRatingsTotal(response.data)
            })
        authAxios
            .get("/api/v1/admin/ratings/number-of-ratings-today")
            .then(response => {
                setRatingsToday(response.data)
            })
        authAxios
            .get("/api/v1/admin/ratings/number-of-ratings-by-star")
            .then(response => {
                setStar(response.data)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const getStatus = (status) => {
        switch (status){
            case "PENDING":
                return "Đang xử lý"
            case "PREPARING":
                return "Đang chuẩn bị"
            case "DELIVERED":
                return "Đang vận chuyển"
            case "COMPLETED":
                return "Đã giao"
            case "CANCELLED":
                return "Đã hủy"
            case "RETURNED":
                return "Trả hàng"
        }
    }

    const getMonth = (month) => {
        switch (month){
            case "JANUARY":
                return "Tháng 1";
            case "FEBRUARY":
                return "Tháng 2";
            case "MARCH":
                return "Tháng 3";
            case "APRIL":
                return "Tháng 4";
            case "MAY":
                return "Tháng 5";
            case "JUNE":
                return "Tháng 6";
            case "JULY":
                return "Tháng 7";
            case "AUGUST":
                return "Tháng 8";
            case "SEPTEMBER":
                return "Tháng 9";
            case "OCTOBER":
                return "Tháng 10";
            case "NOVEMBER":
                return "Tháng 11";
            case "DECEMBER":
                return "Tháng 12";
        }
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full h-full">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-rows-min w-full h-full px-3 py-3">
                    <Link
                        to="/admin"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600 mb-4"
                    >
                        Dashboard
                    </Link>
                    <div className="flex flex-col items-start bg-white px-2 py-2 my-2 rounded-md">
                        <h2 className="font-bold text-purple-600 rounded-md">
                            Doanh thu
                        </h2>
                        <div className="flex flex-col items-center w-full">
                            <div className="hidden 2xl:flex flex-row w-full">
                                <LineChart
                                    xAxis={[
                                        {
                                            id: 'sales_statistic',
                                            data: saleStatistic?.map(sale => getMonth(sale.month)),
                                            scaleType: "point",
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: saleStatistic?.map(sale => Number(sale.total)),
                                            color: "#bcaaa4",
                                            area: true
                                        },
                                    ]}
                                    width={1000}
                                    height={500}
                                />
                            </div>
                            <h3 className="hidden 2xl:flex flex-row justify-center items-center mb-6 font-bold text-lg">
                                Biểu đồ doanh thu theo tháng
                            </h3>
                            <div className="grid w-full">
                                <div className="relative overflow-x-auto w-full">
                                    <table className="w-full text-sm text-left text-gray-600 bg-white">
                                        <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                Doanh thu
                                            </th>
                                            {saleStatistic?.map(sale =>
                                                <th key={sale.month} scope="col" className="px-4 py-3">
                                                    {getMonth(sale.month)}
                                                </th>
                                            )}
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                </th>
                                                {saleStatistic?.map(sale =>
                                                    <td key={sale.month} className="px-4 py-3">
                                                        {getPrice(sale.total)}
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start bg-white px-2 py-2 my-2 rounded-md">
                        <h2 className="font-bold text-purple-600 rounded-md mb-2">
                            Người dùng
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
                            <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                <h3 className="font-bold mb-2">
                                    Đăng kí hôm nay
                                </h3>
                                <span>
                                    {accountsToday?.numberOfAccountsToday}
                                </span>
                            </div>
                            <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                <h3 className="font-bold mb-2">
                                    Tổng số người dùng
                                </h3>
                                <span>
                                    {accountsTotal?.numberOfAccounts}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start bg-white px-2 py-2 my-2 rounded-md">
                        <h2 className="font-bold text-purple-600 rounded-md mb-2">
                            Sản phẩm
                        </h2>
                        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-3">
                            <div className="col-span-1 flex flex-col border rounded-md py-3 px-2">
                                <h3 className="font-bold mb-2">
                                    Bán chạy nhất
                                </h3>
                                {topSellers?.map((top, index) =>
                                    <Link
                                        to={`/admin/smartphones/${top.id}`}
                                        key={index}
                                        className="flex flex-row my-2"
                                    >
                                        <img
                                            src={top.imageUrl}
                                            alt={top.name}
                                            className="w-20"
                                        />
                                        <span>
                                            {top.name}
                                        </span>
                                    </Link>
                                )}
                            </div>
                            <div className="col-span-1 flex flex-col items-center border rounded-md py-2 px-2">
                                <div className="flex flex-col w-full bg-stone-50 border rounded-md py-2 my-2">
                                    <h3 className="font-bold mb-2 flex justify-center">
                                        Tổng số sản phẩm
                                    </h3>
                                    <span className="flex justify-center">
                                        {productsTotal?.numberOfSmartphones}
                                    </span>
                                </div>
                                <PieChart
                                    series={[
                                        {
                                            data: brandsList,
                                        },
                                    ]}
                                    width={400}
                                    height={220}
                                />
                                <h3 className="my-2 text-lg font-bold">
                                    Biểu đồ số sản phẩm theo hãng
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-start bg-white px-2 py-2 my-2 w-full rounded-md">
                            <h2 className="font-bold text-purple-600 rounded-md mb-2">
                                Đơn hàng
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
                                <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                    <h3 className="font-bold mb-2">
                                        Đơn hàng hôm nay
                                    </h3>
                                    <span>
                                            {ordersToday?.numberOfOrdersToday}
                                        </span>
                                </div>
                                <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                    <h3 className="font-bold mb-2">
                                        Tổng số đơn hàng
                                    </h3>
                                    <span>
                                            {ordersTotal?.numberOfOrders}
                                        </span>
                                </div>
                                <div className="hidden md:col-span-2 md:flex flex-row justify-center items-center w-full">
                                    <BarChart
                                        xAxis={[
                                            {
                                                id: 'order-status',
                                                data: ordersStatusList?.map(order => getStatus(order.status)),
                                                scaleType: 'band',
                                            },
                                        ]}
                                        series={[
                                            {
                                                data: ordersStatusList?.map(order => Number(order.quantity)),
                                                color: "#4caf50",
                                            },
                                        ]}
                                        width={1000}
                                        height={400}
                                    />
                                </div>
                                <h3 className="hidden md:col-span-2 md:flex flex-row justify-center items-center w-full my-2 text-lg font-bold">
                                    Biểu đồ số đơn hàng theo trạng thái
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start bg-white px-2 py-2 my-2 w-full rounded-md">
                        <h2 className="font-bold text-purple-600 rounded-md mb-2">
                            Đánh giá
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
                            <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                <h3 className="font-bold mb-2">
                                    Đánh giá hôm nay
                                </h3>
                                <span>
                                    {ratingsToday?.numberOfRatingsToday}
                                </span>
                            </div>
                            <div className="col-span-1 flex flex-col bg-stone-50 items-center border rounded-md py-3">
                                <h3 className="font-bold mb-2">
                                    Tổng số đánh giá
                                </h3>
                                <span>
                                    {ratingsTotal?.numberOfRatings}
                                </span>
                            </div>
                            <div className="flex md:col-span-2 flex-row justify-center items-center w-full">
                                <PieChart
                                    series={[
                                        {
                                            data: starList,
                                        },
                                    ]}
                                    width={600}
                                    height={400}
                                />
                            </div>
                            <h3 className="md:col-span-2 flex flex-row justify-center items-center w-full my-2 text-lg font-bold">
                                Biểu đồ số đánh giá theo sao
                            </h3>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}