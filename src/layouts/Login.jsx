import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Error from "../components/Error.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginRequest} from "../services/AuthService.jsx";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";

function Login(){
    const [errors, setErrors] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuthFeatures()

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
        <main className="flex flex-col items-center justify-center py-14 bg-stone-800 text-gray-50">
            <h1
                className="text-purple-700 text-6xl font-bold mt-4 mb-4"
            >
                Đăng nhập
            </h1>
            <div
                className="flex flex-col items-start justify-center bg-stone-900 border-2 border-stone-600 my-4 px-4 py-6 rounded-lg drop-shadow-sm"
            >
                <Input
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    className="bg-stone-700"
                />
                {errors && <Error message={errors?.email} />}
                <Input
                    placeholder="Mật khẩu"
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="bg-stone-700"
                />
                {errors && <Error message={errors?.password} />}
                <Button custom="self-center" onClick={submitHandler}>
                    Đăng nhập
                </Button>
            </div>
        </main>
    )
}

export default Login