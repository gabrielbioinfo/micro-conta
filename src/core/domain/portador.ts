import AbstractEntity from '../../_shared/domain/abstract-entity';
import UniqueEntityId from '../../_shared/domain/unique-entity-id.vo';
import I18n from '../../_shared/i18n/i18n';
import InvalidCPFError from '../errors/invalid-cpf-error';
import InvalidFullnameError from '../errors/invalid-fullname-error';
import CPF from './value-objects/cpf.vo';

export default class Portador extends AbstractEntity {
  constructor(
    public readonly cpf: CPF | Readonly<CPF>,
    public readonly fullName: string,
    id?: UniqueEntityId | string,
  ) {
    super(id);
    this.cpf = cpf;
    this.fullName = fullName;
    this.isValid();
  }

  isValid() {
    if (!this.cpf) {
      throw new InvalidCPFError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY,
      );
    }

    if (!this.fullName) {
      throw new InvalidFullnameError(
        I18n.getInstance().STRINGS.ERROR.INVALID_FULLNAME_EMPTY,
      );
    }
  }

  toJSON() {
    return {
      id: this.id.toString(),
      cpf: this.cpf.toString(),
      fullName: this.fullName,
    };
  }
}
