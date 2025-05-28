import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./Components/Error";
import { Layout } from "./Layout";

export const App = () => (
    <ErrorBoundary>
        <BrowserRouter>
                <Layout />
        </BrowserRouter>
    </ErrorBoundary>
);