const typeDefs = `#graphql
type Recipe {
    name: String!
    description:String!
    thumbsUp:Int!
    thumbsDown:Int!
}
  type Query {
    recipes: [Recipe]
    recipe(id:ID):Recipe
  }


`;

module.exports = { typeDefs }