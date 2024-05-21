import React, { useState, useEffect, useRef } from 'react';
import Shape from './Shape';
import { SHAPES } from './Shapes';

const ShapePicker = ({ shapePlaced }) => {
  const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });
  const isMounted = useRef(false);

  const pickRandomShape = () => {
    const shapeTypes = Object.keys(SHAPES);
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const rotations = Object.keys(SHAPES[randomType]);
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    setSelectedShape({ type: randomType, rotation: parseInt(randomRotation) });
    console.log('New shape picked:', { type: randomType, rotation: parseInt(randomRotation) });
  };

  useEffect(() => {
    if (isMounted.current) {
      pickRandomShape();
    } else {
      isMounted.current = true;
    }
  }, [shapePlaced]);

  useEffect(() => {
    console.log('Current selected shape:', selectedShape);
  }, [selectedShape]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        draggable
        onDragStart={(e) => {
          console.log('Dragging shape:', selectedShape);
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
