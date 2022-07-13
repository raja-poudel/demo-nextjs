import React from "react";
import dynamic from "next/dynamic";
import YouTube from "react-youtube";
const JsonEditor = dynamic(
  {
    loader: () => import("nextjs-jsoneditor").then((mod) => mod.JsonEditor),
    render: (props, JsonEditor) => {
      return JsonEditor;
    },
  },
  {
    ssr: false,
  }
);

export default function Index({ data }) {
  console.log(data);
  const handlePlayVideo = () => {
    console.log("play video");
  };
  const handlePauseVideo = () => {
    console.log("pause video");
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div
      style={{
        width: 600,
        height: 400,
        margin: "auto",
      }}
    >
      <h2>Nextjs JsonEditor</h2>
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {data.items.map(({ id, snippet = {} }) => {
          const { title, thumbnails = {}, resourceId = {} } = snippet;
          const { medium } = thumbnails;
          return (
            <li
              key={id}
              style={{
                width: 400,
                height: 350,
                margin: 16,
              }}
            >
              <div>
                <p>
                  <img
                    width={medium.width}
                    height={medium.height}
                    src={medium.url}
                    alt=""
                  />
                </p>

                <h3>{title}</h3>
                <button onClick={handlePlayVideo} style={{ marginRight: 20 }}>
                  Play
                </button>
                <button onClick={handlePauseVideo}>Pause</button>
              </div>
              {/* <iframe
                width="300"
                height="300"
                src={`https://www.youtube.com/embed/${resourceId.videoId}`}
              ></iframe>
              <h3>{title}</h3> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLWHUC4QSxyOCQQvB9EWc1gQB4-DxowXjE&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
