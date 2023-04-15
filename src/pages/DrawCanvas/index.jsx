import React, { useRef, useState, useEffect } from "react";

import IMG from "./sdf.png";
import VID from "./t1.mp4";

function DrawCanvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  ///

  const [positions, setPositions] = useState([]);

  const handleOnClick = (event) => {
    const imageRect = event.target.getBoundingClientRect();
    const mouseX = event.clientX - imageRect.left;
    const mouseY = event.clientY - imageRect.top;
    const newPositions = [...positions, { x: mouseX, y: mouseY }];
    setPositions(newPositions);
  };

  const drawLine = (ctx, prevPoint, curPoint) => {
    if (prevPoint) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      // Vẽ đường thẳng
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y); // Điểm bắt đầu (x, y)
      ctx.lineTo(curPoint.x, curPoint.y); // Điểm kết thúc (x, y)
      ctx.stroke(); // Hoàn thành vẽ đường thẳng
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 4;
    contextRef.current = context;
    console.log(positions.length);
    if (positions.length >= 2) {
      for (let i = 0; i < positions.length; i++) {
        if (i > 0) {
          drawLine(context, positions[i - 1], positions[i]);
        }
      }
      drawLine(context, positions[positions.length - 1], positions[0]);
    }
  }, [positions]);

  return (
    <div>
      <canvas
        // onMouseDown={startDrawing}
        // onMouseUp={finishDrawing}
        // onMouseMove={draw}
        onClick={handleOnClick}
        ref={canvasRef}
        style={{
          position: "absolute",
          zIndex: 999,
          width: 500,
        }}
      />
      {/* <video id="v" controls loop width="500">
        <source src={VID} type="video/mp4" />
      </video> */}
      <img src={IMG} width="500" />
    </div>
  );
}

export default DrawCanvas;
