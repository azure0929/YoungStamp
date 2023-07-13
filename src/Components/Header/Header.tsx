import { useState } from "react";
import Modal from "../Modal/Modal";
import "@/Components/Header/Header.scss"
import "@/Common/Styles/global.scss";
import PretendBuyPost from "@/Components/PretendBuy/PretendBuy-post.tsx";
import PretendBuyTitle from "@/Components/PretendBuy/PretendBuy-title.tsx";

export default function Header () {
  const [buy, setBuy] = useState(false);
  const [scale, setScale] = useState(false);
  const [isActive] = useState(false);
  const [tab, setDealTab] = useState('curr');

  return (
    <header>
      <div className="inner">
        <div className="logo">
          <img src="/images/logo.png" alt="logo"/>
        </div>
        <div className="gnb">
          <div className="buycomplete">
            <button type="button" onClick={() => {setBuy(true);}} className={isActive ? 'active' : ''}>샀다치고</button>
          </div>
          <div className="search">
            <input type="text" placeholder="칼로리를 입력해주세요." />
            <img src="/images/search.png" alt="검색 아이콘" />
          </div>
          <div className="myinfo">
            <p>나의 칼로리 정보</p>
            <div className="scalebtn">
              <button type="button" onClick={() => {setScale(true);}}></button>
            </div>
          </div>
        </div>
      </div>

      {/* 샀다치고 모달 */}
      <Modal visibility={buy} toggle={setBuy}>
        <PretendBuyTitle />
        <PretendBuyPost />
      </Modal>

      {/* 나의 권장 칼로리 모달 */}
      <Modal visibility={scale} toggle={setScale}>
        <div className="gender">
          <button type="button" className={`btn ${tab === 'curr' ? 'active' : ''}`} onClick={() => setDealTab('curr')}>남자 권장 칼로리</button>
          <button type="button" className={`btn ${tab === 'prev' ? 'active' : ''}`} onClick={() => setDealTab('prev')}>여자 권장 칼로리</button>
        </div>
        <ul>
          <li>탄수화물</li>
          <li>지방</li>
          <li>단백질</li>
        </ul>
        <button>달력</button>
      </Modal>
    </header>
  );
}