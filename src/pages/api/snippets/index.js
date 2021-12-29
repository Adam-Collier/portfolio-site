import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const { body, method } = req;
  const { itemId, title, content, collectionId } = body;

  // when we have made our changes we need to grab our updated content
  let getUpdatedContent = async (req) => {
    //   if the request comes from the main page we return the 5 latest added
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

      return response;
    } else {
        const response = await prisma.snippetCollection.findUnique({
          where: { id: collectionId },
          include: {
            snippets: true
          },
        });

        return response;
    }
  };

  if (method === 'POST') {
    // here we create our new resource
    await prisma.snippet.create({
      data: {
        title,
        content,
        collectionId
      },
    });

    let updatedJson = await getUpdatedContent(req);
    // send our updated content
    res.status(200).json(updatedJson);
  } else if (method === 'PUT') {
    await prisma.snippet.update({
      // find the correct resource to edit
      where: {
        id: itemId,
      },
      // apply our updates from our state
      data: {
        title,
        content,
        collectionId,
      },
    });

    // return the updated content
    let updatedJson = await getUpdatedContent(req);
    res.status(200).json(updatedJson);
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
});
