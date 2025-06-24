### Product Backlog Building - TechFix
O **Product Backlog Building (PBB)** é uma abordagem que orienta times ágeis na construção e organização de uma lista de backlog colaborativamente. Para isso, a metodologia conta com uma ferramenta visual chamada Canvas PBB, que atua como um mapa de trabalho e auxilia o time na identificação de personas, funcionalidades, benefícios e PBIs (Product Backlog Items). 

Dessa forma, para a prática do PBB, foi elaborada a priorização do Product Backlog com a aplicação da técnica **COORG** (Classificar, Ordenar e Organizar), na qual as funcionalidades foram dispostas em uma sequência lógica, estruturadas como uma narrativa da esquerda para a direita. Nessa organização, os PBIs com maior prioridade aparecem nas posições superiores, enquanto os de menor prioridade ficam nas inferiores, uma vez que a priorização considerou os critérios de frequência de uso e valor de negócio como valores quantitativos.

Diante disso, segue a elaboração do estudo de caso da TechFix abaixo:

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVInp8zlQ=/?embedMode=view_only_without_ui&moveToViewport=-3123,-7999,6105,3324&embedId=243117769261" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Histórias de usuário 

### 1. Gerenciar agendamento de atendimento
- 1.1: Eu, como atendente, posso definir o horário do atendimento para evitar conflitos na agenda.
- 1.2: Eu, como atendente, posso alterar o técnico do atendimento para adequar a escala da equipe.
- 1.3: Eu, como atendente, posso visualizar os atendimentos por técnico para distribuir a carga de trabalho.
- 1.4: Eu, como atendente, posso notificar o cliente sobre alterações no agendamento para garantir o aviso prévio.
- 1.5: Eu, como atendente, posso remover um atendimento da agenda para liberar o horário.

### 2. Gerenciar registro de serviço
- 2.1: Eu, como técnico de campo, posso criar um registro de serviço para documentar o atendimento realizado.
- 2.2: Eu, como técnico de campo, posso capturar informações do atendimento para detalhar o serviço prestado.
- 2.3: Eu, como técnico de campo, posso associar evidências ao registro para garantir a rastreabilidade do atendimento.
- 2.4: Eu, como técnico de campo, posso encerrar o registro de serviço para finalizar o atendimento no sistema.

### 3. Acompanhar solicitação em tempo real
- 3.1: Eu, como cliente corporativo, posso acompanhar o status da solicitação para me preparar para o atendimento.
- 3.2: Eu, como cliente corporativo, posso receber atualizações sobre o progresso para me manter informado.
- 3.3: Eu, como cliente corporativo, posso visualizar as etapas da solicitação para entender o andamento do serviço.

### 4. Gerar relatório pós-serviço
- 4.1: Eu, como técnico de campo, posso produzir um documento técnico para formalizar o atendimento realizado.
- 4.2: Eu, como técnico de campo, posso registrar dados técnicos padronizados para gerar relatórios consistentes.
- 4.3: Eu, como técnico de campo, posso compartilhar o relatório final com o cliente para garantir o alinhamento das informações.
- 4.4: Eu, como técnico de campo, posso enviar o relatório técnico para a central para garantir a rastreabilidade do atendimento.

### 5. Analisar feedback do cliente
- 5.1: Eu, como diretora de operações, posso gerar estatísticas de feedback para visualizar o nível de satisfação.
- 5.2: Eu, como diretora de operações, posso armazenar as avaliações dos clientes para construir um histórico de satisfação.
- 5.3: Eu, como diretora de operações, posso visualizar dados de feedback para tomar decisões de melhoria contínua.

### 6. Monitorar desempenho operacional
- 6.1: Eu, como diretora de operações, posso acompanhar o cumprimento de prazos para avaliar a eficiência da equipe.
- 6.2: Eu, como diretora de operações, posso visualizar o número de atendimentos por técnico para equilibrar a distribuição de tarefas.
- 6.3: Eu, como diretora de operações, posso calcular o percentual de problemas resolvidos para monitorar a qualidade do serviço.
- 6.4: Eu, como diretora de operações, posso gerar um dashboard de desempenho para obter uma visão geral da operação.
- 6.5: Eu, como diretora de operações, posso exportar indicadores de desempenho para compartilhar os resultados com a diretoria.

## Critérios de aceitação das histórias de usuários

### 1. Gerenciar agendamento de atendimento
   
