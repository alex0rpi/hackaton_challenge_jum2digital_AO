const NotFoundMiddleware = (req, res) => {
  return res.status(404).json({ error: 404, message: 'Nothing found here (❁´◡`❁)' });
};

export default NotFoundMiddleware;
