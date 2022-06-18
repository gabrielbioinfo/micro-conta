import { CURRENCIES } from '../data/currency';
import OperacaoTipo from '../data/operacao-tipo';
import Operacao, { OperacaoProps } from './operacao.vo';

describe('Operação Value Object', () => {
  it('should be able to create', () => {
    let isDeclared = Operacao.create({
      type: OperacaoTipo.DEPOSITO,
      currency: CURRENCIES.BRL,
      amount: 19.53,
    } as OperacaoProps);

    expect(isDeclared).toBeDefined();

    isDeclared = Operacao.create({
      type: OperacaoTipo.SAQUE,
      amount: 5,
    } as OperacaoProps);
    expect(isDeclared).toBeDefined();
  });

  it('should be able to call toString() and toJSON()', () => {
    const params = {
      type: OperacaoTipo.DEPOSITO,
      currency: CURRENCIES.BRL,
      amount: 19.532,
      when: new Date(),
    };
    const isDeclared = Operacao.create(params);
    const comparisonWith = `Operation of the type ${
      OperacaoTipo[params.type]
    } with the amount ${params.currency.symbol}${params.amount.toFixed(2)}(${
      params.currency.name
    }) in ${params.when.toISOString()}`;
    expect(isDeclared.toString()).toBe(comparisonWith);

    const comparisonObject = {
      ...params,
      type: OperacaoTipo[params.type],
      amount: Number(params.amount.toFixed(2)).toLocaleString(
        Operacao.DEFAULT_LOCALE,
      ),
      when: params.when.toISOString(),
    };
    expect(isDeclared.toJSON()).toMatchObject(comparisonObject);

    delete comparisonObject.type;
    expect(isDeclared.toJSON()).not.toStrictEqual(comparisonObject);
  });
});
