import authApi from "./Instance/authApi";

interface PasswordChangeParams {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export const changePassword = async (
  memberStatus: string,
  params: PasswordChangeParams
) => {
  const endpoint =
    memberStatus === "일반" ? "/members/me/password" : "/admin/me/password";
  if (!endpoint) {
    throw new Error("가입 승인 대기 중입니다. 다른 계정으로 다시 시도하세요.");
  }
  const response = await authApi.patch(endpoint, params);
  return response;
};
