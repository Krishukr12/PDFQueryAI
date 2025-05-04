class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const createError = (status: number, message = 'something went wrong') => {
  return new CustomError(status, message);
};
