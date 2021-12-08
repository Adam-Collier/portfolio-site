import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const { body, method } = req;
  // collectionId and itemId are from the props
  // the rest are from our forms state
  const {
    collectionId,
    itemId,
    title,
    summary,
    description,
    link,
    section,
  } = body;

  // when we have made our changes we need to grab our updated content
  let getUpdatedContent = async () =>
    await prisma.resourceCollection.findUnique({
      where: { id: collectionId },
      include: {
        resources: {
          orderBy: [
            {
              section: 'asc',
            },
          ],
        },
      },
    });

  if (method === 'POST') {
    // here we create our new resource
    await prisma.resource.create({
      data: {
        // we need our resourceCollectionId so the resource is associated with the correct page/collection
        resourceCollectionId: collectionId,
        // the rest is the state from our inputs
        title,
        summary,
        description,
        link,
        section,
      },
    });

    let updatedJson = await getUpdatedContent();
    // send our updated content
    res.status(200).json(updatedJson);
  } else if (method === 'PUT') {
    await prisma.resource.update({
      // find the correct resource to edit
      where: {
        id: itemId,
      },
      // apply our updates from our state
      data: {
        title,
        summary,
        description,
        link,
        section,
      },
    });

    // return the updated content
    let updatedJson = await getUpdatedContent();
    res.status(200).json(updatedJson);
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
});
