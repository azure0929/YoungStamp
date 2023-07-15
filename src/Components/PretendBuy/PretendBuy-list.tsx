import { deleteExpense, getSearchExpense,  } from "@/Api/api.ts";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TiDeleteOutline } from "react-icons/ti";


export default function PretendBuyList(date: { date: string }) {
  const queryClient = useQueryClient();
  const params: SearchParamsType = {
    q: "삿다치고",
    userId: "team6"
  };

  const changeDate:string = dayjs(date.date).format("YYYY-MM-DD");
  console.log(changeDate);

  const { isLoading, error, data: searchData }
    = useQuery(["searchData", params], () => {
    return getSearchExpense(params).then((res) => {
      return res.map((item: searchParamsTypeOutput) => ({
        ...item,
        date: dayjs(item.date).format("YYYY-MM-DD")
      }));
    });
  });

  const handleDelete = (id: string) => {
    deleteExpense(id).then(() => {
      queryClient.invalidateQueries(["searchData"]);
    });
  };
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      // setText(e.target.value);
    console.log(e.target.value);
  }

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <>
      <ul>
        {searchData.map((item: searchParamsTypeOutput) => {
          if (item.date === changeDate) {
            return (
              <li key={item._id}>
                <input
                  onChange={handleChange}
                  type="text"
                  value={item.description} />
                <input
                  onChange={handleChange}
                  type="text"
                  value={item.amount} />
                <TiDeleteOutline onClick={() => handleDelete(item._id)} />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
}