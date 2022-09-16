import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { Job } from "./job.schema";
import { apiGetJob } from "../source_api";

@Resolver(() => Job)
export class JobResolver {
  @Authorized()
  @Query(() => Job)
  async getJob(
    @Arg("talentId") talentId: number,
    @Arg("jobId") jobId: number,
    @Ctx() context: Context
  ): Promise<Job | null> {
    try {
      return await apiGetJob(context.token, talentId, jobId);
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}
