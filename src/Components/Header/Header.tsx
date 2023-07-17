import { useState } from "react";
import Modal from "../Modal/Modal";
import "@/Components/Header/Header.scss";
import "@/Common/Styles/global.scss";
// import Calories from "@/Routes/Calories/Calories";
import SearchIput from "../Search/Component/SearchIput";
import SearchCartList from "../Search/Component/SearchCartList";
import ContentPost from "@/Components/Common/Content-post.tsx";
import RemoteDate from "@/Components/Calendar/RemoteDate.tsx";
import Calendar from "@/Components/Calendar/Calendar.tsx";

export default function Header() {
  const [buy, setBuy] = useState(false);
  const [scale, setScale] = useState(false);
  const [isActive] = useState(false);
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);
  const [today, setToday] = useState(new Date().getDate());
  let todayDate: string = `${whatYear}-${String(whatMonth).padStart(2, "0")}-${String(today).padStart(2, "0")}`;
  return (
    <header>
      <div className="inner">
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="gnb">
          <div className="buycomplete">
            <button
              type="button"
              onClick={() => {
                setBuy(true);
              }}
              className={isActive ? "active" : ""}
            >
              샀다치고
            </button>
          </div>
          {/* 음식 검색 기능 컴포넌트 */}
          <SearchIput />
          <div className="myinfo">
            <p>나의 칼로리 정보</p>
            <div className="scalebtn">
              <button
                type="button"
                onClick={() => {
                  setScale(true);
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>

      {/* 샀다치고 모달 */}
      <Modal visibility={buy} toggle={setBuy}>
        <RemoteDate
          month={whatMonth}
          year={whatYear}
          setMonth={setWhatMonth}
          setYear={setWhatYear}
          backgroundColor={"var(--primary2)"}
        />
        <Calendar
          month={whatMonth}
          year={whatYear}
          today={today}
          setToday={setToday}
          setMonth={setWhatMonth}
          setYear={setWhatYear}
          category={'삿다치고'}
          backgroundColor={"var(--primary1)"}
        />
        <ContentPost todayDate={todayDate} categoryName={"삿다치고"}/>
      </Modal>

      {/* 나의 권장 칼로리 모달 */}
      <Modal visibility={scale} toggle={setScale}>
        <RemoteDate
          month={whatMonth}
          year={whatYear}
          setMonth={setWhatMonth}
          setYear={setWhatYear}
          backgroundColor={"var(--primary2)"}
        />
        <Calendar
          month={whatMonth}
          year={whatYear}
          today={today}
          setToday={setToday}
          setMonth={setWhatMonth}
          setYear={setWhatYear}
          category={'삿다치고'}
          backgroundColor={"var(--primary1)"}
        />
        <ContentPost todayDate={todayDate} categoryName={"다이어트"} />
        <SearchCartList />
      </Modal>
    </header>
  );
}
