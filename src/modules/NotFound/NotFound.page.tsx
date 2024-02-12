import Container from "./NotFound.style";

function NotFound(): JSX.Element {
    return (
        <Container className="my-5 py-5">
            <h1 className="text-center">404</h1>
            <h4 className="text-center">your requested data was not found</h4>
        </Container>
    );
}

export default NotFound;