import express from "express";
import cors from "cors";
const corsOptions = {
  origin(origin: any, callback: any) {
      callback(null, true);
  },
  credentials: true
};
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
import { StudioSettingsResolver, StudioSettingsUpsertResolver } from "./studio-settings/studio-settings.resolvers";
import { AuditionResolver } from "./audition/audition.resolvers";
import { AuditionRoleResolver } from "./audition-role/audition-role.resolvers";
import { 
  AuditionTalentImageArchiveResolver, 
  AuditionTalentVideoArchiveResolver, 
  AuditionTalentMediaResolver, 
  AuditionTalentReadyResolver, 
  AuditionTalentResolver, 
  AuditionTalentSeenResolver,
  AuditionTalentMediaRanksResolver,
  AuditionTalentVideoStitchPendingResolver,
  AuditionTalentVideoTrimPendingResolver
} from "./audition-talent/audition-talent.resolvers";
import { SourceUserResolver } from "./source-user/source-user.resolvers";
import {YouMeCoNotificationResolver, YouMeCoTalentResolver} from "./youmeco/youmeco_talent.resolvers";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { error } from "console";

Sentry.init({
  dsn: "https://d88c69c4cb004f6bb13a1dd42c21cdc2@o194157.ingest.sentry.io/4504006707707905",
  integrations: [
    new RewriteFrames({
      root:global.__dirname,
    }),
  ],
});

async function main() {
  const schema = await buildSchema({
    resolvers: [
      TalentResolver,
      TalentSubmissionResolver,
      JobResolver,
      YouMeCoNotificationResolver,
      YouMeCoTalentResolver,
      StudioSettingsResolver,
      StudioSettingsUpsertResolver,
      AuditionResolver,
      AuditionRoleResolver,
      AuditionTalentResolver,
      SourceUserResolver,
      AuditionTalentSeenResolver,
      AuditionTalentReadyResolver,
      AuditionTalentMediaResolver,
      AuditionTalentImageArchiveResolver,
      AuditionTalentVideoArchiveResolver,
      AuditionTalentVideoStitchPendingResolver,
      AuditionTalentVideoTrimPendingResolver,
      AuditionTalentMediaRanksResolver
    ],
    emitSchemaFile: true,
    authChecker: customAuthChecker,
  });

  const app = express();

  app.use(cors(corsOptions));

  app.use(
    "/graphql",
    graphqlHTTP((req) => {
      return {
        schema,
        graphiql: process.env.NODE_ENV === "development",
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
    Sentry.captureMessage(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();
