import Container from "./Register.style.tsx";
import Input from "../../../components/SmallComponents/Input.tsx";
import Button from "../../../components/SmallComponents/Button.tsx";
import { useState } from "react";
import { RegisterRequest } from "../../../requests/Auth/register.request.ts";
import { useNavigate } from "react-router-dom";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: any) => {
    e.preventDefault();
    await RegisterRequest({ email, password, name });
    navigate("/login");
  };

  return (
    <Container className={"container mt-5 p-5 w-50"}>
      <h3>Register</h3>
      <form onSubmit={register}>
        <Input label="Name" type="text" onInputChange={(value: string) => setName(value)} />
        <Input label="Email" type="email" onInputChange={(value: string) => setEmail(value)} />
        <Input label="Password" type="password" onInputChange={(value: string) => setPassword(value)} />
        <Button text="Register" bg={"success"} />
      </form>
    </Container>
  );
};

export default Register;
