import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { Audition } from "./audition.schema";
import {
  apiGetAuditions,
} from "../source_api";

@Resolver(() => Audition)
export class AuditionResolver {
  @Authorized()
  @Query(() => [Audition])
  async auditions(
    @Arg("jobDateId", { nullable: true })
    jobDateId: number,
    @Arg("searchString", { nullable: true })
    searchString: string,
    @Ctx() context: Context
  ): Promise<Audition[] | null> {
    try {
      const auditions = await apiGetAuditions(context.token, jobDateId, searchString);
      return auditions;
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}
