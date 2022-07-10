import {Link} from "react-router-dom";

export const LoginErrorPage = () => {
    return(
        <div>
            <h1>Error occured during login</h1>
            <li>
                <Link to="/">Try sign in again</Link>
            </li>
            <li>
                <Link to="/register">Try sign up</Link>
            </li>
        </div>
    )
}