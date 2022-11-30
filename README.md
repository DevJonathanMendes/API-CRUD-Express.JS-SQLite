# APIBook

Prática com Express.JS e SQLite3

## 🚀 Começando

### 📋 Pré-requisitos

```
Node.JS
SQLite
Porta 3000 do localhost livre (ou especificar)
```

### 🔧 Instalação

Para iniciar:

```
No console do VS Code, digite:

yarn - Para baixar as dependências.

Há dois scripts para iniciar o servidor:
yarn dev - Para desenvolvimento.
yarn start - Para produção.
```

Para Interagir com a API:

```
No navegador, estão disponíveis 5 rotas:

http://localhost:[PORTA]/path/ - Exemplo.

GET: /books/ - Retorna um JSON com todos os livros salvos.
GET: /books/1012 - Retorna um JSON com um livro específico.
POST: /books/ - Cria um livro a partir de um JSON.
PATCH: /books/3117 - Modifica um livro específico a partir de um JSON.
DELETE: /books/3221 - Deleta um livro específico.
```

## 🛠️ Construído com

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de Programação.
- [Node.JS](https://nodejs.org/pt-br/) - Ambiente de Execução JavaScript.
- [Yarn](https://yarnpkg.com/) - Gerenciador de Pacotes.
- [Nodemon](https://nodemon.io/) - Utilitário de Desenvolvimento.
- [SQLite3](https://www.npmjs.com/package/sqlite3), [SQLite](https://www.sqlite.org/index.html) - Mini Banco de Dados SQL.
- [Node-cache](https://www.npmjs.com/package/node-cache?activeTab=readme) - Cache interno NodeJS simples e rápido.
- [Helmet](https://www.npmjs.com/package/helmet?activeTab=readme) - Ajuda a proteger aplicações Express.JS definindo vários cabeçalhos HTTP.
- [Winston](https://www.npmjs.com/package/winston#logging) - Um logger para quase tudo.
- [Morgan](https://www.npmjs.com/package/morgan?activeTab=readme) - Middleware de logger para solicitações HTTP.
- [Compression](https://www.npmjs.com/package/compression?activeTab=readme) - Um middleware de compressão.

## ✒️ Autor

- **Jonathan Mendes** - [GitHub](https://github.com/DevJonathanMendes)

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](https://github.com/DevJonathanMendes/APIBook/blob/master/LICENSE.md) para detalhes.
