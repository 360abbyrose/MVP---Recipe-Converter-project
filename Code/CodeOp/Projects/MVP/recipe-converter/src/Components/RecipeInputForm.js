import React, { useState } from 'react';
import ConverterDisplay from './ConverterDisplay';

const RecipeInputForm = () => {
  const [recipe, setRecipe] = useState({
    recipeName: '',
    ingredients: '',
    instructions: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you'd handle the logic to scale the recipe using the entered data
    // Update 'scaledRecipe' with the scaled recipe data
    const scaledRecipe = { /* Logic to scale the recipe */ };
    setRecipe(scaledRecipe);
  };

  return (
    <div>
      <h2>Recipe Input Form</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipe.recipeName}
          onChange={(e) => setRecipe({ ...recipe, recipeName: e.target.value })}
        />
        <textarea
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
        ></textarea>
        <textarea
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        ></textarea>
        <button type="submit">Convert Recipe</button>
      </form>
      <ConverterDisplay recipe={recipe} />
    </div>
  );
};

export default RecipeInputForm;



