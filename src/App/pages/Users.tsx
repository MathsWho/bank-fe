import {ValidRoles} from "../../App";
import {Link, useNavigate} from "react-router-dom";
import {logoutApi} from "../apis/authApi";
import React, {useEffect, useState} from "react";
import {getUsersApi, updateFeeApi} from "../apis/userApi";
import {Input} from "@mui/material";
import jwtDecode from "jwt-decode";

export interface UsersProps {
    claims: ValidRoles,
    setRefresh: (value: React.SetStateAction<boolean>) => void;
    refresh: boolean
}

interface User {
    userId: string
    userName: string,
    accountType: ValidRoles,
    fee: number,
    accountNumber: string
}

export const Users = ({claims, setRefresh, refresh}: UsersProps) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([])
    const [fee, setFee] = useState<number>(0)
    const [balanceUpdated, setBalanceUpdated] = useState<boolean>(false)
    const [loggedUserId, setLoggedUserId] = useState<string>("")

    const handleLogout = (event: any) => {
        event.preventDefault();
        logoutApi().then(value => {
            localStorage.removeItem("jwt")
            setRefresh(!refresh)
            navigate("/")
        })
            .catch(reason => {
                console.log(reason)
                setRefresh(!refresh)
                navigate("/")
            })
    }

    const handleUpdateFee = (event: any, userId: string) => {
        event.preventDefault();
        updateFeeApi(userId, fee, localStorage.getItem("jwt") ?? "")
            .then(value => {
                console.log(value)
                setBalanceUpdated(!balanceUpdated)
            })
            .catch(reason => {
                console.log(reason)
                setBalanceUpdated(!balanceUpdated)
            })
    }

    useEffect(() => {
        getUsersApi(localStorage.getItem("jwt") ?? "").then(value => {
            const usersResponse: User[] = value.data;
            setUsers(usersResponse)

            const decodedClaims = jwtDecode(localStorage.getItem("jwt") ?? "")

            // @ts-ignore
            const loggedUserId = decodedClaims.userId as string

            setLoggedUserId(loggedUserId)
            // const externalUsersResponse = usersResponse.filter(function (elem, index, self) {
            //     return elem.accountType === ValidRoles.EXTRNALUSER;
            // })
            // setExternalUsers(externalUsersResponse);
        }).catch(reason => {
            console.log(reason)
        })
    }, [balanceUpdated])

    const handleFeeOnChange = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setFee(value)
    }


    return (
        claims === ValidRoles.INTERNALUSER
            ?
            <div>
                <button onClick={handleLogout}>Logout</button>
                <h1>{ValidRoles.INTERNALUSER} </h1>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Account</td>
                        <td>AccountType</td>
                        <td>Balance</td>
                    </tr>

                    {users.filter(value => value.accountType === ValidRoles.EXTRNALUSER).map(value =>
                        <tr key={value.userId}>
                            <td hidden={true}>{value.userId}</td>
                            <td>{value.userName}</td>
                            <td>{value.accountNumber}</td>
                            <td>{value.accountType}</td>
                            <td>
                                <Input defaultValue={value.fee} onChange={handleFeeOnChange}></Input>
                                <button onClick={target => handleUpdateFee(target, value.userId)}>Update fee</button>
                            </td>
                        </tr>)}
                </table>
                <li>
                    <Link to="/register">Add user</Link>
                </li>
            </div>
            : <div>
                <button onClick={handleLogout}>Logout</button>
                <h1>{ValidRoles.EXTRNALUSER}</h1>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Account</td>
                        <td>AccountType</td>
                        <td>Balance</td>
                    </tr>
                    {users.filter(value => value.userId === loggedUserId).map(value =>
                        <tr key={value.userId}>
                            <td hidden={true}>{value.userId}</td>
                            <td>{value.userName}</td>
                            <td>{value.accountNumber}</td>
                            <td>{value.accountType}</td>
                            <td>
                                <Input defaultValue={value.fee} onChange={handleFeeOnChange}></Input>
                                <button onClick={target => handleUpdateFee(target, value.userId)}>Update fee</button>
                            </td>
                        </tr>)}
                </table>
            </div>
    )
}


