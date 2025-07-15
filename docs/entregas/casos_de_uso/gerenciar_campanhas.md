## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
12/07/2025 | 1.0 | Elaboração da especificação do caso de uso | Caio Venâncio | Willian Silva |

# Especificação de Caso de Uso: Gerenciar campanhas

### 1. Breve Descrição
Este caso de uso permite que agências humanitárias criem, atualizem e desativem campanhas na plataforma. Essas campanhas podem incluir ações como vacinação, distribuição de alimentos ou iniciativas educativas. O objetivo é planejar, organizar e manter atualizadas as campanhas de ajuda humanitária de acordo com a demanda identificada nas regiões atendidas.

#### 1.2 Atores
- Agências Humanitárias

### 2. Fluxo Básico de Eventos

- **2.1** O caso de uso é iniciado quando a agência humanitária acessa a área de gestão de campanhas da plataforma.

- **2.2** O sistema solicita autenticação da agência [FE01].

- **2.3** O sistema valida as credenciais e apresenta o painel de gerenciamento com as opções:
    - Criar nova campanha
    - Editar campanha existente [FA01]
    - Desativar campanha [FA02]

- **2.4** A agência seleciona a opção “Criar nova campanha”.

- **2.5** O sistema apresenta o formulário de cadastro de campanha.

- **2.6** A agência preenche os campos obrigatórios:
    - Nome da campanha
    - Descrição
    - Tipo de ação
    - Público-alvo
    - Região atendida
    - Período de realização
    - Recursos disponíveis
    - Instituição responsável

- **2.7** O sistema valida os dados fornecidos [FE02].

- **2.8** A agência confirma o cadastro da campanha.

- **2.9** O sistema registra a nova campanha e a torna visível para os usuários refugiados da região.

- **2.10** O sistema exibe mensagem de sucesso e encerra o caso de uso.

### 3. Fluxos Alternativos

#### 3.1 Alteração de campanhas

##### 3.1.1 [FA01] Editar campanha já existente  
Este fluxo ocorre no passo **2.3**.

- **3.1.1.1** O sistema apresenta a lista de campanhas ativas da agência.

- **3.1.1.2** A agência seleciona a campanha a ser editada.

- **3.1.1.3** O sistema exibe os dados atuais da campanha.

- **3.1.1.4** A agência edita os campos desejados.

- **3.1.1.5** O sistema valida e salva as alterações [FE02].

- **3.1.1.6** O sistema exibe confirmação de edição e retorna ao painel de gerenciamento.

#### 3.2 Cancelamento de campanha

##### 3.2.1 [FA02] Desativar campanha ativa  
Este fluxo ocorre no passo **2.3**.

- **3.2.1.1** O sistema exibe as campanhas ativas.

- **3.2.1.2** A agência seleciona a campanha que deseja desativar.

- **3.2.1.3** O sistema solicita confirmação.

- **3.2.1.4** A agência confirma a desativação.

- **3.2.1.5** O sistema atualiza o status da campanha para “inativa”.

- **3.2.1.6** O sistema exibe mensagem de sucesso.

### 4. Fluxos de Exceção

#### 4.1 [FE01] Falha na autenticação  
No passo **2.2**, caso a agência forneça credenciais inválidas:

- O sistema exibe mensagem de erro e redireciona para a tela de login.  
- O caso de uso é encerrado.

#### 4.2 [FE02] Dados incompletos ou inválidos  
No passo **2.7** ou **3.1.1.5**, caso existam campos obrigatórios não preenchidos ou inválidos:

- O sistema exibe mensagem de erro e destaca os campos com problemas.  
- Retorna ao passo anterior para correção.

### 5. Pré-Condições

#### 5.1 A agência humanitária deve estar autenticada no sistema.  
#### 5.2 A agência deve ter permissão para cadastrar campanhas.

### 6. Pós-Condições

#### 6.1 A nova campanha estará disponível para visualização pelos refugiados.  
#### 6.2 As campanhas alteradas ou desativadas serão atualizadas no sistema.

### 7. Pontos de Extensão

Não se aplica

### 8. Requisitos Especiais

#### 8.1 A plataforma deve ser acessível via dispositivos móveis em áreas com baixa conectividade.  
#### 8.2 As campanhas devem ser ordenadas por prioridade e data de início no painel da agência.  
#### 8.3 Campos obrigatórios devem ser visualmente destacados durante o preenchimento.
