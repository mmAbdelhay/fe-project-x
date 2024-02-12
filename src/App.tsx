import {BrowserRouter as Router} from "react-router-dom";
import {Suspense} from "react";
import Routes from "./routes/routes.tsx";
import Loader from "./components/Loader/Loader.component";
import Header from "./components/Header/Header.component";

function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <Router>
                <Header/>
                <Routes/>
            </Router>
        </Suspense>
    );
}

export default App;