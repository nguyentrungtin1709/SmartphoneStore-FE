
function Table({ smartphone }) {

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    return (
        <table className="flex items-center justify-between w-full lg:w-[600px]">
            <tbody className="w-full">
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-100">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Màn hình:
                    </td>
                    <td>
                        {smartphone.screen}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Hệ điều hành:
                    </td>
                    <td>
                        {smartphone.operatingSystem}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-100">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Camera sau:
                    </td>
                    <td>
                        {smartphone.rearCamera}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Camera trước:
                    </td>
                    <td>
                        {smartphone.frontCamera}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-100">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Chip:
                    </td>
                    <td>
                        {smartphone.chip}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        RAM:
                    </td>
                    <td>
                        {smartphone.ram}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-100">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Dung lượng:
                    </td>
                    <td>
                        {smartphone.storageCapacity}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        SIM:
                    </td>
                    <td>
                        {smartphone.sim}
                    </td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-100">
                    <td className="min-w-[115px] lg:min-w-[135px]">
                        Pin, Sạc:
                    </td>
                    <td>
                        {smartphone.pin}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table