Este documento define a convenção para criação, nomenclatura e fluxo de trabalho com **branches** neste repositório, com o objetivo de manter a organização, rastreabilidade e facilitar o versionamento do projeto.

---

## Tipos de Branches

| Tipo de Branch       | Prefixo           | Descrição                                                                 |
|----------------------|-------------------|---------------------------------------------------------------------------|
| **Principal**        | `main` | Branch estável que representa a versão mais estável.                       |
| **Desenvolvimento**  | `dev`             | Branch de integração de funcionalidades em desenvolvimento.               |
| **Documentação**     | `docs`            | Documentação do projeto.                                  |
| **Funcionalidade**   | `feat/`           | Nova funcionalidade ou feature do sistema.                                |
| **Correção de Bug**  | `fix/`            | Correção de erros ou comportamentos inesperados.                          |
| **Documentação**     | `doc/`            | Alteração na documentação do projeto.                                  |
| **Hotfix**           | `hotfix/`         | Correções urgentes diretamente na branch principal.            |

---

## Regras de Criação e Uso

- **Nunca** commitar diretamente na `main`, `docs`, ou `dev`.
- Sempre criar branches **a partir da `dev`**, exceto `hotfix`.
- Nomear branches utilizando **letras minúsculas**, separando palavras com hífens (`-`).
- O nome da branch deve ser **curto e descritivo**.

### Exemplo de nomes de branches

- `feat/login-de-usuario`
- `fix/erro-cadastro`
- `doc/atualizar-readme`

---

## Fluxo de branches

1. Criar uma branch a partir da `dev`.
2. Desenvolver a funcionalidade ou ajuste.
3. Abrir um **Pull Request (PR)** para a branch `dev`.
4. Associar o PR à **issue correspondente**.