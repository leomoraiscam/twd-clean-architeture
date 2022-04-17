import request from 'supertest';

import app from '@/main/config/app';

describe('Register router', () => {
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
