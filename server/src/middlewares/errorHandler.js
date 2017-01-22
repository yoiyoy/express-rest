import httperrors from 'httperrors';

export default function (err, req, res, next) {
  if (!(err instanceof httperrors)) {
    err = new httperrors.InternalServerError(err.message);
  }
  res.status(err.statusCode).json({ message: err.message });
}
