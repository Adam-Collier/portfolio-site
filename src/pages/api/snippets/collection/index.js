import prisma from '../../../../lib/prisma';
import withSession from '../../../../lib/session';
import { toSlug } from '../../../../utils/to-slug';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const { body, method } = req;
  const { itemId, name, description } = body;

  let getUpdatedContent = async () =>
    await prisma.snippetCollection.findMany({
      include: {
          snippets: true
      }
    });

  if (method === 'POST') {
    await prisma.snippetCollection.create({
      data: {
        name,
        description,
      },
    });

    let updatedJson = await getUpdatedContent();
    res.status(200).json(updatedJson);
  } else if (method === 'PUT') {
    await prisma.snippetCollection.update({
      where: {
        id: Number(itemId),
      },
      data: {
        name,
        description,
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
