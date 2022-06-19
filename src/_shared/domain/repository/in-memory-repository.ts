import AbstractEntity from '../entities/abstract-entity';
import UniqueEntityId from '../entities/unique-entity-id.vo';
import EntityNotFoundError from '../errors/entity-not-found-error';
import { RepositoryInterface } from './repository-contracts';

export default abstract class InMemoryRepository<E extends AbstractEntity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    return this._get(`${id}`);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(`${entity.id}`);
    const index = this.items.findIndex(item => item.id === entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    await this._get(`${id}`);
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`;
    const entityItem = this.items.find(item => `${item.id}` === _id);
    if (!entityItem) throw new EntityNotFoundError();
    return entityItem;
  }
}
