import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../redux/actions";
import { baseURL } from "../utils/config";
//ONCE the user click a post title, the post_id will be used for dispatch to this component as a new page.
const SingPostView = (props) => {
  console.log(props.match.params.postId);
  const post = useSelector((state) => console.log(state.postReducer.post));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(props.match.params.postId));
  }, [props.match.params.postId]);

  return <div className="single-post-view"></div>;
};

export default SingPostView;
