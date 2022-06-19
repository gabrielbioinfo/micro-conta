import I18n from '../../_shared/domain/i18n/i18n';

export default class InvalidAmountError extends Error {
  constructor(message?: string) {
    super(message || I18n.getInstance().STRINGS.ERROR.INVALID_AMOUNT);
    this.name = 'InvalidAmountError';
  }
}
