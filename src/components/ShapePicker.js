import React, { useState, useEffect } from 'react';
import Shape from './Shape';  // Ensure the import path is correct

const ShapePicker = () => {
  const [selectedShape, setSelectedShape] = useState({ type: 'L', rotation: 1 });

  useEffect(() => {
    const rotations = [1, 2, 3, 4];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    setSelectedShape({ type: 'L', rotation: randomRotation });  // Sets a random rotation on component mount
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("shapeType", selectedShape.type);
          e.dataTransfer.setData("rotation", selectedShape.rotation.toString());
        }}
        style={{ cursor: 'pointer' }}
      >
        {/* Ensure the Shape component is called with the right props */}
        <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
      </div>
    </div>
  );
};

export default ShapePicker;
