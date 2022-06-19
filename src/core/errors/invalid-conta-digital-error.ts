import I18n from '../../_shared/domain/i18n/i18n';

export default class InvalidContaDigitalError extends Error {
  constructor(message?: string) {
    super(
      message ||
        I18n.getInstance().STRINGS.ERROR.INVALID_CONTA_DIGITAL_MISSING_AGENCY,
    );
    this.name = 'InvalidContaDigitalError';
  }
}