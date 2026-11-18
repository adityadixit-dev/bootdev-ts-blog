import { setUser } from "src/config";
import { getUser } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Login Handler requires One Arguement. The username");
  }
  const username = args[0];
  const user = await getUser(username);
  if (user) {
    setUser(username);
    console.log(`Username ${username} has been set`);
  } else {
    throw new Error("Unable to find user");
  }
}
