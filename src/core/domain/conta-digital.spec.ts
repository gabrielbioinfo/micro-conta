import ContaDigital from './conta-digital';
import CPF from './value-objects/cpf.vo';

describe('Conta Digital', () => {
  it('should create a account', () => {
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
  });
});
