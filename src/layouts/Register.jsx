import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {useState} from "react";
import Error from "../components/Error.jsx";
import {signupRequest} from "../services/AuthService.jsx";
import error from "../components/Error.jsx";
import {useNavigate} from "react-router-dom";
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";

function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone]  = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const { login } = useAuthFeatures()

    const [errors, setErrors] = useState()

    const handleSubmit = () => {
        if (password !== confirm){
            setErrors({
                confirm: "Mật khẩu không khớp"
            })
            return
        }
        signupRequest(name, email, password, phone)
            .then(response => {
                const data = response.data
                login(data.account, data.token)
                navigate("/")
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <div className="flex flex-col items-center justify-center w-ful py-14">
            <h1
                className="text-purple-700 text-6xl font-bold mt-4 mb-4"
            >
                Đăng kí
            </h1>
            <div
                className="flex flex-col items-start justify-center border-2 my-4 px-4 py-6 rounded-lg drop-shadow-sm"
            >
                <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errors && <Error message={errors?.name} />}
                <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {errors && <Error message={errors?.email} />}
                <Input
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {errors && <Error message={errors?.password} />}
                <Input
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                />
                {errors && <Error message={errors?.confirm} />}
                <Input
                    placeholder="Phone"
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                {errors && <Error message={errors?.phone} />}
                <Button
                    custom="self-center"
                    onClick={handleSubmit}
                >
                    Đăng kí
                </Button>
            </div>
        </div>
    )
}

export default Register