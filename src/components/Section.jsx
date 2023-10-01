import {useEffect, useState} from "react";
import {useAxios} from "../hooks/useAxios.jsx";
import {Link} from "react-router-dom";
import {getPrice} from "../utils/getPrice.jsx";

function Section({ brand }, key){
    const [products, setProducts] = useState([])
    useEffect(() => {
        useAxios()
            .get(`/api/v1/smartphones?size=4&brand=${brand.id}`)
            .then(response => {
                setProducts(response.data.content)
            })
    }, [])

    return (
        <section className="flex flex-col items-center mb-12" key={key}>
            <h1 className="text-4xl font-bold text-purple-600 my-4">
                {brand.name}
            </h1>
            <div className="rounded-3xl border-2 border-gray-300 drop-shadow-xl bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 relative flex flex-col items-center">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <h3 className="text-sm">
                                        <Link to={`/smartphones/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name.trim()}
                                        </Link>
                                    </h3>
                                    <p className="text-md font-medium ml-1.5">{ getPrice(product.price) }</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to={`/smartphones?brand=${brand.id}`} className="flex mt-10 md:mt-4 lg:mt-0 lg:absolute lg:top-6 lg:right-8 hover:text-purple-600">
                        Xem thêm
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Section