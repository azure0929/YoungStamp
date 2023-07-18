import { deleteExpense, getSearchExpense, putChange } from "@/Api/api.ts";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";


export default function ContentList(props: { date: string, category: string }) {
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [amount, setAmount] = useState();
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
    useMutation(({id, data} : {id:string, data:ExpendType}) => putChange(id, data), {
      onSuccess: () => queryClient.invalidateQueries(["searchData"])
    })
  /** use Query 부분 끝  (staleTime 1분 설정) */

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(id);
    const target = e.target as HTMLInputElement;

    if (target.id === 'description') {
      setDescription(target.value);
      const item = searchData.find((item:ExpendType) => item._id === id);
      const data = item ? { ...item, description: target.value } : null;
      if(data) {
        changeExpend.mutate({id, data});
      }
    } else {
      setAmount(Number(target.value));
      const item = searchData.find((item:ExpendType) => item._id === id);
      const data = item ? { ...item, amount: Number(target.value) } : null;
      if(data) {
        changeExpend.mutate({id, data});
      }
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
      <ul>
        {searchData.map((item: searchParamsTypeOutput) => {
          if (item.date === props.date) {
            return (
              <li key={item._id}>
                <input
                  id={'description'}
                  onChange={(e) => handleChange(item._id,e)}
                  type="text"
                  value={selectedId === item._id ? description : item.description}
                />
                <input
                  id={'amount'}
                  onChange={(e) => handleChange(item._id,e)}
                  type="text"
                  value={selectedId === item._id ? amount : item.amount}
                />

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

