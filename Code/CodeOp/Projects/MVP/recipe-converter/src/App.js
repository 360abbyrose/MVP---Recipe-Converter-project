import React from 'react';
import './App.css';
import RecipeInputForm from './RecipeInputForm';
import ConverterDisplay from './Components/ConverterDisplay';

const App = () => {
  return (
    <div className="App">
      <h1>Recipe Converter App</h1>
      <RecipeInputForm />
      <ConverterDisplay />
    </div>
  );
};

export default App;



