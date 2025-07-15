## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
08/07/2025 | 1.0 | Elaboração da especificação do caso de uso | Davi de Aguiar | Willian Silva |

## Especificação de Caso de Uso: Monitorar interesse dos refugiados

### 1. Breve Descrição
Este caso de uso permite que empregadores parceiros visualizem e acompanhem o interesse demonstrado por refugiados nas vagas publicadas por eles. O sistema exibe os refugiados que se candidataram às oportunidades, junto com o status das candidaturas. A partir dessa visualização, o empregador pode realizar ações adicionais, como registrar entrevistas com os candidatos.

#### 1.2 Atores
- Empregadores Parceiros

### 2. Fluxo Básico de Eventos
Este caso de uso é iniciado quando o empregador parceiro acessa a área de monitoramento de candidaturas da plataforma.

- **2.1** O caso de uso é iniciado quando o empregador parceiro acessa a área de monitoramento de candidaturas da plataforma.

- **2.2** O sistema autentica o empregador e exibe a lista de vagas ativas publicadas por ele [FE01].

- **2.3** O empregador seleciona uma vaga específica.

- **2.4** O sistema valida se há candidaturas registradas para a vaga [FE02].

- **2.5** O sistema apresenta a lista de refugiados interessados na vaga, com dados como: nome, qualificação e status da candidatura [FA01].

- **2.6** O empregador pode aplicar filtros, visualizar detalhes da candidatura e, se desejar, iniciar o processo de entrevista [EX01].

- **2.7** O sistema registra a visualização e encerra o caso de uso.

### 3. Fluxos Alternativos

#### 3.1 Candidaturas não encontradas

##### 3.1.1 [FA01] Nenhuma candidatura associada à vaga  
Este fluxo alternativo ocorre no passo **2.1.4**, quando a vaga selecionada não possui candidatos.

**3.1.1.1** O sistema confirma que não existem registros de candidaturas associadas à vaga [FE02].

**3.1.1.2** O sistema informa que ainda não houve interesse registrado por refugiados.

**3.1.1.3** O sistema retorna à tela de seleção de vaga.

**3.1.1.4**: retorna ao passo **2.1.3** do fluxo principal.

### 4. Fluxos de Exceção

#### 4.1 [FE01] Falha na autenticação do empregador  
No passo **2.1.2**, se o sistema não conseguir autenticar o empregador: 

- O sistema exibe uma mensagem de erro e redireciona para a tela de login.  
- O caso de uso é encerrado.

#### 4.2 [FE02] Erro na recuperação dos dados de candidatura  
Nos passos **2.1.4** e **3.1.1.1**, se o sistema não conseguir acessar os dados de candidatura:  

- O sistema exibe mensagem de erro e retorna ao passo **2.1.2**.

### 5. Pré-Condições

#### 5.1 O empregador parceiro deve estar autenticado na plataforma.  
#### 5.2 O empregador deve ter ao menos uma vaga publicada.

### 6. Pós-Condições

#### 6.1 O sistema registra a visualização das candidaturas pelo empregador.  
#### 6.2 O empregador poderá ter iniciado o processo de registro de entrevista [EX01].



### 7. Pontos de Extensão

#### 7.1 [EX01] Registrar Entrevista  
Extensão no passo **2.1.6**, quando o empregador opta por registrar uma entrevista com o refugiado.

### 8. Requisitos Especiais

#### 8.1 O sistema deve ser responsivo e acessível via dispositivos móveis.  
#### 8.2 O tempo máximo de carregamento da lista de candidaturas não deve ultrapassar 3 segundos. 