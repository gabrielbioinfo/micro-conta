import I18n from '../i18n/i18n';

export default class MissingImplementationError extends Error {
  constructor(message?: string) {
    super(message || I18n.STRINGS.ERROR.MISSING_IMPLEMENTATION);
    this.name = 'MissingImplementationError';
  }
}
