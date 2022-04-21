import request from 'supertest';

import { MongoHelper } from '@/external/repositories/mongodb/helper';
import app from '@/main/config/app';

describe('Register router', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection('users');
  });

  it('Should return be able an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send();
    });

    await request(app)
      .post('/api/register')
      .send({
        name: 'Francisco Cummings',
        email: 'doom@pawev.vu',
      })
      .expect(201);
  });
});
