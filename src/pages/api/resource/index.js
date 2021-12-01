import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const { body, method } = req;
  const { collectionId, title, summary, description, link, section } = body;

  let getUpdatedContent = async () =>
    await prisma.resourceCollection.findUnique({
      where: { id: collectionId },
      include: {
        resources: true,
      },
    });

  if (method === 'POST') {
    await prisma.resource.create({
      data: {
        resourceCollectionId: collectionId,
        title,
        summary,
        description,
        link,
        section,
      },
    });

    let updatedJson = await getUpdatedContent();
    res.status(200).json(updatedJson);
  } else if (method === 'PUT') {
    await prisma.resource.update({
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

    // return the updated
    let updatedJson = await getUpdatedContent();
    res.status(200).json(updatedJson);
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
});
