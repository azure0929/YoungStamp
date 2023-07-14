import { postExpense } from "@/Api/api.ts";
import dayjs from "dayjs";
import PretendBuyList from "@/Components/PretendBuy/PretendBuy-list.tsx";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function PretendBuyPost() {
  const [text, setText] = useState("");
  const [money, setMoney] = useState(0);
  const currentDate = dayjs();
  const today = currentDate.format("YYYY-MM-DD");
  const queryClient =  useQueryClient();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData: ExpendType =
      { amount: money, userId: "team6", category: "삿다치고", description: text, date: today };
    postExpense(postData).then(() => {queryClient.invalidateQueries(["searchData"])})


    setText("");
    setMoney(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.id === "money" ? setMoney(Number(e.target.value)) : setText(e.target.value);
  };


  return (
    <div>
      <form
        className={"post-form"}
        onSubmit={handleSubmit}>
        <div className={"content-box"}>
          <label htmlFor="action">내가 찾은 물품</label>
          <input
            id="product"
            onChange={handleChange}
            value={text}
            type="text"
            name="action"
          />
        </div>
        <div className={"money-box"}>
          <label htmlFor="money">금 액</label>
          <input
            id="money"
            onChange={handleChange}
            value={money}
            type="text"
            name="money"
          />
        </div>
        <div className={"buttons"}>
          <button type={'submit'}>추가하기</button>
        </div>
      </form>
      <PretendBuyList date={today} />
    </div>
  );
}
