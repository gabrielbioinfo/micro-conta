import AbstractEntity from '../../_shared/domain/abstract-entity';
import Dictionary from '../../_shared/domain/dictionary';
import UniqueEntityId from '../../_shared/domain/unique-entity-id.vo';
import I18n from '../../_shared/i18n/i18n';
import InvalidContaDigitalError from '../errors/invalid-conta-digital-error';
import InvalidCPFError from '../errors/invalid-cpf-error';
import CPF from './value-objects/cpf.vo';
import Operacao from './value-objects/operacao.vo';

export interface ContaDigitalParams {
  cpf: CPF | Readonly<CPF>;
  saldo: number;
  numero: number;
  agencia: string;
  id?: UniqueEntityId | string;
}

export default class ContaDigital extends AbstractEntity {
  private _cpf: CPF | Readonly<CPF>;

  private _saldo: number;

  private _numero: number;

  private _agencia: string;

  private _operacoes: Operacao[];

  constructor({ cpf, saldo = 0, numero, agencia, id }: ContaDigitalParams) {
    super(id);
    this._cpf = cpf;
    this._saldo = Number(saldo.toFixed(2));
    this._numero = numero;
    this._agencia = agencia;
    this.isValid();
  }

  get cpf(): CPF | Readonly<CPF> {
    return this._cpf;
  }

  get portador(): CPF | Readonly<CPF> {
    return this._cpf;
  }

  get saldo(): number {
    return this._saldo;
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

    if (!this._numero) {
      throw new InvalidContaDigitalError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CONTA_DIGITAL_MISSING_NUMBER,
      );
    }

    if (!this._agencia) {
      throw new InvalidContaDigitalError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CONTA_DIGITAL_MISSING_AGENCY,
      );
    }
  }

  toJSON(addOperacoes: boolean = false): Dictionary<any> {
    const base: Dictionary<any> = {
      id: this.id.toString(),
      cpf: this.cpf.toString(),
      numero: this._numero,
      agencia: this._agencia,
    };
    if (!addOperacoes) return base;

    base.operacoes = [];
    return base;
  }
}
