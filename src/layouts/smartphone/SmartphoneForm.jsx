import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useLoaderData, useNavigate, useSearchParams} from "react-router-dom";
import {AdminInput} from "../../components/AdminInput.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";

export function SmartphoneForm() {
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const brands = useLoaderData()
    const authAxios = useAuthAxios()
    const [name, setName] = useState("")
    const [brandIdx, setBrandIdx] = useState("0")
    const [price, setPrice] = useState("")
    const [quantityInStock, setQuantityInStock] = useState("0")
    const [screen, setScreen] = useState("")
    const [operatingSystem, setOperatingSystem] = useState("")
    const [rearCamera, setRearCamera] = useState("")
    const [frontCamera, setFrontCamera] = useState("")
    const [chip, setChip] = useState("")
    const [ram, setRam] = useState("RAM")
    const [storageCapacity, setStorageCapacity] = useState("storage")
    const [sim, setSim] = useState("")
    const [pin, setPin] = useState("")
    const [image, setImage] = useState(null)
    const [sku, setSKU] = useState("")
    const navigate = useNavigate()
    const isActiveAdd = name !== "" && brandIdx !== "" && price !== "" && quantityInStock !== "" && sku !== "" && image != null
    const isActiveEdit = name !== "" && brandIdx !== "" && price !== "" && quantityInStock !== "" && sku !== ""
    const [errors, setErrors] = useState()
    const [originSmartphone, setOriginSmartphone] = useState()

    useEffect(() => {
        const id = searchParams.get("id")
        if (id != null){
            authAxios
                .get(`/api/v1/smartphones/${id}`)
                .then(response => {
                    const smartphone = response.data
                    const brandIndex = brands.findIndex((brand, index) => {
                        if(brand.id === smartphone.brand.id){
                            return index
                        }
                    })
                    setOriginSmartphone(smartphone)
                    setName(smartphone.name)
                    setBrandIdx(brandIndex)
                    setPrice(smartphone.price)
                    setQuantityInStock(smartphone.quantityInStock)
                    setScreen(smartphone.screen)
                    setOperatingSystem(smartphone.operatingSystem)
                    setRearCamera(smartphone.rearCamera)
                    setFrontCamera(smartphone.frontCamera)
                    setChip(smartphone.chip)
                    if (smartphone.ram == null) {
                        setRam("RAM")
                    } else {
                        setRam(smartphone.ram)
                    }
                    if (smartphone.storageCapacity == null){
                        setStorageCapacity("storage")
                    } else {
                        setStorageCapacity(smartphone.storageCapacity)
                    }
                    setSim(smartphone.sim)
                    setPin(smartphone.pin)
                    setSKU(smartphone.sku)
                })
                .catch(errors => {
                    console.log(errors)
                })
        }
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    useEffect(() => {
        return () => {
            if (image){
                URL.revokeObjectURL(image.url)
            }
        }
    },[image])

    const handleChangeImage = (file) => {
        if (file == null){
            return
        }
        if (file.name === image?.file.name){
            return
        }
        setImage({
            file: file,
            url: URL.createObjectURL(file)
        })
    }

    const handleAddProduct = async () => {
        const data = {
            name,
            brand: {
                id: brands[Number(brandIdx)].id
            },
            price: Number(price),
            quantityInStock: Number(quantityInStock),
            screen,
            operatingSystem,
            rearCamera,
            frontCamera,
            chip,
            ram: ram === "RAM" ? null : ram,
            storageCapacity: storageCapacity === "storage" ? null : storageCapacity,
            sim,
            pin,
            sku
        }
        const form = new FormData()
        form.append("image", image.file)
        const smartphone = await authAxios
            .post("/api/v1/admin/smartphones", data)
            .then(response => response.data)
            .catch(errors => {
                setErrors(errors.response.data)
            })
        if (smartphone?.id) {
            authAxios
                .put(`/api/v1/admin/smartphones/${smartphone.id}/image`, form)
                .then(response => {
                    navigate("/admin/smartphones")
                })
        }
    }

    const handleUpdateProduct = async () => {
        const data = {
            name,
            brand: {
                id: brands[Number(brandIdx)].id
            },
            price: Number(price),
            quantityInStock: Number(quantityInStock),
            screen,
            operatingSystem,
            rearCamera,
            frontCamera,
            chip,
            ram: ram === "RAM" ? null : ram,
            storageCapacity: storageCapacity === "storage" ? null : storageCapacity,
            sim,
            pin,
            sku
        }
        let isSuccess = false
        const smartphone = await authAxios
            .put(`/api/v1/admin/smartphones/${originSmartphone.id}/info`, data)
            .then(response => {
                isSuccess = true
                return response.data
            })
            .catch(errors => {
                setErrors(errors.response.data)
            })
        if (smartphone?.id && image != null) {
            const form = new FormData()
            form.append("image", image.file)
            authAxios
                .put(`/api/v1/admin/smartphones/${smartphone.id}/image`, form)
                .then(response => {
                    navigate("/admin/smartphones")
                })
                .catch(errors => {
                    console.log(errors)
                })
        } else {
            if (isSuccess){
                navigate("/admin/smartphones")
            }
        }
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-rows-min w-full h-full px-3 py-3">
                    <Link
                        to="/admin/smartphones"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Sản phẩm
                    </Link>
                    <div className="flex flex-row justify-center items-center w-full font-bold text-xl text-purple-600 mb-4">
                        <h1>
                            {originSmartphone != null ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
                        </h1>
                    </div>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-1">
                        <div className="xl:col-span-1 lg:col-span-1 flex flex-col items-center w-full border border-gray-300 rounded-lg">
                            <h2 className="my-2 font-bold">
                                Hình ảnh
                                <span className="text-red-500">
                                    *
                                </span>
                            </h2>
                            <div className="flex flex-row justify-center items-center my-3 py-2 w-3/4 border-2 border-dashed rounded-md">
                                <label className="flex flex-row justify-center items-center text-4xl w-full h-full cursor-pointer">
                                    {(image == null && originSmartphone == null) ?
                                        <i className="uil uil-upload"></i>:
                                        <img
                                            src={image?.url || originSmartphone?.imageUrl}
                                            alt={"Product Image"}
                                            className="w-full h-fit"
                                        />
                                    }
                                    <input
                                        hidden
                                        type="file"
                                        id="ProductImage"
                                        name="productImage"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) =>
                                            handleChangeImage(e.target.files[0])
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="xl:col-span-3 lg:col-span-2 flex flex-col items-center w-full border border-gray-300 rounded-lg">
                            <h2 className="my-3 font-bold">
                                Thông tin sản phẩm
                            </h2>
                            <div className="flex flex-col">
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Tên sản phẩm
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <AdminInput
                                        placeholder="Tên sản phẩm"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.name}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Hãng sản xuất
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <select
                                        value={brandIdx}
                                        className="flex w-72 md:w-80 xl:w-96 px-2 py-1.5 border border-gray-400 rounded-lg"
                                        onChange={e => setBrandIdx(e.target.value)}
                                    >
                                        {brands.map((brand, index) =>
                                            <option
                                                key={index}
                                                value={`${index}`}
                                            >
                                                {brand.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.brand}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Giá bán
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <AdminInput
                                        type={"number"}
                                        placeholder="Giá bán"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.price}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Số lượng
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <AdminInput
                                        type={"number"}
                                        placeholder="Số lượng trong kho"
                                        value={quantityInStock}
                                        onChange={e => setQuantityInStock(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.quantityInStock}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Màn hình
                                    </span>
                                    <AdminInput
                                        placeholder="Màn hình"
                                        value={screen}
                                        onChange={e => setScreen(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.screen}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Hệ điều hành
                                    </span>
                                    <AdminInput
                                        placeholder="Hệ điều hành"
                                        value={operatingSystem}
                                        onChange={e => setOperatingSystem(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.operatingSystem}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Camera sau
                                    </span>
                                    <AdminInput
                                        placeholder="Camera sau"
                                        value={rearCamera}
                                        onChange={e => setRearCamera(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.rearCamera}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Camera trước
                                    </span>
                                    <AdminInput
                                        placeholder="Camera trước"
                                        value={frontCamera}
                                        onChange={e => setFrontCamera(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.frontCamera}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Chip
                                    </span>
                                    <AdminInput
                                        placeholder="Chip"
                                        value={chip}
                                        onChange={e => setChip(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.chip}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        RAM
                                    </span>
                                    <select
                                        className="flex w-72 md:w-80 xl:w-96 px-2 py-1.5 border border-gray-400 rounded-lg my-1.5"
                                        value={ram}
                                        onChange={e => setRam(e.target.value)}
                                    >
                                        <option value="RAM">
                                            RAM
                                        </option>
                                        <option value="2 GB">
                                            2 GB
                                        </option>
                                        <option value="3 GB">
                                            3 GB
                                        </option>
                                        <option value="4 GB">
                                            4 GB
                                        </option>
                                        <option value="6 GB">
                                            6 GB
                                        </option>
                                        <option value="8 GB">
                                            8 GB
                                        </option>
                                        <option value="12 GB">
                                            12 GB
                                        </option>
                                    </select>
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.ram}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Dung lượng
                                    </span>
                                    <select
                                        className="flex w-72 md:w-80 xl:w-96 px-2 py-1.5 border border-gray-400 rounded-lg my-1.5"
                                        value={storageCapacity}
                                        onChange={e => setStorageCapacity(e.target.value)}
                                    >
                                        <option value="storage">
                                            Dung lượng
                                        </option>
                                        <option value="8 GB">
                                            8 GB
                                        </option>
                                        <option value="16 GB">
                                            16 GB
                                        </option>
                                        <option value="32 GB">
                                            32 GB
                                        </option>
                                        <option value="64 GB">
                                            64 GB
                                        </option>
                                        <option value="128 GB">
                                            128 GB
                                        </option>
                                        <option value="256 GB">
                                            256 GB
                                        </option>
                                        <option value="512 GB">
                                            512 GB
                                        </option>
                                        <option value="1 TB">
                                            1 TB
                                        </option>
                                    </select>
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.storageCapacity}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        SIM
                                    </span>
                                    <AdminInput
                                        placeholder="Sim"
                                        className={"my-1.5"}
                                        value={sim}
                                        onChange={e => setSim(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.sim}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        PIN
                                    </span>
                                    <AdminInput
                                        placeholder="Pin"
                                        className={"my-1.5"}
                                        value={pin}
                                        onChange={e => setPin(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.pin}
                                        </p>
                                    </div>
                                }
                                <div
                                    className="flex flex-col md:flex-row md:items-center my-1.5"
                                >
                                    <span className="font-bold w-32 mb-0.5">
                                        Mã SKU
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </span>
                                    <AdminInput
                                        placeholder="SKU"
                                        value={sku}
                                        onChange={e => setSKU(e.target.value)}
                                    />
                                </div>
                                {
                                    <div className="flex flex-col md:flex-row md:items-center my-1.5">
                                        <p
                                            className="md:ml-32 text-red-500"
                                        >
                                            {errors?.sku}
                                        </p>
                                    </div>
                                }
                                <div className="flex justify-center my-3">
                                    {originSmartphone != null ?
                                        <AdminButton
                                            disabled={!isActiveEdit}
                                            onClick={handleUpdateProduct}
                                        >
                                            Thay đổi
                                        </AdminButton> :
                                        <AdminButton
                                            disabled={!isActiveAdd}
                                            onClick={handleAddProduct}
                                        >
                                            Thêm sản phẩm
                                        </AdminButton>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}