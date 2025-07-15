# Especificação de Caso de Uso: Gerenciar Perfil da Agência

### 1. Breve Descrição
Esta especificação de caso de uso permite ao ator Agência Humanitária consultar e gerenciar as informações de sua organização na plataforma HopeBridge. O fluxo principal descreve a consulta e a edição dos dados cadastrais. A partir da tela principal do perfil, a agência também tem acesso a um fluxo alternativo para gerenciar os usuários vinculados à sua organização.

### 2. Fluxo Básico de Eventos
Este caso de uso é iniciado quando o usuário da agência seleciona a opção “Perfil da Organização”.

1.  O sistema busca e exibe todas as informações cadastrais atuais da agência em modo de leitura.
2.  O sistema apresenta as seguintes opções de gerenciamento:
    * Editar Informações da Agência;
    * Gerenciar Usuários da Agência [FA01].
3.  O usuário seleciona a opção “Editar Informações da Agência”.
4.  O sistema torna os campos do formulário de perfil da agência editáveis.
5.  O usuário modifica as informações desejadas (ex: atualiza o telefone de contato ou o endereço da sede).
6.  O usuário aciona a opção “Salvar Alterações”.
7.  O sistema valida os dados inseridos de acordo com as regras de negócio [RN01] [FE01].
8.  O sistema salva as novas informações no banco de dados e apresenta a mensagem: “Perfil da agência atualizado com sucesso.”
9.  O caso de uso é encerrado.

### 3. Fluxos Alternativos

#### 3.1 Gerenciamento de Membros da Agência

##### 3.1.1 FA01 - Gerenciar Usuários da Agência
1.  No passo 2 do Fluxo Básico, o usuário seleciona a opção "Gerenciar Usuários da Agência".
2.  O sistema exibe a lista de usuários atuais da agência e a opção “Convidar Novo Usuário”.
3.  O usuário seleciona a opção “Convidar Novo Usuário”.
4.  O sistema exibe um formulário solicitando o nome e o e-mail do novo membro.
5.  O usuário preenche os dados e aciona a opção “Enviar Convite”.
6.  O sistema valida se o e-mail inserido tem um formato válido [FE02].
7.  O sistema envia um e-mail de convite para o endereço fornecido e adiciona o usuário à lista com o status “Pendente”.
8.  O sistema exibe a mensagem: “Convite enviado com sucesso.”
9.  O fluxo retorna ao passo 1 do Fluxo Básico (tela de visualização do perfil da agência).

### 4. Fluxos de Exceção

#### 4.1 FE01 - Dados de Perfil da Agência Inválidos
1.  No passo 7 do FB, o sistema detecta que um ou mais campos não atendem ao formato esperado (ex: site inválido, campo obrigatório em branco).
2.  O sistema destaca os campos com erro e exibe uma mensagem explicativa para cada um.
3.  O caso de uso retorna ao passo 5 do FB para que o usuário corrija os dados.

#### 4.2 FE02 - Email de Convite Inválido
1.  No passo 6 do FA01, o sistema detecta que o e-mail fornecido para o novo usuário não possui um formato válido.
2.  O sistema exibe a mensagem: “O formato do e-mail é inválido. Por favor, corrija-o.”
3.  O caso de uso retorna ao passo 4 do FA01.

### 5. Pré-Condições

#### 5.1 O usuário da Agência Humanitária deve estar autenticado no sistema com permissões de administrador da conta da agência.

### 6. Regras de Negócio

#### 6.1 RN01 - Validação de Informações da Agência
| Nome do Campo | Formato | Obrigatoriedade | Valores / Exemplos |
| :--- | :--- | :--- | :--- |
| **Nome da Organização** | Texto até 200 caracteres | Sim | |
| **Responsável Legal** | Texto até 150 caracteres | Sim | |
| **Email de Contato** | Formato de e-mail válido | Sim | `contato@agencia.org` |
| **Telefone de Contato** | Formato Internacional | Sim | `+970 59 123 4567` |
| **Website Oficial** | Formato de URL válido | Não | `https://www.agencia.org` |
| **Endereço da Sede** | Texto | Não | |
| **Área de Atuação** | Seleção Múltipla | Sim | Saúde; Alimentação; Abrigo; Educação |

### 7. Pós-Condições

#### 7.1 (Se o FB foi concluído) As informações cadastrais da Agência Humanitária foram atualizadas com sucesso.

#### 7.2 (Se FA01 foi executado) Um convite foi enviado para um novo usuário e a lista de membros da agência foi atualizada.

### 8. Pontos de Extensão
Não se aplica.

### 9. Requisitos Especiais
Não se aplica.

### 10. Informações Adicionais
Não se aplica.