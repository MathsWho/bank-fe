import {getUserDetailsByIdUrl, getUsersUrl, updateFeeUrl} from "../constans";
import {callApi} from "../helpers/apiCall";


export const getUsersApi = async (token: string) => {
    const config: any = {
        url: getUsersUrl,
        method: 'GET',
        data: {}
    }

    return callApi({config, token})
}

export const getUserDetailsApi = async (userId: string, token: string) => {
    const config: any = {
        url: getUserDetailsByIdUrl + '/' + userId,
        method: 'GET',
        data: {}
    }

    return callApi({config, token})
}

export const updateFeeApi = async (userId: string, fee: number, token: string) => {
    const config: any = {
        url: updateFeeUrl,
        method: 'PUT',
        data: {userId: userId, fee: fee}
    }

    return callApi({config, token})
}