import { CommandHandler } from "src/commands";
import { readConfig } from "src/config";
import { getUser } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schema";

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

type MiddlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn: MiddlewareLoggedIn = (
  handler: UserCommandHandler,
): CommandHandler => {
  const returnFn: CommandHandler = async (
    cmdName: string,
    ...args: string[]
  ) => {
    const user = await getUser(readConfig().currentUserName);
    await handler(cmdName, user, ...args);
  };

  return returnFn;
};
