import { EggDropPage } from './app.po';

describe('egg-drop App', () => {
  let page: EggDropPage;

  beforeEach(() => {
    page = new EggDropPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
