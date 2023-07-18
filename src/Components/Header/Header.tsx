import { useState } from "react";
import Modal from "../Modal/Modal";
import "@/Components/Header/Header.scss";
import "@/Common/Styles/global.scss";
import SearchIput from "../Search/Component/SearchIput";
import SearchCartList from "../Search/Component/SearchCartList";
import Calories from "@/Routes/Calories/Calories.tsx";
import PretendBuy from "@/Routes/PretendBuy/Pretend-Buy.tsx";

export default function Header() {
  const [buy, setBuy] = useState(false);
  const [scale, setScale] = useState(false);
  const [isActive] = useState(false);

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
        <PretendBuy />
      </Modal>

      {/* 나의 권장 칼로리 모달 */}
      <Modal visibility={scale} toggle={setScale}>
        <Calories />
        <SearchCartList />
      </Modal>
    </header>
  );
}
