import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

function Login(){
    return (
        <div className="flex flex-col items-center justify-center w-ful bg-stone-800 text-gray-50">
            <Input
                placeholder="Email"
            />
            <Input
                placeholder="Mật khẩu"
            />
            <Button>
                Đăng nhập
            </Button>
        </div>
    )
}

export default Login