import React, { useState } from 'react';
import './App.css';
import ConvertedRecipeDisplay from './Components/ConvertedRecipeDisplay';
import ErrorPopup from './Components/ErrorPopup';

function convertTeaspoonsToTablespoons(teaspoons) {
  return teaspoons / 3; // 1 tablespoon equals 3 teaspoons
}
function convertTablespoonsToTeaspoons(tablespoons) {
  return tablespoons * 3; // 1 tablespoon equals 3 teaspoons
}

function convertCupsToTablespoons(cups) {
  return cups * 16; // 1 cup equals 16 tablespoons
}
function convertTablespoonsToCups(tablespoons) {
  return tablespoons / 16; // 1 cup equals 16 tablespoons
}

function convertFluidOunceToTablespoons(fluidOunce) {
  return fluidOunce * 2; // 1 fluid ounce equals 2 tablespoons
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [recipe, setRecipe] = useState({
    title: '',
    servings: 0,
    targetServings: 0,
    ingredients: [{ name: '', quantity: 0, unit: 'tbsp' }],
  });

  const [convertedRecipe, setConvertedRecipe] = useState(null);
  
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: 0, unit: 'tbsp' }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleConvert = () => {
    const { servings, targetServings, ingredients } = recipe;

  if (servings <= 0 || targetServings <= 0 || ingredients.some(ingredient => ingredient.name === '' || ingredient.quantity <= 0)) {
    setErrorMessage("Please don't leave fields blank");
    return;
  }
  
    // Calculate the scaling factor
    const scaleFactor = targetServings / servings;
  
    // Scale the ingredients based on the scaling factor
    const scaledIngredients = ingredients.map(ingredient => {
      let scaledQuantity = ingredient.quantity * scaleFactor;
  
      // Perform unit conversions
      if (ingredient.unit === 'tsp' && scaledQuantity >= 3) {
        const tablespoons = convertTeaspoonsToTablespoons(scaledQuantity);
        scaledQuantity = tablespoons;
        ingredient.unit = 'tbsp'; // Update the unit
      } else if (ingredient.unit === 'tbsp' && scaledQuantity < 1) {
        const teaspoons = convertTablespoonsToTeaspoons(scaledQuantity);
        scaledQuantity = teaspoons;
        ingredient.unit = 'tsp'; // Update the unit
      }
      return { ...ingredient, quantity: scaledQuantity };
    });
    // Update the converted recipe state with the scaled ingredients
    setConvertedRecipe({
      title: recipe.title,
      servings: targetServings,
      ingredients: scaledIngredients,
    });
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };
  
  return (
    <div className="App">
      {errorMessage && <ErrorPopup message={errorMessage} handleClose={handleCloseError} />}
      <h1>Recipe Converter</h1>
      {!convertedRecipe ? (
        <form>
          <label>
            Recipe Title:
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            />
          </label>
          <label>
            Servings:
            <input
              type="number"
              value={recipe.servings}
              onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) || 0 })}
            />
          </label>
          <label>
            Target Servings:
            <input
              type="number"
              value={recipe.targetServings}
              onChange={(e) => setRecipe({ ...recipe, targetServings: parseInt(e.target.value) || 0 })}
            />
          </label>
          <h2>Ingredients:</h2>
          <div className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <div className="ingredient-item" key={index}>
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient Name"
              />
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                placeholder="Quantity"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              >
                <option value="tsp">Teaspoon (tsp)</option>
                <option value="tbsp">Tablespoon (Tbsp)</option>
                <option value="cup">Cup (c)</option>
                <option value="egg">Egg</option>
                <option value="floz">Fluid Ounce (fl oz)</option>
                <option value="oz">Ounce (oz)</option>
                <option value="pint">Pint (pt)</option>
                <option value="quart">Quart (qt)</option>
                <option value="gallon">Gallon</option>
                <option value="lb">Pound (lb)</option>
              </select>
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <button type="button" onClick={handleConvert}>
            Convert
          </button>
        </form>
      ) : (
        <ConvertedRecipeDisplay convertedRecipe={convertedRecipe} />
      )}
    </div>
  );
};

export default App;