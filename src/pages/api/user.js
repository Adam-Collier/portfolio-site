import withSession from '../../lib/session';

export default withSession(async (req, res) => {  
  if (req.session.isAuthenticated) {
    res.json({
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
