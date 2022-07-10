import {Link} from "react-router-dom";

export const RegisterErrorPage = () => {
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