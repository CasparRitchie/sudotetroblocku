import React, { useState } from 'react';
import './Grid.css';

const SHAPES = {
  L: {
    1: [[0,0], [1,0], [2,0], [2,1]],
    2: [[0,0], [0,1], [1,1], [2,1]],
    3: [[0,0], [0,1], [0,2], [1,2]],
    4: [[0,1], [1,1], [2,0], [2,1]]
  },
      S: {
        1: [[0,0]]  // Only one configuration, no rotation needed
      }
};


const canPlaceShape = (grid, shapeType, rotation, x, y) => {
  const shape = SHAPES[shapeType][rotation];
  if (!Array.isArray(shape)) {
    console.error('Shape data is not an array:', shape);
    return false;
  }

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

  if (!Array.isArray(shape)) {
    console.error('Shape data is not an array:', shape);
    return grid; // Return the original grid unchanged if error
  }

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

    // Calculate the offset based on the shape's bounding box
    const shape = SHAPES[shapeType][rotation];
    const minX = Math.min(...shape.map(([dx, _]) => dx));
    const minY = Math.min(...shape.map(([_, dy]) => dy));

    // Calculate base coordinates considering the anchor point at the top-left of the bounding box
    const baseX = rowIndex - minX;
    const baseY = colIndex - minY;

    if (canPlaceShape(grid, shapeType, rotation, baseX, baseY)) {
      const newGrid = placeShapeOnGrid(grid, shapeType, rotation, baseX, baseY);
      setGrid(newGrid);
      console.log(newGrid);
    }
  };


  const allowDrop = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
          onDragOver={allowDrop}
          className="cell grid-cell"
          style={{ backgroundColor: cell ? '#4CAF50' : 'transparent' }}
        >
          {cell}
        </div>
      )))}
    </div>
  );
};

export default Grid;
