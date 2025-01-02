import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import prisma from "@/lib/prisma";

interface BlogPost {
  title: string;
  content: string;
  createdAt: string;
}

interface BlogPostPageProps {
  post?: BlogPost;
  error?: string;
}

export default function BlogPost({ post, error }: BlogPostPageProps) {
  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-red-600">
            {error || "Blog post not found"}
          </h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
          >
            ← Back to blog
          </Link>
          <article className="prose lg:prose-xl max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-500 mb-8">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="whitespace-pre-wrap">{post.content}</div>
          </article>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!post) {
      return {
        props: {
          error: "Blog post not found",
        },
      };
    }

    return {
      props: {
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      props: {
        error: "Failed to load blog post",
      },
    };
  }
};
