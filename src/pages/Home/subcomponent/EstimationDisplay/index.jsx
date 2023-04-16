import { useHookstate } from "@hookstate/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import homeStore from "../../store";
// import DrawCanvas from "../../../../conponents/DrawCanvas";
import { Row, Col, Button } from "antd";
const socket = io("http://localhost:5000");

const EstimationDisplay = () => {
  const [frame1, setFrame1] = useState("");
  const [frame2, setFrame2] = useState("");
  const [frame3, setFrame3] = useState("");
  const [frame4, setFrame4] = useState("");
  const [frameEst, setFrameEst] = useState();
  const [playing, setPlaying] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);

  // const [positions1, setPositions1] = useState([]);
  // const [positions2, setPositions2] = useState([]);
  // const [positions3, setPositions3] = useState([]);
  // const [positions4, setPositions4] = useState([]);

  const homeState = useHookstate(homeStore);

  const playVideo = () => {
    setIsEstimating(false)
    setPlaying(true);
    socket.emit("multicamera", homeState.fileNames.get());
  };

  const pauseVideo = () => {
    setPlaying(false);
    setIsEstimating(false)
    socket.emit("pause");
  };

  const estimateVideos = () => {
    setPlaying(false);
    setIsEstimating(true);
    socket.emit("estimate", homeState.fileNames.get());
  };

  useEffect(() => {
    playing &&
      socket.on("test", (imgs) => {
        console.log("play 4 video");
        setFrame1(`data:image/jpeg;base64,${imgs[0]}`);
        setFrame2(`data:image/jpeg;base64,${imgs[1]}`);
        setFrame3(`data:image/jpeg;base64,${imgs[2]}`);
        setFrame4(`data:image/jpeg;base64,${imgs[3]}`);
      });
    isEstimating &&
      socket.on("estimate", (img_base64) => {
        console.log("estimation");
        setFrameEst(`data:image/jpeg;base64,${img_base64}`);
      });
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("video_frame");
    };
  }, [playing, isEstimating]);

  return (
    <div>
      <div className="headerName">Estimatiom</div>
      <Button
        onClick={() => {
          playing ? pauseVideo() : playVideo();
        }}
      >
        {playing ? "Hide Video" : "Display Video"}
      </Button>
      <Button onClick={estimateVideos}>Estimation</Button>

      {playing && (
        <Row gutter={[4, 4]}>
          <Col span={12}>
            {/* <DrawCanvas
              src={frame1}
              positions={positions1}
              setPositions={setPositions1}
            /> */}
            <img
              src={frame1}
              alt="Loi hien thi"
              style={{ height: 500, width: "auto" }}
            />
          </Col>
          <Col span={12}>
            {/* <DrawCanvas
              src={frame2}
              positions={positions2}
              setPositions={setPositions2}
            /> */}
            <img
              src={frame2}
              alt="Loi hien thi"
              style={{ height: 500, width: "auto" }}
            />
          </Col>
          <Col span={12}>
            {/* <DrawCanvas
              src={frame3}
              positions={positions3}
              setPositions={setPositions3}
            /> */}
            <img
              src={frame3}
              alt="Loi hien thi"
              style={{ height: 500, width: "auto" }}
            />
          </Col>
          <Col span={12}>
            {/* <DrawCanvas
              src={frame4}
              positions={positions4}
              setPositions={setPositions4}
            /> */}
            <img
              src={frame4}
              alt="Loi hien thi"
              style={{ height: 500, width: "auto" }}
            />
          </Col>
        </Row>
      )}
      {isEstimating && (
        // <DrawCanvas
        //   src={frameEst}
        //   positions={positions4}
        //   setPositions={setPositions4}
        // />
        <img
          src={frameEst}
          alt="Loi hien thi"
          style={{ height: 500, width: "auto" }}
        />
      )}
    </div>
  );
};

export default EstimationDisplay;
