export type CustomError = {
  code?: number;
  message?: string;
};

export const getCustomError = (err: any): CustomError => {
  const error: CustomError = {
    message: 'An unknown error occurred',
  };

  if (err.response && err.response.data && err.response.data.error && err.response.data.message) {
    error.code = err.response.data.error;
    error.message = err.response.data.message;
  } else if (!err.response && err.message) {
    error.message = err.message;
  }

  return error;
};
