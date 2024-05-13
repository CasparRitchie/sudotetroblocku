import React, { useState, useCallback } from 'react';
import ShapePicker from './components/ShapePicker';
import Grid from './components/Grid';

function App() {
  // This state can be used if needed to force updates or manage state changes after a shape is placed.
  const [shapePlaced, setShapePlaced] = useState(false);

  const handleShapePlaced = useCallback(() => {
    // This will toggle the shapePlaced state, you can use this to trigger updates if needed.
    setShapePlaced(prev => !prev);
  }, []);

  return (
    <div className="App">
      {/* If onShapePlaced prop isn't used in ShapePicker or Grid, you don't need to pass it */}
      <ShapePicker onShapePlaced={handleShapePlaced} />
      <Grid onShapePlaced={handleShapePlaced} />
    </div>
  );
}

export default App;
