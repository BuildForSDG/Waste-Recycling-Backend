/* eslint-disable import/prefer-default-export */

export const isLoggedIn = (req) => {
  if (!req.headers.authorization) {
    return false;
  }
  return true;
};
