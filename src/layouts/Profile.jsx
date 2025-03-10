import {Link, useOutletContext} from "react-router-dom";
import AccountAvatar from "../components/AccountAvatar.jsx";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import Snackbar from '@mui/material/Snackbar';
import Avatar from "@mui/material/Avatar";

function Profile(){
    const [account, setAccount] = useOutletContext()
    const [name, setName] = useState(account?.name)
    const [birthday, setBirthday] = useState(() => {
        return account.birthday
    })
    const [gender, setGender] = useState(() => {
        return account.gender
    })
    const [avatar, setAvatar] = useState(null)
    const isCheckedGender = (input, data) => input === data
    const { update } = useAuthFeatures()
    const [errors, setErrors] = useState({
        name: "",
        birthday: ""
    })
    const authAxios = useAuthAxios()
    const [open, setOpen] = useState(false);
    const genderList = [
        {
            id: 1,
            type: "MALE"
        },
        {
            id: 2,
            type: "FEMALE"
        },
        {
            id: 3,
            type: "OTHER"
        },
    ]

    const handleClickShowSuccess = () => {
        setOpen(true);
    };

    const handleCloseShowSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleUpdateProfile = () => {
        const data = {
            name,
            birthday,
            gender
        }
        if (avatar != null){
            const form = new FormData()
            form.append("avatar", avatar.file)
            authAxios
                .put("/api/v1/account/profile/avatar", form)
                .then(response => {
                    update(response.data)
                })
            setAvatar(null)
        }
        authAxios
            .put("/api/v1/account/profile", data)
            .then(response => {
                setAccount(response.data)
                update(response.data)
                handleClickShowSuccess()
                setErrors({
                    name: "",
                    birthday: ""
                })
            })
            .catch(error => {
                setErrors({
                    ...errors,
                    name: error.response.data?.name || "",
                    birthday: error.response.data?.birthday || ""
                })
            })
    }

    const handleUpdateAvatar = () => {
        const form = new FormData()
        form.append("avatar", avatar.file)
        authAxios
            .put("/api/v1/account/profile/avatar", form)
            .then(response => {
                update(response.data)
            })
        setAvatar(null)
    }

    const handleChangeAvatar = (file) => {
        if (file == null){
            return
        }
        if (file.name === avatar?.file.name){
            return
        }
        setAvatar({
            file: file,
            url: URL.createObjectURL(file)
        })
    }

    useEffect(() => {
        return () => {
            if (avatar){
                URL.revokeObjectURL(avatar.url)
            }
        }
    },[avatar])

    return (
        <>
            <div className="flex flex-col bg-white px-4 py-4">
                <h1
                    className="flex items-center justify-start font-bold text-xl"
                >
                    Thông tin cá nhân
                </h1>
                <div className="flex items-center justify-start h-fit mt-6">
                    <label className="relative cursor-pointer">
                        <div>
                            <input
                                type="file"
                                id="account-profile-avatar"
                                name="account-profile-avatar"
                                accept="image/png, image/jpeg"
                                hidden
                                onChange={e => handleChangeAvatar(e.target.files[0])}
                            />
                            <AccountAvatar sx={100}/>
                        </div>
                        {avatar != null &&
                            <div className="absolute top-0">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100
                                    }}
                                    src={avatar?.url}
                                />
                            </div>
                        }
                        <span className="absolute z-40 bottom-0 right-0 text-stone-900 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <i className="uil uil-pen"></i>
                        </span>
                    </label>
                    <div className="flex flex-col items-start md:flex-row md:items-center ml-12 relative">
                        <span>Họ và tên:</span>
                        <input
                            type={"text"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="px-2 py-1 outline-0 border border-gray-300 rounded-lg md:ml-4"
                        />
                        {
                            errors.name !== "" &&
                            <p className="md:absolute -bottom-8 left-20 px-2 text-red-500">
                                {errors.name}
                            </p>
                        }

                    </div>
                </div>
                <div className="flex flex-col justify-start h-fit mt-12">
                    <div className="flex items-center">
                        <span className="w-28">
                            Ngày sinh:
                        </span>
                        <input
                            type={"date"}
                            className="px-2 py-1 outline-0 border border-gray-300 rounded-lg"
                            defaultValue={birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                    </div>
                    {
                        errors.birthday !== "" &&
                        <p className="text-red-500 pt-4">
                            Ngày sinh không hợp lệ
                        </p>
                    }
                </div>
                <div className="flex items-center justify-start h-fit mt-8">
                    <span className="w-28">
                        Giới tính:
                    </span>
                    <div className="flex flex-row items-center">
                        {genderList.map(item =>
                            <div key={item.id} className="mr-4 md:mr-6">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={item.type === gender}
                                    aria-checked={item.type === gender}
                                    onClick={() => setGender(item.type)}
                                    onChange={() => setGender(item.type)}
                                    className="aria-checked:bg-purple-500"
                                />
                                <span className="ml-2">
                                    {item.type}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center mt-16">
                    <button
                        className="flex items-center px-4 py-2 rounded-lg bg-purple-600 text-gray-50 hover:bg-purple-800 hover:text-gray-300"
                        onClick={handleUpdateProfile}
                    >
                        Lưu thay đổi
                    </button>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        message="Cập nhật thành công"
                        onClose={handleCloseShowSuccess}
                    />
                </div>
            </div>
            <div className="bg-white flex flex-col h-full px-4 py-4">
                <div className="flex flex-col w-full">
                    <h1 className="flex items-center justify-start h-fit font-bold text-xl">
                        Số điện thoại và Email
                    </h1>
                    <div className="flex items-center justify-between w-full h-fit mt-6">
                        <div className="flex justify-center items-center">
                            <i className="uil uil-phone text-2xl text-purple-600"></i>
                            <div className="flex flex-col ml-6">
                                <h3 className="font-bold">
                                    Số điện thoại
                                </h3>
                                <p>
                                    {account.phone}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link
                                to="/account/profile/phone"
                                className="text-yellow-600 border border-yellow-500 py-1 px-2 rounded-lg hover:bg-yellow-500 hover:text-stone-900"
                            >
                                Cập nhật
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full h-fit mt-6">
                        <div className="flex justify-center items-center">
                            <i className="uil uil-envelope-alt text-2xl text-purple-600"></i>
                            <div className="flex flex-col ml-6">
                                <h3 className="font-bold">
                                    Điạ chỉ Email
                                </h3>
                                <p>
                                    {account.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link
                                to="/account/profile/email"
                                className="text-yellow-600 border border-yellow-500 py-1 px-2 rounded-lg hover:bg-yellow-500 hover:text-stone-900"
                            >
                                Cập nhật
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-12">
                    <h1 className="flex items-center justify-start h-fit font-bold text-xl">
                        Bảo mật
                    </h1>
                    <div className="flex items-center justify-between w-full h-fit mt-6">
                        <div className="flex justify-center items-center">
                            <i className="uil uil-lock-alt text-2xl text-purple-600"></i>
                            <div className="flex flex-col ml-6">
                                <h3 className="font-bold">
                                    Thay đổi mật khẩu
                                </h3>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link
                                to="/account/profile/password"
                                className="text-yellow-600 border border-yellow-500 py-1 px-2 rounded-lg hover:bg-yellow-500 hover:text-stone-900"
                            >
                                Cập nhật
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile