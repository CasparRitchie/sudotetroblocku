import React, { useState } from 'react';
import './Grid.css';
import { SHAPES } from './Shapes';

const Grid = ({ onShapePlaced }) => {
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(null)));
  const [highlightedCells, setHighlightedCells] = useState([]);
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

    const rowsToClear = [];
    const colsToClear = new Set();
    const blocksToClear = [];

    newGrid.forEach((row, rowIndex) => {
      if (row.every(cell => cell !== null)) {
        rowsToClear.push(rowIndex);
      }
    });

    for (let col = 0; col < 9; col++) {
      if (newGrid.every(row => row[col] !== null)) {
        colsToClear.add(col);
      }
    }

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
          blocksToClear.push([blockStartRow, blockStartCol]);
        }
      }
    }

    rowsToClear.forEach(rowIndex => {
      newGrid[rowIndex] = Array(9).fill(null);
      cleared = true;
    });

    colsToClear.forEach(colIndex => {
      for (let row = 0; row < 9; row++) {
        newGrid[row][colIndex] = null;
      }
      cleared = true;
    });

    blocksToClear.forEach(([blockStartRow, blockStartCol]) => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          newGrid[blockStartRow + i][blockStartCol + j] = null;
        }
      }
      cleared = true;
    });

    if (cleared) {
      setScore(score => score + 100);
    }
    return newGrid;
  };

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shapeType");
    const rotation = parseInt(e.dataTransfer.getData("rotation"), 10);

    if (!shapeType || isNaN(rotation)) {
      return;
    }

    const shapeConfiguration = SHAPES[shapeType][rotation];
    const minX = Math.min(...shapeConfiguration.map(([dx, _]) => dx));
    const minY = Math.min(...shapeConfiguration.map(([_, dy]) => dy));
    const baseX = rowIndex - minX;
    const baseY = colIndex - minY;

    console.log('Attempting to place shape:', shapeType, 'Rotation:', rotation, 'Base X:', baseX, 'Base Y:', baseY);

    if (canPlaceShape(grid, shapeType, rotation, baseX, baseY)) {
      const updatedGrid = placeShapeOnGrid(grid, shapeType, rotation, baseX, baseY);
      const newGrid = clearLines(updatedGrid);
      setGrid(newGrid);
      console.log('Shape placed:', shapeType, 'Rotation:', rotation, 'Grid:', newGrid);
      onShapePlaced();
      setHighlightedCells([]);
    } else {
      console.log(`Cannot place shape at [${rowIndex},${colIndex}]`);
      setHighlightedCells([]);
    }
  };

  const handleDragOver = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shapeType");
    const rotation = parseInt(e.dataTransfer.getData("rotation"), 10);

    if (!shapeType || isNaN(rotation)) {
      return;
    }

    const shapeConfiguration = SHAPES[shapeType][rotation];
    const minX = Math.min(...shapeConfiguration.map(([dx, _]) => dx));
    const minY = Math.min(...shapeConfiguration.map(([_, dy]) => dy));
    const baseX = rowIndex - minX;
    const baseY = colIndex - minY;

    const highlighted = shapeConfiguration.map(([dx, dy]) => [baseX + dx, baseY + dy]);
    setHighlightedCells(highlighted);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
          onDragOver={(e) => {
            allowDrop(e);
            handleDragOver(e, rowIndex, colIndex);
          }}
          onDragLeave={() => setHighlightedCells([])}
          className={`grid-cell ${highlightedCells.some(([x, y]) => x === rowIndex && y === colIndex) ? 'highlighted' : ''} ${cell ? 'filled' : ''}`}
        >
          {cell}
        </div>
      )))}
      <div>Score: {score}</div>
    </div>
  );
};

export default Grid;
