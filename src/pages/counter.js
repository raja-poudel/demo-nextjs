import { Counter } from "../components/counter";
import { Post } from "../components/post";
import { Comments } from "../components/comments";

export default function CounterPage() {
  return (
    <div>
      <h2>Testing Page</h2>
      <Counter />
      <Post />
      <Comments />
    </div>
  );
}
