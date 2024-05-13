import React from 'react';
import { SHAPES } from './Shapes';

const Shape = ({ shapeType, rotation }) => {
  const shapeConfiguration = SHAPES[shapeType][rotation];
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 50px)', // Assume max 4 cells wide
    gridTemplateRows: 'repeat(4, 50px)' // Assume max 4 cells tall
  };

  return (
    <div style={gridStyle}>
      {Array.from({ length: 16 }).map((_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const isFilled = shapeConfiguration.some(([dx, dy]) => dx === col && dy === row);
        return (
          <div key={index} style={{ width: '50px', height: '50px', backgroundColor: isFilled ? '#4CAF50' : 'transparent', border: '1px solid #ccc' }}>
          </div>
        );
      })}
    </div>
  );
};

export default Shape;
