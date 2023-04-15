import React, { useRef, useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";
// import Demo from "./pages/Demo";
import DrawCanvas from "./pages/DrawCanvas";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Demo /> */}
      <DrawCanvas />
      <DrawCanvas />
    </div>
  );
}

export default App;
