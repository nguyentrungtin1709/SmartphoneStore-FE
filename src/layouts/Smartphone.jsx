import {useLoaderData} from "react-router-dom";
import Table from "../components/Table.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import Rating from '@mui/material/Rating';

function Smartphone() {
    const smartphone = useLoaderData()

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 2xl:px-24 items-center justify-between sm:gap-x-1 sm:gap-2 w-full bg-white text-gray-600">
            <div className="flex flex-col items-center md:items-start h-full py-8 2xl:py-2">
                <h1 className="w-full flex justify-center md:justify-start text-3xl font-bold my-8">
                    {smartphone.name}
                </h1>
                <div>
                    <img src={smartphone.imageUrl} alt={smartphone.name} className="w-96"/>
                </div>
            </div>
            <div className="flex flex-col items-center h-full py-8 2xl:py-2 border-t lg:border-l">
                <div className="px-8 my-8">
                    <h1 className="text-xl font-bold mb-4">
                        Cấu hình {smartphone.name}
                    </h1>
                    <Table smartphone={smartphone} />
                    <div className="flex flex-col mt-4">
                        <h1 className="font-bold text-red-500 text-2xl relative">
                            {getPrice(smartphone.price)}
                            <span className="absolute top-0 text-sm">
                                ₫
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <button className="bg-purple-600 hover:bg-purple-800 mt-8 text-white w-1/2 py-2 rounded-lg">
                            Mua hàng
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 flex justify-center items-center">
                <div className="flex flex-row items-center my-2">
                            <span className="mr-1 text-xl font-bold text-orange-400">
                                4.3
                            </span>
                    <Rating name="smartphone-rating" defaultValue={4.3} precision={0.1} readOnly />
                    <p className="ml-1 text-purple-600">
                        337 đánh giá
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Smartphone