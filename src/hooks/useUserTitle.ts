import { UserInfo } from "@/data/user";
import { getUserTitle } from "@/utils/userTitleUtils";
import { useEffect, useState } from "react";

// 사용자 이름(일반 예약) 또는 팀 이름(정기예약)
export const useUserTitle = (user: UserInfo) => {
  const [userTitle, setUserTitle] = useState<string>("");

  useEffect(() => {
    setUserTitle(getUserTitle(user));
  }, [user]);

  return userTitle;
};
