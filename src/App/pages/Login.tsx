import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginApi, logoutApi} from "../apis/authApi";

interface LoginData {
    login: boolean
    setRefresh: (value: React.SetStateAction<boolean>) => void;
    refresh: boolean
}

export const Login = ({login, setRefresh, refresh}: LoginData) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setEmail(value)
    }

    const handlePassword = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setPassword(value)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        loginApi({username: email, password: password})
            .then(value => {
                localStorage.setItem("jwt", value.data)
                setRefresh(!refresh)
                navigate('/users')
            })
            .catch(reason => {
                console.log(reason)
                navigate('/login-error-page')
            });
    }

    const handleLogout = (event: any) => {
        event.preventDefault();
        logoutApi().then(value => {
            localStorage.removeItem("jwt")
            navigate("/")
            setRefresh(!refresh)
        })
            .catch(reason => {
                console.log(reason)
                navigate("/")
            })
    }

    return (
        login ? <button onClick={handleLogout}>Logout</button>
            : <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={handleLogin}/>
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={handlePassword}/>
                        </div>
                        <div className='submit'>
                            <button>Sign in</button>
                        </div>
                    </form>
                </div>
                <li>
                    <Link to="/register">Sign up</Link>
                </li>
            </div>
    );
}