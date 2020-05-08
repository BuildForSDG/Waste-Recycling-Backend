export const catchAsync = (handler) => (...args) => handler(...args).catch(args[2]);

export const notFound = (req, res) => res.status(404).json({ status: 'error', message: 'Not Found' });

export const serverError = (err, req, res) => {
  if (!err.status) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  res
    .status(err.status || 500)
    .json({ status: 'error', message: err.message || 'Internal Server Error' });
};
