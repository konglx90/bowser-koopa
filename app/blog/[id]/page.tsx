import { getPostData, getSortedPostsData } from '@/lib/posts';
import Head from 'next/head';
import Date from '@/components/date';

interface Post {
  id: string | number
  title: string
  contentHtml: string
  author: string
  date: string
  category: string
}

const posts = (getSortedPostsData() as unknown as Post[]);

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  return posts.map((post) => ({
    id: String(post.id),
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const post = (await getPostData(id) as Post);

  if (!post) {
    return <h1>Post not found</h1>
  }

  return (
    <main className="w-1/2 mx-auto">
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="font-extrabold leading-tight my-4 text-2xl leading-5">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        <Date dateString={post.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  )
}
