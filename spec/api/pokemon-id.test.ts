import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/pokemon/[id]';

describe('/api/pokemon/[id]', () => {
  it('returns a specific pokemon when given a valid id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).id).toBe(1);
  });

  it('returns 404 when given an invalid id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '9999' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData()).message).toBe('Pokemon not found');
  });
});