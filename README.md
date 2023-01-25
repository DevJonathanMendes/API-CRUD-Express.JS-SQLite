# APIBook

Uma API CRUD sobre Livros. 

## 🚀 Começando

### 📋 Pré-requisitos

- [Node.JS](https://nodejs.org/pt-br/) - Ambiente de Execução JavaScript.
- [SQLite3](https://www.npmjs.com/package/sqlite3) - Mini Banco de Dados SQL.

### 🔧 Instalação

No terminal do VS Code:

| Comando     | Descrição                               |
|:------------|:----------------------------------------|
| `yarn`      | Baixas as dependências (**Obrigatório**)|
| `yarn start`| Iniciar em modo de produção             |
| `yarn dev`  | Iniciar em modo de desenvolvimento      |
| `yarn test` | Iniciar os testes                       |

## 💻 Documentação da API

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item |

### Retorna todos os itens no formato JSON

```http
  GET /books/
```

### Retorna um item no formato JSON

```http
  GET /books/${id}
```

### Cria um item a partir de um JSON

```http
  POST /books/
```

### Modifica um item a partir de um JSON

```http
  PATCH /books/${id}
```

### Deleta um item

```http
  DELETE /books/${id}
```

## 🛠️ Construído com

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de Programação.
- [Node.JS](https://nodejs.org/pt-br/) - Ambiente de Execução JavaScript.
- [Yarn](https://yarnpkg.com/) - Gerenciador de Pacotes.
- [Nodemon](https://nodemon.io/) - Utilitário de Desenvolvimento.
- [Express.JS](https://expressjs.com/pt-br/) - Framework web rápido, flexível e minimalista para Node.JS.
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