- 1.1 Eu, como atendente, posso definir o horário do atendimento para evitar conflitos na agenda.
    - O sistema deve exibir a disponibilidade de horários antes da definição.
    - Não deve ser possível agendar dois atendimentos no mesmo horário para o mesmo técnico.
    - Deve haver confirmação visual do horário agendado.

- 1.2 Eu, como atendente, posso alterar o técnico do atendimento para adequar a escala da equipe.
    - O sistema deve permitir consultar a disponibilidade dos técnicos.
    - Após a alteração, o técnico anterior deve ser notificado automaticamente.

- 1.3 Eu, como atendente, posso visualizar os atendimentos por técnico para distribuir a carga de trabalho.
    - A visualização deve permitir filtro por período (dia/semana).
    - Cada técnico deve ter uma listagem clara com horários e serviços.

- 1.4 Eu, como atendente, posso notificar o cliente sobre alterações no agendamento para garantir o aviso prévio.
    - O cliente deve receber uma notificação via e-mail ou SMS após a alteração.
    - A notificação deve incluir data, hora e nome do técnico.
    - O envio da notificação deve ser registrado no sistema.
    - O sistema deve exibir um alerta se a notificação falhar.

- 1.5 Eu, como atendente, posso remover um atendimento da agenda para liberar o horário.
    - A remoção deve solicitar confirmação do usuário.
    - O horário liberado deve voltar a ser listado como disponível.

### 2. Gerenciar registro de serviço

- 2.1 Eu, como técnico de campo, posso criar um registro de serviço para documentar o atendimento realizado.
    - O registro deve conter data, local e cliente.
    - O sistema deve gerar um identificador único para cada registro.

- 2.2 Eu, como técnico de campo, posso capturar informações do atendimento para detalhar o serviço prestado.
    - Deve ser possível adicionar observações manuais.
    - Campos obrigatórios devem ser destacados antes do envio.
    - O sistema deve permitir salvar rascunhos.

- 2.3 Eu, como técnico de campo, posso associar evidências ao registro para garantir a rastreabilidade do atendimento.
    - O sistema deve aceitar imagens e documentos anexos.
    - O tamanho máximo de upload deve ser informado.
    - Os anexos devem ficar visíveis no histórico do atendimento.

- 2.4 Eu, como técnico de campo, posso encerrar o registro de serviço para finalizar o atendimento no sistema.
    - Só deve ser possível encerrar se todos os campos obrigatórios estiverem preenchidos.
    - O sistema deve registrar data e hora do encerramento.

### 3. Acompanhar solicitação em tempo real

- 3.1 Eu, como cliente corporativo, posso acompanhar o status da solicitação para me preparar para o atendimento.
    - O status deve ser atualizado automaticamente conforme o andamento.
    - O cliente deve ser capaz de visualizar a previsão de chegada do técnico.
    - A interface deve ser acessível via web e dispositivos móveis.

- 3.2 Eu, como cliente corporativo, posso receber atualizações sobre o progresso para me manter informado.
    - As notificações devem ser enviadas por e-mail ou app.
    - Deve ser possível configurar a frequência das atualizações.

- 3.3 Eu, como cliente corporativo, posso visualizar as etapas da solicitação para entender o andamento do serviço.
    - As etapas devem estar organizadas em ordem cronológica.
    - Cada etapa deve ter data e responsável associados.

### 4. Gerar relatório pós-serviço

- 4.1 Eu, como técnico de campo, posso produzir um documento técnico para formalizar o atendimento realizado.
    - O relatório deve conter dados padronizados e campos abertos.
    - Deve ser possível exportar em PDF.
    - O sistema deve armazenar o histórico de relatórios emitidos.

- 4.2 Eu, como técnico de campo, posso registrar dados técnicos padronizados para gerar relatórios consistentes.
    - Campos obrigatórios devem seguir um padrão definido.
    - O sistema deve validar o formato das entradas numéricas.

- 4.3 Eu, como técnico de campo, posso compartilhar o relatório final com o cliente para garantir o alinhamento das informações.
    - O envio deve ser feito diretamente pelo sistema.
    - O cliente deve receber um link seguro para acesso.

- 4.4 Eu, como técnico de campo, posso enviar o relatório técnico para a central para garantir a rastreabilidade do atendimento.
    - A central deve receber uma cópia em tempo real.
    - O sistema deve permitir registrar o nome do responsável pelo recebimento.

