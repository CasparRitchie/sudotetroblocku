import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(null)));

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    // Check if the target cell is empty
    if (grid[rowIndex][colIndex] === null) {
      const newGrid = grid.map(row => [...row]);
      newGrid[rowIndex][colIndex] = 'S';  // Set 'S' for square
      setGrid(newGrid);
      console.log(`Dropped shape at [${rowIndex},${colIndex}]`);
    } else {
      console.log(`Cannot drop shape at [${rowIndex},${colIndex}], cell already occupied.`);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();  // This is necessary to allow dropping
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
          onDragOver={allowDrop}
          className="grid-cell"
          style={{ backgroundColor: cell ? '#4CAF50' : 'transparent', width: '50px', height: '50px', border: '1px solid black' }}
        >
          {cell}
        </div>
      )))}
    </div>
  );
};

export default Grid;
