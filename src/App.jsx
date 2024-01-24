import { useState } from "react";
import "./App.css";
import CurrentDate from "./component/CurrentDate";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CurrentDate />
    </>
  );
}

export default App;
