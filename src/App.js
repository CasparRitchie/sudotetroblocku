import React, { useState, useCallback } from 'react';
import ShapePicker from './components/ShapePicker';
import Grid from './components/Grid';

function App() {
  const [shapePlaced, setShapePlaced] = useState(false);

  const handleShapePlaced = useCallback(() => {
    setShapePlaced(prev => !prev); // Toggle to trigger re-render
  }, []);

  return (
    <div className="App">
      <ShapePicker onShapePlaced={handleShapePlaced} />
      <Grid onShapePlaced={handleShapePlaced} />
    </div>
  );
}

export default App;
