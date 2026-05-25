"use client";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import Navlinks from "./navlinks";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center shadow-xs p-4">
      <h1 className="flex items-center">
        <Image src={logo} alt="logo" height={30} width={50}></Image>
        <span className="font-medium tracking-[0.2px]">MessengerX</span>
      </h1>
      <ul>
        <Navlinks />
      </ul>
      <button
        className="bg-linear-to-r from-[#4338CA] to-[#7C3AED] px-5 py-2 rounded-xl text-white font-semibold border-0 cursor-pointer transition-all duration-200 tracking-[0.2px] hover:-translate-y-px "
        onClick={() => router.push("/getstarted")}>
        Get started
      </button>
    </div>
  );
}
