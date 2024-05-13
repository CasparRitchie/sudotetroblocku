import React, { useState } from 'react';
import './Grid.css';

const SHAPES = {
  S: { // Single cell (simple square)
    1: [[0, 0]]
  },
  I: { // Line shape (4 orientations)
    1: [[0, 0], [0, 1], [0, 2], [0, 3]],
    2: [[0, 0], [1, 0], [2, 0], [3, 0]],
    3: [[0, 0], [0, 1], [0, 2], [0, 3]],
    4: [[0, 0], [1, 0], [2, 0], [3, 0]]
  },
  L: { // L-shaped (4 orientations)
    1: [[0, 0], [1, 0], [1, 1], [1, 2]],
    2: [[0, 2], [1, 2], [1, 1], [1, 0]],
    3: [[0, 0], [0, 1], [0, 2], [1, 2]],
    4: [[0, 0], [0, 1], [0, 2], [1, 0]]
  },
  T: { // T-shaped (4 orientations)
    1: [[0, 1], [1, 0], [1, 1], [1, 2]],
    2: [[0, 1], [1, 1], [1, 0], [2, 1]],
    3: [[0, 0], [0, 1], [0, 2], [1, 1]],
    4: [[0, 1], [1, 1], [2, 1], [1, 0]]
  }
};


const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(null)));
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


  const checkAndClearGrid = (currentGrid) => {
    let scoreIncrement = 0;

    // Clear Rows
    let newGrid = currentGrid.map(row => {
        if (row.every(cell => cell !== null)) {
            scoreIncrement += 100;  // Increment score for each cleared row
            console.log('Clearing a row, incrementing score');
            return Array(9).fill(null);
        }
        return row;
    });

    // Clear Columns and 3x3 Blocks
    let columnAndBlockCleared = clearColumnsAndBlocks(newGrid);
    if (columnAndBlockCleared) {
        scoreIncrement += 100;  // Increment score for each cleared column or block
        console.log('Clearing columns/blocks, incrementing score');
    }

    // Update score based on the total increment calculated
    if (scoreIncrement > 0) {
        setScore(prevScore => prevScore + scoreIncrement);
    }

    return newGrid;
};

const clearColumnsAndBlocks = (grid) => {
    let cleared = false;

    // Clear Columns
    for (let col = 0; col < 9; col++) {
        if (grid.every(row => row[col] !== null)) {
            for (let row = 0; row < 9; row++) {
                grid[row][col] = null;
            }
            cleared = true;
        }
    }

    // Clear 3x3 Blocks
    for (let blockStartRow = 0; blockStartRow < 9; blockStartRow += 3) {
        for (let blockStartCol = 0; blockStartCol < 9; blockStartCol += 3) {
            let blockFull = true;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (grid[blockStartRow + i][blockStartCol + j] === null) {
                        blockFull = false;
                        break;
                    }
                }
                if (!blockFull) break;
            }
            if (blockFull) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        grid[blockStartRow + i][blockStartCol + j] = null;
                    }
                }
                cleared = true;
            }
        }
    }

    return cleared;
};


  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("shapeType");
    const rotation = parseInt(e.dataTransfer.getData("rotation"), 10);
    const shape = SHAPES[shapeType][rotation];

    // Calculate the offsets to position the shape's top-left corner based on the drop location
    const minX = Math.min(...shape.map(([dx, _]) => dx));
    const minY = Math.min(...shape.map(([_, dy]) => dy));
    const baseX = rowIndex - minX;
    const baseY = colIndex - minY;

    if (canPlaceShape(grid, shapeType, rotation, baseX, baseY)) {
      const updatedGrid = placeShapeOnGrid(grid, shapeType, rotation, baseX, baseY);
      setGrid(updatedGrid);
      console.log(`Placed shape at [${rowIndex},${colIndex}]`);
      checkAndClearGrid(updatedGrid);
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
