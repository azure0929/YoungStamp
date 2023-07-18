
import { deleteExpense, getSearchExpense, putChange } from "@/Api/api.ts";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TiDeleteOutline } from "react-icons/ti";
import { useState, useReducer } from "react";


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
  const [success, setSuccess] = useState(false);
  const [state, dispatch] = useReducer(reducer, { id: null, description: "", amount: 0 });

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

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (state.id !== id) {
      const index = searchData.findIndex((item: ExpendType) => item._id === id);
      const item = searchData[index];
      dispatch({ type: "select", id, description: item.description, amount: item.amount });
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
      dispatch({ type: "reset" });
    }
  };

  const handleDelete = (id: string) => {
    deleteExpend.mutate(id, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
  };

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <>
      {success ? <p>성공적으로 삭제되었습니다.</p> : null}
      <ul className={'pretend-list'}>
        {searchData.map((item: searchParamsTypeOutput) => {
          if (item.date === props.date) {
            return (
              <li key={item._id}>
                <input
                  id={"description"}
                  onChange={(e) => handleChange(item._id, e)}
                  type="text"
                  value={state.id === item._id ? state.description : item.description}
                />
                <input
                  id={"amount"}
                  onChange={(e) => handleChange(item._id, e)}
                  type="text"
                  value={state.id === item._id ? state.amount : item.amount}
                />
                <button onClick={() => handleSubmit(item._id)}>수정</button>
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

