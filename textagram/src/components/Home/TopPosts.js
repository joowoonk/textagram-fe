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
  //   console.log(count);
  var sortable = [];
  for (var hashtag in count) {
    sortable.push([hashtag, count[hashtag]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  let topFive = sortable.splice(0, 5);

  return (
    <div className="top-posts">
      <div className="card">
        <BsGraphUp /> Top 5 Hashtags
      </div>
    </div>
  );
};

export default TopPosts;
