const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./schema.js");

mongoose
  .connect("mongodb://localhost:27017/ct_api")
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

const app = express();

app.use(
  "/graphql",
  graphqlHTTP(async (request, response, graphQLParams) => {
    return {
      schema: graphqlSchema,
      graphiql: true,
      context: {
        req: request
      }
    };
  })
);

app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));

/*
export default {
  uri: `/events`,
  graphqlSchema,
  queries: [
    {
      title: '',
      query: ``,
    }
  ]
}
*/
