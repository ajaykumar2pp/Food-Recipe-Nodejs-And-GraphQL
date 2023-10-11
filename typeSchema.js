const typeDefs = `#graphql
type Recipe {
    name: String!
    description:String!
    thumbsUp:Int!
    thumbsDown:Int!
}
  type Query {
    recipes: [Recipe]
    recipe(id:ID!):Recipe
  }

  type Mutation{
    addRecipe(product:AddRecipe):Recipe
    updateRecipe(id:ID!,edits:UpdateRecipe):Recipe
    deleteRecipe(id:ID!):[Recipe]
  }

  input AddRecipe{
    name: String!
    description:String!
    thumbsUp:Int!
    thumbsDown:Int!
  }

  input UpdateRecipe{
    name: String!
    description:String!
    thumbsUp:Int!
    thumbsDown:Int!
  }


`;

module.exports = { typeDefs }