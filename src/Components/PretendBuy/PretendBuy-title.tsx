import dayjs from "dayjs";
import "@/Components/PretendBuy/pretendBuy_modal.scss";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight, AiOutlineUp } from "react-icons/ai";
export default function PretendBuyTitle() {
  const currentYear:number = dayjs().year();
  const currentMonth:number = dayjs().month() + 1;
  return (
    <div className="pretend-buy-title">
      <div className={'month'}>
        <p className={'plus'}><AiOutlineLeft/></p>
        <p>{currentMonth}월</p>
        <p><AiOutlineRight/></p>
      </div>
      <div className={'year'}>
        <p><AiOutlineDown/></p>
        <p >{currentYear}</p>
        <p><AiOutlineUp/></p>
      </div>
    </div>
  )
}

