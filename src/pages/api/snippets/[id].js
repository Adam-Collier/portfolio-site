import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    let deletedResponse = await prisma.snippet.delete({
      where: { id: Number(id) },
    });

    // from the prisma response we can grab the collectionId
    let { collectionId } = deletedResponse;

    if (req.headers.referer.endsWith('/snippets')) {
      const response = await prisma.snippet.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          collection: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.json(response);
    } else {
      // we can then grab the updated snippet list for that page
      const response = await prisma.snippetCollection.findUnique({
        where: { id: collectionId },
        include: {
          snippets: true,
        },
      });

      return res.json(response);
    }

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
