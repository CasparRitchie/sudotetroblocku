import React, { useState, useEffect } from 'react';
import Shape from './Shape';
import { SHAPES } from './Shapes';

const ShapePicker = () => {
  const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });

  const pickRandomShape = () => {
    const shapeTypes = Object.keys(SHAPES); // Get all shape types
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    console.log("Random type information: ",randomType);
    console.log("Shape type information: ",shapeTypes);
    const rotations = Object.keys(SHAPES[randomType]).map(Number); // Ensure keys are numbers
    console.log("Rotations information: ",rotations);
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    console.log("Random rotation: ",randomRotation);
    setSelectedShape({ type: randomType, rotation: randomRotation });
    console.log("Selected Shape type and rotation:", randomType, "and ", randomRotation)
  };

  // Initially pick a random shape
  useEffect(() => {
    pickRandomShape();
  }, []);

  // Function to call when shape is placed
  const handleShapePlaced = () => {
    pickRandomShape(); // Pick a new random shape
  };

  // Assume you have a way to listen when a shape is placed. It could be through props or context.
  useEffect(() => {
    const handlePlaceEvent = () => handleShapePlaced();
    window.addEventListener('shapePlaced', handlePlaceEvent); // Custom event listener
    // console.log("window")
    // console.log(window)
    return () => {
      window.removeEventListener('shapePlaced', handlePlaceEvent);
      console.log("shape placed")
    };
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
        <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
      </div>
    </div>
  );
};

export default ShapePicker;


// import React, { useState, useEffect } from 'react';
// import Shape from './Shape';
// import { SHAPES } from './Shapes';

// const ShapePicker = ({ onShapePlaced }) => {
//   const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });

//   const pickRandomShape = () => {
//     const shapeTypes = Object.keys(SHAPES); // Get all shape types
//     const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
//     const rotations = Object.keys(SHAPES[randomType]);
//     const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
//     setSelectedShape({ type: randomType, rotation: parseInt(randomRotation) });
//   };

//   useEffect(() => {
//     pickRandomShape();
//   }, [onShapePlaced]); // React to onShapePlaced changes to pick a new shape

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
//       <div
//         draggable
//         onDragStart={(e) => {
//           e.dataTransfer.setData("shapeType", selectedShape.type);
//           e.dataTransfer.setData("rotation", selectedShape.rotation.toString());
//         }}
//         style={{ cursor: 'pointer' }}
//       >
//         <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
//       </div>
//     </div>
//   );
// };

// export default ShapePicker;


// import React, { useState, useEffect, useCallback } from 'react';
// import Shape from './Shape';
// import { SHAPES } from './Shapes';

// const ShapePicker = ({ onShapePlaced }) => {
//   const [selectedShape, setSelectedShape] = useState({ type: 'S', rotation: 1 });

//   useEffect(() => {
//     pickRandomShape();
//   }, []);

//   const pickRandomShape = useCallback(() => {
//     const shapeTypes = Object.keys(SHAPES); // Get all shape types
//     const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
//     const rotations = Object.keys(SHAPES[randomType]);
//     const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
//     setSelectedShape({ type: randomType, rotation: parseInt(randomRotation) });
//   }, []);

//   // Listen for the event when shape is placed to change the shape
//   useEffect(() => {
//     const handleShapePlaced = () => {
//       pickRandomShape();
//     };

//     onShapePlaced && onShapePlaced.subscribe(handleShapePlaced);
//     return () => {
//       onShapePlaced && onShapePlaced.unsubscribe(handleShapePlaced);
//     };
//   }, [onShapePlaced, pickRandomShape]);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
//       <div
//         draggable
//         onDragStart={(e) => {
//           e.dataTransfer.setData("shapeType", selectedShape.type);
//           e.dataTransfer.setData("rotation", selectedShape.rotation.toString());
//         }}
//         style={{ cursor: 'pointer' }}
//       >
//         <Shape shapeType={selectedShape.type} rotation={selectedShape.rotation} />
//       </div>
//     </div>
//   );
// };

// export default ShapePicker;
