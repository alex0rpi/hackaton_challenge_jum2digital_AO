export const logout = (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.status(400).json({ error: 'User not logged in' });
  req.session.destroy((err) => {
    console.log(err);
  });
  return res.status(200).json({ message: 'user logged out, session out.' });
};
