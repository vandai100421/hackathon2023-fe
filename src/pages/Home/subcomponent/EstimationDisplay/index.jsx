import { useHookstate } from "@hookstate/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import homeStore from "../../store";
const socket = io("http://localhost:5000");

const EstimationDisplay = () => {
  const [frame, setFrame] = useState("");
  const [frame2, setFrame2] = useState("");
  const [playing, setPlaying] = useState(false);

  const homeState = useHookstate(homeStore);

  const playVideo = () => {
    setPlaying(true);
    // socket.emit("play");
    socket.emit("multicamera", homeState.fileNames.get());
  };

  const pauseVideo = () => {
    setPlaying(false);
    socket.emit("pause");
  };

  useEffect(() => {
    playing &&
      socket.on("video_frame", (img_base64) => {
        // Update the state variable with the new video frame
        setFrame(`data:image/jpeg;base64,${img_base64}`);
      }) &&
      socket.on("test", (img_base64) => {
        setFrame2(`data:image/jpeg;base64,${img_base64}`);
      });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("video_frame");
    };
  }, [playing]);

  return (
    <div>
      <div className="headerName">Estimatiom</div>
      <button
        onClick={() => {
          playing ? pauseVideo() : playVideo();
        }}
      >
        {playing ? "Hide Video" : "Display Video"}
      </button>

      {playing && (
        <>
          {/* <img
            src={frame}
            alt="Streaming video frame"
            style={{ width: "100%" }}
          /> */}
          <img
            src={frame2}
            alt="Streaming video frame2"
            style={{ width: "100%" }}
          />
        </>
      )}
    </div>
  );
};

export default EstimationDisplay;
