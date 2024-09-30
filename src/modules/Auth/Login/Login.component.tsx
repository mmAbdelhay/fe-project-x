import { useState } from "react";
import Container from "./Login.style.tsx";
import Button from "@uk-source-web/button";
import { LoginRequest } from "../../../requests/Auth/login.request.ts";
import Heading from "@uk-source-web/heading";
import TextInputWithLabel from "@uk-source-web/text-input-with-label";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const data = await LoginRequest({ email, password });
    sessionStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  return (
    <Container className={"container mt-5 p-5 w-50"}>
      <Heading level={3} text="Login" />

      <form
        onSubmit={(e: any) => {
          e.preventDefault();
        }}
        className="d-flex flex-column gap-3"
      >
        <TextInputWithLabel
          fieldWrapper={{
            label: "",
            showLabel: false,
          }}
          textInput={{
            id: "email",
            type: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }}
        />

        <TextInputWithLabel
          fieldWrapper={{
            label: "",
            showLabel: false,
          }}
          textInput={{
            id: "password",
            type: "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
          }}
        />

        <Button text="Login" appearance="primary" onClick={login} />
      </form>
    </Container>
  );
};

export default Login;
