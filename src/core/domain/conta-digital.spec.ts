import I18n from '../../_shared/i18n/i18n';
import ContaDigital from './conta-digital';
import { CURRENCIES } from './data/currency';
import OperacaoTipo from './data/operacao-tipo';
import CPF from './value-objects/cpf.vo';
import Operacao from './value-objects/operacao.vo';

describe('Conta Digital', () => {
  it('should create a account', () => {
    const spyOnIsValid = jest.spyOn(ContaDigital.prototype, 'isValid');

    const cpfString = '821.484.270-08';
    const contaDigital = new ContaDigital({
      cpf: CPF.create(cpfString),
      saldo: 500.4512,
      numero: 350,
      agencia: '0001',
    });
    expect(contaDigital).toBeDefined();

    expect(contaDigital.portador.toString()).toBe(cpfString);
    expect(contaDigital.saldo).toBe(500.45);

    expect(spyOnIsValid).toHaveBeenCalled();
  });

  it('should initialize saldo with 0 when nothing is passed', () => {
    const cpfString = '821.484.270-08';
    const contaDigital = new ContaDigital({
      cpf: CPF.create(cpfString),
      saldo: null,
      numero: 350,
      agencia: '0001',
    });
    expect(contaDigital.saldo).toBe(0);
  });

  it('should throw erros when not valid', () => {
    const cpfString = '821.484.270-08';

    expect(() => {
      (() =>
        new ContaDigital({
          cpf: null,
          saldo: 100,
          numero: null,
          agencia: '0001',
        }))();
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_IS_REQUIRED);

    expect(() => {
      (() =>
        new ContaDigital({
          cpf: CPF.create(cpfString),
          saldo: 100,
          numero: null,
          agencia: '0001',
        }))();
    }).toThrow(
      I18n.getInstance().STRINGS.ERROR.INVALID_CONTA_DIGITAL_MISSING_NUMBER,
    );

    expect(() => {
      (() =>
        new ContaDigital({
          cpf: CPF.create(cpfString),
          saldo: 100,
          numero: 150,
          agencia: null,
        }))();
    }).toThrow(
      I18n.getInstance().STRINGS.ERROR.INVALID_CONTA_DIGITAL_MISSING_AGENCY,
    );
  });

  it('should be able to change account number and agency', () => {
    const spyOnIsValid = jest.spyOn(ContaDigital.prototype, 'isValid');
    const cpfString = '821.484.270-08';
    const contaDigital = new ContaDigital({
      cpf: CPF.create(cpfString),
      saldo: null,
      numero: 350,
      agencia: '0001',
    });
    expect(contaDigital.numero).toBe(350);
    expect(contaDigital.agencia).toBe('0001');

    expect(spyOnIsValid).toHaveBeenCalledTimes(1);
    contaDigital.changeConta(120, '002');
    expect(spyOnIsValid).toHaveBeenCalledTimes(2);

    expect(contaDigital.numero).toBe(120);
    expect(contaDigital.agencia).toBe('002');

    expect(() => {
      contaDigital.saldo = 12;
    }).toThrow(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_CHANGE_SALDO_NOT_ALLOWED,
    );

    contaDigital.changeSaldo(21);
    expect(contaDigital.saldo).toBe(21);
  });

  it('should be able to change activation', () => {
    const cpfString = '821.484.270-08';
    let contaDigital = new ContaDigital({
      cpf: CPF.create(cpfString),
      saldo: 10,
      numero: 350,
      agencia: '0001',
    });
    expect(contaDigital.ativa).toBeTruthy();

    contaDigital = new ContaDigital({
      cpf: CPF.create(cpfString),
      saldo: 10,
      numero: 350,
      agencia: '0001',
      ativa: false,
    });
    expect(contaDigital.ativa).toBeFalsy();

    contaDigital.activate();
    expect(contaDigital.ativa).toBeTruthy();

    contaDigital.inactivate();
    expect(contaDigital.ativa).toBeFalsy();

    expect(() => {
      contaDigital.ativa = true;
    }).toThrow(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_FIELD_NOT_ALLOWED,
    );
  });

  it('should be able to add operações', () => {
    const cpfString = '821.484.270-08';
    const params = {
      cpf: CPF.create(cpfString),
      saldo: 0,
      numero: 350,
      agencia: '0001',
    };
    const contaDigital = new ContaDigital(params);

    const primeiraOperacao = Operacao.create();
    contaDigital.adicionarOperacao(primeiraOperacao);
    expect(contaDigital.operacoes.length).toBe(1);
    expect(contaDigital.saldo).toBe(params.saldo + 0);

    const fixedDate = new Date('2022-06-18T19:00:00.877Z');
    const arrange = [
      {
        type: OperacaoTipo.DEPOSITO,
        amount: 10,
        when: fixedDate.toISOString(),
        currency: CURRENCIES.BRL,
        result: 10,
        dateEqual: true,
      },
      {
        type: OperacaoTipo.DEPOSITO,
        amount: 10,
        when: new Date(),
        currency: CURRENCIES.BRL,
        result: 20,
        dateEqual: false,
      },
      {
        type: OperacaoTipo.SAQUE,
        amount: 18,
        when: fixedDate.toISOString(),
        currency: CURRENCIES.BRL,
        result: 2,
        dateEqual: true,
      },
    ];

    arrange.forEach((myTest, index) => {
      const { type, amount, when, result, dateEqual } = myTest;
      const nOperacao = Operacao.create({ type, amount, when });
      contaDigital.adicionarOperacao(nOperacao);
      expect(contaDigital.operacoes.length).toBe(index + 2);
      expect(contaDigital.saldo).toBe(result);
      if (dateEqual)
        expect(nOperacao.when.toISOString()).toBe(fixedDate.toISOString());
      else
        expect(nOperacao.when.toISOString()).not.toBe(fixedDate.toISOString());
    });

    const saldoAnterior = contaDigital.saldo;
    expect(() => {
      const nOperacao = Operacao.create({
        type: OperacaoTipo.SAQUE,
        amount: 300,
      });
      contaDigital.adicionarOperacao(nOperacao);
    }).toThrow(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_SALDO_INSUFFICIENT,
    );
    expect(contaDigital.saldo).toBe(saldoAnterior);
  });

  it('should be able to call toString', () => {
    const cpfString = '821.484.270-08';
    const params = {
      cpf: CPF.create(cpfString),
      saldo: 10,
      numero: 350,
      agencia: '0001',
    };
    const contaDigital = new ContaDigital(params);
    let comparisonText = `Digital Account for ${params.cpf.toString()}[active] with number: ${
      params.numero
    } and agency: ${params.agencia}`;

    expect(contaDigital.toString()).toBe(comparisonText);

    contaDigital.inactivate();
    comparisonText = `Digital Account for ${params.cpf.toString()}[inactive] with number: ${
      params.numero
    } and agency: ${params.agencia}`;
    expect(contaDigital.toString()).toBe(comparisonText);
  });

  it('should be able to call toJSON', () => {
    const cpfString = '821.484.270-08';
    const params = {
      cpf: CPF.create(cpfString),
      saldo: 10,
      numero: 350,
      agencia: '0001',
    };
    const contaDigital = new ContaDigital(params);
    const comparisonObj: any = {
      ...params,
      cpf: cpfString,
      ativo: true,
    };
    expect(contaDigital.toJSON()).toMatchObject(comparisonObj);

    contaDigital.inactivate();
    comparisonObj.ativo = false;
    expect(contaDigital.toJSON()).toMatchObject(comparisonObj);

    comparisonObj.operacoes = [];
    expect(contaDigital.toJSON(true)).toMatchObject(comparisonObj);
  });
});
