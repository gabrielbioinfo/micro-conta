import ValueObject from '../../../_shared/domain/value-object';
import I18n from '../../../_shared/i18n/i18n';
import InvalidAmountError from '../../errors/invalid-amount-error';
import Currency, { CURRENCIES } from '../data/currency';
import OperacaoTipo from '../data/operacao-tipo';

export interface OperacaoPropsInput {
  type?: OperacaoTipo;
  currency?: Currency;
  amount?: number;
  when?: Date | string;
}

export interface OperacaoProps {
  type: OperacaoTipo;
  currency: Currency;
  amount: number;
  when: Date;
}

export default class Operacao extends ValueObject<OperacaoProps> {
  static DEFAULT_LOCALE = 'pt-BR';

  static create(value?: OperacaoPropsInput): Readonly<Operacao> {
    return new Operacao(value || {});
  }

  private constructor({
    type = OperacaoTipo.DEPOSITO,
    amount = 0,
    currency = CURRENCIES.BRL,
    when = new Date(),
  }: OperacaoPropsInput) {
    let whenDate = when;
    if (typeof whenDate === 'string' || whenDate instanceof String)
      whenDate = new Date(when);

    super({
      type,
      currency,
      amount: Number(amount.toFixed(2)),
      when: whenDate,
    });
    this.isValid();
  }

  get type(): OperacaoTipo {
    return this.value.type;
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): Currency {
    return this.value.currency;
  }

  get when(): Date {
    return this.value.when;
  }

  toString(): string {
    return `Operation of the type ${
      OperacaoTipo[this.value.type]
    } with the amount ${
      this.value.currency.symbol
    }${this.value.amount.toString()}(${
      this.value.currency.name
    }) in ${this.value.when.toISOString()}`;
  }

  toJSON() {
    return {
      type: OperacaoTipo[this.value.type],
      currency: this.value.currency,
      amount: this.value.amount.toLocaleString(Operacao.DEFAULT_LOCALE),
      when: this.value.when.toISOString(),
    };
  }

  isValid() {
    if (Number.isNaN(this.value.amount)) {
      throw new InvalidAmountError();
    }

    if (this.value.amount < 0) {
      throw new InvalidAmountError(
        I18n.getInstance().STRINGS.ERROR.INVALID_AMOUNT_NEGATIVE,
      );
    }
  }
}
