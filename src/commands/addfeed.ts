import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { createFeed } from "src/lib/db/queries/feeds";
import { Feed, User } from "src/lib/db/schema";

export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2) {
    throw new Error("Add Feed handler requires TWO arguements. Name and URL");
  }
  const feedName = args[0];
  const feedUrl = args[1];
  // const currentUserName = readConfig().currentUserName;
  // const currUser = await getUser(currentUserName);

  const feed = await createFeed(feedName, feedUrl, user);
  const feedFollow = await createFeedFollow(user, feed);

  printFeed(feed, user);
}

export function printFeed(feed: Feed, user: User) {
  console.log(`Feed Name: ${feed.name}`);
  console.log(`Feed URL: ${feed.url}`);
  console.log(`User Name: ${user.name}`);
}
