function Table({ smartphone }) {

    return (
        <table className="table-fixed flex items-center justify-between">
            <tbody>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-200 rounded-md">
                    <td className="w-32 sm:w-40">
                        Màn hình:
                    </td>
                    <td>{smartphone.screen}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="w-32 sm:w-40">
                        Hệ điều hành:
                    </td>
                    <td>{smartphone.operatingSystem}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-200 rounded-md">
                    <td className="w-32 sm:w-40">
                        Camera sau:
                    </td>
                    <td>{smartphone.rearCamera}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="w-32 sm:w-40">
                        Camera trước:
                    </td>
                    <td>{smartphone.frontCamera}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-200 rounded-md">
                    <td className="w-32 sm:w-40">
                        Chip:
                    </td>
                    <td>{smartphone.chip}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="w-32 sm:w-40">
                        RAM:
                    </td>
                    <td>{smartphone.ram}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-200 rounded-md">
                    <td className="w-32 sm:w-40">
                        Dung lượng:
                    </td>
                    <td>{smartphone.storageCapacity}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg">
                    <td className="w-32 sm:w-40">
                        SIM:
                    </td>
                    <td>{smartphone.sim}</td>
                </tr>
                <tr className="flex px-2 py-2 text-md sm:text-lg bg-gray-200 rounded-md">
                    <td className="w-32 sm:w-40">
                        Pin, Sạc:
                    </td>
                    <td>{smartphone.pin}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table