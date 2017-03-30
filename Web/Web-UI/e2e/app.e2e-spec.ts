import { WebUIPage } from './app.po';

describe('web-ui App', () => {
  let page: WebUIPage;

  beforeEach(() => {
    page = new WebUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
