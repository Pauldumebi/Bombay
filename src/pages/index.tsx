import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import CustomSpinner from "components/custom-spinner";
import NotFound from "components/not-found";

const Home = lazy(() => import("./home"));
const Games = lazy(() => import("./games"));
const Users = lazy(() => import("./users"));

const Page = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route
                        index={true}
                        element={
                            <ErrorBoundary fallback={<p>"Something went wrong"</p>}>
                                <Suspense fallback={<CustomSpinner />}>
                                    <Users />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/games"
                        element={
                            <ErrorBoundary fallback={<p>"Something went wrong"</p>}>
                                <Suspense fallback={<CustomSpinner />}>
                                    <Games />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default Page;
