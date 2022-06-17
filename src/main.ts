class MeuTeste {
  private name = 'Meu Teste';

  static create() {
    return new this();
  }

  sayMyName = () => {
    console.log(`Say my name, say my name: ${this.name}`);
  };
}

console.log(MeuTeste.create().sayMyName());
