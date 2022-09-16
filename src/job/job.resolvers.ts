import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { AvailabilityRequest, InformationRequest, Job } from "./job.schema";
import {
  apiGetAvailabilityRequests,
  apiGetBookingRequests,
  apiGetCallTimeItems,
  apiGetCallTimes,
  apiGetGeneralNotices,
  apiGetInformationRequests,
  apiGetJob,
} from "../source_api";

@Resolver(() => Job)
export class JobResolver {
  @Authorized()
  @Query(() => Job)
  async getJob(
    @Arg("talentId") talentId: number,
    @Arg("jobId") jobId: number,
    @Arg("folderElementInstanceId", { nullable: true })
    folderElementInstanceId: number,
    @Ctx() context: Context
  ): Promise<Job | null> {
    try {
      const job = await apiGetJob(context.token, talentId, jobId);
      if (job) {
        if (folderElementInstanceId) {
          const data = await Promise.all([
            apiGetInformationRequests(context.token, folderElementInstanceId),
            apiGetAvailabilityRequests(context.token, folderElementInstanceId),
            apiGetBookingRequests(context.token, folderElementInstanceId),
            apiGetGeneralNotices(context.token, folderElementInstanceId),
            apiGetCallTimes(context.token, folderElementInstanceId),
            apiGetCallTimeItems(context.token, folderElementInstanceId),
          ]);
          job.informationRequests = data[0] ?? [];
          job.availabilityRequests = data[1] ?? [];
          job.bookingRequests = data[2] ?? [];
          job.generalNotices = data[3] ?? [];

          const calltimes = data[4] ?? [];
          const calltimeItems = data[5] ?? [];
          job.callTimes = calltimes.map((c) => {
            c.items = calltimeItems.filter((i) => {
              return i.extrasWorksheetElementId === c.extrasWorksheetElementId;
            });
            return c;
          });
        }
      }
      return job;
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}
