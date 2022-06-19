import AbstractEntity from '../entities/abstract-entity';
import UniqueEntityId from '../entities/unique-entity-id.vo';

export interface RepositoryInterface<E extends AbstractEntity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
