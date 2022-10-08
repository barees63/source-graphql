// noinspection UnnecessaryLocalVariableJS

import { Query, Resolver, Authorized, Ctx, Arg } from "type-graphql";
import { Talent, TalentSubmission } from "./talent.schema";
import {
  apiGetCallTimes,
  apiGetTalent,
  apiGetTalentProfiles,
  apiGetTalentSubmissions,
} from "../source_api";
import { Context } from "../context";

@Resolver(() => Talent)
export class TalentResolver {
  @Authorized()
  @Query(() => [Talent])
  async getTalents(
    @Arg("includeSubmissions", { defaultValue: true })
    includeSubmissions: boolean,
    @Ctx() context: Context
  ): Promise<Talent[]> {
    try {
      const talents = await apiGetTalent(context.token);
      const profiles = await apiGetTalentProfiles(context.token);
      let submissions: TalentSubmission[][] = [];
      // get submissions
      if (includeSubmissions) {
        const promises = [];
        for (const talent of talents) {
          promises.push(
            apiGetTalentSubmissions(context.token, talent.ymcO_ElementID)
          );
        }
        submissions = await Promise.all(promises);
      }

      for (const talent of talents) {
        talent.profile = profiles?.find(
          (p) => p.elementId == talent.ymcO_ElementID
        );
        talent.submissions = submissions.find(
          (s) => s.length > 0 && s[0].elementId == talent.ymcO_ElementID
        );
      }
      return talents;
    } catch (e) {
      console.error(e);
    }
    return [];
  }
}

@Resolver(() => TalentSubmission)
export class TalentSubmissionResolver {
  @Authorized()
  @Query(() => [TalentSubmission])
  async getTalentSubmissions(
    @Arg("talentId") talentId: number,
    @Arg("includeCalltimes", { defaultValue: false }) includeCalltimes: boolean,
    @Ctx() context: Context
  ): Promise<TalentSubmission[]> {
    try {
      const submissions = await apiGetTalentSubmissions(context.token, talentId);
      if (includeCalltimes) {
        const promises = [];
        for (const s of submissions) {
          if (s.folderElementInstanceId) {
            promises.push(
              apiGetCallTimes(context.token, s.folderElementInstanceId)
            );
          }
        }
        const calltimes = await Promise.all(promises);
        for (let i = 0; i < submissions.length; i++) {
          submissions[i].callTimes = calltimes[i];
        }
      }
      return submissions;
    } catch (e) {
      console.error(e);
    }
    return [];
  }
}
