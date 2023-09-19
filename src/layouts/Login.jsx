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

    const changeEmailHandler = e => {
        setEmail(e.target.value)
    }

    const changePasswordHandler = e => {
        setPassword(e.target.value)
    }

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
        <div className="flex flex-col items-center justify-center w-ful py-14">
            <h1
                className="text-purple-700 text-6xl font-bold mt-4 mb-4"
            >
                Đăng nhập
            </h1>
            <div
                className="flex flex-col items-start justify-center border-2 my-4 px-4 py-6 rounded-lg drop-shadow-sm"
            >
                <Input
                    placeholder="Email"
                    onChange={changeEmailHandler}
                    type="text"
                    value={email}
                />
                {errors && <Error message={errors?.email} />}
                <Input
                    placeholder="Mật khẩu"
                    onChange={changePasswordHandler}
                    type="password"
                    value={password}
                />
                {errors && <Error message={errors?.password} />}
                <Button custom="self-center" onClick={submitHandler}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    )
}

export default Login