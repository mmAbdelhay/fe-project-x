import Loader from "../Loader/Loader.component.tsx";
import Container from "./HOC.style";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { checkIfLoggedIn } from "../../services/checkIfLoggedIn.ts";
import { getUserRequest } from "../../requests/User/get.user.request.ts";
import { MainContext } from "../../context/StoreProvider.tsx";

type HOCProps = {
  children: JSX.Element;
};

function HOC({ children }: HOCProps): JSX.Element {
  // @ts-ignore
  const { setUser } = useContext(MainContext);

  useEffect(() => {
    if (checkIfLoggedIn()) getUser();
  }, []);

  const getUser = async () => {
    const user = await getUserRequest();
    setUser(user);
  };

  return (
    <Container>
      <Loader id="app-loader" />
      {children}
      <ToastContainer />
    </Container>
  );
}

export default HOC;
