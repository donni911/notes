export const handleError = (res, err,code=500) => {
  res.status(code).json(err);
};
