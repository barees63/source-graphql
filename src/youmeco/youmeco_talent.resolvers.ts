// noinspection UnnecessaryLocalVariableJS

import "reflect-metadata";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import {
  apiGetYouMeCoNotifications,
  apiGetYouMeCoTalentOverview,
  apiGetYouMeCoTalents,
} from "../source_api";
import { YouMeCoNotification, YouMeCoTalent } from "./youmeco_talent.schema";

interface YouMeCoElement {
  elementId: number;
  supplierId: number;
}


@Resolver(() => YouMeCoNotification)
export class YouMeCoNotificationResolver {

  @Authorized()
  @Query(() => [YouMeCoNotification])
  async getYouMeCoNotificationsEx(
    @Arg("elements", () => String)
    elements: string,
    @Ctx() context: Context
  ): Promise<YouMeCoNotification[]> {
    try {
      const e = JSON.parse(elements) as YouMeCoElement[]
      const promises = e.map((element) => apiGetYouMeCoNotifications(
        context.token,
        element.elementId,
        element.supplierId,
      ));
      const notifications = await Promise.all(promises);
      return notifications.flat();
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  @Authorized()
  @Query(() => [YouMeCoNotification])
  async getYouMeCoNotifications(
    @Arg("elementIds", () => [Number])
    elementIds: number[],
    @Arg("supplierIds", () => [Number])
    supplierIds: number[],
    @Ctx() context: Context
  ): Promise<YouMeCoNotification[]> {
    // try {
    //   //console.log(`elementIds: ${JSON.stringify(elementIds)} supplierIds: ${JSON.stringify(supplierIds)}`);
    //   const promises = [];
    //   for (const [i, elementId] of elementIds.entries()) {
    //     promises.push(
    //       apiGetYouMeCoNotifications(context.token, elementId, supplierIds[i])
    //     );
    //   }
    //   const notifications = await Promise.all(promises);
    //   return notifications.flat();
    // } catch (e) {
    //   console.error(e);
    // }
    return [];
  }
}

@Resolver(() => YouMeCoTalent)
export class YouMeCoTalentResolver {
  @Authorized()
  @Query(() => [YouMeCoTalent])
  async getYouMeCoTalent(@Ctx() context: Context): Promise<YouMeCoTalent[]> {
    try {
      const talents = (await apiGetYouMeCoTalents(context.token)) ?? [];
      const promises = [];
      for (const talent of talents) {
        promises.push(
          apiGetYouMeCoTalentOverview(context.token, talent.ymcO_ElementID)
        );
      }
      const overviews = await Promise.all(promises);
      for (const [i, talent] of talents.entries()) {
        const overview = overviews[i];
        if (overview) {
          talent.overview = overview;
        }
      }
      return talents ?? [];
    } catch (e) {
      console.error(e);
    }
    return [];
  }
}
