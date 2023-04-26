import potpack from "potpack";
import * as randomColor from "randomcolor";
import { useState, useRef, useEffect } from "react";

function App() {
  const [boxes, setBoxes] = useState([]);
  console.log(boxes);

  return (
    <div className="flex w-screen justify-center items-center">
      <div className="flex-col">
        <BoxForm boxes={boxes} setBoxes={setBoxes} />
        <Canvas boxes={boxes} />
      </div>
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
      context.fillStyle = randomColor();
      context.strokeStyle = "black";
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
      <p>Boxes: {boxes.length}</p>
      <p>Space Utilization: {parseFloat(fill * 100).toFixed(2)}%</p>
      <canvas ref={canvasRef} width={w} height={h}></canvas>
    </div>
  );
}

function BoxForm({ boxes, setBoxes }) {
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const addBoxHandler = (event) => {
    event.preventDefault();
    const newBox = { w: parseInt(boxWidth), h: parseInt(boxHeight) };
    setBoxes([...boxes, newBox]);
  };
  const clearBoxHandler = () => {
    setBoxes([]);
  };
  return (
    <form onSubmit={addBoxHandler}>
      <input
        className="w-20"
        type="number"
        placeholder="Width"
        value={boxWidth}
        onChange={({ target }) => setBoxWidth(target.value)}
      />
      <input
        className="w-20"
        type="number"
        placeholder="Height"
        value={boxHeight}
        onChange={({ target }) => setBoxHeight(target.value)}
      />
      <button className="w-20" type="submit">
        Add
      </button>
      <button className="w-20" type="button" onClick={clearBoxHandler}>
        Clear
      </button>
    </form>
  );
}

export default App;
