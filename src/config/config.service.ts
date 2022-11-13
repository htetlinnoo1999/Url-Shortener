// eslint-disable-next-line
require('dotenv').config();

export const env = (key: string, throwOnMissing = true): string => {
  const value = process.env[key];
  if (!value && throwOnMissing) {
    throw new Error(`config error - missing env.${key}`);
  }
  return value;
};
