import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { username, password } = req.query;

  try {
    if (
      username === process.env.IRON_SESSION_USERNAME &&
      password === process.env.IRON_SESSION_PASSWORD
    ) {
      req.session.set('isAuthenticated', true);
      await req.session.save();
      res.redirect(307, '/');
    } else {
      res.status(405).end(`username and password are incorrect`);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
