import { deleteFeedForUser } from "src/lib/db/queries/feed_follow";
import { getFeedFromUrl } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schema";

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error("Unfollow handler requires ONE arguements.The URL");
  }

  const feedUrl = args[0];
  const feed = await getFeedFromUrl(feedUrl);

  await deleteFeedForUser(feed, user);
}
