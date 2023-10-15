const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer}  = require('@apollo/server/standalone')
const {typeDefs} = require('./typeSchema')
const {resolvers} = require('./resolver.js')
// const connectDB = require('./app/Database/db.js')
// connectDB.connectMongoose();
const {connectMongoose} = require('./app/Database/db')

async function startServer() {
connectMongoose();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const PORT = process.env.PORT || 5000;

// const {url} = await startStandaloneServer(server,{listen:{port:5000}});
// console.log(`🚀  Server ready at: ${url}`);
// }

const {url} = await startStandaloneServer(server,{listen:{port:PORT}});
console.log(`🚀  Server ready at: ${url}`);
}

// Call the async function to start the server
startServer();