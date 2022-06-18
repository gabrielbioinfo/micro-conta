import AbstractEntity from '../../_shared/domain/abstract-entity';
import UniqueEntityId from '../../_shared/domain/unique-entity-id.vo';
import I18n from '../../_shared/i18n/i18n';
import InvalidCPFError from '../errors/invalid-cpf-error';
import CPF from './value-objects/cpf.vo';

export interface ContaDigitalParams {
  cpf: CPF;
  saldo: number;
  numero: number;
  agencia: string;
  id?: UniqueEntityId | string;
}

export default class ContaDigital extends AbstractEntity {
  private _cpf: CPF;

  private _saldo: number;

  private _numero: number;

  private _agencia: string;

  private _operacoes: Operacao[];

  constructor({ cpf, saldo = 0, numero, agencia, id }: ContaDigitalParams) {
    super(id);
    this._cpf = cpf;
    this._saldo = saldo;
    this._numero = numero;
    this._agencia = agencia;
    this.isValid();
  }

  get cpf(): CPF {
    return this._cpf;
  }

  get saldo(): number {
    return this._numero;
  }

  changeConta(numero: number, agencia: string) {
    this._numero = numero;
    this._agencia = agencia;
    this.isValid();
  }

  isValid() {
    if (!this.cpf) {
      throw new InvalidCPFError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CPF_IS_REQUIRED,
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
      numero: this._numero,
      agencia: this._agencia,
    };
  }
}
