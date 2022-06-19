import AbstractEntity from '../entities/abstract-entity';
import I18n from '../i18n/i18n';
import InMemoryRepository from './in-memory-repository';

class StubEntity extends AbstractEntity {
  constructor(public name: string, public active: boolean, id?: string) {
    super(id);
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository', () => {
  let repository = new StubInMemoryRepository();

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should inserts a new Entity', async () => {
    const arrange = [
      {
        name: 'Some Name',
        active: true,
      },
      {
        name: 'Some Other Name',
        active: false,
      },
    ];

    let index = 0;
    for (const { name, active } of arrange) {
      expect(repository.items).toHaveLength(index);
      const entity = new StubEntity(`${name} ${index + 1}`, active);
      await repository.insert(entity);

      expect(entity.name).toBe(repository.items[index].name);
      expect(entity.active).toBe(repository.items[index].active);

      index++;
      expect(repository.items).toHaveLength(index);
    }
  });

  it('should findOne', async () => {
    const repository = new StubInMemoryRepository();
    const arrange = [
      {
        name: 'Some Name',
        active: true,
      },
      {
        name: 'Another Name',
        active: false,
      },
      {
        name: 'Even Bigger Name',
        active: false,
      },
    ];

    let index = 0;
    expect(repository.items).toHaveLength(index);
    for (const { name, active } of arrange) {
      const entity = new StubEntity(`${name} ${index + 1}`, active);
      await repository.insert(entity);
      index++;
    }
    expect(repository.items).toHaveLength(index);

    const firstEntity = await repository.findById(repository.items[0].id);
    expect(firstEntity.name).toBe(`${arrange[0].name} 1`);
    expect(firstEntity.active).toBe(arrange[0].active);
    expect(repository.items[0].name).not.toBe(`${arrange[0].name} 0`);

    const thirdEntity = await repository.findById(repository.items[2].id);
    expect(thirdEntity.name).toBe(`${arrange[2].name} 3`);
    expect(thirdEntity.active).toBe(arrange[2].active);
    expect(repository.items[2].name).not.toBe(`${arrange[2].name} 2`);
  });

  it('should throw a Error when not found', async () => {
    const repository = new StubInMemoryRepository();
    const validUuid = '352066f2-ba7b-4cab-90cf-184b1db64095';
    expect(async () => {
      await repository.findById(validUuid);
    }).rejects.toThrow(I18n.getInstance().STRINGS.ERROR.ENTITY_NOT_FOUND);

    expect(async () => {
      await repository.update(new StubEntity(validUuid, true));
    }).rejects.toThrow(I18n.getInstance().STRINGS.ERROR.ENTITY_NOT_FOUND);

    expect(async () => {
      await repository.delete(validUuid);
    }).rejects.toThrow(I18n.getInstance().STRINGS.ERROR.ENTITY_NOT_FOUND);
  });

  it('should update a entity', async () => {
    const repository = new StubInMemoryRepository();
    const arrange = [
      {
        name: 'Some Name',
        active: true,
      },
      {
        name: 'Another Name',
        active: false,
      },
      {
        name: 'Even Bigger Name',
        active: false,
      },
    ];

    let index = 0;
    expect(repository.items).toHaveLength(index);
    for (const { name, active } of arrange) {
      const entity = new StubEntity(`${name} ${index + 1}`, active);
      await repository.insert(entity);
      expect(entity.name).toBe(`${name} ${index + 1}`);
      expect(entity.active).toBe(active);

      entity.name = `${name} ${index + 1} - updated`;
      entity.active = !entity.active;
      await repository.update(entity);
      expect(entity.name).toBe(`${name} ${index + 1} - updated`);
      expect(entity.active).toBe(!active);

      index++;
    }
    expect(repository.items).toHaveLength(index);
  });

  it('should delete a entity', async () => {
    const repository = new StubInMemoryRepository();
    const arrange = [
      {
        name: 'Some Name',
        active: true,
      },
      {
        name: 'Another Name',
        active: false,
      },
      {
        name: 'Even Bigger Name',
        active: false,
      },
    ];

    let index = 0;
    expect(repository.items).toHaveLength(index);
    for (const { name, active } of arrange) {
      const entity = new StubEntity(`${name} ${index + 1}`, active);
      await repository.insert(entity);
      expect(entity.name).toBe(`${name} ${index + 1}`);
      expect(entity.active).toBe(active);
      index++;
    }
    expect(repository.items).toHaveLength(index);

    const copyOfObjectOne = { ...repository.items[0] };
    await repository.delete(repository.items[0].id);
    expect(repository.items).toHaveLength(index - 1);
    expect(copyOfObjectOne.id).not.toBe(repository.items[0].id);
  });

  it('should return a array of entities', async () => {
    const repository = new StubInMemoryRepository();
    const arrange = [
      {
        name: 'Some Name',
        active: true,
      },
      {
        name: 'Another Name',
        active: false,
      },
      {
        name: 'Even Bigger Name',
        active: false,
      },
    ];

    let index = 0;
    expect(repository.items).toHaveLength(index);
    for (const { name, active } of arrange) {
      const entity = new StubEntity(`${name} ${index + 1}`, active);
      await repository.insert(entity);
      expect(entity.name).toBe(`${name} ${index + 1}`);
      expect(entity.active).toBe(active);
      index++;
    }
    expect(repository.items).toHaveLength(index);
    expect(repository.items[0].name).toBe(`${arrange[0].name} ${1}`);
    console.log(repository.items);
  });
});
