import { fetchFeed } from "src/rss/fetch_feed";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length > 0) {
    throw new Error("Reset Handler requires no arguements");
  }
  const rssFeed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(JSON.stringify(rssFeed));
}
