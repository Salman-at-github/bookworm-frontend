import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMenuLine as MenuIcon, RiUser2Fill } from "react-icons/ri";
import { GiNewspaper as NewspaperIcon } from "react-icons/gi";
import { IoIosLogOut, IoMdClose } from "react-icons/io";

const pages = [
  { title: "Books", url: "/" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

const Navbar = () => {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenNavMenu = () => {
    setNavMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setNavMenuOpen(false);
  };
  const path = useLocation().pathname;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setShowOptions(false);
  }, [path]);

  const navigateTo = useNavigate();
  const hanldeLogout = () => {
    localStorage.removeItem("token");
    navigateTo("/login");
  };

  const [showOptions, setShowOptions] = useState(false);

  return (
    <header className="bg-teal-500">
      <div className="container flex justify-start items-center relative">
        <nav className="flex items-center justify-between p-4 w-full">
          <NewspaperIcon className="hidden md:flex text-black text-2xl md:text-4xl" />
          <Link
            to="/"
            className="text-2xl md:text-4xl font-mono font-bold text-black no-underline"
          >
            Boo<span className="text-white">kW</span>
            <span>orm</span>
          </Link>

          <div
            className={`flex items-center absolute top-4 right-4  md:hidden ${
              isNavMenuOpen ? "hidden" : null
            }`}
          >
            <button
              onClick={handleOpenNavMenu}
              className="text-black focus:outline-none"
            >
              <MenuIcon className="text-3xl" />
            </button>
          </div>

          <div className={`md:hidden flex`}>
            <div
              className={`fixed inset-y-0 right-0 w-[40%] bg-teal-300 ${
                isNavMenuOpen ? "translate-x-0" : "translate-x-60"
              } p-4 shadow-md overflow-hidden transition-transform duration-300`}
              onMouseOut={() => {
                setNavMenuOpen(false);
              }}
            >
              <div
                className="absolute top-3 right-3 font-bold"
                onClick={() => setNavMenuOpen(false)}
              >
                <IoMdClose />
              </div>
              <div className="border-b text-white">
                {pages.map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className={`block py-2 hover:text-black hover:font-bold  ${
                      path === item.url
                        ? "text-black font-bold underline"
                        : "font-semibold"
                    }`}
                    onClick={handleCloseNavMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="flex md:hidden text-lg font-bold mt-2">
                {isLoggedIn ? (
                  <div
                    className=""
                    onMouseOver={() => setShowOptions(true)}
                    onMouseOut={() => {
                      setShowOptions(false);
                    }}
                  >
                    {!showOptions && <RiUser2Fill />}
                    {showOptions && (
                      <div className="bg-teal-300 rounded-md p-4 flex justify-center w-fit items-start flex-col ">
                        <Link
                          to="/preferences"
                          className="hover:scale-105 text-white hover:text-black"
                        >
                          My Preferences
                        </Link>
                        <div
                          className="flex justify-center items-center gap-1 cursor-pointer hover:scale-105 text-white hover:text-black"
                          onClick={hanldeLogout}
                        >
                          <IoIosLogOut />
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`flex justify-center items-center gap-1 cursor-pointer hover:scale-105 ${
                      path === "/login" ? "hidden" : null
                    }`}
                  >
                    Login
                    <IoIosLogOut />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="md:flex flex-grow justify-start ml-8 hidden ">
            {pages.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="mx-2 text-white hover:text-black font-bold"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="absolute top-6 right-6 hidden md:flex text-lg font-bold">
          {isLoggedIn ? (
            <div
              className=""
              onMouseOver={() => setShowOptions(true)}
              onMouseOut={() => {
                setShowOptions(false);
              }}
            >
              {!showOptions && <RiUser2Fill />}
              {showOptions && (
                <div className="bg-teal-300 p-4 rounded-md flex justify-center w-fit items-start flex-col text-base">
                  <Link
                    to="/preferences"
                    className="hover:scale-105 text-white hover:text-black mb-4"
                  >
                    My Preferences
                  </Link>
                  <div
                    className="flex justify-center items-center gap-1 cursor-pointer hover:scale-105 text-white hover:text-black"
                    onClick={hanldeLogout}
                  >
                    <IoIosLogOut />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex justify-center items-center gap-1 cursor-pointer hover:scale-105 ${
                path === "/login" ? "hidden" : null
              }`}
            >
              Login
              <IoIosLogOut />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
