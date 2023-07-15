import { FoodAddsContext } from "@/Store/SearchContext";
import { FoodDelsContext } from "@/Store/SearchContext";
import { useContext, useEffect, useState } from "react";
import "@/Components/Search/Component/SearchCartList.scss";

function SearchCartList() {
  const { addFoodItem } = useContext(FoodAddsContext);
  const { delFoodItem } = useContext(FoodDelsContext);
  const [addFoodItemCart, setAddFoodItemCart] = useState<
    {
      key: number;
      title: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
      sugar: number;
      sodium: number;
      serving: number;
      id: number;
    }[]
  >([]);

  /** 음식정보를 받아 새로운 배열에 담고 랜더링하는 기능, 결과 데이터는 칼로리 페이지에 표시된다. */
  useEffect(() => {
    console.log("현재 추가한 음식", addFoodItem);
    console.log("인덱스 번호 확인", delFoodItem);
    // 만약에 배개변수가 addFoodItem이면 addFoodItem의 객체 데이터를
    // newItem란 새로운 변수를 담는다. 여기에는 음식정보의 값들이 들어있다.
    if (addFoodItem) {
      const newItem = {
        key: addFoodItemCart.length,
        title: addFoodItem.title,
        calories: addFoodItem.calories,
        carbs: addFoodItem.carbs,
        protein: addFoodItem.protein,
        fat: addFoodItem.fat,
        sugar: addFoodItem.sugar,
        sodium: addFoodItem.sodium,
        serving: addFoodItem.serving,
        id: addFoodItem.id,
      };

      // 배열 데이터인 addFoodItemCart를 전개연산자로 가지고와 객체를 펼쳐서 updatedCart 변수에 담는다.
      const updatedCart = [...addFoodItemCart];
      console.log("업데이트 카트 내용", updatedCart);

      // updatedCart에는 객체 값이 있고 이를 조건이 만족되면 중단하는 some()을 사용하여
      // newItem.key와 item.key 값과 데이터가 같은 값을 반환한다. 데이터가 존재하므로 itemExists 변수에 담는다.
      const itemExists = updatedCart.some((item) => item.key === newItem.key);

      // 만약에 itemExists가 아니면 updatedCart에 push()를 사용하여 배열의 마지막 위치에 newItem을 밀어 넣는다.
      if (!itemExists) {
        updatedCart.push(newItem);
      }

      //중복 제거된 배열을 setAddFoodItemCart()로 보내 addFoodItemCart 값에 넣는다.
      setAddFoodItemCart(updatedCart);
    }
  }, [addFoodItem]); //addFoodItem의 변화가 감지되면 랜더링 진행

  /** 배열 안의 객체를 삭제하는 함수 배열 번호를 기준으로 삭제 */
  const removeItems = (index: string | number) => {
    console.log("삭제 인덱스 값", index) //키 값은 등록 배열 순서이다. 예) 0, 1, 2...
    //타입이 다르면 true 반환하여 값이 같으면 false로 해당하는 객체를 빼고 데이터를 변경한다.
    const updatedCart = addFoodItemCart.filter((item) => item.id !== index);
    console.log("배열 개수", updatedCart) //최신화된 배열 갯수
    setAddFoodItemCart(updatedCart);
  };

  useEffect(() => {
    if (delFoodItem) {
      const removeItem = (index: string | number) => {
        console.log("삭제 인덱스 값", index);
        const updatedCart = addFoodItemCart.filter((item) => item.id !== index);
        console.log("배열 개수", updatedCart); // 최신화된 배열 갯수
        setAddFoodItemCart(updatedCart);
      };
  
      removeItem(delFoodItem); // delFoodItem을 사용하여 항목 삭제
    }
  }, [delFoodItem]);

  return (
    <>
      <p>데이터 추가 영역</p>
      {addFoodItemCart.map((item, id) => (
        <div className="search-add-list" key={id}>
          <p>Title: {item.title}</p>
          <p>Calories: {item.calories}</p>
          <p>Carbs: {item.carbs}</p>
          <p>Protein: {item.protein}</p>
          <p>Fat: {item.fat}</p>
          <p>Sugar: {item.sugar}</p>
          <p>Sodium: {item.sodium}</p>
          <p>Serving: {item.serving}</p>
          <p>id: {item.id}</p>
          <button onClick={() => removeItems(item.id)}>X</button>
        </div>
      ))}
    </>
  );
}

export default SearchCartList;
