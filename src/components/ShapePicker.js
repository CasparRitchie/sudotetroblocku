import React, { useState, useEffect, useCallback } from 'react';
import Shape from './Shape';
import { SHAPES } from './Shapes';

const ShapePicker = ({ onShapePlaced }) => {
  const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });

  useEffect(() => {
    pickRandomShape();
  }, []);

  const pickRandomShape = useCallback(() => {
    const shapeTypes = Object.keys(SHAPES); // Get all shape types
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const rotations = Object.keys(SHAPES[randomType]);
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    setSelectedShape({ type: randomType, rotation: parseInt(randomRotation) });
  }, []);

  // Listen for the event when shape is placed to change the shape
  useEffect(() => {
    const handleShapePlaced = () => {
      pickRandomShape();
    };

    onShapePlaced && onShapePlaced.subscribe(handleShapePlaced);
    return () => {
      onShapePlaced && onShapePlaced.unsubscribe(handleShapePlaced);
    };
  }, [onShapePlaced, pickRandomShape]);
  
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
        <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
      </div>
    </div>
  );
};

export default ShapePicker;