### 5. Analisar feedback do cliente

- 5.1 Eu, como diretora de operações, posso gerar estatísticas de feedback para visualizar o nível de satisfação.
    - O sistema deve calcular médias, medianas e frequências das avaliações.
    - Os dados devem ser atualizados em tempo real.
    - Deve haver opção de exportação em CSV.

- 5.2 Eu, como diretora de operações, posso armazenar as avaliações dos clientes para construir um histórico de satisfação.
    - As avaliações devem ficar vinculadas a cada atendimento.
    - O sistema deve manter os dados por no mínimo 12 meses.

- 5.3 Eu, como diretora de operações, posso visualizar dados de feedback para tomar decisões de melhoria contínua.
    - Os dados devem estar organizados por período e tipo de serviço.
    - O sistema deve permitir aplicar filtros customizáveis.

### 6. Monitorar desempenho operacional

- 6.1 Eu, como diretora de operações, posso acompanhar o cumprimento de prazos para avaliar a eficiência da equipe.
    - O sistema deve exibir prazos planejados vs. prazos reais.
    - As tarefas atrasadas devem ser destacadas visualmente.
    - Deve ser possível exportar os dados em planilha.

- 6.2 Eu, como diretora de operações, posso visualizar o número de atendimentos por técnico para equilibrar a distribuição de tarefas.
    - A visualização deve incluir filtros por período.
    - Cada técnico deve ter um totalizador de atendimentos concluídos.

- 6.3 Eu, como diretora de operações, posso calcular o percentual de problemas resolvidos para monitorar a qualidade do serviço.
    - O sistema deve considerar apenas atendimentos encerrados.
    - O cálculo deve ser baseado em um campo de validação de resolução.
    - O resultado deve ser exibido em gráfico de pizza.
    - Deve ser possível comparar por técnico ou equipe.

- 6.4 Eu, como diretora de operações, posso gerar um dashboard de desempenho para obter uma visão geral da operação.
    - O dashboard deve incluir KPIs como tempo médio, taxa de satisfação e volume por técnico.
    - Os dados devem ser atualizados diariamente.

- 6.5 Eu, como diretora de operações, posso exportar indicadores de desempenho para compartilhar os resultados com a diretoria.
    - A exportação deve estar disponível em PDF e Excel.
    - Deve ser possível selecionar o período e os indicadores a incluir.

## BDDs das histórias de usuários

Das 24 histórias de usuário, a técnica BDD foi aplicada em 12 delas. Abaixo estão as histórias selecionadas, acompanhadas de seus respectivos cenários de BDD:

### 1.2 – Alterar o técnico do atendimento

- Cenário 1: Alteração com técnico disponível
    - Dado que o atendimento está agendado
    - Quando o atendente selecionar um técnico disponível
    - Então o sistema deve atualizar o atendimento com o novo técnico

- Cenário 2: Tentativa de alteração para técnico com conflito de agenda
    - Dado que o técnico escolhido já possui outro atendimento no mesmo horário
    - Quando o atendente tentar alterar o técnico
    - Então o sistema deve exibir uma mensagem de conflito de agenda

- Cenário 3: Alteração de técnico com solicitação de cliente corporativo
    - Dado que o atendimento é para um cliente corporativo com SLA crítico
    - Quando o atendente tentar alterar o técnico
    - Então o sistema deve solicitar confirmação do cliente antes da alteração

### 1.3 – Exibir os atendimentos por técnico

- Cenário 1: Exibir atendimentos futuros
    - Dado que o atendente acessa o painel de agendamentos
    - Quando selecionar um técnico
    - Então o sistema deve listar os atendimentos futuros daquele técnico

- Cenário 2: Exibir atendimentos por período
    - Dado que o atendente define um intervalo de datas
    - Quando solicitar a visualização por técnico
    - Então o sistema deve exibir os atendimentos daquele técnico dentro do período selecionado

### 1.5 – Remover um atendimento da agenda

- Cenário 1: Cancelamento de um atendimento futuro
    - Dado que o atendimento está agendado para uma data futura
    - Quando o atendente optar por remover o agendamento
    - Então o sistema deve excluir o registro e liberar o horário na agenda

### 2.1 – Criar um registro de serviço

