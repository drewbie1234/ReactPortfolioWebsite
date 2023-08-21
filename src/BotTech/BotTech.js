import React from "react";
import { useState, useEffect } from "react";

function BotTech() {
  const numRows = 20;
  const numCols = 20;

  const gridStyles = {
    display: "grid",
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gap: "0px", // Adjust the gap between cells if needed
    border: "1px solid black", // Optional border for each cell
    width: "800px",
  };

  const sectionStyle = {
    width: "100vw",
    height: "91vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [grid, setGrid] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMousePressed(false);
    };
    document.addEventListener("mouseup", handleGlobalMouseUp);

    const newGrid = [];
    const cellStyles = {
      width: "40px", // Adjust cell size if needed
      height: "40px",
      backgroundColor: "grey", // Default cell background color
      border: "1px solid black",
    };

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        newGrid.push({
          key: `${row}-${col}`,
          style: { ...cellStyles },
        });
      }
    }
    setGrid(newGrid);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const [position, setPosition] = useState(`0-0`);

  const changeCellStyle = (key, color) => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) =>
        cell.key === key
          ? { ...cell, style: { ...cell.style, backgroundColor: color } }
          : cell
      )
    );
  };

const movePlayerUp = () => {
  const [first, second] = position.split("-").map(Number);
  const newPosition = `${first - 1}-${second}`;
  setPosition(newPosition);
  changeCellStyle(newPosition, "green");
  changeCellStyle(position, "grey");
  
};

const movePlayerDown = () => {
  const [first, second] = position.split("-").map(Number);
  const newPosition = `${first + 1}-${second}`;
  setPosition(newPosition);
  changeCellStyle(newPosition, "green");
  changeCellStyle(position, "grey");
};

const movePlayerLeft = () => {
  const [first, second] = position.split("-").map(Number);
  const newPosition = `${first}-${second - 1}`;
  setPosition(newPosition);
  changeCellStyle(newPosition, "green");
  changeCellStyle(position, "grey");
};

const movePlayerRight = () => {
  const [first, second] = position.split("-").map(Number);
  const newPosition = `${first}-${second + 1}`;
  setPosition(newPosition);
  changeCellStyle(newPosition, "green");
  changeCellStyle(position, "grey");
};

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayerUp();
          break;
        case "ArrowDown":
          movePlayerDown();
          break;
        case "ArrowLeft":
          movePlayerLeft();
          break;
        case "ArrowRight":
          movePlayerRight();
          break;
        default:
          // Handle other key presses if needed
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, );

  const [botPosition, setBotPosition] = useState(`10-10`);

  const moveBotUp = (botPosition) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first - 1}-${second}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
  };
  
  const moveBotDown = (botPosition) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first + 1}-${second}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
  };
  
  const moveBotLeft = (botPosition) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first}-${second - 1}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
  };
  
  const moveBotRight = (botPosition) => {
    const [first, second] = botPosition.split("-").map(Number);
    const newBotPosition = `${first}-${second + 1}`;
    setBotPosition(newBotPosition);
    changeCellStyle(newBotPosition, "red");
    changeCellStyle(botPosition, "grey");
  };

  const moveFunctions = [
    moveBotUp,
    moveBotDown,
    moveBotLeft,
    moveBotRight
  ];

  const randomMove = (position) => {
    const randomIndex = Math.floor(Math.random() * moveFunctions.length);
    const selectedMoveFunction = moveFunctions[randomIndex];
    selectedMoveFunction(position);
  };

  useEffect(() => {
    const randomMoveInterval = setInterval(() => {
      randomMove(botPosition);
    }, 100); // Call a random move every 1000ms (1 second)

    return () => {
      clearInterval(randomMoveInterval);
    };
  }, [botPosition]);

  const handleMouseDown = (key) => {
    changeCellStyle(key, "blue");
    setMousePressed(true);
  };

  const handleMouseOver = (key) => {
    if (mousePressed) {
      changeCellStyle(key, "blue");
    }
  };

  return (
    <div style={sectionStyle}>
      <h1>{position}</h1>
      <div style={gridStyles}>
        {grid.map((cell) => (
          <div
            key={cell.key}
            style={cell.style}
            onMouseDown={() => handleMouseDown(cell.key)}
            onMouseOver={() => handleMouseOver(cell.key)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BotTech;
