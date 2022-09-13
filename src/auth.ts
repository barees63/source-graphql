import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  const token = context.req.headers["authorization"]?.replace("Bearer ", "");
  if (token) {
    context.token = token;
    return true;
  }
  return false;
};
