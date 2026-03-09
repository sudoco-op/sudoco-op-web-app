const getUserToken = () => {
    return localStorage.getItem("userToken")?.trim();
}

const setUserToken = (userToken : string) => {
    localStorage.setItem("userToken", userToken);
}

export { getUserToken, setUserToken }