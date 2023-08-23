import React from "react";
import { useState, useEffect } from "react";
import MakeCell from "./MakeCell";

function BotTech() {
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [positionMemory, setPositionMemory] = useState({});
  const [botPosition, setBotPosition] = useState({ x: 10, y: 10 });
  const [botPositionMemory, setBotPositionMemory] = useState({});
  const numRows = 20;
  const numCols = 20;

  const gridStyles = {
    display: "grid",
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gap: "0px", // Adjust the gap between cells if needed
    border: "1px solid black", // Optional border for each cell,
  };

  const sectionStyle = {
    width: "100vw",
    height: "91vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [mousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMousePressed(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const blockSize = 2; // Change this value to control the block size
    const gapSize = 1; // Change this value to control the gap size

    const newGrid = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let cellType;

        if (
          row % (blockSize + gapSize) >= gapSize &&
          col % (blockSize + gapSize) >= gapSize &&
          row % (blockSize + gapSize) < gapSize + blockSize &&
          col % (blockSize + gapSize) < gapSize + blockSize &&
          Math.random() < 0.5 // Randomly decide whether to create a block
        ) {
          cellType = "wall";
        }
        // Rest of the grid is "path"
        else {
          cellType = "path";
        }

        newGrid.push(MakeCell(cellType, row, col));
      }
    }
    setGrid(newGrid);
    console.log(newGrid);
  }, []);

  const updateCellInGrid = (cellIndex, newCell) => {
    setGrid((prevGrid) => {
      const updatedGrid = [...prevGrid];
      updatedGrid[cellIndex] = newCell;
      return updatedGrid;
    });
  };

  useEffect(() => {
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${position.x}-${position.y}`
    );

    const updatedCell = MakeCell("player", position.x, position.y); // Update the cell type as needed

    updateCellInGrid(cellIndex, updatedCell);
  }, [position]);

  useEffect(() => {
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${botPosition.x}-${botPosition.y}`
    );

    const updatedCell = MakeCell("bot", botPosition.x, botPosition.y); // Update the cell type as needed

    updateCellInGrid(cellIndex, updatedCell);
  }, [botPosition, position]);



  const calculateNewPosition = (xOffset, yOffset, memory) => {
    const newX = (memory.x + xOffset + numRows) % numRows;
    const newY = (memory.y + yOffset + numCols) % numCols;
    return { x: newX, y: newY };
  };
  
  const updatePositionAndMemory = (newPosition) => {
    const cellMemoryIndex = grid.findIndex(
      (cell) => cell.key === `${positionMemory.y}-${positionMemory.x}`
    );
  
    updateCellInGrid(cellMemoryIndex, positionMemory);
  
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPosition.x}-${newPosition.y}`
    );
  
    setPositionMemory(grid[cellIndex]);
    setPosition(newPosition);
  };

  const updatePositionAndMemoryBot = (newPosition) => {
    const cellMemoryIndex = grid.findIndex(
      (cell) => cell.key === `${botPositionMemory.y}-${botPositionMemory.x}`
    );
  
    updateCellInGrid(cellMemoryIndex, botPositionMemory);
  
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPosition.x}-${newPosition.y}`
    );
  
    setBotPositionMemory(grid[cellIndex]);
    setBotPosition(newPosition);
  };


  
  const movePlayerUp = () => {
    const newPlayerPosition = calculateNewPosition(-1, 0, position);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPlayerPosition.x}-${newPlayerPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemory(newPlayerPosition);
    } 
    
  };
  
  const movePlayerDown = () => {
    const newPlayerPosition = calculateNewPosition(1, 0, position);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPlayerPosition.x}-${newPlayerPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemory(newPlayerPosition);
    } 
  };
  
  const movePlayerLeft = () => {
    const newPlayerPosition = calculateNewPosition(0, -1, position);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPlayerPosition.x}-${newPlayerPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemory(newPlayerPosition);
    } 
  };
  
  const movePlayerRight = () => {
    const newPlayerPosition = calculateNewPosition(0, 1, position);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newPlayerPosition.x}-${newPlayerPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemory(newPlayerPosition);
    } 
  };

  const moveBotUp = () => {
    const newBotPosition = calculateNewPosition(-1, 0, botPosition);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newBotPosition.x}-${newBotPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemoryBot(newBotPosition);
    } 
    
  };
  
  const moveBotDown = () => {
    const newBotPosition = calculateNewPosition(1, 0, botPosition);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newBotPosition.x}-${newBotPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemoryBot(newBotPosition);
    } 
  };
  
  const moveBotLeft = () => {
    const newBotPosition = calculateNewPosition(0, -1, botPosition);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newBotPosition.x}-${newBotPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemoryBot(newBotPosition);
    } 
  };
  
  const moveBotRight = () => {
    const newBotPosition = calculateNewPosition(0, 1, botPosition);
    const cellIndex = grid.findIndex(
      (cell) => cell.key === `${newBotPosition.x}-${newBotPosition.y}`
    );
    if (grid[cellIndex].traverse === true){
      updatePositionAndMemoryBot(newBotPosition);
    } 
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
  } ,);

  const moveFunctions = [moveBotUp, moveBotDown, moveBotLeft, moveBotRight];

  const randomMove = (position) => {
    const randomIndex = Math.floor(Math.random() * moveFunctions.length);
    const selectedMoveFunction = moveFunctions[randomIndex];
    selectedMoveFunction(botPosition);
  };

  useEffect(() => {
    const randomMoveInterval = setInterval(() => {
      randomMove(botPosition);
    }, 250); // Call a random move every 1000ms (1 second)

    return () => {
      clearInterval(randomMoveInterval);
    };
  });

  const handleMouseDown = (cell) => {
    setMousePressed(true);

    // Find the index of the cell based on the key
    const cellIndex = grid.findIndex((box) => box.key === cell.key);

    // Update the cell type to "path" when clicked
    if (cellIndex !== -1) {
      const updatedCell = MakeCell("path", cell.y, cell.x); // Update the cell type as needed
      updateCellInGrid(cellIndex, updatedCell);
    }
  };

  const handleMouseOver = (key) => {
    if (mousePressed) {
    }
  };

  const [gameIsWon, setGameIsWon] = useState(false);

  if (position.x === botPosition.x && position.y === botPosition.y) {
    setGameIsWon(true);
  }

  return (
    <div style={sectionStyle}>
      {gameIsWon ? (
        <h1>Winner</h1>
      ) : (
        <>
          <div style={gridStyles}>
            {grid.map((cell) => (
              <div
                key={cell.key}
                style={cell.style}
                onMouseDown={() => handleMouseDown(cell)}
                onMouseOver={() => handleMouseOver(cell)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BotTech;
