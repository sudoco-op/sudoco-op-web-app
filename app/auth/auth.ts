import { jwtDecode } from "jwt-decode";

const getUserToken = () => {
    return localStorage.getItem("userToken")?.trim();
}

const setUserToken = (userToken : string) => {
    localStorage.setItem("userToken", userToken);
}

interface TokenPayload {
    nameid: string
}

const getUserId = () => {
    const jwt = getUserToken();
    if(jwt === undefined) return null;
    const jwtPayload = jwtDecode<TokenPayload>(jwt);
    return jwtPayload.nameid;
}

export { getUserToken, setUserToken, getUserId }