- Cenário 1: Iniciar novo registro de serviço
    - Dado que o técnico está logado no sistema
    - Quando acessar a funcionalidade de novo registro
    - Então o sistema deve exibir um formulário em branco para preenchimento

- Cenário 2: Registro com campos obrigatórios não preenchidos
    - Dado que o técnico tenta salvar o registro sem preencher os campos obrigatórios
    - Quando ele tentar finalizar o processo
    - Então o sistema deve exibir uma mensagem de erro indicando os campos faltantes

### 2.2 – Capturar informações do atendimento

- Cenário 1: Salvamento de informações detalhadas
    - Dado que o técnico está preenchendo o registro de serviço
    - Quando incluir informações sobre o diagnóstico e a solução aplicada
    - Então o sistema deve salvar os dados no histórico do atendimento

### 3.1 – Acompanhar o status da solicitação

- Cenário 1: Visualizar status em andamento
    - Dado que o cliente corporativo acessa o portal
    - Quando consultar uma solicitação ativa
    - Então o sistema deve exibir o status como "Em andamento"

- Cenário 2: Visualizar solicitação finalizada
    - Dado que o atendimento já foi encerrado
    - Quando o cliente acessar a solicitação
    - Então o sistema deve exibir o status como "Concluído"

- Cenário 3: Solicitação sem registro de status
    - Dado que o cliente consulta uma solicitação recém-criada sem movimentação
    - Quando abrir os detalhes
    - Então o sistema deve exibir "Aguardando início"
    
### 3.3 – Visualizar as etapas da solicitação

- Cenário 1: Exibir todas as etapas da solicitação
    - Dado que o cliente tem acesso ao portal de serviços
    - Quando abrir o detalhe de uma solicitação
    - Então o sistema deve listar todas as etapas já concluídas e as pendentes

### 4.3 – Compartilhar o relatório final com o cliente

- Cenário 1: Envio manual do relatório
    - Dado que o técnico finalizou o relatório pós-serviço
    - Quando ele selecionar a opção de envio ao cliente
    - Então o sistema deve enviar o documento para o e-mail cadastrado

- Cenário 2: Falha no envio do relatório
    - Dado que o técnico tenta enviar o relatório
    - Quando ocorrer uma falha de conexão
    - Então o sistema deve exibir uma mensagem de erro indicando a falha no envio

### 4.4 – Enviar o relatório técnico para a central

- Cenário 1: Registro do relatório na central
    - Dado que o técnico finalizou e salvou o relatório
    - Quando enviar para a central
    - Então o sistema deve anexar o documento ao histórico centralizado

### 5.1 – Gerar estatísticas de feedback

- Cenário 1: Geração de estatísticas de satisfação
    - Dado que existem feedbacks válidos registrados
    - Quando a diretora de operações solicitar as estatísticas
    - Então o sistema deve exibir gráficos e indicadores consolidados

- Cenário 2: Tentativa de geração sem feedbacks disponíveis
    - Dado que não há feedbacks registrados no período selecionado
    - Quando a diretora tentar gerar estatísticas
    - Então o sistema deve informar que não há dados suficientes para o cálculo

- Cenário 3: Exportação das estatísticas
    - Dado que a diretora de operações gerou as estatísticas
    - Quando selecionar a opção de exportação
    - Então o sistema deve gerar um arquivo CSV com os resultados

### 5.2 – Armazenar as avaliações dos clientes

- Cenário 1: Armazenamento de novo feedback
    - Dado que o cliente finalizou a avaliação pós-serviço
    - Quando ele enviar o formulário de feedback
    - Então o sistema deve registrar a resposta no banco de dados de feedbacks

### 6.2 – Visualizar o número de atendimentos por técnico

- Cenário 1: Consulta de atendimentos por técnico
    - Dado que a diretora de operações acessa o painel gerencial
    - Quando solicitar o relatório de atendimentos por técnico
    - Então o sistema deve apresentar a quantidade de atendimentos realizados por cada membro da equipe

- Cenário 2: Filtro por período de tempo
    - Dado que a diretora define um intervalo de datas
    - Quando gerar a visualização
    - Então o sistema deve exibir a quantidade de atendimentos por técnico no período selecionado
    
---
## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
16/06/2025 | 1.0 | Elaboração inicial do estudo de caso | João Pedro, Thago Melo e Willian Silva | Willian Silva |
23/06/2025 | 1.1 | Elaboração final do estudo de caso | Willian Silva ||
