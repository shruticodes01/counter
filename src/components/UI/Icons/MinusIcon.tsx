import { log } from "../../../log.ts";

export default function MinusIcon({ ...props }) {
  log("<MinusIcon /> rendered", 3);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-[0.9rem] text-shade-black-200"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
}
