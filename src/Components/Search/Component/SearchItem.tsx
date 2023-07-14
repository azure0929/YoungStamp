import "@/Components/Search/Component/SearchItem.scss";
import { FoodAddsContext } from "@/Store/SearchContext";
import { FoodDelsContext } from "@/Store/SearchContext";
import { useContext } from "react";

function SearchItem(item: Item) {
  const {setAddFoodItem} = useContext(FoodAddsContext);
  const {setDelFoodItem} = useContext(FoodDelsContext);

  //이 기능은 카드 내에서만 작동되어 배열에 같은 값만 추가 되는 것이다 이 경우는 같은 값만 추가된다.
  const addfood = () => {
    const newItem: Item = {
      title: item.title,
      calories: item.calories,
      carbs: item.carbs,
      protein: item.protein,
      fat: item.fat,
      sugar: item.sugar,
      sodium: item.sodium,
      serving: item.serving,
      id: item.id,
    };
    setAddFoodItem(newItem);
  };

  //체크 기능 체크상태는 매개로 받은 addfood를 checkedList 배열에 추가하고 setCheckedList에 담아 보낸다 그리고 addfood()를 실행한다.
  const onChecked = (checked: boolean) => {
    if (checked) {
      //체크박스에 체크가 되면 addfood()동작되고 이 기능은 음식정보를 새로운 변수에 담는다
      //그리고 setAddFoodItem()넘겨 SearchFooter의 addFoodItem에 보내져 사용된다.
      addfood();
    } else if (!checked) {
      //체크박스가 해제되면 setDelFoodItem()가 동작되고 아무일도 일어나지 않는다.
      //체크가 해제되면 배열에 추가한 값을 삭제하는 기능을 만들어야 한다.
      //삭제 기능은 SearchFooter에 있다.
      //체크가 해제되면 SearchFooter의 removeItem아이템에 key값을 보내어 삭제한다.
      //SearchFooter의 배열에 있는 key값이 필요하다. index로 수정하고자 하는 배열 안의 index번호를 찾아 삭제
      setDelFoodItem(item.id)
    }
  };

  return (
    <>
      <div className="ItemContainer">
        <div className="TitleBox">
          <div className="ItemNumber">{item.id}</div>
          <input type="checkbox" className="AddBtn" onChange={e => {onChecked(e.target.checked)}}>
          </input>
        </div>
        <div className="ItemTitle">{item.title}</div>
        <div className="ItemInfoBox">
          <span>당류: {item.sugar}g</span>
          <span>지방: {item.fat}g</span>
          <span>단백질: {item.protein}g</span>
          <span>나트륨: {item.sodium}mg</span>
          <span>탄수화물: {item.carbs}g</span>
          <span>1회 제공량: {item.serving}g</span>
        </div>
        <div className="ItemServing">
          {Math.trunc(item.calories)}
          <span>Kcal</span>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
