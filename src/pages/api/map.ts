import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const markers = await prisma.mapMarker.findMany();
    return res.status(200).json(markers);
  }

  if (req.method === 'POST') {
    const { latitude, longitude, title, description } = req.body;
    const newMarker = await prisma.mapMarker.create({
      data: { latitude, longitude, title, description },
    });
    return res.status(201).json(newMarker);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
