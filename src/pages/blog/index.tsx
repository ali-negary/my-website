// src/pages/blog.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import prisma from "@/lib/prisma";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BlogPageProps {
  posts: BlogPost[];
  pagination: PaginationInfo;
  error?: string;
}

export default function Blog({ posts, pagination, error }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Blog - Portfolio</title>
      </Head>
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>

          {/* Blog Posts */}
          <div className="grid gap-8 mb-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-semibold mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Read more →
                  </Link>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`/blog?page=${pageNum}`}
                  className={`px-4 py-2 rounded ${
                    pageNum === pagination.page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blogPost.count(),
    ]);

    return {
      props: {
        posts: posts.map((post) => ({
          ...post,
          createdAt: post.createdAt.toISOString(),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        pagination: {
          page: 1,
          limit,
          total: 0,
          totalPages: 0,
        },
        error: "Failed to load blog posts",
      },
    };
  }
};
