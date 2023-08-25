        import React from "react";
        import { useState, useEffect } from "react";
        import MakeCell from "./MakeCell"; // Import the MakeCell component
import { mean } from "lodash";

        function BotTech() {
          // State variables to manage player and bot positions, grid cells, etc.
          const [position, setPosition] = useState({ x: 0, y: 0 });
          const start = MakeCell("path", 0, 0); // Create a start cell using MakeCell component
          const [positionMemory, setPositionMemory] = useState(start);
          const [botPosition, setBotPosition] = useState({ x: 5, y: 5 });
          const [botPositionMemory, setBotPositionMemory] = useState(start);
          const numRows = 30; // Number of rows in the grid
          const numCols = 30; // Number of columns in the grid

          // Styling for the grid and its container
          const gridStyles = {
            display: "grid",
            gridTemplateRows: `repeat(${numRows}, 1fr)`,
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            gap: "0px",
            border: "1px solid black",
          };

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
    const numRows = 30;
    const numCols = 30;

    // function returns an array of elements equal to number of grid cells, each containing a wall type object
    const createGrid = () => {
      const newGrid = new Array(numRows);
      for (let i = 0; i < numRows; i++) {
        newGrid[i] = new Array(numCols).fill("wall");
      }
      return newGrid;
    };

    // function checks whether x, y co-ordinates are a valid position in grid
    const isCellValid = (x, y, grid) => {
      if (x < 0 || y < 0 || x >= numRows || y >= numCols) return false;
      if (grid[x][y] !== "wall") return false;
      return true;
    };

    // function modifies cells within grid of walls to create a maze (recursive backtracking algorithm)
    const generateMazeWithRandomRemoval = (startX, startY) => {
      const dx = [0, 1, 0, -1];
      const dy = [1, 0, -1, 0];
      const stack = [];
      const mazeGrid = createGrid();
  
      stack.push([startX, startY]);
      mazeGrid[startX][startY] = "path";
  
      while (stack.length) {
          const [x, y] = stack[stack.length - 1];
          const neighbors = [];
  
          for (let i = 0; i < 4; i++) {
              const nx = x + 2 * dx[i];
              const ny = y + 2 * dy[i];
  
              if (isCellValid(nx, ny, mazeGrid)) {
                  neighbors.push([nx, ny, dx[i], dy[i]]);
              }
          }
  
          if (neighbors.length) {
              const [nx, ny, dxi, dyi] = neighbors[
                  Math.floor(Math.random() * neighbors.length)
              ];
              mazeGrid[x + dxi][y + dyi] = "path";
              mazeGrid[nx][ny] = "path";
              stack.push([nx, ny]);
          } else {
              stack.pop();
          }
      }
  
      // Randomly remove 10% of the walls
      const totalWalls = numRows * numCols - stack.length;
      const wallsToRemove = Math.floor(0.10 * totalWalls);
      let removedWalls = 0;
  
      while (removedWalls < wallsToRemove) {
          const randRow = Math.floor(Math.random() * numRows);
          const randCol = Math.floor(Math.random() * numCols);
  
          if (mazeGrid[randRow][randCol] === "wall") {
              mazeGrid[randRow][randCol] = "path";
              removedWalls++;
          }
      }
  
      return mazeGrid;
  };
  
  const maze = generateMazeWithRandomRemoval(0, 0);  
  

  const mazeCells = [];
  for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
          mazeCells.push(MakeCell(maze[row][col], row, col));
      }
  }
  setGrid(mazeCells);
    
  }, []);


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
              const updatedCell1 = MakeCell("player", position.x, position.y);
              updateCellInGrid(cellIndex1, updatedCell1);
            }

            if (grid[cellIndex2] !== { x: `${botPosition.x}`, y: `${botPosition.y}` }) {
              const updatedCell2 = MakeCell("bot", botPosition.x, botPosition.y);
              updateCellInGrid(cellIndex2, updatedCell2);
            }

            console.log('updategrid')
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
              console.log('keyevent')
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
          }, );
          

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
          const [ count, setCount ] = useState(1)
          // Perform random bot movements at a regular interval
          useEffect(() => {
            console.log('randomtimer')
            const randomMoveInterval = setInterval(() => {
              randomMove(botPosition, updatePositionAndMemoryBot);
              setCount((prev) => prev + 1) 
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
              const updatedCell = MakeCell("path", cell.y, cell.x);
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
