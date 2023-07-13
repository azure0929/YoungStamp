import { getSearchExpense } from "@/Api/api.ts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PretendBuyList( date : {date: string} ) {
  const [items, setItems] = useState([]);
  const params: SearchParamsType = {
    q: "삿다치고",
    userId: "team6"
  };
  useEffect(() => {
      getSearchExpense(params).then((res) =>{
       const formattedItems = res.map((item:searchParamsTypeOutput) => ({
         ...item,
         date: dayjs(item.date).format("YYYY-MM-DD")
       }))
        setItems(formattedItems);
      });
  }, []);
  return (
    <>
      <ul>
        {items.map((item: searchParamsTypeOutput) => {
          if (item.date === date.date) {
            return (
              <li key={item.id}>
                {item.description} {item.amount}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
}