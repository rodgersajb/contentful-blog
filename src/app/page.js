import { createClient } from "contentful";
import BlogCard from "./components/blogCard";

export async function getBlog() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "posts" });

  return res.items;
}

export default async function Home() {
  const posts = await getBlog();

  return (
    <main>
      <h1>Blog Posts</h1>
      <div className="grid grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.sys.id} post={post} />
        ))}
      </div>
    </main>
  );
}
