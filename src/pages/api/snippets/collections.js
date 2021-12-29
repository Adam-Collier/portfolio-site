import prisma from '../../../lib/prisma';
import withSession from '../../../lib/session';

export default withSession(async (req, res) => {
  if (!req.session.isAuthenticated)
    return res
      .status(403)
      .json({ error: 'You need to be signed in to use this route' });

  const response = await prisma.snippetCollection.findMany({});

  res.status(200).json(response);
});
