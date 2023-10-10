import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";
import Error from "../components/Error.jsx";
import {signupRequest} from "../services/AuthService.jsx";
import {useNavigate} from "react-router-dom";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone]  = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleSubmit = () => {
        if (password !== confirm){
            setErrors({
                confirm: "Mật khẩu không khớp"
            })
            return
        }
        signupRequest(name, email, password, phone)
            .then(response => {
                navigate("/login")
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main className="flex flex-col items-center justify-center w-ful py-14 bg-gray-100 text-gray-600">
                    <h1
                        className="text-purple-600 text-6xl font-bold mt-4 mb-4"
                    >
                        Đăng kí
                    </h1>
                    <div
                        className="flex flex-col items-start justify-center bg-white my-4 px-4 py-6 rounded-lg drop-shadow-sm"
                    >
                        <Input
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.name} />}
                        <Input
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.email} />}
                        <Input
                            placeholder="Mật khẩu"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.password} />}
                        <Input
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.confirm} />}
                        <Input
                            placeholder="Phone"
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.phone} />}
                        <div className="flex justify-center items-center w-full mt-4">
                            <Button
                                onClick={handleSubmit}
                            >
                                Đăng kí
                            </Button>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

export default Register