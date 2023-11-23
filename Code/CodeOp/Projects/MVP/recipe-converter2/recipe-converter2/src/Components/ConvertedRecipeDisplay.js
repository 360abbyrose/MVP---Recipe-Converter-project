import React from 'react';
import './ConvertedRecipeDisplay.css';

const ConvertedRecipeDisplay = ({ convertedRecipe }) => {
const { ingredients } = convertedRecipe;

return (
    <div className="converted-recipe-container">
    <h2>{convertedRecipe.title}</h2>
    <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
        <li key={index}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit} 
        </li>
        ))}
    </ul>
    </div>
);
};

export default ConvertedRecipeDisplay;