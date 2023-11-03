// Ensures the entered data is in json format and lets the user know if it is not.
export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    console.error(err);
    return res.status(400).json({ status: false, error: 'Enter valid json body' });
  }

  return res.status(500).json({ status: false, error: 'Internal server error' });
};
