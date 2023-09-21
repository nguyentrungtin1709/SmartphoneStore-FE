import {useEffect, useState} from "react";
import {useAxios} from "../hooks/useAxios.jsx";
import {Link} from "react-router-dom";

function Section({ brand }, key){
    const [products, setProducts] = useState([])
    const axios = useAxios()
    useEffect(() => {
        axios
            .get(`/api/v1/smartphones?size=4&brand=${brand.id}`)
            .then(response => {
                setProducts(response.data.content)
            })

    }, [])
    return (
        <section className="flex flex-col items-center mb-12" key={key}>
            <h1 className="text-4xl font-bold text-white my-4">
                {brand.name}
            </h1>
            <div className="bg-stone-800 text-white rounded-3xl">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
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
                                        <Link to={`/smartphones/${product.id}`} className="hover:text-purple-600">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section