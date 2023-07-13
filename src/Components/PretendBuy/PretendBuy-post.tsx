import { useState } from "react";
import { postExpense } from "@/Api/api.ts";
import dayjs from "dayjs";

export default function PretendBuyPost() {
  const [text, setText] = useState("");
  const [money, setMoney] = useState(0);
  const currentDate:string = dayjs().format("YYYY-MM-DD");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.id ==='money'? setMoney(Number(e.target.value)) : setText(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData:ExpendType =
      {amount:money, userId:'team6',category:'삿다치고',description:text,date:currentDate}
    postExpense(postData).then((data) => console.log(data));
    setText("");
    setMoney(0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="action">내가 찾은 물품</label>
        <input
          id="product"
          onChange={handleChange}
          value={text}
          type="text"
          name="action"
        />
        <label htmlFor="money">금 액</label>
        <input
          id="money"
          onChange={handleChange}
          value={money}
          type="text"
          name="money"
        />
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
}
