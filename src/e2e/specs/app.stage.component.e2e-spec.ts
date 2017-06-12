describe('App sd-app-stage', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('NG2 Login Demo!');
  });

  it('should have <nav>', () => {
    expect(element(by.css('mast-head-nav')).isPresent()).toEqual(true);
  });

});
