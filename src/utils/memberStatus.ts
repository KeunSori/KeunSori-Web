type memberStatus = "일반" | "관리자" | "승인 대기";

// 나중에 members/me 에서 회원 유형 정보까지 받게 되면 localstorage 로 관리 안 할 거임

export const getMemberStatus = () => localStorage.getItem("memberStatus");

export const setMemberStatus = (memberStatus: memberStatus) =>
  localStorage.setItem("memberStatus", memberStatus || "null");

export const removeMemberStatus = () => localStorage.removeItem("memberStatus");
