const Recipe = require('./app/Models/recipeSchema')
var moment = require('moment'); // require
moment().format(); 


const resolvers = {
  Query: {
    // Get All Recipe API
    async recipes(){
      try {
        // Fetch all Recipe documents
        const recipes = await Recipe.find();
    
        return recipes;
      } catch (error) {
        throw new Error(`Could not fetch recipes: ${error.message}`);
      }
      },
    // Get a Single Recipe APi
   async recipe(_, { id }){
    try {
      // Find a single Recipe document by its ID
      const recipe = await Recipe.findById(id);
  
      if (!recipe) {
        throw new Error('Recipe not found');
      }
  
      return recipe;
    } catch (error) {
      throw new Error(`Could not fetch recipe: ${error.message}`);
    }
    }
  },
  Mutation: {

    //   **********  Add Recipe **********//
    async addRecipe(_, { product }) {
      try {
        // Create a new Recipe document based on the input data
        const newRecipe = new Recipe({
          name: product.name,
          description: product.description,
          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          // date: new Date().toISOString(),
          thumbsUp: product.thumbsUp,
          thumbsDown: product.thumbsDown,
        });

        // Save the new Recipe document to the database
        const savedRecipe = await newRecipe.save();
        console.log(savedRecipe)

        return savedRecipe;
      } catch (error) {
        throw new Error(`Could not add recipe: ${error.message}`);
      }
    },
//   **********  Update Recipe **********//
    async updateRecipe(_, { id, edits }){
      try {
        // Find the Recipe document by ID
        const recipe = await Recipe.findById(id);
    
        if (!recipe) {
          throw new Error('Recipe not found');
        }
    
        // Update the recipe fields with the provided edits
        recipe.name = edits.name;
        recipe.description = edits.description;
        recipe.thumbsUp = edits.thumbsUp;
        recipe.thumbsDown = edits.thumbsDown;
    
        // Save the updated Recipe document
        const updatedRecipe = await recipe.save();
    
        return updatedRecipe;
      } catch (error) {
        throw new Error(`Could not update recipe: ${error.message}`);
      }
    },

    //   ********** Delete Recipe **********//
  async deleteRecipe(_, { id }){
    try {
      // Find and remove the Recipe document by ID
      const deletedRecipe = await Recipe.findByIdAndRemove(id);
  
      if (!deletedRecipe) {
        throw new Error('Recipe not found');
      }
       
      return [deletedRecipe]; // Return the deleted recipe as an array
    } catch (error) {
      throw new Error(`Could not delete recipe: ${error.message}`);
    }
  }

  }
};

module.exports = { resolvers }