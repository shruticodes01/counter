import { useState, useCallback, useMemo } from "react";
import { log } from "../../log.ts";
import PlusIcon from "../UI/Icons/PlusIcon.tsx";
import MinusIcon from "../UI/Icons/MinusIcon.tsx";
import CounterOutput from "./CounterOutput.tsx";
import Button from "../UI/Button.tsx";
import CounterHistory from "./CounterHistory.tsx";

function isPrime(number: number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialValue }: { initialValue: number }) {
  log("<Counter /> rendered", 1);

  const initialCountIsPrime = useMemo(
    () => isPrime(initialValue),
    [initialValue]
  );

  const [counterChanges, setCounterChanges] = useState([
    { value: initialValue, id: Math.random() * 1000 },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleCounterIncrement = useCallback(function handleCounterIncrement() {
    setCounterChanges((prevCounterChanges) => {
      return [{ value: 1, id: Math.random() * 1000 }, ...prevCounterChanges];
    });
  }, []);

  const handleCounterDecrement = useCallback(function handleCounterDecrement() {
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center p-8 border border-dark-cyan rounded-md">
      <p className="text-md text-grayish-cyan-200">
        The initial counter value was <strong>{initialValue}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"} </strong> prime number
      </p>
      <div className="flex items-center gap-4 text-sm">
        <Button
          label="Decrement"
          icon={MinusIcon}
          onClick={handleCounterDecrement}
        />

        <CounterOutput counterValue={currentCounter} />

        <Button
          label="Increment"
          icon={PlusIcon}
          onClick={handleCounterIncrement}
        />
      </div>
      <CounterHistory history={counterChanges} />
    </section>
  );
}
