import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { useSelector } from "react-redux";
const TopPosts = () => {
  const hashtags = useSelector((state) => state.postReducer.all_hashtags);

  let saved = [];
  let count = {};
  for (let i = 0; i < hashtags.length; i++) {
    if (saved.includes(hashtags[i])) {
      count[`${hashtags[i]}`] += 1;
    } else {
      saved.push(hashtags[i]);
      count[`${hashtags[i]}`] = 1;
    }
  }

  var sortable = [];
  for (var hashtag in count) {
    sortable.push([hashtag, count[hashtag]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  let topFive = sortable.splice(0, 5);
  //   console.log({ topFive });
  return (
    <div className="top-posts">
      <div className="top-hash-card">
        <div className="card-top">
          <BsGraphUp size="1.5em" /> <h5>Top 5 Hashtags</h5>
        </div>
        <hr></hr>
        {topFive.map((hashtag) => (
          <div className="card-bottom">
            <h6>{hashtag[0]}</h6>
            <p>{hashtag[1]} times being used</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
