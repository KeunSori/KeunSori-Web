import { css } from "@emotion/css";
import styled from "@emotion/styled";

import {
  Checkbox,
  Detail,
  FlexRow,
  Notion,
  Title,
  UserName,
} from "./NotionStyle.tsx";
import { UserInfo } from "../../../../data/user.ts";
import { useState } from "react";
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedDeleteIds([...checkedDeleteIds, user.reservationId]);
    } else {
      setCheckedDeleteIds(
        checkedDeleteIds.filter((id) => id !== user.reservationId),
      );
    }
  };

  return (
    <>
      <Notion>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
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
          <Title>
            악기 <Detail>{instrument}</Detail>
          </Title>
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              gap: 15px;
            `}
          >
            <Title>
              날짜
              <Detail>{`${formatDate(user.reservationDate)}`}</Detail>
            </Title>

            <Title>
              시간{" "}
              <Detail>
                {user.reservationStartTime} - {user.reservationEndTime}
              </Detail>
            </Title>
          </div>
        </div>
        <RowDivider />
        <div
          className={css`
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

const RowDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f1f1;
`;
