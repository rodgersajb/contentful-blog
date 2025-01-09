// import { createClient } from "contentful";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// import Image from "next/image";
// import Skeleton from "@/app/components/skeleton";

// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
// });

// // Fetch all slugs for static generation
// export async function generateStaticParams() {
//   const res = await client.getEntries({ content_type: "posts" });

//   return res.items.map((post) => ({
//     slug: post.fields.slug,
//     fallback: true,
//     revalidate: 1,
//   }));
// }

// // Dynamic route handler
// export default async function Posts({ params }) {
//  if (!params) return <Skeleton />;
//   const { slug } = await params;

//   const res = await client.getEntries({
//     content_type: "posts",
//     "fields.slug": slug,
//   });

//   const post = res.items[0];
//   console.log(post, 'POST HEY');

//   return (
//     <main>
//       <h1>{post.fields.title}</h1>
//       <Image src={`https:` + post.fields.featuredImage.fields.file.url} alt="hey" width={800} height={600} />
//       <h4>{documentToReactComponents(post.fields.post)}</h4>
     
//     </main>
//   );
// }

import { getPost } from "../../../../lib/api";

export default async function PostPage({ params }) {
  const {slug} = await params;

  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.featuredImage.url} alt={post.featuredImage.description} />
      <div>{post.body}</div>
    </article>
  );
}

export const revalidate = 60; // Revalidate this page every 60 seconds
