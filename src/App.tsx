import { useState } from "react";
import "./index.css";
import Header from "./components/Header.tsx";
import SetCounter from "./components/Counter/SetCounter.tsx";
import Counter from "./components/Counter/Counter.tsx";
import { log } from "./log.ts";

function App() {
  log("<App/> rendered");

  const [chosenInitialValue, setChosenInitialValue] = useState<number>(0);

  function handleSetCount(newCount: number) {
    return setChosenInitialValue(newCount);
  }

  return (
    <>
      <Header />
      <main className="w-[90%] max-w-200 my-8 mx-auto">
        <SetCounter onSetCount={handleSetCount} />
        <Counter key={chosenInitialValue} initialValue={chosenInitialValue} />
      </main>
    </>
  );
}

export default App;
