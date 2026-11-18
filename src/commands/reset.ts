import { resetUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length > 0) {
    throw new Error("Reset Handler requires no arguements");
  }
  await resetUsers();
}
