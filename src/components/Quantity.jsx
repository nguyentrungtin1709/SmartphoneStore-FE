function Quantity({ quantity, setQuantity }){

    const increase = () => {
        setQuantity(quantity + 1)
    }

    const decrease = () => {
        setQuantity((prevState) => {
            if (prevState <= 0){
                return 0
            }
            return prevState - 1
        })
    }

    return (
        <div className="flex flex-row justify-center items-center">
            <button
                className="flex items-center justify-center px-3 py-1 border rounded-bl-2xl rounded-tl-2xl hover:text-white hover:bg-purple-500"
                onClick={decrease}
            >
                <i className="uil uil-minus"></i>
            </button>
            <div className="flex items-center justify-center px-4 py-1 border text-purple-600 font-bold">
                {quantity}
            </div>
            <button
                className="flex items-center justify-center px-3 py-1 border rounded-br-2xl rounded-tr-2xl hover:text-white hover:bg-purple-500"
                onClick={increase}
            >
                <i className="uil uil-plus"></i>
            </button>
        </div>
    )
}

export default Quantity