import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  };
};
