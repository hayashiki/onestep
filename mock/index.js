const { ApolloServer, gql } = require('apollo-server');
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
var path = require('path');

// const typeDefs = importSchema('../../schema.graphql')

// https://github.com/usermatic/usermatic-client/blob/08871e2f54a444407702d9797736c6ac65d2fa67/test/test.tsx
// https://github.com/yashgandhi303/docker-node-cli-email-composer/blob/d4fdbd2f5a881b67014d159b60e0bff1a4b6ec0d/server/graphql/index.js
const schema = loadSchemaSync(path.join(__dirname, "../schema/**/*.graphql"), {
    loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
    schema,
    mocks: true,
});


//
// // The GraphQL schema
// const typeDefs = gql`
//     type Query {
//         "A simple type for getting started!"
//         hello: String
//     }
// `;
//
// // A map of functions which return data for the schema.
// const resolvers = {
//     Query: {
//         hello: () => 'world',
//     },
// };
//
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });

/* もしくはコッチ
const server = new ApolloServer({
    schema: ...
});
*/

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
