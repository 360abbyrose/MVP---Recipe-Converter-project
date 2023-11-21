import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [recipe, setRecipe] = useState({
    servings: 0,
    targetServings: 0,
    ingredients: [{ name: '', quantity: 0, unit: 'tbsp' }],
  });

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
    // Logic to scale the recipe based on servings and targetServings
    // Update the scaled recipe state here
  };

  return (
    <div className="App">
      <h1>Recipe Converter</h1>
      <form>
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
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value) || 0)}
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
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <button type="button" onClick={handleConvert}>
          Convert
        </button>
      </form>
      {/* Display the converted recipe */}
    </div>
  );
};

export default App;


