import I18n from '../../../_shared/i18n/i18n';
import InvalidCPFError from '../../errors/invalid-cpf-error';
import CPF from './cpf.vo';

describe('CPF value object', () => {
  let cpf;
  let cpfFormated;

  beforeEach(() => {
    cpfFormated = '821.484.270-08';
    cpf = CPF.create(cpfFormated);
  });

  it('should be able to create a CPF', () => {
    expect(cpf).toBeDefined();
  });

  it('should be able to create a CPF', () => {
    const spyOnValidation = jest.spyOn(CPF.prototype, 'isValid');

    CPF.create('821.484.270-08');
    expect(spyOnValidation).toBeCalled();
  });

  it('should be able to return only numbers and formated', () => {
    expect(cpf.toString(false)).toBe('82148427008');
    expect(cpf.toString()).toBe(cpfFormated);
  });

  it('should be invalid when the number is all the same', () => {
    expect(() => {
      CPF.create('');
    }).toThrowError(InvalidCPFError);

    expect(() => {
      CPF.create('');
    }).toThrowError(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY);

    expect(() => {
      CPF.create('11111111111');
    }).toThrowError(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_ALLTHESAME);
  });

  it('should validate the getDigit function', () => {
    // 40746546017
    expect(CPF.getDigit('407465460'.split(''))).toBe(1);
    expect(CPF.getDigit('4074654601'.split(''))).toBe(7);

    // 06332442018
    expect(CPF.getDigit('063324420'.split(''))).toBe(1);
    expect(CPF.getDigit('0633244201'.split(''))).toBe(8);

    // 59488035030
    expect(CPF.getDigit('5948803503'.split(''))).not.toBe(5);
    expect(CPF.getDigit('5948803503'.split(''))).toBe(0);
  });

  it('should validate the number', () => {
    let validCpf = CPF.create('40746546017');
    expect(validCpf.toString(false)).toBe('40746546017');
    expect(validCpf.toString()).toBe('407.465.460-17');

    validCpf = CPF.create('06332442018');
    expect(validCpf.toString(false)).toBe('06332442018');
  });
});
