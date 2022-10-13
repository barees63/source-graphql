import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import {
  TalentResolver,
  TalentSubmissionResolver,
} from "./talent/talent.resolvers";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./auth";
import { JobResolver } from "./job/job.resolvers";
import {YouMeCoNotificationResolver, YouMeCoTalentResolver} from "./youmeco/youmeco_talent.resolvers";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      TalentResolver,
      TalentSubmissionResolver,
      JobResolver,
      YouMeCoNotificationResolver,
      YouMeCoTalentResolver,
    ],
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

  app.get('/',(req,res) => {
    res.send('got get');
  });

  dotenv.config();
  const port = process.env.PORT ?? 8080;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();
