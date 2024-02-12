import Spinner from "../../assets/images/spinner.svg";
import Container from "./Loader.style";

type LoaderProps = {
    id?: string;
};

function Loader({ id = "" }: LoaderProps): JSX.Element {
    return (
        <Container id={id}>
            <img src={Spinner} alt="" />
        </Container>
    );
}

export default Loader;