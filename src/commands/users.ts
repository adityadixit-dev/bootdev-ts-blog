import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function handlerUsers(cmdName: string, ...args: string[]) {
  if (args.length > 0) {
    throw new Error("Users Handler requires no arguements");
  }
  const users = await getUsers();
  const currentUser = readConfig().currentUserName;

  for (const user of users) {
    if (user.name === currentUser) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
}
