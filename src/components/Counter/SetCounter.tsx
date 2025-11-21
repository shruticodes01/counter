import React from "react";
import { useState } from "react";
import Button from "../UI/Button.tsx";
import { log } from "../../log.ts";

export default function SetCounter({
  onSetCount,
}: {
  onSetCount?: (count: number) => void;
}) {
  log("<SetCounter /> rendered", 1);
  const [enteredValue, setEnteredValue] = useState<string | number>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(+event.target.value);
  }

  function handleSetClick() {
    onSetCount?.(Number(enteredValue));
    setEnteredValue("");
  }

  return (
    <div className="my-8 flex justify-center items-center">
      <label
        className="m-2 p-0 text-base text-light-cyan-100 font-bold"
        htmlFor="initialValue"
      >
        Set Counter
      </label>
      <input
        className="w-16 m-2 py-2 px-1 border border-light-cyan-100 rounded-sm bg-shade-black-100 text-light-cyan-100 text-base"
        type="number"
        step="any"
        id="initialValue"
        name="initialValue"
        value={enteredValue}
        onChange={handleInputChange}
      />
      <span>
        <Button variant="text" label="Set" onClick={handleSetClick} />
      </span>
    </div>
  );
}
