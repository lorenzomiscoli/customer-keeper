export var getHttpErrorMsg = (err: any) => {
  if (err && err.error && err.error.message) {
    return err.error.message;
  }
  return 'There was an error';
};
