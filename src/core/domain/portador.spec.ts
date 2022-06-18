import I18n from '../../_shared/i18n/i18n';
import Portador from './portador';
import CPF from './value-objects/cpf.vo';

describe('Portador', () => {
  it('should be able to create a Portador', async () => {
    let portador = new Portador(CPF.create('821.484.270-08'), 'Some Name');
    expect(portador).toBeDefined();

    expect(portador.toJSON()).toMatchObject({
      cpf: '821.484.270-08',
      fullName: 'Some Name',
    });

    expect(portador.id).toBeDefined();

    const uuidForTest = '9305ad32-55f2-4fef-b2ac-814939f204d1';
    portador = new Portador(
      CPF.create('821.484.270-08'),
      'Some Name',
      uuidForTest,
    );

    expect(() => {
      // eslint-disable-next-line no-new
      new Portador(
        CPF.create('821.484.270-08'),
        'Some Name',
        `${uuidForTest}XXX`,
      );
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_UUID);
  });

  it('should throw a Error when either CPF or FullName is empty', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Portador(CPF.create('821.484.270-08'), '');
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_FULLNAME_EMPTY);

    expect(() => {
      // eslint-disable-next-line no-new
      new Portador(CPF.create(''), '');
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY);

    expect(() => {
      // eslint-disable-next-line no-new
      new Portador(null, '');
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY);

    expect(() => {
      // eslint-disable-next-line no-new
      new Portador(CPF.create('821.484.270-00'), '');
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_REJECTED);
  });
});
