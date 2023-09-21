import Carousel from "../components/Carousel.jsx";
import {useLoaderData} from "react-router-dom";
import Section from "../components/Section.jsx";

function Home() {
    const brands = useLoaderData()
    return (
        <main className="grid bg-stone-700 text-gray-50 relative">
            <Carousel />
            <div
                className="flex flex-col items-center justify-center my-10"
            >
                {brands.map(brand =>
                    <Section brand={brand} key={brand.id}/>
                )}
            </div>
        </main>
    )
}

export default Home