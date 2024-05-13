import React from 'react';
import {SHAPES} from './Shapes';  // Ensure you import SHAPES here

const Shape = ({ shapeType, rotation }) => {
  const shapeCells = SHAPES[shapeType][rotation];  // Get the specific shape configuration based on type and rotation
  const gridSize = Math.sqrt(shapeCells.length);  // This is a simplified, not entirely accurate calculation

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 50px)`,
    gridTemplateRows: `repeat(${gridSize}, 50px)`,
  };

  return (
    <div style={gridStyle}>
      {shapeCells.map((cell, index) => (
        <div key={index} style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#4CAF50', // You might need logic here to decide when to fill a cell
          border: cell[0] === 0 && cell[1] === 0 ? '2px solid red' : '1px solid black'  // Example to mark the "pivot" of the shape
        }}></div>
      ))}
    </div>
  );
};

export default Shape;
