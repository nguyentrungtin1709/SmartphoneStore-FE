import Carousel from "../components/Carousel.jsx";
import {Outlet, useLoaderData} from "react-router-dom";
import Section from "../components/Section.jsx";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
    const brands = useLoaderData()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])
    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main className="grid bg-gray-100 text-gray-600 relative">
                    <Carousel />
                    <div
                        className="flex flex-col items-center justify-center my-10"
                    >
                        {brands.map(brand =>
                            <Section brand={brand} key={brand.id}/>
                        )}
                    </div>
                </main>
            }
        </>
    )
}

export default Home