import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const resourceId = req.query.id;

  if (req.method === 'DELETE') {
    let deletedResponse = await prisma.resource.delete({
      where: { id: Number(resourceId) },
    });

    // from the prisma response we can grab the collectionId
    let { resourceCollectionId } = deletedResponse;

    // we can then return the updated resourceCollection in the response
    let response = await prisma.resourceCollection.findUnique({
      where: { id: resourceCollectionId },
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
