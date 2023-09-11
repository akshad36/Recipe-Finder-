document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const ingredientsInput = document.getElementById('ingredients');
    const recipesDiv = document.getElementById('recipes');

    searchBtn.addEventListener('click', () => {
        const ingredients = ingredientsInput.value.trim();
        if (ingredients) {
            fetchRecipes(ingredients);
        }
    });

    function fetchRecipes(ingredients) {
        // Replace with your Edamam API Key and App ID
        const apiKey = 'ad478fac16ac0443ae61a45ff5381e8d';
        const appId = ' 148424a1';
        const apiUrl = `https://api.edamam.com/search?q=ingredients&app_id=148424a1&app_key=ad478fac16ac0443ae61a45ff5381e8d`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayRecipes(data.hits);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }

    function displayRecipes(recipes) {
        recipesDiv.innerHTML = '';

        if (recipes.length === 0) {
            recipesDiv.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
            return;
        }

        recipes.forEach((recipe) => {
            const { label, image, url } = recipe.recipe;
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');

            const recipeLink = document.createElement('a');
            recipeLink.href = url;
            recipeLink.target = '_blank';

            const recipeImg = document.createElement('img');
            recipeImg.src = image;
            recipeImg.alt = label;

            const recipeLabel = document.createElement('h3');
            recipeLabel.textContent = label;

            recipeLink.appendChild(recipeImg);
            recipeLink.appendChild(recipeLabel);
            recipeItem.appendChild(recipeLink);
            recipesDiv.appendChild(recipeItem);
        });
    }
});
