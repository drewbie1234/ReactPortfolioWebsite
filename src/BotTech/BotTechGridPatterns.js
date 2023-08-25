import React from "react";

function SelectGridStyle(numRows, numCols, createGrid){





const generateHorizontalLines = () => {
    const grid = createGrid();

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (i % 2 === 0) {
                grid[i][j] = "path";
            } else {
                grid[i][j] = "wall";
            }
        }
    }

    // Randomly remove 10 walls
    let removedWalls = 0;
    while (removedWalls < 10) {
        const randRow = Math.floor(Math.random() * numRows);
        const randCol = Math.floor(Math.random() * numCols);

        if (grid[randRow][randCol] === "wall") {
            grid[randRow][randCol] = "path";
            removedWalls++;
        }
    }

    return grid;
};



const generateVerticalLines = () => {
    const grid = createGrid();
    let totalWalls = 0;

    // Create vertical lines and count total number of walls
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (j % 2 === 0) {
                grid[i][j] = "path";
            } else {
                grid[i][j] = "wall";
                totalWalls++;
            }
        }
    }

    // Calculate 10% of the total walls
    const wallsToRemove = Math.floor(0.10 * totalWalls);

    // Randomly remove walls until 10% are removed
    let removedWalls = 0;
    while (removedWalls < wallsToRemove) {
        const randRow = Math.floor(Math.random() * numRows);
        const randCol = Math.floor(Math.random() * numCols);

        if (grid[randRow][randCol] === "wall") {
            grid[randRow][randCol] = "path";
            removedWalls++;
        }
    }

    return grid;
};



const generateDiagonalStripes = () => {
    const grid = createGrid();
    const stripeWidth = 2; // Width of the stripe
    const gapWidth = 1; // Width of the gap

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // This condition will create diagonal stripes with a gap between them
            if (((i + j) % (stripeWidth + gapWidth)) < stripeWidth) {
                grid[i][j] = "path";
            } else {
                grid[i][j] = "wall";
            }
        }
    }
    
    // Calculate total walls
    let totalWalls = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === "wall") {
                totalWalls++;
            }
        }
    }

    // Remove approximately 10% of the walls randomly
    const wallsToRemove = Math.floor(0.10 * totalWalls);
    let removedWalls = 0;
    while (removedWalls < wallsToRemove) {
        const randRow = Math.floor(Math.random() * numRows);
        const randCol = Math.floor(Math.random() * numCols);

        if (grid[randRow][randCol] === "wall") {
            grid[randRow][randCol] = "path";
            removedWalls++;
        }
    }
    
    return grid;
};



const generateCircularPattern = () => {
    const grid = createGrid();
    const centerX = numRows / 2;
    const centerY = numCols / 2;
    
    // Assuming the maximum number of circles you want is four for simplicity
    const maxCircles = 10;
    const circleWidth = 2; // The width of each circle
    const gapBetweenCircles = 1; // Space between each circle

    // This array will store the angles of gaps for each circle
    let gapAngles = [];

    // Generate random angles for gaps
    for (let i = 0; i < maxCircles; i++) {
        gapAngles.push(2 * Math.PI * Math.random());
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const dx = i - centerX;
            const dy = j - centerY;
            const distance = Math.sqrt(dx*dx + dy*dy);
            const angle = Math.atan2(dy, dx); // Get the angle in radians

            let isPath = false;

            for (let r = 0; r < maxCircles; r++) {
                const innerRadius = r * (circleWidth + gapBetweenCircles);
                const outerRadius = innerRadius + circleWidth;

                if (distance >= innerRadius && distance <= outerRadius) {
                    // Check for gap in the circle
                    const gapStart = gapAngles[r] - 0.1; // Define the size of the gap
                    const gapEnd = gapAngles[r] + 0.1;

                    if (angle < gapStart || angle > gapEnd) {
                        isPath = true;
                    }
                }
            }

            grid[i][j] = isPath ? "path" : "wall";
        }
    }

    return grid;
};



const generateConcentricCircles = () => {
    const grid = createGrid();
    const centerX = numRows / 2;
    const centerY = numCols / 2;
    
    const maxRadius = Math.min(numRows, numCols) ;
    const gapSize = 2; // Adjust this to change the gap size between circles

    for (let r = gapSize; r <= maxRadius; r += gapSize) {
        for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
            const x = Math.round(centerX + r * Math.cos(angle));
            const y = Math.round(centerY + r * Math.sin(angle));

            if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
                grid[x][y] = "path";
            }
        }

        // Randomly break one wall in the circle
        const breakAngle = Math.random() * 2 * Math.PI;
        const bx = Math.round(centerX + r * Math.cos(breakAngle));
        const by = Math.round(centerY + r * Math.sin(breakAngle));
        if (bx >= 0 && bx < numRows && by >= 0 && by < numCols) {
            grid[bx][by] = "wall";
        }
    }

    // Remove random 5% of walls
    let wallCells = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === "wall") {
                wallCells.push([i, j]);
            }
        }
    }
    
    const numberOfWallsToRemove = Math.floor(0.05 * wallCells.length);
    for (let i = 0; i < numberOfWallsToRemove; i++) {
        const randomIndex = Math.floor(Math.random() * wallCells.length);
        const [x, y] = wallCells[randomIndex];
        grid[x][y] = "path";
        wallCells.splice(randomIndex, 1); // Remove the wall cell from the list
    }

    return grid;
};



const generateRandomDots = () => {
    const grid = createGrid();
    const probability = 0.60; // 5% chance for a dot

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (Math.random() < probability) {
                grid[i][j] = "path";
            } else {
                grid[i][j] = "wall";
            }
        }
    }
    return grid;
};



const generateMaze = (patternType) => {
    switch (patternType) {
        case "horizontalLines":
            return generateHorizontalLines();
        case "verticalLines":
            return generateVerticalLines();
        case "diagonalStripes":
            return generateDiagonalStripes();
        case "circularPattern":
            return generateCircularPattern();
        case "concentricCircles":
            return generateConcentricCircles();
        case "randomDots":
            return generateRandomDots();
        default:
            throw new Error("Invalid pattern type");
    }
};


const mazePatternType = "horizontalLines"; // Change this to the desired pattern type
const maze = generateMaze(mazePatternType);

return maze

}
export default SelectGridStyle