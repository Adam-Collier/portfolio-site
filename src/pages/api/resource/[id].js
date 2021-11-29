import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;
  const { collectionId } = req.body;

  if (req.method === 'DELETE') {
    await prisma.resource.delete({
      where: { id: Number(postId) },
    });

    let response = await prisma.resourceCollection.findUnique({
      where: { id: collectionId },
      include: {
        resources: true,
      },
    });

    res.status(200).json(response);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
