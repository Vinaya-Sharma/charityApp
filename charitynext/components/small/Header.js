import Link from "next/link";
import React from "react";
import Connect from "./Connect";

const Header = () => {
  const appName = process.env.appName || "myApp";
  return (
    <div className="flex cursor-pointer w-full z-[99] justify-between ">
      <Link href={"/"}>
        <div>{appName}</div>
      </Link>
      <div className="flex cursor-pointer items-center flex-row ml-auto gap-x-4">
        <Connect />
        <Link href={"/about"}>
          <p>About Us</p>
        </Link>
        <Link href={"/myProfile"}>
          <p>My Profile</p>
        </Link>

        <Link href={"/addCharity"}>
          <p>Add Charity</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
