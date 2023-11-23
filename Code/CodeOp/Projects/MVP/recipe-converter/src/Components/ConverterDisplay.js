import React from 'react';

const ConverterDisplay = ({ recipe }) => {
  const { recipeName, ingredients, instructions } = recipe;

  return (
    <div>
      <h2>Converted Recipe</h2>
      <h3>{recipeName}</h3>
      <div>
        <h4>Ingredients:</h4>
        <p>{ingredients}</p>
      </div>
      <div>
        <h4>Instructions:</h4>
        <p>{instructions}</p>
      </div>
    </div>
  );
};

export default ConverterDisplay;

