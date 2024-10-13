import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/pokemons';

describe('/api/pokemons', () => {
  it('returns a list of pokemons', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(Array.isArray(JSON.parse(res._getData()))).toBeTruthy();
    expect(JSON.parse(res._getData()).length).toBeGreaterThan(0);
  });
});