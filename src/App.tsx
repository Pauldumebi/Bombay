import { Suspense } from "react";
import { routes } from "routes";
import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import CustomSpinner from "components/custom-spinner";

const App = () => {
    const routeResult = useRoutes(routes());
    return (
        <div className="App">
            <ErrorBoundary fallback={<p>"Something went wrong"</p>}>
                <Suspense fallback={<CustomSpinner />}>{routeResult}</Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default App;
