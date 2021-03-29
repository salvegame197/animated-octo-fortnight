// eslint-disable-next-line semi

import app from './app';

const port = process.env.API_PORT;
app.listen(port, () => {
  console.info(`listen on port ${port}`);
});
