import prisma from '../../../../lib/prisma';
import withSession from '../../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const resourceCollectionId = req.query.id;

  if (req.method === 'DELETE') {
    await prisma.resourceCollection.delete({
      where: { id: Number(resourceCollectionId) },
    });

    // we can then return the updated resourceCollection in the response
    let response = await prisma.resourceCollection.findMany({
      select: { id: true, name: true, excerpt: true, description: true },
    });

    res.status(200).json(response);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
});
