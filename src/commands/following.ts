import { getFeedFollowsForUser } from "src/lib/db/queries/feed_follow";
import { User } from "src/lib/db/schema";

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length > 0) {
    throw new Error("following Handler requires NO arguements");
  }

  // const user = await getUser(readConfig().currentUserName);
  const userFeedFollows = await getFeedFollowsForUser(user);

  for (const uff of userFeedFollows) {
    console.log(uff.feedName);
  }
}
