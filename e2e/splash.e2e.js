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

  it('shows the sign up screen when the sign up button is clicked', async () => {
    await element(by.text('SIGN UP')).tap();
    await expect(element(by.id('sign-up-screen'))).toBeVisible();
  });

  it('shows the sign in screen when the Sign in button is pressed', async () => {
    await element(by.id('sign-in-button')).tap();
    await expect(element(by.id('sign-in-screen'))).toBeVisible();
  });
});
