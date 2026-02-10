export const SERVER_ERROR_CODES: Record<string, string> = {
  VALIDATION_ERROR: 'Form Fields are not valid',
  USER_ALREADY_EXISTS: 'Email or Username already exist',
  AUTH_INVALID_CREDENTIALS: 'Invalid Username or Password',
  ARTICLE_NOT_FOUND: 'Artcile not found',
  UNAUTHORIZED_ACCESS: "You don't have enough permission",
  AUTH_TOKEN_MISSING: 'Please login again !',
  AUTH_TOKEN_INVALID: 'Please login again !',
  SERVER_ERROR: 'Unexpected server error !',
};

export const ERROR_MESSAGES = {
  GENERIC_ERROR: 'Something went wrong',
};
