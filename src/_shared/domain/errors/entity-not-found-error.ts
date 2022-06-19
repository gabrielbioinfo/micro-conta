import I18n from '../i18n/i18n';

export default class EntityNotFoundError extends Error {
  constructor(message?: string) {
    super(message || I18n.STRINGS.ERROR.ENTITY_NOT_FOUND);
    this.name = 'EntityNotFoundError';
  }
}
