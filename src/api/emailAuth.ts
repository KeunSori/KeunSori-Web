import baseApi from "./Instance/baseApi";

export const authNumberRequest = async (email: string) => {
  try {
    const response = await baseApi.post("/email/auth-number/send", { email: email }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};

export const sendAuthNumber = async (email: string, authNumber: string) => {
  try {
    const response = await baseApi.post("/email/auth-number/verify", {
      email: email,
      authNumber: authNumber,
    }, 
    {headers: {
      "Content-Type": "application/json"
    }});
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};
