import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Error from "../components/Error.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginRequest} from "../services/AuthService.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {getPrice} from "../utils/getPrice.jsx";

function Login(){
    const [errors, setErrors] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuthFeatures()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const submitHandler = async () => {
        setEmail("")
        setPassword("")
        await loginRequest(email, password)
                .then(response => {
                    const data = response.data
                    login(data.account, data.token)
                    navigate("/")
                })
                .catch(error => {
                    if (error.response.status === 400){
                        setErrors(error.response.data)
                    } else if (error.response.status === 403){
                        setErrors({
                            email: "Tài khoản hoặc mật khẩu không đúng"
                        })
                    }
                })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main className="flex flex-col items-center justify-center py-14 bg-gray-100 text-gray-600">
                    <h1
                        className="text-purple-600 text-6xl font-bold mt-4 mb-4"
                    >
                        Đăng nhập
                    </h1>
                    <div
                        className="flex flex-col items-start justify-center bg-white my-4 px-4 py-6 rounded-lg drop-shadow-xl"
                    >
                        <Input
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            value={email}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.email} />}
                        <Input
                            placeholder="Mật khẩu"
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            className="bg-gray-100 border-gray-100"
                        />
                        {errors && <Error message={errors?.password} />}
                        <div className="flex justify-center items-center w-full mt-4">
                            <Button
                                onClick={submitHandler}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

export default Login