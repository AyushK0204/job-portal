import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    companyData,
    setCompanyData,
    setCompanyToken,
    darkMode,
    toggleDarkMode,
  } = useContext(AppContext);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen dark:bg-black dark:text-white">
      {/* Navbar for recruiter panel */}
      <div className="shadow py-2 bg-gradient-to-b from-green-200 to-white dark:from-gray-600 dark:to-black dark:text-white">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={(e) => navigate("/")}
            className=" w-[90px] sm:w-[120px] cursor-pointer"
            src={assets.logo}
            alt=""
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={companyData.image}
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="w-6 h-6 sm:w-7 sm:h-7 dark:rounded-full z-10 mt-1"
              >
                {darkMode ? (
                  <img src={assets.day_mode} alt="" />
                ) : (
                  <img src={assets.night_mode} alt="" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar with option to add job, manage jobs and view applications */}
        <div className="inline-block min-h-screen bg-transparent dark:bg-black dark:text-white">
          <ul className="flex flex-col items-start pt-5 text-gray-800 dark:text-white">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 dark:hover:text-black ${
                  isActive &&
                  "bg-green-100 border-r-4 border-green-500 hover:bg-green-200 dark:text-black"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 dark:hover:text-black ${
                  isActive &&
                  "bg-green-100 border-r-4 border-green-500 hover:bg-green-200 dark:text-black"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 dark:hover:text-black ${
                  isActive &&
                  "bg-green-100 border-r-4 border-green-500 hover:bg-green-200 dark:text-black"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
