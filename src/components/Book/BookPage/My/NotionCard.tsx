import { css } from "@emotion/css";
import {
  Checkbox,
  Detail,
  FlexRow,
  Notion,
  Title,
  UserName,
} from "./NotionStyle.tsx";
import { UserInfo } from "../../../../data/user.ts";
import { useEffect, useState } from "react";
import Modal from "./Modal.tsx";
import { isSameDate, transDate } from "../../../../utils/dateUtils.ts";
import { useUserTitle } from "@/hooks/useUserTitle.ts";
import { useAtom } from "jotai";
import { checkedDeleteIdsAtom } from "@/store/weekData.ts";

interface NotionCardProps {
  user: UserInfo;
  isAdmin?: boolean;
  onDelete: () => void;
  date: Date | null;
  instrument: string;
}

const NotionCard: React.FC<NotionCardProps> = ({
  user,
  isAdmin,
  onDelete,
  date,
  instrument,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const checkDate = () => {
    const now = new Date();
    const date = new Date(transDate(user.reservationDate));
    if (isSameDate(now, date)) {
      return false;
    }
    if (now > date) {
      return true;
    }
    return false;
  };

  const userTitle = useUserTitle(user);

  const [checkedDeleteIds, setCheckedDeleteIds] = useAtom(checkedDeleteIdsAtom);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedDeleteIds([...checkedDeleteIds, user.reservationId]);
    } else {
      setCheckedDeleteIds(
        checkedDeleteIds.filter((id) => id !== user.reservationId)
      );
    }
  };

  useEffect(() => {
    console.log("checkedDeleteIds:", checkedDeleteIds);
  }, [checkedDeleteIds]);
  return (
    <>
      <Notion>
        <FlexRow>
          <UserName>{userTitle}</UserName>
          {isAdmin && (
            <Checkbox
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={checkedDeleteIds.includes(user.reservationId)}
            />
          )}
        </FlexRow>
        <Title>악기</Title>
        <Detail>{instrument}</Detail>
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            padding-right: 30px;
            gap: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f1f1f1;
          `}
        >
          <div>
            <Title>날짜</Title>
            <Detail>{`${
              date
                ? `${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`
                : "날짜 정보 없음"
            }`}</Detail>
          </div>
          <div>
            <Title>시간</Title>
            <Detail>
              {user.reservationStartTime} - {user.reservationEndTime}
            </Detail>
          </div>
        </div>
        <div
          className={css`
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            className={css`
              font-weight: 700;
              color: #68ae82;
            `}
          >
            예약 완료
          </div>
          {!checkDate() && (
            <button
              className={css`
                font-weight: 700;
                color: #bbc5d5;
                background-color: white;
                cursor: pointer;
                &:hover {
                  color: black;
                }
              `}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              예약 취소
            </button>
          )}
        </div>
      </Notion>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default NotionCard;
