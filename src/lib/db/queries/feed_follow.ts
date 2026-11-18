import { db } from "src/lib/db";
import { Feed, feedFollows, feeds, User, users } from "src/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function createFeedFollow(user: User, feed: Feed) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({ userId: user.id, feedId: feed.id })
    .returning();

  const [result] = await db
    .select({
      id: feedFollows.id,
      createAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result;
}

export async function deleteFeedForUser(feed: Feed, user: User) {
  await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.feedId, feed.id), eq(feedFollows.userId, user.id)),
    );
}

export async function getFeedFollowsForUser(user: User) {
  const results = await db
    .select({
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, user.id));
  return results;
}
