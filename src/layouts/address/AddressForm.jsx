import { addressList } from "../../data/address.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAxios } from "../../hooks/useAuthAxios.jsx";

export default function AddressForm() {
    const [cityIndex, setCityIndex] = useState(-1)
    const [districtIndex, setDistrictIndex] = useState(-1)
    const [communeIndex, setCommuneIndex] = useState(-1)
    const [details, setDetails] = useState("")
    const disable = cityIndex === -1 || districtIndex === -1 || communeIndex === -1 || details === ""
    const authAxios = useAuthAxios()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        message: "",
        addressDetails: ""
    })



    const handleCreate = () => {
        const data = {
            city: addressList.at(cityIndex).name,
            district: addressList[cityIndex].districts.at(districtIndex).name,
            commune: addressList[cityIndex].districts[districtIndex].wards.at(communeIndex).name,
            addressDetails: details
        }
        authAxios.post("/api/v1/account/address", data)
            .then(response => {
                navigate(-1)
            })
            .catch(error => {
                const data = error.response.data
                setErrors({
                    message: data?.message || "",
                    addressDetails: data?.addressDetails || ""
                })
            })
    }

    return (
        <div className="flex flex-col w-full h-full bg-white mt-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-start w-full mx-4 my-4">
                <span className="font-bold w-full md:w-36 mb-3 md:mb-0">
                    Tỉnh/Thành phố:
                </span>
                <select
                    id="profile-address-city"
                    className="rounded-lg w-72"
                    onChange={e => {
                        const index = Number(e.target.value)
                        setCityIndex(index)
                        setDistrictIndex(-1)
                        setCommuneIndex(-1)
                    }}
                >
                    <option
                        value={-1}
                    >
                        Chọn Tỉnh/Thành phố
                    </option>
                    {addressList.map((city, index) =>
                        <option
                            key={index}
                            value={index}
                        >
                            {city.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-start w-full mx-4 my-4">
                <span className="font-bold w-full md:w-36 mb-3 md:mb-0">
                    Quận/huyện:
                </span>
                <select
                    id="profile-address-district"
                    className="rounded-lg w-72"
                    onChange={e => {
                        const index = Number(e.target.value)
                        setDistrictIndex(index)
                        setCommuneIndex(-1)
                    }}
                >
                    <option
                        value={-1}
                    >
                        Chọn Quận/Huyện
                    </option>
                    {cityIndex !== -1 && addressList[cityIndex]?.districts.map((dis, index) =>
                        <option
                            key={index}
                            value={index}
                        >
                            {dis.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-start w-full mx-4 my-4">
                <span className="font-bold w-full md:w-36 mb-3 md:mb-0">
                    Phường/xã:
                </span>
                <select
                    id="profile-address-commune"
                    className="rounded-lg w-72"
                    onChange={e => {
                        const index = Number(e.target.value)
                        setCommuneIndex(index)
                    }}
                >
                    <option
                        value={-1}
                    >
                        Chọn Phường/Xã
                    </option>
                    {districtIndex !== -1 && addressList[cityIndex]?.districts[districtIndex]?.wards.map((ward, index) =>
                        <option
                            key={index}
                            value={index}
                        >
                            {ward.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="flex flex-col md:flex-row md:items-start justify-start w-full mx-4 my-4">
                <span className="font-bold w-full md:w-36 mb-3 md:mb-0">
                    Địa chỉ:
                </span>
                <textarea
                    className="w-72 h-36 resize-none border-stone-600 rounded-lg"
                    placeholder="Địa chỉ giao hàng ..."
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                >
                </textarea>
            </div>
            {errors.message !== "" &&
                <p
                    className="md:ml-40 text-red-500"
                >
                    {errors.message}
                </p>
            }
            {errors.addressDetails !== "" &&
                <p
                    className="md:ml-40 text-red-500"
                >
                    {errors.addressDetails}
                </p>
            }
            <div className="flex flex-col md:flex-row md:items-start justify-start w-full mx-4 my-4">
                <button
                    className="md:ml-36 text-purple-600 border border-purple-600 py-1 px-2 rounded-lg hover:bg-purple-600 hover:text-white w-fit disabled:bg-gray-200 disabled:border-stone-400 disabled:text-stone-900"
                    onClick={handleCreate}
                    disabled={disable}
                >
                    Thêm địa chỉ
                </button>
            </div>
        </div>
    )
}