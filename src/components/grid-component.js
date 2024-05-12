import React, { useState } from 'react';
import './Grid.css';

const SHAPES = {
  L: {
    1: [(0,0), (1,0), (2,0), (2,1)],
    2: [(0,0), (0,1), (1,1), (2,1)],
    3: [(0,0), (0,1), (0,2), (1,2)],
    4: [(0,1), (1,1), (2,0), (2,1)]
  }
};

const canPlaceShape = (grid, shapeType, rotation, x, y) => {
  const shape = SHAPES[shapeType][rotation];
  for (const [dx, dy] of shape) {
    const posX = x + dx;
    const posY = y + dy;
    if (posX < 0 || posX >= 9 || posY < 0 || posY >= 9 || grid[posX][posY] !== null) {
      return false; // Shape goes out of bounds or collides with an existing piece
    }
  }
  return true;
};

const placeShapeOnGrid = (grid, shapeType, rotation, x, y) => {
  const newGrid = grid.map(row => [...row]); // Create a deep copy of the grid
  const shape = SHAPES[shapeType][rotation];
  for (const [dx, dy] of shape) {
    newGrid[x + dx][y + dy] = shapeType; // Place shape part on the grid
  }
  return newGrid;
};


const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(null)));

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shapeType");
    const rotation = parseInt(e.dataTransfer.getData("rotation"), 10);

    if (canPlaceShape(grid, shapeType, rotation, rowIndex, colIndex)) {
      const newGrid = placeShapeOnGrid(grid, shapeType, rotation, rowIndex, colIndex);
      setGrid(newGrid);
      console.log(`Placed shape ${shapeType} at ${rowIndex}, ${colIndex}`);
    } else {
      console.log(`Cannot place shape ${shapeType} at ${rowIndex}, ${colIndex}`);
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
          className="cell grid-cell"
          style={{ backgroundColor: cell ? 'lightblue' : 'transparent' }}
        >
          {cell}
        </div>
      )))}
    </div>
  );
};

export default Grid;
