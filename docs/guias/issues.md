Este documento define o padrão para criação, organização e acompanhamento de **issues** neste repositório, com o objetivo de manter a organização, rastreabilidade e facilitar o versionamento do projeto.

---

## Tabela de Labels e Tipos de Issues

| Tipo de Issue           | Prefixo no Título | Label GitHub   | Descrição                                                                 |
|-------------------------|-------------------|----------------|---------------------------------------------------------------------------|
| **Bug**                 | `[BUG]`           | `bug`          | Relato de erro, falha ou comportamento inesperado.                        |
| **Documentação**        | `[DOC]`           | `documentation`| Atualizações ou melhorias na documentação do projeto.                     |
| **História de Usuário** | `[US]`            | `user story`   | Funcionalidade sob a perspectiva do usuário final.                        |
| **Nova Funcionalidade** | `[FEAT]`       | `enhancement`  | Desenvolvimento de uma nova feature no sistema.                           |
| **Tarefa**              | `[TASK]`          | `task`         | Atividade operacional que não se enquadra como funcionalidade ou bug.     |

---

## Como Criar uma Issue

- O título da issue deve começar com o **prefixo correspondente** entre colchetes.

- Sempre **associar a label correta**.

- Utilizar a descrição para explicar claramente:

    - O que deve ser feito (ou qual é o problema)
    - Qual o comportamento esperado
    - Passos para reproduzir (se aplicável)

- Adicionar evidências visuais (prints, logs, links) sempre que possível.

---

## Exemplos de Issues

**Exemplo de Issue: Bug**

**Título**:  
`[BUG] Erro ao tentar cadastrar novo usuário`

**Labels**:  
`bug`

**Descrição do problema:**
Ao tentar cadastrar um novo usuário pelo formulário `/cadastro`, uma exceção do tipo `IntegrityError` é lançada.

**Passos para reproduzir:**
1. Vá para `/cadastro`
2. Preencha os dados corretamente
3. Clique em “Cadastrar”
4. Observe o erro na tela

**Comportamento esperado:**
O sistema deve redirecionar para a tela de login após o cadastro ser concluído.