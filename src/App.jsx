import potpack from "potpack";
import * as randomColor from "randomcolor";
import { useState, useRef, useEffect } from "react";

function App() {
  const [boxes, setBoxes] = useState([]);
  console.log(boxes);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex-col">
        <Canvas boxes={boxes} />
      </div>
      <BoxForm boxes={boxes} setBoxes={setBoxes} />
    </div>
  );
}

function Canvas({ boxes }) {
  const { w, h, fill } = potpack(boxes);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    boxes.forEach((box) => {
      context.beginPath();
      context.fillStyle = "black";
      context.strokeStyle = "#0f0";
      context.rect(box.x, box.y, box.w, box.h);
      context.save();
      context.clip();
      context.lineWidth *= 2;
      context.fill();
      context.stroke();
      context.restore();
      context.closePath();
    });
  }, [boxes]);

  return (
    <div>
      <div className="fixed top-0 left-0 p-2"><p>Boxes: {boxes.length}</p>
        <p>Space Utilization: {parseFloat(fill * 100).toFixed(2)}%</p></div>
      <canvas ref={canvasRef} width={w} height={h}></canvas>
    </div>
  );
}

function BoxForm({ boxes, setBoxes }) {
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [boxCount, setBoxCount] = useState(0);

  const addBoxHandler = (event) => {
    event.preventDefault();
    const newBoxes = [];
    for (let i = 0; i < boxCount; i++) {
      newBoxes.push({ w: parseFloat(boxWidth) * 50, h: parseFloat(boxHeight) * 50 })
    }
    setBoxes([...boxes, ...newBoxes]);
  };

  const clearBoxHandler = () => {
    setBoxes([]);
  };
  
  return (
    <form onSubmit={addBoxHandler} className="fixed bottom-0 p-4 space-x-2">
      <label htmlFor="width">Width (cm):</label>
      <input
        className="w-20"
        type="number"
        step="0.01"
        id="width"
        value={boxWidth}
        onChange={({ target }) => setBoxWidth(target.value)}
      />
      <label htmlFor="height">Height (cm):</label>
      <input
        className="w-20"
        type="number"
        step="0.01"
        id="height"
        value={boxHeight}
        onChange={({ target }) => setBoxHeight(target.value)}
      />
      <label htmlFor="count">Count:</label>
      <input
        className="w-20"
        type="number"
        id="count"
        value={boxCount}
        onChange={({ target }) => setBoxCount(target.value)}
      />
      <button className="w-20 bg-slate-800" type="submit">
        Add
      </button>
      <button className="w-20 bg-slate-800" type="button" onClick={clearBoxHandler}>
        Clear
      </button>
    </form>
  );
}

export default App;
