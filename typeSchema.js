const typeDefs = `#graphql
type Recipe {
     id :ID!
    name: String!
    description:String!
    date:String
    url:String
    clicks:Int
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
    visitUrlRecipe(id:ID!):Recipe
  }

  input AddRecipe{
    name: String!
    description:String!
    thumbsUp:Int!
    thumbsDown:Int!
    url:String!
  }

  input UpdateRecipe{
    name: String!
    description:String!
    url:String!
    thumbsUp:Int!
    thumbsDown:Int!
  }


`;

module.exports = { typeDefs }