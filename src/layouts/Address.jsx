import {Outlet, useOutletContext} from "react-router-dom";


function Address() {
    const [account, setAccount] = useOutletContext()
    return (
        <div className="xl:col-span-2 flex flex-col w-full h-full bg-inherit px-4 py-4">
            <h1 className="flex items-center justify-start h-fit font-bold text-xl">
                Sổ địa chỉ
            </h1>
            <Outlet context={[account, setAccount]}/>
        </div>
    )
}

export default Address