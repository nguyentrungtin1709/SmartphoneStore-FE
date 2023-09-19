function Avatar({ image }){
    return (
        <>
            {
                image == null ?
                <div className="flex items-center justify-center px-5 py-5 h-2.5 w-2.5
                rounded-full bg-stone-700">
                    <i className="uil uil-user text-2xl text-gray-50 hover:text-purple-500"></i>
                </div> :
                <img src={image} alt="avatar" height={40} width={40} className="rounded-full flex items-center justify-center"/>
            }
        </>
    )
}

export default Avatar