import React, { useEffect } from "react";
import { BsGraphUp, BsTrophy } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getPosts } from "../../redux/actions";
const TopPosts = () => {
  const posts = useSelector((state) => state.postReducer.posts);
  const { replace } = useHistory();
  const dispatch = useDispatch();
  let topPosts = [...posts];

  topPosts = topPosts.sort((a, b) => {
    return b["votes"] - a["votes"];
  });

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

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  var sortable = [];
  for (var hashtag in count) {
    sortable.push([hashtag, count[hashtag]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  let topFive = sortable.slice(0, 5);

  return (
    <div className="top-posts stick">
      <div className="top-post-card ">
        <div className="card-top ">
          <BsTrophy size="1.5em" style={{ margin: "0 3%", color: "gold" }} />
          <h5>Top 5 Posts</h5>
        </div>
        <hr></hr>
        {topPosts.slice(0, 5).map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            style={{ textDecoration: "none" }}
          >
            <div className="card-bottom">
              <h6>{post.title}</h6>
              <p>{post.votes} votes</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="top-hash-card ">
        <div className="card-top">
          <BsGraphUp size="1.5em" style={{ margin: "0 3%", color: "red" }} />
          <h5>Top 5 Hashtags</h5>
        </div>
        <hr></hr>
        {topFive.map((hashtag, index) => (
          <div className="card-bottom" key={index}>
            {hashtag[0].length <= 25 ? (
              <h6 className="hash-tag">{hashtag[0]}</h6>
            ) : (
              <h6 key={index} className="hash-tag">{`${hashtag[0].slice(
                0,
                25
              )}...`}</h6>
              // <h6>{hashtag[0]}</h6>
            )}
            <p>{hashtag[1]} times being used</p>
          </div>
        ))}
      </div>
      <a
        href="https://twitter.com/johnwhoprograms?ref_src=twsrc%5Etfw"
        className="twitter-follow-button"
        data-show-count="true"
        alt="twitter follow feedback"
      ></a>
    </div>
  );
};

export default TopPosts;
