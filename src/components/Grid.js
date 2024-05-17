import React, { useState } from 'react';
import './Grid.css';
import { SHAPES } from './Shapes';

const Grid = ({ onShapePlaced }) => {
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(null)));
  const [score, setScore] = useState(0);

  const canPlaceShape = (grid, shapeType, rotation, baseX, baseY) => {
    const shape = SHAPES[shapeType][rotation];
    return shape.every(([dx, dy]) => {
      const x = baseX + dx;
      const y = baseY + dy;
      return x >= 0 && x < 9 && y >= 0 && y < 9 && grid[x][y] === null;
    });
  };

  const placeShapeOnGrid = (grid, shapeType, rotation, baseX, baseY) => {
    const newGrid = grid.map(row => [...row]);
    const shape = SHAPES[shapeType][rotation];
    shape.forEach(([dx, dy]) => {
      const x = baseX + dx;
      const y = baseY + dy;
      if (x >= 0 && x < 9 && y >= 0 && y < 9) {
        newGrid[x][y] = shapeType;  // Mark the grid cell as occupied by the shape
      }
    });
    return newGrid;
  };

  const clearLines = (grid) => {
    let cleared = false;
    let newGrid = grid.map(row => [...row]);

    // Clear rows
    newGrid = newGrid.map(row => {
      if (row.every(cell => cell !== null)) {
        cleared = true;
        return Array(9).fill(null);
      }
      return row;
    });

    // Clear columns
    for (let col = 0; col < 9; col++) {
      if (newGrid.every(row => row[col] !== null)) {
        for (let row = 0; row < 9; row++) {
          newGrid[row][col] = null;
        }
        cleared = true;
      }
    }

    // Clear 3x3 blocks
    for (let blockStartRow = 0; blockStartRow < 9; blockStartRow += 3) {
      for (let blockStartCol = 0; blockStartCol < 9; blockStartCol += 3) {
        let blockFull = true;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (newGrid[blockStartRow + i][blockStartCol + j] === null) {
              blockFull = false;
              break;
            }
          }
          if (!blockFull) break;
        }
        if (blockFull) {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              newGrid[blockStartRow + i][blockStartCol + j] = null;
            }
          }
          cleared = true;
        }
      }
    }

    if (cleared) {
      setScore(score + 100);  // Update the score state directly
    }
    return newGrid;
  };

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shapeType");
    const rotation = parseInt(e.dataTransfer.getData("rotation"), 10);
    const shapeConfiguration = SHAPES[shapeType][rotation];

    const baseX = rowIndex;
    const baseY = colIndex;

    console.log('Attempting to place shape:', shapeType, 'Rotation:', rotation, 'Base X:', baseX, 'Base Y:', baseY);

    if (canPlaceShape(grid, shapeType, rotation, baseX, baseY)) {
      const updatedGrid = placeShapeOnGrid(grid, shapeType, rotation, baseX, baseY);
      const newGrid = clearLines(updatedGrid);  // Ensure newGrid is used after clearing
      setGrid(newGrid);
      console.log('Shape placed:', shapeType, 'Rotation:', rotation, 'Grid:', newGrid);
      onShapePlaced();  // Trigger the shapePlaced callback
    } else {
      console.log(`Cannot place shape at [${rowIndex},${colIndex}]`);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();  // Necessary to allow dropping
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
      <div>Score: {score}</div>
    </div>
  );
};

export default Grid;
