import {useState} from "react";

function Footer(){

    const [elements, setElements] = useState({
        one: true,
        two: true,
        three: true
    })

    const handleOne = () => {
        setElements({
            ...elements,
            one: !elements.one
        })
    }

    const handleTwo = () => {
        setElements({
            ...elements,
            two: !elements.two
        })
    }

    const handleThree = () => {
        setElements({
            ...elements,
            three: !elements.three
        })
    }

    return (
        <footer className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 bg-white text-gray-600 mt-10 mx-3 pt-2 mb-28">
            <div className="flex flex-col justify-start items-center w-full">
                <h1 className="flex items-center justify-center 2xl:justify-start 2xl:ml-14 w-full mt-4 text-4xl font-bold text-purple-600">
                    SPStore
                </h1>
                <div className="flex flex-col justify-start items-start px-4 mt-2">
                    <h3 className="hidden lg:flex font-bold text-xl">
                        Tổng đài
                    </h3>
                    <div className="flex flex-row justify-center items-center mt-1">
                        <p className="flex font-bold mr-2">
                            Mua hàng:
                        </p>
                        <p className="flex">
                            1900.XXXX.XXXX (7:30 - 22:00)
                        </p>
                    </div>
                    <div className="flex flex-row w-full lg:w-fit justify-center items-center mt-1">
                        <p className="flex font-bold mr-2">
                            CSKH:
                        </p>
                        <p className="flex">
                            1900.XXXX.XXXX (8:00 - 21:30)
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center xl:justify-start w-full px-8 mt-4">
                    <i
                        className="uil uil-facebook-f text-2xl flex cursor-pointer
                         px-1 py-1 rounded-full bg-blue-500 text-white mr-2"
                    >
                    </i>
                    <i
                        className="uil uil-youtube text-2xl flex cursor-pointer
                         px-1 py-1 rounded-full bg-red-500 text-white mr-2"
                    ></i>
                    <i
                        className="uil uil-twitter text-2xl flex cursor-pointer
                         px-1 py-1 rounded-full bg-stone-800 text-white mr-2"
                    ></i>
                </div>
            </div>
            <div className="flex flex-col lg:justify-start justify-center items-center px-6 w-full">
                <h1 className="flex font-bold mt-12 w-full lg:justify-start justify-center items-center">
                    Hệ thống cửa hàng
                    <i
                        className={`uil ${elements.one ? "uil-minus": "uil-plus"} text-xl ml-2 flex lg:hidden bg-gray-300 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white`}
                        onClick={handleOne}
                    >
                    </i>
                </h1>
                {elements.one && <div className="flex flex-col w-full">
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Xem 100 cửa hàng
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Nội quy cửa hàng
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Chất lượng phục vụ
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Chính sách bảo hành & đổi trả
                    </p>
                </div>}
            </div>
            <div className="flex flex-col lg:justify-start justify-center items-center px-6 w-full">
                <h1 className="flex font-bold mt-12 w-full lg:justify-start justify-center items-center">
                    Hỗ trợ khách hàng
                    <i
                        className={`uil ${elements.two ? "uil-minus": "uil-plus"} text-xl ml-2 flex lg:hidden bg-gray-300 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white`}
                        onClick={handleTwo}
                    >
                    </i>
                </h1>
                {elements.two && <div className="flex flex-col w-full">
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Điều kiện giao dịch chung
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Hướng dẫn mua hàng online
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Chính sách giao hàng
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Hướng dẫn thanh toán
                    </p>
                </div>}
            </div>
            <div className="flex flex-col lg:justify-start justify-center items-center px-6 w-full">
                <h1 className="flex font-bold mt-12 w-full lg:justify-start justify-center items-center">
                    Về thương hiệu SPStore
                    <i
                        onClick={handleThree}
                        className={`uil ${elements.three ? "uil-minus": "uil-plus"} text-xl ml-2 flex lg:hidden bg-gray-300 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white`}>
                    </i>
                </h1>
                {elements.three && <div className="flex flex-col w-full">
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Giới thiệu SPStore
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Bán hàng doanh nghiệp
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Chính sách xữ lý dữ liệu cá nhân
                    </p>
                    <p className="flex w-full lg:justify-start justify-center items-center mt-1 hover:text-purple-600 cursor-pointer">
                        Tích điểm Quà tặng VIP
                    </p>
                </div>}
            </div>
        </footer>
    )
}

export default Footer