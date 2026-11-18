import { getFeeds } from "src/lib/db/queries/feeds";
import { getUserNameFromId } from "src/lib/db/queries/users";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  if (args.length > 0) {
    throw new Error("Feeds Handler requires no arguements");
  }

  const feeds = await getFeeds();
  for (const feed of feeds) {
    const username = await getUserNameFromId(feed.userId);
    console.log(`Feed Name: ${feed.name}`);
    console.log(`Feed URL: ${feed.url}`);
    console.log(`User Name: ${username}`);
  }
}
