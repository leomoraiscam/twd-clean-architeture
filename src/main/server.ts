/* eslint-disable no-console */
import 'module-alias/register';
import { MongoHelper } from '@/external/repositories/mongodb/helper/index';

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(5000, () => {
      console.log('Server running at http://localhost:5000');
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
