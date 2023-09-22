import {useLoaderData, useSearchParams} from "react-router-dom";


function Smartphones(){
    const data = useLoaderData()
    const products = data.content
    const [searchParams, setSearchParams] = useSearchParams()

    console.log(products)

    return (
        <main className="bg-gray-100 text-gray-600">

        </main>
    )
}

export default Smartphones