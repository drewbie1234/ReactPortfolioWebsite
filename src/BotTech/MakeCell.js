function MakeCell(type, row, col) {
    switch (type) {
      case "player":
        return {
          key: `${row}-${col}`,
          x: col,
          y: row,
          type: type,
          style: {
            width: "2vmin",
            height: "2vmin",
            background: "linear-gradient(45deg, #00f, #009)",
            border: "1px solid #00f",
            borderRadius: "1vmin",
            boxShadow: "0px 0px 10px 2px #00f",
          },
          traverse: false,
        };
  
      case "bot":
        return {
          key: `${row}-${col}`,
          x: col,
          y: row,
          type: type,
          style: {
            width: "2vmin",
            height: "2vmin",
            background: "radial-gradient(#f00, #900)",
            border: "1px solid #f00",
            borderRadius: "2vmin",
            boxShadow: "0px 0px 10px 2px #f00",
          },
          traverse: false,
        };
  
      case "wall":
        return {
          key: `${row}-${col}`,
          x: col,
          y: row,
          type: type,
          style: {
            width: "2vmin",
            height: "2vmin",
            background: "linear-gradient(45deg, #bbb, #ddd)",
            border: "1px solid #aaa",
            boxShadow: "2px 2px 4px #333",
          },
          traverse: false,
        };
  
      case "path":
        return {
          key: `${row}-${col}`,
          x: col,
          y: row,
          type: type,
          style: {
            width: "2vmin",
            height: "2vmin",
            background: "linear-gradient(45deg, #111, #002)",
          },
          traverse: true,
        };
  
      default:
        return {
          key: `${row}-${col}`,
          x: col,
          y: row,
          type: type,
          style: {
            width: "2vmin",
            height: "2vmin",
          },
        };
    }
  }
  
  export default MakeCell;
  