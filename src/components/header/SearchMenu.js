import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchHistory, searchUser } from "../../functions/user";
import useClickOutside from "../../helpers/ClickOutside";
import { Return, Search } from "../../svg";

const SearchMenu = ({ color, setShowSearcMenu, token }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [results, setResults] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  useClickOutside(menu, () => {
    setShowSearcMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      const res = await searchUser(searchTerm, token);
      setResults(res);
    }
  };
  const addToSearchHistory = async (searchUserId) => {
    const res = await searchHistory(searchUserId, token);
    console.log(res);
    if (res.status === "ok") {
      setShowSearcMenu(false);
    }
  };
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header-logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearcMenu((prev) => !prev)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Searches</span>
        <a href="/">Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user hover1"
              onClick={() => addToSearchHistory(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.first_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;
