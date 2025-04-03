import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarModelsPage from "./pages/CarModelsPage.tsx";
import FleetPage from "./pages/FleetPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import NavbarComponent from "./components/Navbar";

function App() {
    return (
        <Router>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/models" element={<CarModelsPage />} />
                <Route path="/fleet" element={<FleetPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
