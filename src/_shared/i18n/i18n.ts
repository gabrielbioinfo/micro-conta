import ERROR from './strings/error';

class I18n {
  static STRINGS = { ERROR };

  constructor(public readonly STRINGS?) {
    if (!STRINGS) this.STRINGS = { ERROR };
  }

  // eslint-disable-next-line no-use-before-define
  private static Instance: I18n;

  static getInstance(): I18n {
    if (!I18n.Instance) I18n.Instance = new I18n();
    return I18n.Instance;
  }
}
export default I18n;
