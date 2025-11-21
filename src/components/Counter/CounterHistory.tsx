import { useState } from "react";
import { log } from "../../log.ts";

function HistoryItem({ count }: { count: number }) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li
      onClick={handleClick}
      className={`w-8 ml-2 text-grayish-cyan-300 p-0.8 first:text-light-cyan-200 first:font-bold first:text-md ${
        selected
          ? " bg-dark-grayish-cyan text-shade-white rounded-sm"
          : undefined
      }`}
    >
      {count}
    </li>
  );
}

type HistoryEntry = {
  value: number;
  id: number;
};

export default function CounterHistory({
  history,
}: {
  history: HistoryEntry[];
}) {
  return (
    <ol className="flex flex-col gap-0.8 justify-center items-center mx-auto text-center">
      {history.map((count) => {
        return <HistoryItem key={count.id} count={count.value} />;
      })}
    </ol>
  );
}
