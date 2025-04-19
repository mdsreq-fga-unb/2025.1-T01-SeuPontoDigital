Este documento define as diretrizes para a criação, revisão e aceitação de **Pull Requests (PRs)** neste repositório, com o objetivo de manter a organização, rastreabilidade e facilitar o versionamento do projeto.

---

## Regras Gerais

- Todos os PRs devem ser feitos para as branches `dev` ou `main`, conforme o fluxo de trabalho.
- Nunca faça PR diretamente na `main` sem passar pela `dev`, exceto em casos de `hotfix`.
- Todo PR deve estar **associado a uma issue** (se houver) e seguir a **nomenclatura padrão**.

---

## Nome do Pull Request

- O **prefixo da issue** (ex: `[BUG]`, `[FEATURE]`, etc.)
- Um **resumo curto da alteração**
- O **número da issue** (se houver)

**Exemplos:**

- `[BUG] Corrige erro de login (#42)`
- `[FEAT] Implementa tela de cadastro (#15)`
- `[DOC] Atualiza README com novas instruções (#8)`

---

## Merge

- O merge deve ser feito (pelo criador da PR) **apenas após aprovação** de pelo menos um revisor.