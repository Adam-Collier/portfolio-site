import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (!session)
    return res
      .status(403)
      .json({ error: 'you need to be signed in to use this route' });

  const { body, method } = req;
  const { collectionId, title, summary, description, link, section } = body;

  if (method === 'POST') {
    const response = await prisma.resource.create({
      data: {
        resourceCollectionId: collectionId,
        title,
        summary,
        description,
        link,
        section,
      },
    });
    res.status(200).json(response);
  } else if (method === 'PUT') {
    const response = await prisma.resource.update({
      where: {
        id: body.id,
      },
      data: {
        title,
        summary,
        description,
        link,
        section,
      },
    });
    res.status(200).json(response);
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
