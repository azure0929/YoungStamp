import { useState } from "react";
import Modal from "./Components/Modal/Modal";

import "./Common/Styles/global.scss";
import Youtube from "@/Components/YouTube/Youtube.tsx";

function App() {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={"container"}>
      {/* modal 예제 */}
      <h1>hello world</h1>
      <button
        onClick={() => {
          setVisibility(true);
        }}
      >
        modal
      </button>
      <Youtube />

      <Modal visibility={visibility} toggle={setVisibility}>
        <div>hello 안녕</div>
        <form action="">
          <input type="text" />
          <input type="text" />
        </form>
        <button>calendar</button>
        <button>add</button>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </Modal>
    </div>
  );
}

export default App;
