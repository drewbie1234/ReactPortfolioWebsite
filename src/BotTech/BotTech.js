import React from "react";
import { useState, useEffect } from "react";

import "@fontsource/inter";

import MakeCell from "./MakeCell"; // Import the MakeCell component
 
import SelectGridStyle from "./BotTechGridPatterns";
import SelectGrid from "./BotTechSelect";
import GridSizeSelect from './GridSizeSelect'


function BotTech() {
  // State variables to manage player and bot positions, grid cells, etc.  
  const [ numRows, setNumRows ] = useState(20); // Number of rows in the grid
  const [ numCols, setNumCols ] = useState(20); // Number of columns in the grid
  const [ cellSize, setCellSize ] = useState(2)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const start = MakeCell("path", 0, 0, cellSize); // Create a start cell using MakeCell component
  const [positionMemory, setPositionMemory] = useState(start);
  const [botPosition, setBotPosition] = useState({ x: 19, y: 19 });
  const [botPositionMemory, setBotPositionMemory] = useState(start);
  const [selectedPattern, setSelectedPattern] = useState("randomDots");
  const [selectedSize, setSelectedSize] = useState('small')




  // Styling for the grid and its container
  const gridStyles = {
    display: "grid",
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gap: "0px",
    border: "1px solid black",
  };

  // Styling for the grid and its container
  const gameBoxStyles = {
    display: "flex",
    width: "90vmin",
    border: "1px solid black",
    alignItems: "center",
    backgroundColor: "#79b6f2",
    flexDirection: "column",
  };

  const gameTitle = {
    color: "black",
    margin: "50px",
  };

  const gameSettings = {};

  const sectionStyle = {
    width: "100vw",
    height: "91vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // State to track if mouse button is pressed
  const [mousePressed, setMousePressed] = useState(false);

  // Add a global event listener for mouse up
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMousePressed(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // State to store the grid cells
  const [grid, setGrid] = useState([]);



  useEffect(() => {

  

    switch (selectedSize) {
      case 'small':
        setNumRows(10)
        setNumCols(10)
        break;
      case 'medium':
        setNumRows(20)
        setNumCols(20)
        break;
      case 'large':
        setNumRows(30)
        setNumCols(30)
        break;
      default:
        break;
    }

    console.log(`rows ${numRows}`)
    console.log(`cols ${numCols}`)
    console.log(`size ${cellSize}`)
    

    // Function creates at 2 array of grid, with each element containing string 'path' or 'wall' matching the specified grid pattern algorhythm
    const maze = SelectGridStyle(numRows, numCols, selectedPattern);

    const mazeCells = [];

    // Converts 2d array of strings into 1d array of elements containing relevent grid cell object
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        mazeCells.push(MakeCell(maze[row][col], row, col, cellSize));
      }
    }

    // Call passes grid object array into setter for grid state variable
    setGrid(mazeCells);
  }, [selectedPattern, selectedSize, numRows, numCols]);

  // Function to update a cell in the grid
  const updateCellInGrid = (cellIndex, newCell) => {
    setGrid((prevGrid) => {
      const updatedGrid = [...prevGrid];
      updatedGrid[cellIndex] = newCell;
      return updatedGrid;
    });
  };

  // Update the grid cells when the player or bot positions change
  useEffect(() => {
    const cellIndex1 = grid.findIndex(
      (cell) => cell.key === `${position.x}-${position.y}`
    );

    const cellIndex2 = grid.findIndex(
      (cell) => cell.key === `${botPosition.x}-${botPosition.y}`
    );

    if (grid[cellIndex1] !== { x: `${position.x}`, y: `${position.y}` }) {
      const updatedCell1 = MakeCell("player", position.x, position.y, cellSize);
      updateCellInGrid(cellIndex1, updatedCell1);
    }

    if (grid[cellIndex2] !== { x: `${botPosition.x}`, y: `${botPosition.y}` }) {
      const updatedCell2 = MakeCell("bot", botPosition.x, botPosition.y, cellSize);
      updateCellInGrid(cellIndex2, updatedCell2);
    }

    console.log("updategrid");
    
  }, [position, botPosition]);

  // Calculate new position based on offsets and grid boundaries
  const calculateNewPosition = (xOffset, yOffset, memory) => {
    const newX = (memory.x + xOffset + numRows) % numRows;
    const newY = (memory.y + yOffset + numCols) % numCols;
    return { x: newX, y: newY };
  };

  // Update player's position and memory when moving
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

  // Update bot's position and memory when moving
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

  // Function to move a cell based on offsets and update its position
  const move = (movementX, movementY, position, updateFunc) => {
    const newPosition = calculateNewPosition(movementX, movementY, position);
    const cell = grid.find(
      (cell) => cell.key === `${newPosition.x}-${newPosition.y}`
    );

    if (cell?.traverse) {
      updateFunc(newPosition);
    }
  };

  // Function to move the player cell
  const movePlayer = (
    movementX,
    movementY,
    position,
    updatePositionAndMemory
  ) => {
    move(movementX, movementY, position, updatePositionAndMemory);
  };

  // Function to move the bot cell
  const moveBot = (
    movementX,
    movementY,
    botPosition,
    updatePositionAndMemoryBot
  ) => {
    move(movementX, movementY, botPosition, updatePositionAndMemoryBot);
  };

  // Listen for key presses to move the player
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("keyevent");
      switch (event.key) {
        case "ArrowUp":
          movePlayer(-1, 0, position, updatePositionAndMemory);
          break;
        case "ArrowDown":
          movePlayer(1, 0, position, updatePositionAndMemory);
          break;
        case "ArrowLeft":
          movePlayer(0, -1, position, updatePositionAndMemory);
          break;
        case "ArrowRight":
          movePlayer(0, 1, position, updatePositionAndMemory);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Function to perform a random bot movement
  const randomMove = (botPosition, updatePositionAndMemoryBot) => {
    function getRandomInteger() {
      const randomNumber = Math.random();

      if (randomNumber < 1 / 3) {
        return 1;
      } else if (randomNumber < 2 / 3) {
        return -1;
      } else {
        return 0;
      }
    }
    moveBot(
      getRandomInteger(),
      getRandomInteger(),
      botPosition,
      updatePositionAndMemoryBot
    );
  };
  const [count, setCount] = useState(1);
  // Perform random bot movements at a regular interval
  useEffect(() => {
    console.log("randomtimer");
    const randomMoveInterval = setInterval(() => {
      randomMove(botPosition, updatePositionAndMemoryBot);
      setCount((prev) => prev + 1);
    }, 500);

    return () => {
      clearInterval(randomMoveInterval);
    };
  }, [count]);

  // Handle mouse button press on a cell
  const handleMouseDown = (cell) => {
    setMousePressed(true);

    const cellIndex = grid.findIndex((box) => box.key === cell.key);

    if (cellIndex !== -1) {
      const updatedCell = MakeCell("path", cell.y, cell.x, cellSize);
      updateCellInGrid(cellIndex, updatedCell);
    }
  };

  // Handle mouse over a cell while mouse button is pressed
  const handleMouseOver = (key) => {
    if (mousePressed) {
      // Do something when mouse is moved over cells while pressed
    }
  };

  // State to track if the game is won
  const [gameIsWon, setGameIsWon] = useState(false);

  // Check if the player has reached the bot's position
  if (position.x === botPosition.x && position.y === botPosition.y) {
    setGameIsWon(true);
  }

  // Render the game components
  return (
    <div style={sectionStyle}>
      {gameIsWon ? (
        <h1>Winner</h1>
      ) : (
        <>
          <div style={gameBoxStyles}>
            <h1 style={gameTitle}> Maze Runner</h1>
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
            <div style={gameSettings}>
              <SelectGrid
                selectedPattern={selectedPattern}
                onSelectionChange={setSelectedPattern}
              />
              <GridSizeSelect 
                style={{width: '10vmin'}}
                selectedSize={selectedSize}
                onSelectionChanged={setSelectedSize}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BotTech;
