import {Form, useOutletContext} from "react-router-dom";
import AccountAvatar from "../components/AccountAvatar.jsx";
import {useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import Snackbar from '@mui/material/Snackbar';
import Avatar from "@mui/material/Avatar";

function Profile(){
    const [account, setAccount] = useOutletContext()
    const [name, setName] = useState(account.name)
    const [birthday, setBirthday] = useState(() => {
        return account.birthday
    })
    const [gender, setGender] = useState(() => {
        return account.gender
    })
    const { update } = useAuthFeatures()
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: ""
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
        authAxios
            .put("/api/v1/account/profile", data)
            .then(response => {
                setAccount(response.data)
                update(response.data)
                handleClickShowSuccess()
            })
            .catch(error => {
                setErrors({
                    ...errors,
                    name: error.response?.data?.name
                })
            })
    }

    const handleChangeAvatar = (file) => {
        const form = new FormData()
        form.append("avatar", file)
        authAxios
            .put("/api/v1/account/profile/avatar", form)
            .then(response => {
                update(response.data)
            })
    }

    return (
        <>
            <div className="flex flex-col bg-white px-4 py-4">
                <h1
                    className="flex items-center justify-start h-fit font-bold text-xl"
                >
                    Thông tin cá nhân
                </h1>
                <div className="flex items-center justify-start h-fit mt-10">
                    <label className="cursor-pointer relative">
                        <AccountAvatar sx={100}/>
                        <span className="absolute bottom-0 right-0 text-stone-900 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <i className="uil uil-pen"></i>
                        </span>
                        <input
                            type="file"
                            id="account-profile-avatar"
                            name="account-profile-avatar"
                            accept="image/png, image/jpeg"
                            hidden
                            onChange={e => handleChangeAvatar(e.target.files[0])}
                        />
                        {/*{avatar &&*/}
                        {/*    <div className="absolute z-40 top-0">*/}
                        {/*        <Avatar*/}
                        {/*            alt="Avatar"*/}
                        {/*            src={avatar}*/}
                        {/*            sx={{*/}
                        {/*                width: 100,*/}
                        {/*                height: 100*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </label>
                    <div className="flex flex-row items-center ml-12 relative">
                        <span>Họ và tên:</span>
                        <input
                            type={"text"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="px-2 py-1 outline-0 border border-gray-300 rounded-lg ml-4"
                        />
                        {
                            errors.name !== "" &&
                            <p className="absolute -bottom-8 left-20 px-2 text-red-500">
                                {errors.name}
                            </p>
                        }

                    </div>
                </div>
                <div className="flex items-center justify-start h-fit mt-10">
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
                <div className="flex items-center justify-start h-fit mt-10">
                    <span className="w-28">
                        Giới tính:
                    </span>
                    <div className="flex flex-row items-center">
                        {genderList.map(item =>
                            <div key={item.id} className="mr-6">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={item.type === gender}
                                    onChange={() => setGender(item.type)}
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
            <div className="bg-white">

            </div>
        </>
    )
}

export default Profile