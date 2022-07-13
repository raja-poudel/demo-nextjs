import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../slice/counterSlice";

export const Counter = () => {
  const [amount, setAmount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {count}
        </span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div
        style={{
          marginTop: 15,
        }}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(incrementByAmount(amount));
            setAmount(0);
          }}
        >
          Incremnet Amount
        </button>
      </div>
    </div>
  );
};
