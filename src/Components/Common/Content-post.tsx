import { postExpense } from "@/Api/api.ts";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContentList from "@/Components/Common/Content-list.tsx";
import "@/Components/Common/Content_modal.scss";
import { AiFillPlusCircle } from "react-icons/ai";

export default function ContentPost({ todayDate, categoryName }: { todayDate: string, categoryName: string }) {
  const [text, setText] = useState("");
  const [money, setMoney] = useState(0);
  const [isFromVisible, setIsFromVisible] = useState(false);

  /** use Query 부분 */
  const queryClient = useQueryClient();
  const addExpend =
    useMutation((postData: ExpendType) => postExpense(postData), {
      onSuccess: () => queryClient.invalidateQueries(["searchData"])
    });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: ExpendType =
      { amount: money, userId: "team6", category: categoryName, description: text, date: String(todayDate) };
    addExpend.mutate(postData);
    setText("");
    setMoney(0);
    setIsFromVisible(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    e.target.id === "money"
      ? (e.target.value === "" || re.test(e.target.value)) && setMoney(Number(e.target.value))
      : setText(e.target.value);
  };
  return (
    <div className={"pretend-buy-container"}>
      <div className={"list-container"}>
        <ContentList date={todayDate} category={categoryName} />
      </div>
      <div className={"img-button"}>
        <AiFillPlusCircle
          className={"plus-button"}
          // style={isFromVisible ?{ display: "none" } : {}}
          onClick={() => {
            setIsFromVisible(!isFromVisible);
          }} />
      </div>
      {isFromVisible &&
        <form
          className={"post-form"}
          onSubmit={handleSubmit}>
          <div>
            <input
              className={"content-input"}
              placeholder="참은행동이나물건을입력해주세요"
              id="product"
              onChange={handleChange}
              value={text}
              type="text"
              name="action"
            />
          </div>
          <div>
            <input
              className={"money-input"}
              id="money"
              onChange={handleChange}
              value={money}
              type="text"
              name="money"
            />
          </div>
          <div className={"buttons"}>
            <button className={"addButton"} type={"submit"}>추가하기</button>
          </div>
        </form>}
    </div>
  );
}
