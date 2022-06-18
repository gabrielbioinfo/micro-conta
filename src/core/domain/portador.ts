import AbstractEntity from '../../_shared/domain/abstract-entity';
import UniqueEntityId from '../../_shared/domain/unique-entity-id.vo';
import InvalidOperationError from '../../_shared/errors/invalid-operation-error';
import I18n from '../../_shared/i18n/i18n';
import InvalidCPFError from '../errors/invalid-cpf-error';
import InvalidFullnameError from '../errors/invalid-fullname-error';
import CPF from './value-objects/cpf.vo';

export interface PortadorProps {
  cpf: string;
  fullName: string;
  id?: UniqueEntityId | string;
}

export default class Portador extends AbstractEntity {
  private _cpf: Readonly<CPF>;
  private _fullName: string;

  constructor({ cpf = '', fullName, id }: PortadorProps) {
    super(id);
    this._cpf = CPF.create(cpf);
    this._fullName = fullName;
    this.isValid();
  }

  get cpf(): Readonly<CPF> {
    return this._cpf;
  }

  set cpf(newValue: Readonly<CPF>) {
    throw new InvalidOperationError(
      I18n.getInstance().STRINGS.ERROR.INVALID_FIELD_CHANGE,
    );
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(newValue: string) {
    this._fullName = newValue;
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
