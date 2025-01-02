// src/pages/api/blog.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get blog posts with pagination
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blogPost.count(),
    ]);

    return res.status(200).json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
}

// Create new blog post
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
      },
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Error creating post' });
  }
}

// Update blog post
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ message: 'ID, title, and content are required' });
  }

  try {
    const post = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Error updating post' });
  }
}

// Delete blog post
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    await prisma.blogPost.delete({
      where: { id: parseInt(id as string) },
    });

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Error deleting post' });
  }
}