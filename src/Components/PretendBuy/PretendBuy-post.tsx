import { postExpense } from "@/Api/api.ts";
import PretendBuyList from "@/Components/PretendBuy/PretendBuy-list.tsx";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import RemoteDate from "@/Components/Calendar/RemoteDate.tsx";
import Calendar from "@/Components/Calendar/Calendar.tsx";

export default function PretendBuyPost() {
  const [text, setText] = useState("");
  const [money, setMoney] = useState(0);
  // const [today, setToday] = useState(new Date());
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);
  const [today, setToday] = useState(new Date().getDate());

  let todayDate:string = `${whatYear}-${String(whatMonth).padStart(2, '0')}-${String(today).padStart(2, '0')}`;
  console.log(todayDate);
  // const currentDate = dayjs();
  // const date: string = currentDate.format("YYYY-MM-DD");

  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: ExpendType =
      { amount: money, userId: "team6", category: "삿다치고", description: text, date: String(today) };
    postExpense(postData).then(() => {
      queryClient.invalidateQueries(["searchData"]);
    });
    setText("");
    setMoney(0);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.id === "money" ? setMoney(Number(e.target.value)) : setText(e.target.value);
  };

  // @ts-ignore
  return (
    <div>
      <div>
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
          category={"칼로리"}
          backgroundColor={"var(--primary1)"}
        />

      </div>
      <form
        className={"post-form"}
        onSubmit={handleSubmit}>
        <div className={"content-box"}>
          <input
            placeholder="참은 행동이나 물건을 입력해 주세요"
            id="product"
            onChange={handleChange}
            value={text}
            type="text"
            name="action"
          />
        </div>
        <div className={"money-box"}>
          <input
            placeholder="절약하게 된 금액을 입력해 주세요"
            id="money"
            onChange={handleChange}
            value={money}
            type="text"
            name="money"
          />
        </div>
        <div className={"buttons"}>
          <button type={"submit"}>추가하기</button>
        </div>
      </form>
      <PretendBuyList date={todayDate} />

    </div>
  );
}
