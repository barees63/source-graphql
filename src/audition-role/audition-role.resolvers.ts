import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { AuditionRole } from "./audition-role.schema";
import {
  apiGetAuditionRoles,
} from "../source_api";

@Resolver(() => AuditionRole)
export class AuditionRoleResolver {
  @Authorized()
  @Query(() => [AuditionRole])
  async auditionRole(
    @Arg("jobDateId", { nullable: false })
    jobDateId: number,
    @Ctx() context: Context
  ): Promise<AuditionRole[] | null> {
    try {
      const auditionRoles = await apiGetAuditionRoles(context.token, jobDateId);
      return auditionRoles;
    } catch (e:any) {
      console.error(e);
      throw new Error(e.message);
    }
    return null;
  }
}
