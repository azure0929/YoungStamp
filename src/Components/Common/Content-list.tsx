import { deleteExpense, getSearchExpense, putChange } from "@/Api/api.ts";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useReducer, useState } from "react";
import { ContentListItem } from "@/Components/Common/Content-list-item.tsx";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "select":
      return { id: action.id, description: action.description, amount: action.amount };
    case "changeDescription":
      return { ...state, description: action.description };
    case "changeAmount":
      return { ...state, amount: action.amount };
    case "reset":
      return { id: null, description: "", amount: 0 };
    default:
      return state;
  }
};

export default function ContentList(props: { date: string, category: string }) {
  const [state, dispatch] = useReducer(reducer, { id: null, description: "", amount: 0 });
  const [isDiv, setIsDiv] = useState<Record<string, boolean>>({});

  /** use Query fetch 부분 */
  const queryClient = useQueryClient();
  const params: SearchParamsType = {
    q: props.category,
    userId: "team6"
  };
  const { isLoading, error, data: searchData }
    = useQuery(["searchData", params], () => {
    return getSearchExpense(params).then((res) => {
      return res.map((item: searchParamsTypeOutput) => ({
        ...item,
        date: dayjs(item.date).format("YYYY-MM-DD")
      }));
    });
  }, { staleTime: 1000 * 60 });

  const deleteExpend =
    useMutation((id: string) => deleteExpense(id), {
      onSuccess: () => queryClient.invalidateQueries(["searchData"])
    });
  const changeExpend =
    useMutation(({ id, data }: { id: string, data: ExpendType }) => putChange(id, data), {
      onSuccess: () => queryClient.invalidateQueries(["searchData"])
    });
  /** use Query 부분 끝  (staleTime 1분 설정) */

  const handleChange = (id: string, e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (state.id !== id) {
      const index = searchData.findIndex((item: ExpendType) => item._id === id);
      const item = searchData[index];
      dispatch({ type: "select", id, description: item.description, amount: item.amount });
      setIsDiv({...isDiv, [id]: true });
      // console.log({isDiv});
    } else {
      if (target.id === "description") {
        dispatch({ type: "changeDescription", description: target.value });
      } else if (target.id === "amount") {
        dispatch({ type: "changeAmount", amount: Number(target.value) });
      }
    }
  };

  const handleSubmit = (id: string) => {
    if (state.id === id) {
      changeExpend.mutate({
        id, data: {
          userId: "team6",
          category: props.category,
          date: props.date,
          description: state.description,
          amount: state.amount
        }
      });
      dispatch({type: "reset" });
      setIsDiv({...isDiv, [id]: false });
    }
  };

  const handleDelete = (id: string) => {
    deleteExpend.mutate(id);
  };

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div>
      <ul className={'pretend-list'}>
        {searchData.map((item: searchParamsTypeOutput) => {
          if (item.date === props.date) {
            return (
              <ContentListItem
                isDiv={isDiv} state={state} item={item}
                handleChange={handleChange} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

