import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";
import { StudioSettings } from "./studio-settings.schema";
import {
  apiGetStudioSettings,
  apiUpdateStudioSettings
} from "../source_api";



@Resolver(() => StudioSettings)
export class StudioSettingsResolver {
  @Authorized()
  @Query(() => StudioSettings || null)
  async studioSettings(
    @Ctx() context: Context
  ): Promise<StudioSettings | null> {
    try {
      const studioSettings = await apiGetStudioSettings(context.token);
      return studioSettings;
    } catch (e:any) {
      console.error('error!', e.message);
      throw new Error(e.message);
    }
    return null;
  }
}

@Resolver(() => StudioSettings)
export class StudioSettingsUpsertResolver {
  @Authorized()
  @Mutation(() => StudioSettings)
  async studioSettingsUpsert(
    @Arg("cropPhotoToPortrait", { nullable: false })
    cropPhotoToPortrait: boolean,
    @Ctx() context: Context
  ): Promise<StudioSettings | null> {
    try {
      const result = await apiUpdateStudioSettings(context.token, cropPhotoToPortrait);
      console.log(result)
      return result;
    } catch (e:any) {
      console.error(e);
      throw new Error(e.message);
    }
    return null;
  }
}