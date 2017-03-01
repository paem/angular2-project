import { EquilabPage } from './app.po';

describe('equilab App', function() {
  let page: EquilabPage;

  beforeEach(() => {
    page = new EquilabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
