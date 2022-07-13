import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  fetchAllPosts,
  fetchById,
  createPost,
  resetError,
} from "../../slice/postSlice";

export const Post = () => {
  const {
    loading,
    values: posts,
    error,
    value: post,
  } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  const handleGetById = () => {
    console.log("get by id");
    dispatch(fetchById(100));
  };
  const handleCreatePost = () => {
    dispatch(resetError());
    dispatch(
      createPost({ title: "hello world", body: "hello world body", userId: 1 })
    );
  };

  return (
    <div>
      <h2>Post component</h2>
      {loading ? <p>Loading...</p> : <p>{posts.length}</p>}
      {error !== null ? <p>{error}</p> : null}
      <button onClick={handleGetById}>Get By Id Post</button>
      {post.id ? (
        <div>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </div>
      ) : null}
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};
