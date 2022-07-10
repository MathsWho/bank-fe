import {registerApi} from "../apis/authApi";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ValidRoles} from "../../App";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [accountType, setAccountType] = useState<ValidRoles>(ValidRoles.EXTRNALUSER)




    const handleEmail = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setEmail(value)
    }
    const handleName = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setName(value)
    }
    const handlePassword = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setPassword(value)
    }
    const handleUserType = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setAccountType(value)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        registerApi({
            login: email,
            password: password,
            accountType: accountType,
            userName: name
        }).then(value => {
            navigate("/")
            const jwt = localStorage.getItem("jwt")

            if (jwt !== null)
                navigate("/users")

        }).catch(reason => {
            console.log(reason)
            navigate("/register-error-page")
        })
    }

    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='fullName'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type='text' name='fullName' onChange={handleName}/>
                    </div>
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={handleEmail}/>
                    </div>
                    <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={handlePassword}/>
                    </div>
                    <div className='selector'>
                        <label htmlFor="cars">User Type:</label>
                        <select id="cars" onChange={handleUserType}>
                            <option value={ValidRoles.INTERNALUSER}>{ValidRoles.INTERNALUSER}</option>
                            <option value={ValidRoles.ADMIN}>{ValidRoles.ADMIN}</option>
                            <option value={ValidRoles.EXTRNALUSER}>{ValidRoles.EXTRNALUSER}</option>
                        </select>
                    </div>
                    <div className='submit'>
                        <button>Sign up</button>
                    </div>
                </form>
                <li>
                    <Link to="/">Sign in</Link>
                </li>
            </div>
        </div>
    );


}