import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const authenticated = req.session.get('isAuthenticated');
  
  if (authenticated) {
    res.json({
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
