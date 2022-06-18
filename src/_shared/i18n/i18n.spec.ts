import I18n from './i18n';

describe('I18n', () => {
  let i18n;

  beforeEach(() => {
    i18n = I18n.getInstance();
  });

  it('should create a new instance of I18n', () => {
    expect(I18n.getInstance() instanceof I18n).toBeTruthy();
    expect(new I18n() instanceof I18n).toBeTruthy();
  });

  it('should have STRINGS as a object with a array of strings', () => {
    expect(i18n.STRINGS).toBeDefined();
    expect(typeof Object.values(i18n.STRINGS.ERROR)[0]).toBe('string');
  });
});
