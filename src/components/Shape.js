import React from 'react';
import './Grid.css'; // Make sure this import is present

const Shape = ({ shapeType, rotation }) => {
  const configurations = {
    L: {
      1: [[0, 0], [1, 0], [2, 0], [2, 1]],
      2: [[0, 1], [1, 1], [1, 0], [1, 2]],
      3: [[0, 1], [1, 1], [2, 1], [0, 2]],
      4: [[0, 0], [0, 1], [0, 2], [1, 0]]
    }
  };

  const cells = configurations[shapeType][rotation];
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 50px)',
    gridTemplateRows: 'repeat(3, 50px)',
  };

  return (
    <div style={gridStyle}>
      {Array.from({ length: 9 }).map((_, index) => {
        const x = Math.floor(index / 3);
        const y = index % 3;
        const isFilled = cells.some(cell => cell[0] === x && cell[1] === y);
        return (
          <div key={index} className={`cell ${isFilled ? 'shape-cell' : ''}`}></div>
        );
      })}
    </div>
  );
};

export default Shape;
