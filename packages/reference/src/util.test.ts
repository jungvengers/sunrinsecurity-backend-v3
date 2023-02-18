import { isDevelopment, isNumeric, isProduction } from './util';

describe('Util', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(isProduction).toBeDefined();
    expect(isDevelopment).toBeDefined();
    expect(isNumeric).toBeDefined();
  });

  it('production environment', () => {
    process.env.NODE_ENV = 'production';
    expect(isProduction()).toBeTruthy();
    expect(isDevelopment()).toBeFalsy();
  });

  it('development environment', () => {
    process.env.NODE_ENV = 'development';
    expect(isProduction()).toBeFalsy();
    expect(isDevelopment()).toBeTruthy();
  });

  it('should be truthy', () => {
    expect(isNumeric(1)).toBeTruthy();
    expect(isNumeric('1')).toBeTruthy();
  });

  it('should be falsy', () => {
    expect(isNumeric('a')).toBeFalsy();
    expect(isNumeric('1a')).toBeFalsy();
  });
});
