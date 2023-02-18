import { REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTION } from './cookie';

jest.mock('./util', () => ({
  isProduction: () => true,
}));

describe('Cookie', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.SERVICE_DOMAIN = 'test.com';
  });

  it('should be defined', () => {
    expect(REFRESH_TOKEN_KEY).toBeDefined();
    expect(REFRESH_TOKEN_KEY).toEqual('Refresh');

    expect(REFRESH_TOKEN_OPTION).toBeDefined();
    expect(REFRESH_TOKEN_OPTION()).toEqual({
      domain: 'test.com',
      httpOnly: true,
      secure: true,
      maxAge: 2592000000,
    });
  });
});
