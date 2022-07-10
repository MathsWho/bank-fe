import * as React from "react";
import './App.css';
import {Login} from "./App/pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register} from "./App/pages/Register";
import {useEffect, useState} from "react";
import {LoginErrorPage} from "./App/pages/LoginErrorPage";
import {RegisterErrorPage} from "./App/pages/RegisterErrorPage";
import {Users} from "./App/pages/Users";
import jwtDecode from "jwt-decode";

export function App() {
    const [login, setLogin] = useState<boolean>(false)
    const [claims, setClaims] = useState<ValidRoles>(ValidRoles.EXTRNALUSER)
    const [refresh, setRefresh] = useState<boolean>(false)
    const token = "jwt"
    const [loggedUserId, setLoggedUserId] = useState<string>("")

    useEffect(() => {
        const jwt = localStorage.getItem(token)

        jwt ? setLogin(true) : setLogin(false)

        if (jwt != null) {
            const decodedClaims = jwtDecode(jwt ?? "")

            // @ts-ignore
            const accountType = decodedClaims.AccountType as ValidRoles

            setClaims(accountType)
        }
    }, [refresh])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login {...{login, setRefresh, refresh}} />}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/users" element={<Users {...{claims, setRefresh, refresh}}/>}/>
                <Route path="/login-error-page" element={<LoginErrorPage/>}/>
                <Route path="/register-error-page" element={<RegisterErrorPage/>}/>
                {/*<Route index element={<Home />} />*/}
                {/*<Route path="blogs" element={<Blogs />} />*/}
                {/*<Route path="contact" element={<Contact />} />*/}
                {/*<Route path="*" element={<NoPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
}


export default App;


export enum ValidRoles {
    ADMIN = "ADMIN",
    EXTRNALUSER = "EXTERNALUSER",
    INTERNALUSER = "INTERNALUSER",
}
