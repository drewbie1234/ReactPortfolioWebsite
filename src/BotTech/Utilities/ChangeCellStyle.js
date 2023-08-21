export const changeCellStyle = (key, color, setGrid) => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) =>
        cell.key === key
          ? { ...cell, style: { ...cell.style, backgroundColor: color } }
          : cell
      )
    );
};