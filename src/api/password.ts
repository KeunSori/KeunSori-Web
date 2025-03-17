import authApi from "./Instance/authApi";

interface PasswordChangeParams {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

// 비밀번호 변경 API 호출
const changePassword = async (
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

// 비밀번호 생성 규칙을 만족하는지 유효성 검사 - 특수문자, 8자리 이상, 영문자
const checkPasswordValidity = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    minLength && (hasUpperCase || hasLowerCase) && hasDigits && hasSpecialChars
  );
};

export { changePassword, checkPasswordValidity };
