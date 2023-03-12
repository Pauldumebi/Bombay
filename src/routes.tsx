import Page from "pages";
import NotFound from "components/not-found";

interface RouterProps {
    path: string;
    element: JSX.Element;
    children?: RouterProps[];
}

export const routes = (): RouterProps[] => [
    {
        path: "/*",
        element: <Page />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
