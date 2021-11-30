import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.json({ isAuthenticated: false });
});
