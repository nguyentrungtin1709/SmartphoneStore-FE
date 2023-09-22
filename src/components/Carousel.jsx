import {useEffect, useState} from "react";

const images = [
    {
        id: 0,
        url: "/image/home/galaxy-s23.webp",
        name: "Galaxy S23"
    },
    {
        id: 1,
        url: "/image/home/galaxy-s23-highlights.webp",
        name: "Galaxy S23 Highlights"
    },
    {
        id: 2,
        url: "/image/home/redmi-note-12-pro.jpg",
        name: "Xiaomi Redmi Note 12"
    },
    {
        id: 3,
        url: "/image/home/reno10-5g.jpg",
        name: "Oppo Reno 10 5g"
    },
    {
        id: 4,
        url: "/image/home/xiaomi-note-13.jpg",
        name: "Xiaomi Redmi Note 13"
    }
]

function Carousel(){

    const [index, setIndex] = useState(1)

    const increase = () => {
        if (index >= 4){
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const decrease = () => {
        if (index <= 0){
            setIndex(4)
        } else {
            setIndex(index - 1)
        }
    }

    const getPrevious = (index) => {
        if (index === 0) {
            return images[4]
        } else {
            return images[index - 1]
        }
    }

    const getAfter = (index) => {
        if (index === 4) {
            return images[0]
        } else {
            return images[index + 1]
        }
    }

    const image = images[index]
    const prev = getPrevious(index)
    const next = getAfter(index)

    return (
        <div className="flex items-center justify-center lg:mt-6 lg:mb-6 relative">
            <button
                className="mr-2 border-2 border-stone-500 hover:border-purple-600
            rounded-full hover:-translate-x-2 duration-500 absolute
            2xl:left-32 xl:left-16 lg:left-10 left-4 z-50"
                onClick={decrease}
            >
                <i className="uil uil-arrow-left flex text-4xl text-stone-500 hover:text-purple-600"></i>
            </button>
            <img
                src={prev.url}
                alt={prev.name}
                width={900}
                className="lg:rounded-3xl absolute left-10 blur-sm hidden lg:flex"
            />
            <img
                src={image.url}
                alt={image.name}
                width={940}
                className="lg:rounded-3xl z-40"
            />
            <img
                src={next.url}
                alt={next.name}
                width={900}
                className="lg:rounded-3xl absolute right-10 blur-sm hidden lg:flex"
            />
            <button
                className="ml-2 border-2 border-stone-500 hover:border-purple-600
            rounded-full hover:text-purple-600 hover:translate-x-2 duration-500 absolute
            2xl:right-32 xl:right-16 lg:right-10 right-4 z-50"
                onClick={increase}
            >
                <i className="uil uil-arrow-right flex text-4xl text-stone-500 hover:text-purple-600"></i>
            </button>
            <div
                className="flex flex-row absolute z-50 bottom-4"
            >
                {images.map((image) =>
                    <div
                        onClick={() => {
                            setIndex(image.id)
                        }}
                        className={"px-2 py-2 rounded-full mx-2 cursor-pointer" + " " + (image.id === index ? "bg-gray-700" : "bg-gray-300")}
                    >
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carousel