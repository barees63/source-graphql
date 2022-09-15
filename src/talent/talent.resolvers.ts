// noinspection UnnecessaryLocalVariableJS

import { Query, Resolver, Authorized, Ctx } from "type-graphql";
import { Talent, TalentProfile, TalentSubmission } from "./talent.schema";
import {
  getTalent,
  getTalentProfiles,
  getTalentSubmissions,
} from "../source_api";
import { Context } from "../context";

@Resolver(() => Talent)
export class TalentResolver {
  @Authorized()
  @Query(() => [Talent])
  async getTalent(@Ctx() context: Context): Promise<Talent[]> {
    try {
      let talents = await getTalent(context.token);
      let profiles = await getTalentProfiles(context.token);
      // get submissions
      const promises = [];
      for (let talent of talents) {
        promises.push(
          getTalentSubmissions(context.token, talent.ymcO_ElementID)
        );
      }
      const submissions: TalentSubmission[][] = await Promise.all(promises);

      for (let talent of talents) {
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
