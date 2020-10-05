const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const { graphqlSchema } = require("./schema.js");
require("dotenv").config();

mongoose
  .connect(`mongodb://${process.env.MONGODB_CREDS}@cluster0-shard-00-00.cd44g.mongodb.net:27017,cluster0-shard-00-01.cd44g.mongodb.net:27017,cluster0-shard-00-02.cd44g.mongodb.net:27017/osdc?ssl=true&replicaSet=atlas-t685j1-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
  })
);

app.listen(process.env.PORT, () => console.log(`Now browse to localhost:${process.env.PORT}/graphql`));

//A sample mutation:

// mutation {
//   eventCreateOne( record : {
//   	name: "Open Source for cats",
//     description: "Open source workshops for felines among us.",
//     dateCreated: "2020-03-27",
//     dateUpdated: "2020-03-27",
//     location: "Behind OAT"
//   	}
//   ) {
//     recordId
//     record {
//       name
//       description
//       dateCreated
//       dateUpdated
//       location
//     }
//   }
// }
