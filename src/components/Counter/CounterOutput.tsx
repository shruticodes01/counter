import { log } from "../../log.ts";

export default function CounterOutput({
  counterValue,
}: {
  counterValue: number;
}) {
  log("<CounterOutput/> rendered", 2);

  return (
    <span
      className={`text-xl font-bold  ${
        counterValue < 0 ? "text-peach" : "text-grayish-cyan-100"
      }`}
    >
      {counterValue}
    </span>
  );
}
