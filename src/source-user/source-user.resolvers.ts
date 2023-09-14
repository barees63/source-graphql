import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { SourceUser, SourceUserAuth } from "./source-user.schema";
import {
  loginSourceUser,
} from "../source_api";

@Resolver(() => SourceUserAuth)
export class SourceUserResolver {
  @Mutation(() => SourceUserAuth)
  async sourceUserAuth(
    @Arg("email", { nullable: false })
    email: string,
    @Arg("password", { nullable: false })
    password: string
  ): Promise<SourceUserAuth | null> {
    try {
      console.log('resolver email', email, 'password', password);
      const user = await loginSourceUser(email, password);
      return user;
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}
