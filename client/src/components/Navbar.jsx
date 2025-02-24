import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin, darkMode, toggleDarkMode } =
    useContext(AppContext);
  return (
    <div className="shadow py-2 bg-gradient-to-b from-orange-200 to-white dark:from-gray-600 dark:to-black dark:text-white">
      <div className="continer px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt=""
          width={120}
        />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 dark:text-white"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <button
        onClick={toggleDarkMode}
        className="fixed w-10 h-10 bottom-16 right-16 dark:rounded-full z-10 dark:bg-black"
      >
        {darkMode ? (
          <img src={assets.day_mode} alt="" />
        ) : (
          <img src={assets.night_mode} alt="" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
