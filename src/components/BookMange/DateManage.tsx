import Calendar from "react-calendar";
import CalendarStyles from "../Book/Application/CalenderStyles";
import Container from "./Container";
import MyNotion from "../Book/My/MyNotion";
import { UserInfo } from "../../data/user";
const user: UserInfo = {
  reservationId: 1,
  reservationMemberName: "홍길동",
  reservationSession: "vocal",
  reservationDate: "2021-09-01",
  reservationEndTime: "11:00",
  reservationStartTime: "10:00",
  reservationType: "TEAM",
  reservationMemberId: 0,
};
const DateManage: React.FC = () => {
  return (
    <Container isDate={true}>
      <CalendarStyles>
        <Calendar
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
          formatDay={(_locale, date) => date.getDate().toString()}
        />
      </CalendarStyles>
      <MyNotion key={user.reservationId} user={user} />
    </Container>
  );
};
export default DateManage;
