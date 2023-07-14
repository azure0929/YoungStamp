import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { useState } from "react";
import "@/Routes/Main/Main.scss";
import Youtube from "@/Components/YouTube/Youtube.tsx";

export default function Main () {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index:number) => {
    setActiveIndex(index);
  }

  const tabContArr = [
    {
      tabTitle: (
        <li>
          <button className={activeIndex===0 ? "is-active" : ""} onClick={() => tabClickHandler(0)}>월간</button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <div className="chart">월간 그래프</div>
          <div className="scale">월별 섭취한 칼로리 </div>
        </div>
      )
    },
    {
      tabTitle: (
        <li>
          <button className={activeIndex===1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>주간</button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <div className="chart">주간 그래프</div>
          <div className="scale">주간 섭취한 칼로리</div>
        </div>
      )
    },
    {
      tabTitle: (
        <li className="select">
          <button className={activeIndex===2 ? "is-active" : ""} onClick={() => tabClickHandler(2)}>선택없음</button>
        </li>
      ),
      tabCont: (
        <div className="contents">
          <div className="chart">일별 그래프</div>
          <div className="scale">일별 섭취한 칼로리</div>
        </div>
      )
    }
  ]

  return (
    <div>
      <Header />
      <div className="daychart">
        <ul className="tabs is-boxed">
          {tabContArr.map((section) => {
            return section.tabTitle
          })}
        </ul>
        <div>
          {tabContArr[activeIndex].tabCont}
        </div>
      </div>
      <div className="youtube">
        <Youtube />
      </div>
      <Footer />
    </div>
  );
}