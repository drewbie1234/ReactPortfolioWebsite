import React from 'react'
import { useState, useEffect } from 'react'

function BotTech(){

    const numRows = 20;
    const numCols = 20;
  
    const gridStyles = {
      display: 'grid',
      gridTemplateRows: `repeat(${numRows}, 1fr)`,
      gridTemplateColumns: `repeat(${numCols}, 1fr)`,
      gap: '0px', // Adjust the gap between cells if needed
      border: '1px solid black', // Optional border for each cell
      width:'800px'
    };

    const sectionStyle = {
        width: '100vw',
        height: '91vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

    const [grid , setGrid] = useState([]);
    const [mousePressed, setMousePressed] = useState(false);


    useEffect(() => {

        const newGrid = [];
        const cellStyles = {
            width: '40px', // Adjust cell size if needed
            height: '40px',
            backgroundColor: 'grey', // Default cell background color
            border: '1px solid black'
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
      }, []);


    const handleMouseDown = () => {
        setMousePressed(true);
    };
        
    const handleMouseEnter = (key) => {
        if (mousePressed) {
            changeCellStyle( key, 'blue')
        }
    }

    const handleMouseUp = () => {
        setMousePressed(false);
    };

    const changeCellStyle = (key, color) => {
        setGrid((prevGrid) =>
          prevGrid.map((cell) =>
            cell.key === key ? { ...cell, style: { ...cell.style, backgroundColor: color } } : cell
          )
        );
      };
    
      return (
        <div style={sectionStyle}>
          <div style={gridStyles}>
            {grid.map((cell) => (
              <div
                key={cell.key}
                style={cell.style}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => handleMouseEnter(cell.key)}
                onMouseUp={handleMouseUp}
              ></div>
            ))}
          </div>
        </div>
      );
  }

export default BotTech