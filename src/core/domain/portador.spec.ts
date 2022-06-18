import I18n from '../../_shared/i18n/i18n';
import Portador, { PortadorProps } from './portador';
import CPF from './value-objects/cpf.vo';

describe('Portador', () => {
  it('should be able to create a Portador', async () => {
    const props: PortadorProps = {
      cpf: '821.484.270-08',
      fullName: 'Some Name',
    } as PortadorProps;

    let portador = new Portador(props);
    expect(portador).toBeDefined();

    expect(portador.toJSON()).toMatchObject({
      cpf: '821.484.270-08',
      fullName: 'Some Name',
    });

    expect(portador.id).toBeDefined();

    const uuidForTest = '9305ad32-55f2-4fef-b2ac-814939f204d1';
    portador = new Portador({
      cpf: '821.484.270-08',
      fullName: 'Some Name',
      id: uuidForTest,
    });

    expect(() => {
      new Portador({
        cpf: '821.484.270-08',
        fullName: 'Some Name',
        id: `${uuidForTest}XXX`,
      });
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_UUID);
  });

  it('should throw a Error when either CPF or FullName is empty', () => {
    expect(() => {
      new Portador({ cpf: '821.484.270-08', fullName: '' });
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_FULLNAME_EMPTY);

    expect(() => {
      new Portador({ cpf: '', fullName: '' });
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY);

    expect(() => {
      new Portador({ cpf: null, fullName: '' });
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_EMPTY);

    expect(() => {
      new Portador({ cpf: '821.484.270-00', fullName: '' });
    }).toThrow(I18n.getInstance().STRINGS.ERROR.INVALID_CPF_REJECTED);
  });
});
