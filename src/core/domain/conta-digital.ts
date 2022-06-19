import AbstractEntity from '../../_shared/domain/entities/abstract-entity';
import Dictionary from '../../_shared/domain/entities/dictionary';
import UniqueEntityId from '../../_shared/domain/entities/unique-entity-id.vo';
import InvalidOperationError from '../../_shared/domain/errors/invalid-operation-error';
import I18n from '../../_shared/domain/i18n/i18n';
import InvalidContaDigitalError from '../errors/invalid-conta-digital-error';
import InvalidCPFError from '../errors/invalid-cpf-error';
import OperacaoTipo from './data/operacao-tipo';
import CPF from './value-objects/cpf.vo';
import Operacao from './value-objects/operacao.vo';

export interface ContaDigitalParams {
  cpf: CPF | Readonly<CPF>;
  saldo: number;
  numero: number;
  agencia: string;
  ativa?: boolean;
  id?: UniqueEntityId | string;
}

export default class ContaDigital extends AbstractEntity {
  private _cpf: CPF | Readonly<CPF>;

  private _ativa: boolean;

  private _saldo: number;

  private _numero: number;

  private _agencia: string;

  private _operacoes: Operacao[] | Readonly<Operacao>[];

  constructor({
    cpf,
    ativa = true,
    saldo = 0,
    numero,
    agencia,
    id,
  }: ContaDigitalParams) {
    super(id);
    this._cpf = cpf;
    this._ativa = ativa;
    this._saldo = saldo ? Number(saldo.toFixed(2)) : 0;
    this._numero = numero;
    this._agencia = agencia;
    this._operacoes = [];
    this.isValid();
  }

  get ativa(): boolean {
    return this._ativa;
  }

  // eslint-disable-next-line class-methods-use-this
  set ativa(newValue: boolean) {
    throw new InvalidOperationError(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_CHANGE_FIELD_NOT_ALLOWED,
    );
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

  // eslint-disable-next-line class-methods-use-this
  set saldo(newValue: number) {
    throw new InvalidOperationError(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_CHANGE_SALDO_NOT_ALLOWED,
    );
  }

  get numero(): number {
    return this._numero;
  }

  get agencia(): string {
    return this._agencia;
  }

  get operacoes(): Operacao[] | Readonly<Operacao>[] {
    return this._operacoes;
  }

  activate() {
    this._ativa = true;
  }

  inactivate() {
    this._ativa = false;
  }

  changeConta(numero: number, agencia: string) {
    this._numero = numero;
    this._agencia = agencia;
    this.isValid();
  }

  changeSaldo(newSaldo: number) {
    this._saldo = newSaldo;
  }

  adicionarOperacao(newOperation: Operacao | Readonly<Operacao>): void {
    if (
      newOperation.type === OperacaoTipo.SAQUE &&
      this.saldo - newOperation.amount < 0
    )
      throw new InvalidOperationError(
        I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_SALDO_INSUFFICIENT,
      );

    if (newOperation.type === OperacaoTipo.SAQUE) {
      this._saldo = this.saldo - newOperation.amount;
    }

    if (newOperation.type === OperacaoTipo.DEPOSITO) {
      this._saldo = this.saldo + newOperation.amount;
    }

    this._operacoes.push(newOperation);
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

  toString() {
    return `Digital Account for ${this.cpf.toString()}[${
      this.ativa ? 'active' : 'inactive'
    }] with number: ${this.numero} and agency: ${this.agencia}`;
  }

  toJSON(addOperacoes: boolean = false): Dictionary<any> {
    const base: Dictionary<any> = {
      id: this.id.toString(),
      cpf: this.cpf.toString(),
      numero: this.numero,
      agencia: this.agencia,
      saldo: this.saldo,
      ativo: this.ativa,
    };
    if (!addOperacoes) return base;

    base.operacoes = [];
    return base;
  }
}
