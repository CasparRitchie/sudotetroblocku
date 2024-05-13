import React from 'react';

const Shape = () => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 50px)', // Single cell grid
    gridTemplateRows: 'repeat(1, 50px)'
  };

  return (
    <div style={gridStyle}>
      <div style={{ width: '50px', height: '50px', backgroundColor: '#4CAF50' }}></div>
    </div>
  );
};

export default Shape;





// import React from 'react';
// import './Grid.css'; // Make sure this import is present

// const Shape = ({ shapeType, rotation }) => {
//   const configurations = {
//     L: {
//       1: [[0, 0], [1, 0], [2, 0], [2, 1]],
//       2: [[0, 1], [1, 1], [1, 0], [1, 2]],
//       3: [[0, 1], [1, 1], [2, 1], [0, 2]],
//       4: [[0, 0], [0, 1], [0, 2], [1, 0]]
//     },
//         S: {
//           1: [[0,0]]  // Only one configuration, no rotation needed
//         }
//   };

//   const cells = configurations[shapeType][rotation];
//   console.log(cells)
//   console.log(configurations)
//   const gridStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 50px)',
//     gridTemplateRows: 'repeat(3, 50px)',
//   };

//   return (
//     <div style={gridStyle}>
//       {Array.from({ length: 9 }).map((_, index) => {
//         const x = Math.floor(index / 3);
//         const y = index % 3;
//         const isFilled = cells.some(cell => cell[0] === x && cell[1] === y);
//         return (
//           <div key={index} className={`cell ${isFilled ? 'shape-cell' : ''}`}></div>
//         );
//       })}
//     </div>
//   );
// };

// export default Shape;
