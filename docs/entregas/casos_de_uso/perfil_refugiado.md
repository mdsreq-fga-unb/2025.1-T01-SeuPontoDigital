## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
14/07/2025 | 1.0 | Elaboração da especificação do caso de uso | Guilherme Moura | |

# Especificação de Caso de Uso: Gerenciar perfil do refugiado

### 1. Breve Descrição
Esta especificação de caso de uso permite ao ator Refugiado consultar e gerenciar as informações de sua conta na plataforma HopeBridge. O fluxo principal descreve a consulta dos dados do perfil seguida pela edição e salvamento das informações. A partir da tela de visualização, o usuário também tem acesso a fluxos alternativos para realizar outras ações de gerenciamento, como alterar a senha ou desativar a conta.

#### 1.2 Atores
- Refugiados    

### 2. Fluxo Básico de Eventos
Este caso de uso é iniciado quando o ator Refugiado seleciona a opção “Meu Perfil”.

1.  O sistema busca e exibe todas as informações atuais do perfil do usuário em modo de leitura.
2.  Juntamente com os dados, o sistema apresenta as seguintes opções de gerenciamento:
    * Editar Informações;
    * Alterar Senha [FA01];
    * Desativar Conta [FA02].
3.  O usuário seleciona a opção “Editar Informações”.
4.  O sistema torna os campos do formulário de perfil editáveis.
5.  O usuário modifica as informações desejadas (ex: atualiza o número de telefone ou a localização atual).
6.  O usuário aciona a opção “Salvar Alterações”.
7.  O sistema valida os dados inseridos de acordo com as regras de negócio [RN01] [FE01].
8.  O sistema salva as novas informações no banco de dados e apresenta a mensagem: “Perfil atualizado com sucesso.”
9.  O caso de uso é encerrado.

### 3. Fluxos Alternativos

#### 3.1 Ações de Segurança da Conta

##### 3.1.1 FA01 - Alterar Senha
1.  No passo 2 do Fluxo Básico, o usuário seleciona a opção "Alterar Senha".
2.  O sistema exibe um formulário com os campos: "Senha Atual", "Nova Senha" e "Confirmar Nova Senha".
3.  O usuário preenche os campos e aciona a opção “Confirmar Alteração”.
4.  O sistema valida se a “Senha Atual” fornecida está correta [FE02].
5.  O sistema valida se a “Nova Senha” atende aos critérios de segurança e se corresponde ao campo de confirmação [RN02] [FE03].
6.  O sistema atualiza a senha do usuário e exibe a mensagem: “Senha alterada com sucesso.”
7.  O fluxo continua a partir do passo 9 do Fluxo Básico.

##### 3.1.2 FA02 - Desativar Conta
1.  No passo 2 do Fluxo Básico, o usuário seleciona a opção "Desativar Conta".
2.  O sistema exibe uma mensagem de alerta, explicando as consequências da desativação.
3.  O sistema solicita que o usuário confirme a ação digitando sua senha atual para verificação.
4.  O usuário digita a senha e aciona a opção “Confirmar Desativação”.
5.  O sistema valida se a senha fornecida está correta [FE02].
6.  O sistema marca a conta do usuário como "inativa", efetua o logout e exibe uma mensagem final de confirmação.
7.  O fluxo continua a partir do passo 9 do Fluxo Básico.

### 4. Fluxos de Exceção

#### 4.1 FE01 - Dados de Perfil Inválidos
1.  No passo 7 do FB, o sistema detecta que um ou mais campos não atendem ao formato esperado.
2.  O sistema destaca os campos com erro e exibe uma mensagem explicativa para cada um.
3.  O caso de uso retorna ao passo 5 do FB para que o usuário corrija os dados.

#### 4.2 FE02 - Senha Atual Incorreta
1.  No passo 4 do FA01 ou no passo 5 do FA02, o sistema detecta que a senha digitada não corresponde à registrada.
2.  O sistema exibe a mensagem: “A senha atual está incorreta. Tente novamente.”
3.  O caso de uso retorna ao passo anterior do respectivo fluxo alternativo.

#### 4.3 FE03 - Nova Senha Inválida
1.  No passo 5 do FA01, o sistema detecta que a "Nova Senha" e a "Confirmar Nova Senha" não são idênticas ou não atendem à política de segurança [RN02].
2.  O sistema exibe uma mensagem explicando o erro (ex: "As senhas não conferem" ou "A senha não atende aos requisitos de segurança.").
3.  O caso de uso retorna ao passo 2 do FA01.

### 5. Pré-Condições

#### 5.1 O Refugiado deve estar autenticado no sistema.

#### 5.2 Deve existir uma rede de serviços (abrigos, clínicas, etc.) cadastrada na plataforma.

### 6. Regras de Negócio

#### 6.1 RN01 - Validação de Informações do Perfil
| Nome do Campo               | Formato                    | Obrigatoriedade | Valores / Exemplos                       |
| :-------------------------- | :------------------------- | :-------------- | :--------------------------------------- |
| **Nome Completo** | Texto até 100 caracteres   | Sim             |                                          |
| **Email de Contato** | Formato de e-mail válido   | Sim             | `exemplo@email.com`                      |
| **Telefone de Contato** | Formato Internacional | Não | `+970 59 123 4567` |
| **Localização Atual** | Texto                      | Sim             | "Campo de Refugiados de Jabalia"         |
| **Tamanho da Família** | Número Inteiro             | Sim             | `4`                                      |
| **Necessidades Específicas**| Seleção Múltipla           | Sim             | Abrigo; Assistência Médica; Alimentos    |

#### 6.2 RN02 - Política de Senha
A nova senha deve conter, no mínimo, 8 caracteres, incluindo letras, números e pelo menos um caractere especial (ex: !, @, #, $).

### 7. Pós-Condições

#### 7.1 (Se o FB foi concluído) As informações do perfil do Refugiado foram atualizadas com sucesso.

#### 7.2 (Se FA01 foi executado) A senha do Refugiado foi alterada com sucesso.

#### 7.3 (Se FA02 foi executado) A conta do Refugiado foi marcada como inativa e sua sessão encerrada.

### 8. Pontos de Extensão
Não se aplica.

### 9. Requisitos Especiais
Não se aplica.

### 10. Informações Adicionais
Não se aplica.