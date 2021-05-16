export const signup = jest.fn().mockResolvedValue({
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
});
export const refreshCredentials = jest
  .fn()
  .mockResolvedValue({accessToken: 'access-token'});
