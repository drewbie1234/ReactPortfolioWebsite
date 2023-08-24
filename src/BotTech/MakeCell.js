function MakeCell(type, row, col) {
  if (type === "player") {
    return {
      key: `${row}-${col}`,
      x: col,
      y: row,
      type: type,
      style: {
        width: "4vmin", // Adjust cell size if needed
        height: "4vmin",
        backgroundColor: "green", // Default cell background color
        border: "1px solid yellow",
        borderRadius: "1vmin",
      },
      traverse: false,
    };
  }
  if (type === "bot") {
    return {
      key: `${row}-${col}`,
      x: col,
      y: row,
      type: type,
      style: {
        width: "4vmin", // Adjust cell size if needed
        height: "4vmin",
        backgroundColor: "orange", // Default cell background color
        border: "1px solid purple",
        borderRadius: "2vmin",
      },
      traverse: false,
    };
  }
  if (type === "wall") {
    return {
      key: `${row}-${col}`,
      x: col,
      y: row,
      type: type,
      style: {
        width: "4vmin", // Adjust cell size if needed
        height: "4vmin",
        backgroundColor: "yellow", // Default cell background color
        border: "1px solid black",
      },
      traverse: false,
    };
  }

  if (type === "path") {
    return {
      key: `${row}-${col}`,
      x: col,
      y: row,
      type: type,
      style: {
        width: "4vmin", // Adjust cell size if needed
        height: "4vmin",
        backgroundColor: "grey", // Default cell background color
      },
      traverse: true,
    };
  }
}

export default MakeCell;
