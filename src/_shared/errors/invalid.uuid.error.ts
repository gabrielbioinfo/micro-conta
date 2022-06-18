import I18n from '../i18n/i18n';

export default class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || I18n.STRINGS.ERROR.INVALID_UUID);
    this.name = 'InvalidUuidError';
  }
}
