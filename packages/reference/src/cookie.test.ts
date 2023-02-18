import { REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTION } from './cookie';
import { isProduction } from './util';

jest.mock('./util');

describe('Cookie', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.SERVICE_DOMAIN = 'test.com';
  });

  it('should be defined', () => {
    expect(REFRESH_TOKEN_KEY).toBeDefined();
    expect(REFRESH_TOKEN_OPTION).toBeDefined();
  });

  it('should be truthy', () => {
    (isProduction as jest.Mock).mockReturnValue(true);
    expect(REFRESH_TOKEN_OPTION()).toEqual({
      domain: 'test.com',
      httpOnly: true,
      secure: true,
      maxAge: 2592000000,
    });
  });

  it('should be falsy', () => {
    (isProduction as jest.Mock).mockReturnValue(false);
    expect(REFRESH_TOKEN_OPTION()).toEqual({
      httpOnly: false,
      secure: false,
      maxAge: 2592000000,
    });
  });
});
