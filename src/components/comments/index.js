import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllComments } from "../../slice/commentSlice";

export const Comments = () => {
  const dispatch = useDispatch();
  const {
    values: comments,
    loading,
    error,
  } = useSelector((store) => store.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, []);
  return (
    <div>
      <h2>Comments Component</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : !loading && error === null ? (
        <p>We get the length of {comments.length} comments.</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
