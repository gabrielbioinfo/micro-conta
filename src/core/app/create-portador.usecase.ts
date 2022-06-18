import Portador from '../domain/portador';

class CreatePortadorUseCase {
  execute({ cpf, fullName }) {
    const portador: Portador = new Portador(cpf, fullName);
  }
}
