import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { TalentResolver } from "./talent/talent.resolvers";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./auth";

async function main() {
  const schema = await buildSchema({
    resolvers: [TalentResolver],
    emitSchemaFile: true,
    authChecker: customAuthChecker,
  });

  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP((req) => {
      return {
        schema,
        // other options
        context: {
          req: req,
        },
      };
    })
  );

  dotenv.config();
  const port = process.env.PORT ?? 8080;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

main();
