describe('Splash Screen', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shows the splash screen upon first load', async () => {
    await expect(element(by.id('splash-screen'))).toBeVisible();
  });
});
