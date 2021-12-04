import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const { body, method } = req;
  const { itemId, name, description, excerpt } = body;

  let getUpdatedContent = async () =>
    await prisma.resourceCollection.findMany({
      select: { id: true, name: true, excerpt: true, description: true },
    });

  if (method === 'POST') {
    await prisma.resourceCollection.create({
      data: {
        name,
        description,
        excerpt,
      },
    });

    let updatedJson = await getUpdatedContent();
    res.status(200).json(updatedJson);
  } else if (method === 'PUT') {
    await prisma.resourceCollection.update({
      where: {
        id: Number(itemId),
      },
      data: {
        name,
        description,
        excerpt,
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
