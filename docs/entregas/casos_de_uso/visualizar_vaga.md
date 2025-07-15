## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
08/07/2025 | 1.0 | Elaboração da especificação do caso de uso | Lucas Guimarães | Willian Silva |

# Especificação de Caso de Uso: Visualizar vaga de trabalho

### 1. Breve Descrição
Este caso de uso permite que refugiados visualizem as vagas de trabalho disponíveis na plataforma, de acordo com o seu perfil e localização. As vagas podem incluir detalhes como descrição da função, requisitos, benefícios e dados do empregador. Após visualizar uma vaga, o refugiado poderá optar por efetuar inscrição em cursos relacionados à vaga, caso disponíveis.

#### 1.2 Atores
- Refugiados

### 2. Fluxo Básico de Eventos

- **2.1** O caso de uso é iniciado quando o refugiado acessa a área de oportunidades da plataforma.

- **2.2** O sistema autentica o refugiado e apresenta um painel com os seguintes filtros de pesquisa [FE01]:
    - área profissional
    - localização
    - tipo de vaga

- **2.3** O refugiado seleciona os filtros desejados e solicita a busca.

- **2.4** O sistema recupera as vagas disponíveis com base nos filtros e perfil do usuário [FE02].

- **2.5** O sistema apresenta a lista de vagas disponíveis com dados relevantes: título da vaga, descrição, requisitos e empregador.

- **2.6** O refugiado seleciona uma vaga específica para visualizar os detalhes completos.

- **2.7** O sistema apresenta os detalhes da vaga e, caso aplicável, sugere cursos de capacitação relacionados à vaga [EX01].

- **2.8** O sistema registra a visualização da vaga e encerra o caso de uso.

### 3. Fluxos Alternativos

#### 3.1 Nenhuma vaga encontrada

##### 3.1.1 [FA01] Vagas indisponíveis para os filtros aplicados  
Este fluxo alternativo ocorre no passo **2.4**, quando não há nenhuma vaga correspondente aos filtros selecionados.

**3.1.1.1** O sistema confirma que não há vagas disponíveis conforme os filtros aplicados [FE02].

**3.1.1.2** O sistema exibe mensagem informando a ausência de vagas e sugere ajustes nos filtros de busca.

**3.1.1.3** O sistema retorna à tela de filtros para nova tentativa de pesquisa.

**3.1.1.4**:retorna ao passo **2.3**.

### 4. Fluxos de Exceção

#### 4.1 [FE01] Falha na autenticação do refugiado  
No passo **2.2**, se o sistema não conseguir autenticar o usuário: 

- O sistema exibe uma mensagem de erro e redireciona para a tela de login.  
- O caso de uso é encerrado.

#### 4.2 [FE02] Erro na recuperação de vagas  
Nos passos **2.4** ou **3.1.1.1**, se o sistema não conseguir recuperar os dados de vagas:  

- O sistema exibe uma mensagem de erro e retorna ao passo **2.2**.

### 5. Pré-Condições

#### 5.1 O refugiado deve estar autenticado na plataforma.  
#### 5.2 O refugiado deve ter um perfil com dados completos: localização, habilidades e preferências profissionais.

### 6. Pós-Condições

#### 6.1 O sistema registra a visualização da vaga.  
#### 6.2 O refugiado poderá ter iniciado o processo de inscrição em curso relacionado à vaga [EX01].

### 7. Pontos de Extensão

#### 7.1 [EX01] Efetuar Inscrição em Curso  
Extensão no passo **2.7**, quando o refugiado opta por se inscrever em um curso de capacitação relacionado à vaga.

### 8. Requisitos Especiais

#### 8.1 O sistema deve ser responsivo e acessível via dispositivos móveis.  
#### 8.2 O tempo máximo de carregamento da lista de vagas não deve ultrapassar 2 segundos.  
#### 8.3 Os dados das vagas devem ter suporte à acessibilidade.