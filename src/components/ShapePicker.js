import React, { useState, useEffect } from 'react';
import Shape from './Shape';
import { SHAPES } from './Shapes';

const ShapePicker = () => {
  const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });

  useEffect(() => {
    pickRandomShape();
  }, []);

  const pickRandomShape = () => {
    const shapeTypes = Object.keys(SHAPES); // Get all shape types
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const rotations = Object.keys(SHAPES[randomType]);
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    setSelectedShape({ type: randomType, rotation: parseInt(randomRotation) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("shapeType", selectedShape.type);
          e.dataTransfer.setData("rotation", selectedShape.rotation.toString());
          pickRandomShape(); // Pick a new shape every time one is dragged
        }}
        style={{ cursor: 'pointer', marginBottom: '10px' }}
      >
        <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
      </div>
      <button onClick={pickRandomShape}>Change Shape</button>
    </div>
  );
};

export default ShapePicker;
