/* eslint-disable max-classes-per-file */
import ValueObject from './value-object';

class StubValueObject extends ValueObject<any> {
  static create(value: any): Readonly<StubValueObject> {
    return Object.freeze(new StubValueObject(value));
  }
}

class StubValueObjectWithString extends ValueObject<string> {
  static create(value: string): Readonly<StubValueObjectWithString> {
    return Object.freeze(new StubValueObjectWithString(value));
  }
}

describe('ValueObject', () => {
  it('should create', () => {
    const arrange = ['Some Value', true, { name: 'value' }];

    arrange.forEach(value => {
      const testFromArrange = StubValueObject.create(value);
      expect(testFromArrange.value).toBe(value);
    });
  });

  it('should create', () => {
    const simpleTestFromStub = StubValueObjectWithString.create('Some Value');
    expect(simpleTestFromStub.value).toBe('Some Value');

    expect(() => {
      // eslint-disable-next-line
      (simpleTestFromStub as any)._value = 'Changed Value';
    }).toThrow(TypeError);

    expect(simpleTestFromStub.value).not.toBe('Changed Value');
  });
});
