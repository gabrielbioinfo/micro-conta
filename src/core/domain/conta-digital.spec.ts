import CPF from './value-objects/cpf.vo';

describe('Conta Digital', () => {
  it('should create a account', () => {
    const cpfString = '82148427008';
    const contaDigital = new ContaDigital(
      CPF.create(cpfString),
      500,
      350,
      '0001',
    );
    expect(contaDigital).toBeDefined();

    expect(contaDigital.portador.toString()).toBe(cpfString);
    expect(contaDigital.saldo.toString()).toBe(cpfString);
  });
});
