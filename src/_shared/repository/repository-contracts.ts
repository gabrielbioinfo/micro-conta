import AbstractEntity from '../domain/abstract-entity';
import UniqueEntityId from '../domain/unique-entity-id.vo';

export interface RepositoryInterface<E extends AbstractEntity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
