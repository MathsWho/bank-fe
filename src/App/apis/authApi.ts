import {Login, Register} from "../types/auth";
import {callApi} from "../helpers/apiCall";
import {loginUrl, registerUrl, logoutUrl, getUsersUrl, getUserDetailsByIdUrl, updateFeeUrl} from "../constans";

export const loginApi = async ({username, password}: Login) => {
    const config: any = {
        url: loginUrl,
        method: 'POST',
        data: {login: username, password: password}
    }

    return callApi({config})
}

export const registerApi = async ({login, password, userName, accountType}: Register) => {
    const config: any = {
        url: registerUrl,
        method: 'POST',
        data: {login: login, password: password, userName, accountType}
    }

    return callApi({config})
}

export const logoutApi = async () => {
    const config: any = {
        url: logoutUrl,
        method: 'POST',
        data: {}
    }

    return callApi({config})
}

