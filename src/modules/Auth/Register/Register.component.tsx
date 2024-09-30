import Container from "./Register.style.tsx";
import Button from "@uk-source-web/button";
import { useState } from "react";
import { RegisterRequest } from "../../../requests/Auth/register.request.ts";
import { useNavigate } from "react-router-dom";
import Heading from "@uk-source-web/heading";
import TextInputWithLabel from "@uk-source-web/text-input-with-label";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await RegisterRequest({ email, password, name });
    navigate("/login");
  };

  return (
    <Container className={"container mt-5 p-5 w-50"}>
      <Heading level={3} text="Register" />

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
            id: "name",
            type: "text",
            placeholder: "Name",
            value: name,
            onChange: (e) => setName(e.target.value),
          }}
        />

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
        <Button text="Register" appearance="primary" onClick={register} />
      </form>
    </Container>
  );
};

export default Register;
