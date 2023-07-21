import { useNavigate } from "react-router-dom";
import { FoodKeywordContext } from "@/Store/SearchContext";
import "@/Components/Search/Component/SearchInput.scss";
import { ChangeEvent, useContext, useState } from "react";

function SearchIput() {
  const [search, setSearch] = useState<string>("");
  const { setKeyword } = useContext(FoodKeywordContext);
  const navi = useNavigate();

  /** 검색값을 감지하여 setSearch에 전달 */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  /** 키보드 'Enter'키 인식 후 handleSearchClick 함수 작동 기능 */
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  /** 상태 관리에 있는 검색값을 dataApi의 매개변수로 전달하는 검색 기능 */
  const handleSearchClick = () => {
    const trimSearch = search.trim();
    const finalSearch = trimSearch.replace(/\s/g, "");
    navi("/search/" + finalSearch);
    setKeyword(finalSearch);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeydown}
        />
        <img
          src="/images/search.png"
          alt="검색 아이콘"
          onClick={handleSearchClick}
        />
      </div>
      <div></div>
    </>
  );
}

export default SearchIput;
