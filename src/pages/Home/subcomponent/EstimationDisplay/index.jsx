import { useHookstate } from "@hookstate/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import homeStore from "../../store";
import DrawCanvas from "../../../../conponents/DrawCanvas";
import { Row, Col } from "antd";
const socket = io("http://localhost:5000");

const EstimationDisplay = () => {
  const [frame1, setFrame1] = useState("");
  const [frame2, setFrame2] = useState("");
  const [frame3, setFrame3] = useState("");
  const [frame4, setFrame4] = useState("");
  const [playing, setPlaying] = useState(false);

  const [positions1, setPositions1] = useState([]);
  const [positions2, setPositions2] = useState([]);
  const [positions3, setPositions3] = useState([]);
  const [positions4, setPositions4] = useState([]);

  const homeState = useHookstate(homeStore);

  const playVideo = () => {
    setPlaying(true);
    socket.emit("multicamera", homeState.fileNames.get());
    // socket.emit("camera1", homeState.fileNames.get()[0]);
    // socket.emit("camera2", homeState.fileNames.get()[1]);
  };

  const pauseVideo = () => {
    setPlaying(false);
    socket.emit("pause");
  };

  const pushPostions = () => {
    socket.emit("positions", [positions1, positions2]);
  };

  useEffect(() => {
    // playing &&
    //   socket.on("test1", (img_base64) => {
    //     setFrame1(`data:image/jpeg;base64,${img_base64}`);
    //   });
    // socket.on("test2", (img_base64) => {
    //   setFrame2(`data:image/jpeg;base64,${img_base64}`);
    // });

    playing &&
      socket.on("test", (imgs) => {
        setFrame1(`data:image/jpeg;base64,${imgs[0]}`);
        setFrame2(`data:image/jpeg;base64,${imgs[1]}`);
      })

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
      <button onClick={pushPostions}>Estimation</button>

      {playing && (
        <Row gutter={[4, 4]}>
          <Col span={12}>
            <DrawCanvas
              src={frame1}
              positions={positions1}
              setPositions={setPositions1}
            />
          </Col>
          <Col span={12}>
            <DrawCanvas
              src={frame2}
              positions={positions2}
              setPositions={setPositions2}
            />
          </Col>
          <Col span={12}>
            <DrawCanvas
              src={frame3}
              positions={positions3}
              setPositions={setPositions3}
            />
          </Col>
          <Col span={12}>
            <DrawCanvas
              src={frame4}
              positions={positions4}
              setPositions={setPositions4}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default EstimationDisplay;
