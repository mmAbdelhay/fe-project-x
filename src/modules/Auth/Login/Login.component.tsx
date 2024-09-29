import {useState} from "react";
import Container from "./Login.style.tsx";
import Input from "../../../components/SmallComponents/Input.tsx";
import Button from "../../../components/SmallComponents/Button.tsx";
import {LoginRequest} from "../../../requests/Auth/login.request.ts";

const Login = (): JSX.Element => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: any) => {
        e.preventDefault();
        let data = await LoginRequest({email, password})
        sessionStorage.setItem('token', data.token);
        window.location.href = '/';
    };

    return (
        <Container className={'container mt-5 p-5 w-50'}>
            <h3>Login</h3>
            <form onSubmit={login}>
                <Input
                    label="Email"
                    type="email"
                    onInputChange={(value: string) => setEmail(value)}
                />
                <Input
                    label="Password"
                    type="password"
                    onInputChange={(value: string) => setPassword(value)}
                />
                <Button text="Login" bg={'success'}/>
            </form>
        </Container>
    );
};

export default Login;
