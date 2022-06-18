import MissingImplementationError from '../errors/missing-implementation-error';

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  toString(): string {
    return this.value.toString();
  }
}
