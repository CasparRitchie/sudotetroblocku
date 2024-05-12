import React from 'react';
import './App.css';
import Grid from './components/grid-component';
import ShapePicker from './components/ShapePicker';


function App() {
  return (
    <div className="App">
      <h1>Sudoku Tetris Game</h1>
      <ShapePicker />
      <Grid />
    </div>
  );
}

export default App;
