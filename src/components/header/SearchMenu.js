import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addsearchHistory,
  deletesearchHistory,
  getSearchHistory,
  searchUser,
} from "../../functions/user";
import useClickOutside from "../../helpers/ClickOutside";
import { Return, Search } from "../../svg";

const SearchMenu = ({ color, setShowSearcMenu, token }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [results, setResults] = useState([]);
  const [allSearchHistory, setAllSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  useClickOutside(menu, () => {
    setShowSearcMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    getHistorys();
  }, []);
  const getHistorys = async () => {
    const res = await getSearchHistory(token);
    setAllSearchHistory(res);
  };
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      const res = await searchUser(searchTerm, token);
      setResults(res);
    }
  };
  const addToSearchHistory = async (searchUserId) => {
    const res = await addsearchHistory(searchUserId, token);
    if (res.status === "ok") {
      setShowSearcMenu(false);
      getHistorys()
    }
  };
  const removeSearchHistory = async (searchUser) => {
    const res = deletesearchHistory(searchUser, token);
      getHistorys();
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
      {results == "" && (
        <div className="search_history_header">
          <span>Recent Searches</span>
          <a href="/">Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {allSearchHistory &&
          results == "" &&
          allSearchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((history) => (
              <div className="search_user hover1" key={history._id}>
                <Link
                  to={`/profile/${history.user.username}`}
                  className=" flex"
                  onClick={() => addToSearchHistory(history.user._id)}
                >
                  <img src={history.user.picture} alt="" className="" />
                  <span>
                    {history.user.first_name} {history.user.last_name}
                  </span>
                </Link>
                <i className="exit_icon" onClick={() => removeSearchHistory(history.user._id)}></i>
              </div>
            ))}
      </div>
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
