## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
14/07/2025 | 1.0 | Elaboração da especificação do caso de uso | Willian Silva | João Pedro |

# Especificação de Caso de Uso: Publicar cursos de capacitação

### 1. Breve Descrição
Este caso de uso permite que empregadores parceiros publiquem cursos de capacitação na plataforma "HopeBridge", através de informações como título, descrição, requisitos, datas, vagas e modalidade. O objetivo é disponibilizar oportunidades de formação para refugiados. Após a publicação, o empregador pode optar por visualizar o feedback recebido sobre cursos anteriores.

#### 1.2 Atores
- Empregadores Parceiros

### 2. Fluxo Básico de Eventos

- **2.1** O caso de uso é iniciado quando o empregador parceiro acessa a área de cursos da plataforma.

- **2.2** O sistema solicita autenticação do usuário [FE01].

- **2.3** O sistema valida o perfil e permissões do empregador.

- **2.4** O sistema apresenta as opções:
    - Publicar novo curso
    - Editar cursos publicados [FA01]
    - Consultar feedback [EX01]

- **2.5** O empregador seleciona a opção “Publicar novo curso”.

- **2.6** O sistema exibe o formulário de cadastro de curso.

- **2.7** O empregador preenche os campos obrigatórios:
    - Título
    - Descrição
    - Requisitos
    - Carga horária
    - Modalidade (presencial/online)
    - Endereço (caso presencial)
    - Datas de início e término
    - Número de vagas
    - Nome da instituição ofertante
    - Contato para dúvidas

- **2.8** O sistema valida as informações fornecidas [FE02].

- **2.9** O empregador revisa os dados e confirma a publicação [FA02].

- **2.10** O sistema registra o curso no banco de dados e o torna visível para os refugiados.

- **2.11.** O sistema apresenta mensagem de sucesso com a opção de:
    - Publicar outro curso  
    - Visualizar cursos publicados  
    - Acessar feedback [EX01]

- **2.12** O caso de uso é encerrado.

### 3. Fluxos Alternativos

#### 3.1 Edição de curso existente

##### 3.1.1 [FA01] Empregador opta por editar um curso publicado  
Este fluxo ocorre no passo **2.4**.

- **3.1.1.1** O sistema exibe a lista de cursos cadastrados pelo empregador.

- **3.1.1.2** O empregador seleciona um curso.

- **3.1.1.3** O sistema exibe os dados atuais do curso.

- **3.1.1.4** O empregador altera os campos desejados e confirma a atualização.

- **3.1.1.5** O sistema valida e salva as alterações [FE02].

- **3.1.1.6** O sistema exibe confirmação de atualização.

- **3.1.1.7**: retorna ao passo **2.4**.

#### 3.2 Revisão antes da publicação

##### 3.2.1 [FA02] Empregador decide revisar os dados antes de confirmar  
Este fluxo ocorre no passo **2.9**.

- **3.2.1.1** O empregador solicita pré-visualização do curso.

- **3.2.1.2** O sistema apresenta os dados formatados como serão exibidos aos refugiados.

- **3.2.1.3** O empregador confirma ou edita os dados [FA01].

- **3.2.1.4**: retorna ao passo **2.9**.

#### 3.3 Publicação cancelada

##### 3.3.1 [FA03] O empregador cancela a publicação  
Este fluxo ocorre no passo **2.9**.

- **3.3.1.1** O empregador opta por cancelar a publicação.

- **3.3.1.2** O sistema descarta os dados preenchidos.

- **3.3.1.3** O sistema retorna ao menu de cursos (passo **2.4**).

### 4. Fluxos de Exceção

#### 4.1 [FE01] Falha na autenticação do empregador  
No passo **2.2**:  

- O sistema exibe mensagem de erro.  
- Redireciona para tela de login.  
- O caso de uso é encerrado.

#### 4.2 [FE02] Dados inválidos ou incompletos  
No passo **2.8** ou **3.1.1.5**:  

- O sistema detecta campos obrigatórios não preenchidos ou inválidos.  
- Exibe mensagens de erro específicas.  
- Retorna ao passo **2.7** ou **3.1.1.4**.

### 5. Pré-Condições

#### 5.1 O empregador deve estar autenticado e autorizado na plataforma.  
#### 5.2 O empregador deve possuir cadastro validado como parceiro.

### 6. Pós-Condições

#### 6.1 O curso de capacitação estará disponível para visualização pelos refugiados.  
#### 6.2 O curso poderá ser editado posteriormente pelo empregador.  
#### 6.3 O empregador poderá acessar o feedback dos participantes [EX01].

### 7. Pontos de Extensão

#### 7.1 [EX01] Receber Feedback  
Extensão no passo **2.11**, caso o empregador opte por visualizar avaliações de cursos anteriores.

### 8. Requisitos Especiais

#### 8.1 O formulário deve ser responsivo para dispositivos móveis.  
#### 8.2 O tempo de submissão não deve exceder 5 segundos.  