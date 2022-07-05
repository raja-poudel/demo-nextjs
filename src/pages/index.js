import React, { useState } from "react";
import Head from "next/head";
// import { JsonEditor } from "../components/editor";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const JsonEditor = dynamic(
  {
    loader: () => import("../components/editor").then((mod) => mod.JsonEditor),
    render: (props, JsonEditor) => {
      return JsonEditor;
    },
  },
  {
    ssr: false,
  }
);
export default function Home() {
  const [value, setValue] = useState({
    name: "John Doe",
    age: "20",
    address: {
      home: "Mogok",
      living: "Mogok",
    },
    love: ["My Self"],
  });
  const [readOnly, setReadOnly] = useState(false);

  const handlEdit = () => {
    setReadOnly(true);
  };
  const handleCancel = () => {
    setReadOnly(false);
  };
  console.log(readOnly);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <JsonEditor
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
          onEditable={function (node) {
            switch (node.field) {
              default:
                return false;
            }
          }}
        />
        <button onClick={handlEdit}>Edit</button>
        <button onClick={handleCancel}>Cancel</button>
      </main>
    </div>
  );
}
