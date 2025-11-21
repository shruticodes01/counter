import Logo from "../assets/logo.png";
import { log } from "../log.ts";

export default function Header() {
  log("<Header/> rendered", 1);
  return (
    <div className="my-8 text-center font-Lato">
      <img
        className="w-24 h-24 mx-auto object-contain drop-shadow(0_0_8px_rgba(14,26,28,0.8))"
        src={Logo}
        alt="logo icon"
      />
      <h1 className="text-light-grayish-green text-lg tracking-[0.15rem]">
        React - Behind The Scenes
      </h1>
    </div>
  );
}
