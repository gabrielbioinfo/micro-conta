import I18n from '../../../_shared/i18n/i18n';
import InvalidCPFError from '../../errors/invalid-cpf-error';

export default class CPF {
  private readonly number: string;

  constructor(number: string) {
    this.number = number.replace(/[^0-9]/g, '');
    this.isValid();
  }

  isValid() {
    if (!this.number || this.number.length === 0)
      throw new InvalidCPFError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY,
      );

    const firstCharacter = this.number[0];
    const regex = new RegExp(`^${firstCharacter}+$`, 'g'); // correct way
    if (this.number.match(regex))
      throw new InvalidCPFError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CPF_ALLTHESAME,
      );

    this.checkNumberValidation();
  }

  toString(useMask = true) {
    if (!useMask) return this.number;
    return this.number.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  checkNumberValidation() {
    const firstNineDigits = [...this.number].slice(0, 9);
    const firstDigit = CPF.getDigit(firstNineDigits);
    const tenDigits = [...firstNineDigits, firstDigit];
    const secondDigit = CPF.getDigit(tenDigits);
    if (
      firstDigit !== Number(this.number[this.number.length - 2]) ||
      secondDigit !== Number(this.number[this.number.length - 1])
    )
      throw new InvalidCPFError(
        I18n.getInstance().STRINGS.ERROR.INVALID_CPF_REJECTED,
      );
  }

  static getDigit(digits = []) {
    let firstCalc = 0;
    for (let i = 0; i < digits.length; i++) {
      const index = digits.length - i + 1;
      firstCalc += Number(digits[i]) * index;
    }
    const modDivisionByEleven = firstCalc % 11;
    let resultDigit = 0;
    if (modDivisionByEleven >= 2) {
      resultDigit = 11 - modDivisionByEleven;
    }
    return resultDigit;
  }
}
