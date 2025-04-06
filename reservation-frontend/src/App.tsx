import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarModelsPage from "./pages/CarModelsPage";
import FleetPage from "./pages/FleetPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavbarComponent from "./components/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import ErrorAlert from "./components/ErrorAlert";

function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
        <div className="container mt-4">
            <ErrorAlert message={error.message} />
            <button className="btn btn-primary mt-3" onClick={resetErrorBoundary}>
                Try again
            </button>
        </div>
    );
}

function App() {
    return (
        <Router basename="/ui">
            <NavbarComponent />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/models" element={<CarModelsPage />} />
                    <Route path="/fleet" element={<FleetPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;