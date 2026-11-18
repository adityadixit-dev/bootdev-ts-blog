import { setUser } from "src/config";
import { createUser } from "src/lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Register Handler requires One Arguement. The username");
  }
  const username = args[0];
  const user = await createUser(username);
  console.log(`User ${username} created...`);
  setUser(username);
}
