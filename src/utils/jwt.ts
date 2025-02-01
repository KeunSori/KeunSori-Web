interface tokenData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireTime: string;
}

export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (tokenData: tokenData) => {
  localStorage.setItem("accessToken", tokenData.accessToken);
  localStorage.setItem("refreshToken", tokenData.refreshToken);
  localStorage.setItem(
    "accessTokenExpireTime",
    tokenData.accessTokenExpireTime
  );
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpireTime");
};
