import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notfound">
            <h1 className="text-center">
                404 | Page Not Found! Go <Link to="/">Home</Link>
            </h1>
        </div>
    );
};

export default NotFound;
