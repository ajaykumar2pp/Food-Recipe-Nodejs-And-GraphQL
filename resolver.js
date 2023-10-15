const Recipe = require('./app/Models/recipeSchema')
var moment = require('moment');
moment().format();


const resolvers = {

  
  Query: {
    // Get All Recipe API
    async recipes() {
      try {
        // Fetch all Recipe documents
        const recipes = await Recipe.find();

        return recipes;
      } catch (error) {
        throw new Error(`Could not fetch recipes: ${error.message}`);
      }
    },
    // Get a Single Recipe APi
    // async recipe(_, args,context) {
    //   try {

    //     const  {id}  = args
    //         console.log(args)
    //         console.log(id)
        
    //     // Find a single Recipe document by its ID
    //     const recipe = await Recipe.findById(id);

    //     if (!recipe) {
    //       throw new Error('Recipe not found');
    //     }

    //     return recipe;
    //   } catch (error) {
    //     throw new Error(`Could not fetch recipe: ${error.message}`);
    //   }
    // },
    async recipe(_, { id }) {
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
          // url:product.url,
          url: `http://${product.url}`,
          clicks: product.clicks,
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

    // async addRecipe(_,args ,context) {
    //   try {

    //     console.log(args)
    //     const { name,description,url,clicks,thumbsDown,thumbsUp, date} = args.product
    //     // Create a new Recipe document based on the input data
    //     const newRecipe = new Recipe({
    //       name,
    //       description,
    //       date:moment().format('MMMM Do YYYY, h:mm:ss a'),
    //       url:`http://${url}`,
    //       clicks,
    //       thumbsUp,
    //       thumbsDown,
    //     });

    //     // Save the new Recipe document to the database
    //     const savedRecipe = await newRecipe.save();
    //     console.log(savedRecipe)

    //     return savedRecipe;
    //   } catch (error) {
    //     throw new Error(`Could not add recipe: ${error.message}`);
    //   }
    // },
    //   **********  Update Recipe **********//
    // async updateRecipe(_, { id, edits }) {
    //   try {
    //     // Find the Recipe document by ID
    //     const recipe = await Recipe.findById(id);

    //     if (!recipe) {
    //       throw new Error('Recipe not found');
    //     }

    //     // Update the recipe fields with the provided edits
    //     recipe.name = edits.name;
    //     recipe.description = edits.description;
    //     recipe.thumbsUp = edits.thumbsUp;
    //     recipe.thumbsDown = edits.thumbsDown;

    //     // Save the updated Recipe document
    //     const updatedRecipe = await recipe.save();

    //     return updatedRecipe;
    //   } catch (error) {
    //     throw new Error(`Could not update recipe: ${error.message}`);
    //   }
    // },

    // async updateRecipe(_,args,context) {

    //   // _ is a placeholder for the first argument, which is often the parent object  when dealing with nested resolvers.

    //   // In the code above, _ is a convention to indicate that the first parameter (often representing the parent object) is not used in this resolver.
    //   try {

    //     const {id , edits} = args; // Destructure id and edits from args
    //     // Find the Recipe document by ID

      
    //     const recipe = await Recipe.findById(id);

    //     if (!recipe) {
    //       throw new Error('Recipe not found');
    //     }

    //     // Update the recipe fields with the provided edits using shorthand
    // // Object.assign(recipe, edits);


    //     // Update the recipe fields with the provided edits
    //     recipe.name = edits.name;
    //     recipe.description = edits.description;
    //     recipe.thumbsUp = edits.thumbsUp;
    //     recipe.thumbsDown = edits.thumbsDown;

    //     // Save the updated Recipe document
    //     const updatedRecipe = await recipe.save();

    //     return updatedRecipe;
    //   } catch (error) {
    //     throw new Error(`Could not update recipe: ${error.message}`);
    //   }
    // },


    async updateRecipe(_, { id, edits }) {
      try {
        // Find the Recipe document by ID
        const recipe = await Recipe.findById(id);
    
        if (!recipe) {
          throw new Error('Recipe not found');
        }
    
        // Use the spread operator to update the fields
        Object.assign(recipe, edits);
    
        // Save the updated Recipe document
        const updatedRecipe = await recipe.save();
    
        return updatedRecipe;
      } catch (error) {
        throw new Error(`Could not update recipe: ${error.message}`);
      }
    },
    
    //   ********** Delete Recipe **********//
    async deleteRecipe(_, { id }) {
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
    },

    //   ********** Visit URL Recipe **********//
    async visitUrlRecipe(_, { id }) {
      try {
        const recipe = await Recipe.findById(id);
        if (recipe) {
          // Increment the clicks field by 1
          recipe.clicks = (recipe.clicks || 0) + 1;
          // Save the updated recipe 
          const result = await recipe.save();

          return result;
        } else {
          throw new Error("Recipe not found");
        }
      }
      catch (error) {
        throw new Error(`Could not visit URL recipe: ${error.message}`);
      }
    },

   

  }
};

module.exports = { resolvers }