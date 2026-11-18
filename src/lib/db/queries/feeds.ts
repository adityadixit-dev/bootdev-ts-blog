import { eq } from "drizzle-orm";
import { db } from "src/lib/db";
import { feeds, User } from "src/lib/db/schema";

export async function createFeed(
  feedName: string,
  feedURL: string,
  currUser: User,
) {
  const [result] = await db
    .insert(feeds)
    .values({
      name: feedName,
      url: feedURL,
      userId: currUser.id,
    })
    .returning();
  return result;
}

export async function getFeeds() {
  const results = await db.select().from(feeds);
  return results;
}

export async function getFeedFromUrl(feedUrl: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, feedUrl));
  return feed;
}
