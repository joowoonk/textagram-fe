import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Link, useHistory, useParams } from "react-router-dom";

export default function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const match = useParams();
  const { push } = useHistory();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitSearch = () => {
    if (inputValue !== "") {
      push(`search/${inputValue}`);
    } else {
      push(`search`);
    }
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/posts/search/${match.title}`)
      .then((res) => {
        setSearchResults(res.data);
        setInputValue("");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [match.title]);
  console.log(searchResults);
  if (!searchResults) return <Loader />;

  return <div></div>;
}
