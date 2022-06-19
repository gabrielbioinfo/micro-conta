import UniqueEntityId from './unique-entity-id.vo';

export default abstract class AbstractEntity {
  public readonly id: UniqueEntityId;

  constructor(id?: UniqueEntityId | string) {
    if (
      typeof id === 'string' &&
      Object.prototype.toString.call(id) === '[object String]'
    ) {
      this.id = UniqueEntityId.create(id);
      return;
    }
    this.id = (id as UniqueEntityId) || UniqueEntityId.create();
  }
}
