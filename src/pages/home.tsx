import { Suspense } from "react";
import Navbar from "components/navbar";
import SideMenu from "components/side-menu";
import { ErrorBoundary } from "react-error-boundary";
import CustomSpinner from "components/custom-spinner";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <SideMenu>
                    <div className="flex flex-col w-full">
                        <div className="container mx-auto px-2">
                            <ErrorBoundary fallback={<p>An error occurred</p>}>
                                <Suspense fallback={<CustomSpinner />}>
                                    <Outlet />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </div>
                </SideMenu>
            </div>
        </>
    );
};

export default Home;
