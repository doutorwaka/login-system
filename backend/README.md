# 🔒 Sistema de Login com SOLID e Clean Architecture

Neste repositório, encontra-se o projeto criado na **_playlist_** [Sistema de Login COMPLETO - Backend + Frontend](https://www.youtube.com/@doutorwaka) do [Doutorwaka](https://www.youtube.com/@doutorwaka).

Neste repositório, o foco é a implementação do **_backend_**, utilizando as melhores práticas de desenvolvimento de software, como os princípios SOLID e Clean Architecture. Na implementação, utilizaremos **_NodeJS/Typescript_**, **_NestJS_**, **_Prisma_** e **_SQLite_**. Além disso, exploraremos **_tokens_** **JWT** e a criação de uma **_API RESTful_**.

## 📦 Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
pnpm install
```

## 🚀 Executando o projeto

Para executar o projeto, utilize o seguinte comando:

```bash
pnpm start
```

## 🧪 Testes

Para executar os testes, utilize o seguinte comando:

```bash
pnpm test
```

## 👮 Sistema de Login

O sistema de login é uma aplicação que permite o registro e autenticação de usuários. Ele utiliza **_tokens_** JWT para autenticação e armazena os dados dos usuários em um banco de dados SQLite. O sistema é dividido em várias camadas, seguindo os princípios da Clean Architecture, o que facilita a manutenção e escalabilidade do código.

No processo de autenticação, o usuário fornece suas credenciais (nome de usuário e senha). O sistema verifica se as credenciais estão corretas e, em caso afirmativo, gera dois **_tokens_** JWT, um **_token_** de autenticação e outro para re-autenticação, que são enviados ao cliente. O **_token_** de autenticação é utilizado para acessar as rotas protegidas da API, enquanto o **_token_** de re-autenticação é utilizado para renovar o **_token_** de autenticação quando ele expira.

## 🧔 Mais sobre o autor

Olá! Tudo bem? Eu me chamo José Eurípedes, tenho 36 anos e sou doutor em Ciência da Computação. Escrevi minhas primeiras linhas de código com 13 anos e hoje tenho uma grande paixão em ensinar tudo o que aprendi nessa minha caminhada de 23 anos de experiência.

Para saber mais sobre mim, basta acessar minhas redes sociais:

- [Meu Curso de Programação](https://www.doutorwaka.com/)
- [YouTube](https://www.youtube.com/@doutorwaka)
- [Instagram](https://instagram.com/doutorwaka)
- [TikTok](https://www.tiktok.com/@doutorwaka)
- [Site Pessoal](https://www.doutorwaka.com/)
