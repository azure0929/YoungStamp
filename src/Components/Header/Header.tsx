import "@/Components/Header/Header.scss"

export default function Header () {
  return (
    <header>
      <div className="inner">
        <div className="logo">
          <img src="src/images/logo.png" alt="logo"/>
        </div>
        <div className="gnb">
          <button className="buycomplete">샀다치고</button>
          <div className="search">
            <input type="text" placeholder="칼로리를 입력해주세요." />
            <img src="src/images/search.png" alt="검색 아이콘" />
          </div>
          <div className="myinfo">
            <p>나의 칼로리 정보</p>
            <div>
              <img src="src/images/scale.png" alt="나의 칼로리 정보 모달 버튼" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}