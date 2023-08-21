import React, { useState, useEffect} from "react";

function CreateGrid(){
    const [grid, setGrid] = useState([]);
    const numRows = 20;
    const numCols = 20;

    useEffect(() => {

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

    }, []);
}

export default CreateGrid

