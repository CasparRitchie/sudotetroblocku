import React from 'react';
import ShapePicker from './components/ShapePicker';
import Grid from './components/Grid';
import {SHAPES} from './components/Shapes';


function App() {
  return (
    <div className="App">
      <ShapePicker shapes={SHAPES} />
      <Grid />
    </div>
  );
}

export default App;
