interface response {
    accessToken: string,
    refreshToken: string,
    accessTokenExpireTime: string,
}

export const getToken = () => localStorage.getItem("token");

export const setToken = (response: response) => {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessTokenExpireTime", response.accessTokenExpireTime);
}

export const removeToken = () => localStorage.removeItem("token");
