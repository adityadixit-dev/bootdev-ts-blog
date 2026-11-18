import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
    },
  });
  const respText = await response.text();
  const parser = new XMLParser({ processEntities: false });
  const jObj = parser.parse(respText);
  if (!jObj?.rss || !jObj.rss?.channel) {
    throw new Error("rss key not found in response");
  }
  if (
    !jObj.rss.channel?.title ||
    !jObj.rss.channel?.link ||
    !jObj.rss.channel?.description
  ) {
    throw new Error("title, link or description not found in response");
  }

  const items: RSSItem[] = [];

  if (Array.isArray(jObj.rss.channel.item)) {
    for (const i of jObj.rss.channel.item) {
      const { title, link, description, pubDate } = i;
      if (!title || !link || !description || !pubDate) {
        continue;
      }
      items.push({ title, link, description, pubDate });
    }
  }

  const rssFeed: RSSFeed = {
    channel: {
      title: jObj.rss.channel.title ?? "",
      link: jObj.rss.channel.link ?? "",
      description: jObj.rss.channel.description ?? "",
      item: items,
    },
  };

  return rssFeed;
}

/*
 *{
  '?xml': '',
  rss: {
    channel: {
      title: 'Lane&#39;s Blog',
      link: 'https://wagslane.dev/',
      description: 'Recent content on Lane&#39;s Blog',
      generator: 'Hugo -- gohugo.io',
      language: 'en-us',
      lastBuildDate: 'Sun, 08 Jan 2023 00:00:00 +0000',
      'atom:link': '',
      item: [Array]
    }
  }
}
 *
 */
