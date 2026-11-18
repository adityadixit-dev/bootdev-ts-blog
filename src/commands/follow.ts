import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { getFeedFromUrl } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schema";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error("Follow Handler requires ONE arguement");
  }
  const feedUrl = args[0];

  const feed = await getFeedFromUrl(feedUrl);
  const result = await createFeedFollow(user, feed);

  console.log(`Feed Name: ${feed.name}. Current User: ${user.name}`);
}
