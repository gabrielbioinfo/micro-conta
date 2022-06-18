<p align="center">
  Micro Serviço Conta Digital
</p>

## Descrição

Aplicação que demonstra um micro serviço de conta digital, utilizando clean architecture e Typescript.

## Requisitos

- Deve ser possível criar e remover **portadores**
  - Um **portador** deve conter apenas seu _nome completo_ e _CPF_
  - O _CPF_ deve ser válido e único no cadastro de **portadores**
- As **contas digital Dock** devem conter as seguintes funcionalidades:
  - A conta deve ser criada utilizando o _CPF_ do **portador**
  - Uma conta deve ter seu _saldo_, _número_ e _agência_ disponíveis para consulta
  - Necessário ter funcionalidade para fazer a _consulta de extrato_ da conta _por período_
  - Um **portador** pode fechar a **conta digital Dock** a qualquer instante
  - Executar as operações de _saque_ e _depósito_
    - _Depósito_ é liberado para todas as _contas ativas_ e _desbloqueadas_
    - _Saque_ é permitido para todas as _contas ativas_ e _desbloqueadas_ desde que haja _saldo disponível_ e não ultrapasse o limite diário de _2 mil reais_

## Regulação obrigatória

- Precisamos _bloquear_ e _desbloquear_ a **conta digital Dock** a qualquer momento
- A **conta digital Dock** nunca poderá ter o _saldo negativo_

## Arquitetura

<p>A escolha da arquitetura foi por Clean Architecture. Com ela podemos focar no domínio da aplicação e garantir que as tecnologias adicionais escolhidas sejam
adicionadas sem que o core do sistema dependa dela.</p>

## Tecnologias

- [Nodejs](https://nodejs.org/en/docs/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [SWC](https://swc.rs/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Sqlite](https://www.sqlite.org/)
- [Mysql](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Istio](https://istio.io/)
- [Kiali](https://kiali.io/)
- [Elastic stack](https://www.elastic.co/elastic-stack/)

## Dicas e Questões

Para dicas e questões entre contato diretamente comigo por DM ou pelo email [email](mailto:gabrielbioinfo@gmail.com).

## Issues

Fique a vontade para abrir [Issues](https://discord.gg/G7Qnnhy) caso queira contribuir com esse exemplo.

## Contato

- Author: Gabriel Espindola
- [twitter](https://twitter.com/gabrielbioinfo)
- [email](mailto:gabrielbioinfo@gmail.com)
