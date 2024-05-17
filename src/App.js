import React, { useState } from 'react';
import ShapePicker from './components/ShapePicker';
import Grid from './components/Grid';

function App() {
  const [shapePlaced, setShapePlaced] = useState(false);

  const handleShapePlaced = () => {
    setShapePlaced(prev => !prev); // This toggles the state to trigger re-renders
  };

  return (
    <div className="App">
      <ShapePicker shapePlaced={shapePlaced} />
      <Grid onShapePlaced={handleShapePlaced} />
    </div>
  );
}

export default App;
