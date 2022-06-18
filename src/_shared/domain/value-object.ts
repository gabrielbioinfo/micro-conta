import InvalidOperationError from '../errors/invalid-operation-error';
import I18n from '../i18n/i18n';

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  // eslint-disable-next-line class-methods-use-this
  set value(newValue: Value) {
    throw new InvalidOperationError(
      I18n.getInstance().STRINGS.ERROR.CONTA_DIGITAL_CHANGE_FIELD_NOT_ALLOWED,
    );
  }

  toString(): string {
    return this.value.toString();
  }
}
