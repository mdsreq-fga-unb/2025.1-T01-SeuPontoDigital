## Product Backlog Building - TechFix
O **Product Backlog Building (PBB)** é uma abordagem que orienta times ágeis na construção e organização de uma lista de backlog colaborativamente. Para isso, a metodologia conta com uma ferramenta visual chamada Canvas PBB, que atua como um mapa de trabalho e auxilia o time na identificação de personas, funcionalidades, benefícios e PBIs (Product Backlog Items). 

Dessa forma, para a prática do PBB, foi elaborada a priorização do Product Backlog com a aplicação da técnica **COORG** (Classificar, Ordenar e Organizar), na qual as funcionalidades foram dispostas em uma sequência lógica, estruturadas como uma narrativa da esquerda para a direita. Nessa organização, os PBIs com maior prioridade aparecem nas posições superiores, enquanto os de menor prioridade ficam nas inferiores, uma vez que a priorização considerou os critérios de frequência de uso e valor de negócio como valores quantitativos.

Diante disso, segue a elaboração do estudo de caso da TechFix abaixo:

![PBB Canvas da TechFix](../assets/images/TechFix.jpg)

## Histórias de usuário 

### 1. Gerenciar agendamento de atendimento
- 1.1: Eu, como atendente, posso organizar os agendamentos, tendo em conta a carga de trabalho dos técnicos, para evitar conflitos nos atendimentos.
- 1.2: Eu, como atendente, posso notificar os clientes sobre alterações nos atendimentos para garantir o aviso prévio.

### 2. Gerenciar registro de serviço
- 2.1: Eu, como técnico de campo, posso registrar os dados do atendimento para padronizar as informações.
- 2.2: Eu, como técnico de campo, posso anexar evidências ao atendimento para garantir rastreabilidade.
- 2.3: Eu, como técnico de campo, posso encerrar o registro do serviço para concluir o atendimento no sistema.

### 3. Acompanhar solicitação em tempo real
- 3.1: Eu, como cliente corporativo, posso acompanhar o status da solicitação para me preparar para o atendimento.
- 3.2: Eu, como cliente corporativo, posso receber atualizações do andamento para reduzir a necessidade de replanejamento.
- 3.3: Eu, como cliente corporativo, posso consultar as etapas concluídas da solicitação para entender o progresso do serviço.

### 4. Gerar relatório pós-serviço
- 4.1: Eu, como técnico de campo, posso produzir relatórios técnicos padronizados para formalizar o atendimento realizado.
- 4.2: Eu, como técnico de campo, posso enviar o relatório final para o cliente para apoiar o planejamento das próximas ações.
- 4.3: Eu, como técnico de campo, posso encaminhar o relatório técnico à central para subsidiar decisões da gestão.

### 5. Analisar feedback do cliente
- 5.1: Eu, como diretora de operações, posso analisar estatísticas dos feedbacks para identificar padrões nas avaliações dos clientes.
- 5.2: Eu, como diretora de operações, posso armazenar os feedbacks para automatizar a coleta de avaliações dos clientes.

### 6. Monitorar desempenho operacional
- 6.1: Eu, como diretora de operações, posso acompanhar o cumprimento de prazos de atendimento para garantir o acompanhamento das metas.
- 6.2: Eu, como diretora de operações, posso visualizar o número de atendimentos por técnico para facilitar a identificação de desvios na distribuição de tarefas.
- 6.3: Eu, como diretora de operações, posso calcular o percentual de problemas resolvidos para monitorar a efetividade da equipe.
- 6.4: Eu, como diretora de operações, posso gerar um dashboard de desempenho para obter uma visão geral da operação.
- 6.5: Eu, como diretora de operações, posso exportar os indicadores de desempenho para facilitar a apresentação de resultados à diretoria.

## Critérios de aceitação das histórias de usuários

### 1. Gerenciar agendamento de atendimento
   
- **1.1: Eu, como atendente, posso organizar os agendamentos, tendo em conta a carga de trabalho dos técnicos, para evitar conflitos nos atendimentos.**
    1. O atendente deve visualizar a agenda de todos os técnicos por dia e horário.
    2. O sistema deve alertar o atendente ao detectar sobreposição de atendimentos para um mesmo técnico.
    3. O atendente deve conseguir aplicar filtros por data, técnico e status do atendimento.
    4. O sistema deve impedir o salvamento de agendamentos com horários já ocupados.

- **1.2: Eu, como atendente, posso notificar os clientes sobre alterações nos atendimentos para garantir o aviso prévio.**
    1. A notificação deve ser enviada automaticamente por e-mail e SMS após qualquer alteração no agendamento.
    2. O atendente deve visualizar um resumo da notificação antes de confirmar o envio.
    3. O cliente deve receber a notificação com data, horário, nome do técnico e motivo da alteração.
    4. O sistema deve registrar o histórico de envio da notificação com data e status.

### 2. Gerenciar registro de serviço

- **2.1: Eu, como técnico de campo, posso registrar os dados do atendimento para padronizar as informações.**
    1. O formulário deve conter campos obrigatórios como: data, hora, tipo de serviço, equipamento atendido e observações técnicas.
    2. O sistema deve validar o preenchimento de todos os campos antes de permitir o envio.
    3. O técnico deve ter acesso ao histórico de registros anteriores do mesmo cliente.
    4. Os dados registrados devem ser salvos automaticamente em caso de perda de conexão.

- **2.2: Eu, como técnico de campo, posso anexar evidências ao atendimento para garantir rastreabilidade.**
    1. O técnico deve conseguir anexar fotos — nos formatos JPEG e PNG — e documentos — como em PDF — com até 10MB por arquivo.
    2. As evidências devem estar vinculadas ao número do atendimento no sistema.
    3. O sistema deve permitir a visualização e download das evidências pela central.
    4. Cada anexo deve conter data, hora e tipo de evidência.

- **2.3: Eu, como técnico de campo, posso encerrar o registro do serviço para concluir o atendimento no sistema.**
    1. O botão de encerramento só deve ser habilitado após o preenchimento de todos os campos obrigatórios.
    2. O sistema deve solicitar confirmação do técnico antes de encerrar.
    3. Após o encerramento, o atendimento deve ficar bloqueado para edição.
    4. O encerramento deve gerar um número de protocolo e carimbo de data e hora.

### 3. Acompanhar solicitação em tempo real

- **3.1: Eu, como cliente corporativo, posso acompanhar o status da solicitação para me preparar para o atendimento.**
    1. O status deve ser atualizado automaticamente conforme o andamento.
    2. O cliente deve ser capaz de visualizar a previsão de chegada do técnico.
    3. A interface deve ser acessível via web e dispositivos móveis.

- **3.2: Eu, como cliente corporativo, posso receber atualizações do andamento para reduzir a necessidade de replanejamento.**
    1. As notificações devem ser enviadas por e-mail ou app.
    2. Deve ser possível configurar a frequência das atualizações.

- **3.3: Eu, como cliente corporativo, posso consultar as etapas concluídas da solicitação para entender o progresso do serviço.**
    1. As etapas devem estar organizadas em ordem cronológica.
    2. Cada etapa deve ter data e responsável associados.

### 4. Gerar relatório pós-serviço

- **4.1: Eu, como técnico de campo, posso produzir relatórios técnicos padronizados para formalizar o atendimento realizado.**
    1. O relatório deve seguir um modelo fixo com campos como: problema identificado, ações executadas, resultados.
    2. O sistema deve preencher automaticamente dados básicos: cliente, data, técnico.
    3. O relatório deve estar disponível em formato PDF para download.
    4. O sistema deve permitir salvar rascunhos antes do envio final.

- **4.2: Eu, como técnico de campo, posso enviar o relatório final para o cliente para apoiar o planejamento das próximas ações.**
    1. O técnico deve selecionar o cliente destinatário antes do envio.
    2. O cliente deve receber o relatório por e-mail em até 5 minutos após o envio.
    3. O sistema deve registrar o envio e disponibilizar o comprovante na área do técnico.
    4. O cliente deve confirmar o recebimento por meio de um botão ou e-mail de retorno.

- **4.3: Eu, como técnico de campo, posso encaminhar o relatório técnico à central para subsidiar decisões da gestão.**
    1. O envio à central deve ocorrer simultaneamente ao envio ao cliente.
    2. A central deve receber uma notificação de novo relatório disponível.
    3. Os gestores devem acessar todos os relatórios por data, técnico ou cliente.
    4. O relatório deve conter campos específicos para recomendações futuras.

### 5. Analisar feedback do cliente

- **5.1: Eu, como diretora de operações, posso analisar estatísticas dos feedbacks para identificar padrões nas avaliações dos clientes.**
    1. O sistema deve gerar gráficos com indicadores como NPS, nota média e recorrência de palavras-chave.
    2. A diretora deve aplicar filtros por período, região e tipo de atendimento.
    3. O painel deve permitir exportar os dados em Excel ou PDF.
    4. As estatísticas devem atualizar automaticamente a cada novo feedback registrado.

- **5.2: Eu, como diretora de operações, posso armazenar os feedbacks para automatizar a coleta de avaliações dos clientes.**
    1. O sistema deve enviar automaticamente o formulário de feedback após a conclusão do atendimento.
    2. O cliente deve poder responder via e-mail, app ou portal.
    3. O sistema deve registrar data, cliente e serviço relacionado ao feedback.
    4. Feedbacks incompletos devem ser sinalizados para acompanhamento.

### 6. Monitorar desempenho operacional

- **6.1: Eu, como diretora de operações, posso acompanhar o cumprimento de prazos de atendimento para garantir o acompanhamento das metas.**
    1. O sistema deve calcular o tempo entre agendamento e conclusão de cada atendimento.
    2. O painel deve destacar atendimentos fora do SLA.
    3. A diretora deve poder visualizar os dados por técnico, região ou tipo de serviço.
    4. Indicadores devem ser exportáveis em formato Excel e PDF.

- **6.2: Eu, como diretora de operações, posso visualizar o número de atendimentos por técnico para facilitar a identificação de desvios na distribuição de tarefas.**
    1. A listagem deve exibir técnico, total de atendimentos e variação em relação à média.
    2. A diretora deve aplicar filtros por período e tipo de atendimento.
    3. O sistema deve destacar técnicos com carga acima ou abaixo do esperado.
    4. Os dados devem estar disponíveis em dashboard e exportação.

- **6.3: Eu, como diretora de operações, posso calcular o percentual de problemas resolvidos para monitorar a efetividade da equipe.**
    1. O sistema deve comparar o total de atendimentos com os que foram marcados como “resolvidos”.
    2. O painel deve exibir a taxa de resolução por técnico e por região.
    3. Casos com resolução pendente devem ser destacados para revisão.
    4. A diretora deve acessar o histórico mensal da taxa de resolução.

- **6.4: Eu, como diretora de operações, posso gerar um dashboard de desempenho para obter uma visão geral da operação.**
    1. O dashboard deve incluir: atendimentos realizados, SLA cumprido, taxa de resolução e feedback médio.
    2. O painel deve ser personalizável com filtros e widgets.
    3. O sistema deve atualizar os dados em tempo real.
    4. A diretora deve compartilhar o dashboard com outros gestores via link.

- **6.5: Eu, como diretora de operações, posso exportar os indicadores de desempenho para facilitar a apresentação de resultados à diretoria.**
    1. O sistema deve permitir exportar em PDF, Excel e PPT.
    2. A exportação deve conter logotipo, data e assinatura digital.
    3. O relatório deve incluir gráficos e análises automáticas.
    4. A diretora deve selecionar quais métricas incluir antes de exportar.

## BDDs dos critérios de aceitação
Dos 67 critérios de aceitação, a técnica BDD foi aplicada em 35 deles, o que corresponde a uma porcentagem de 52,23%. Abaixo estão os critérios de aceite, acompanhados de seus respectivos cenários de BDD:

### Cenário 1.1.b: Detectar sobreposição de agendamento
- **Dado que** o técnico João possui um atendimento agendado das 14h às 15h
- **Quando** o atendente tenta agendar outro atendimento para João às 14h30
- **Então** o sistema exibe um alerta de sobreposição de horário para o técnico João

### Cenário 1.1.d: Impedir salvamento de agendamento com horário ocupado
- **Dado que** existe um atendimento confirmado com o técnico Ana às 10h
- **Quando** o atendente tenta salvar um novo agendamento no mesmo horário para Ana
- **Então** o sistema bloqueia o salvamento e exibe a mensagem "Horário já ocupado para este técnico"
    
### Cenário 1.2.a: Enviar notificação após alteração de agendamento
- **Dado que** um atendimento para o cliente Bruno foi reagendado das 9h para as 11h
- **Quando** o atendente confirma a alteração
- **Então** o sistema envia automaticamente um e-mail e um SMS para o cliente com os novos detalhes

### Cenário 1.2.d: Registrar histórico da notificação enviada
- **Dado que** o sistema enviou uma notificação para o cliente sobre alteração de atendimento
- **Quando** o atendente acessa o histórico da solicitação
- **Então** o registro da notificação deve estar disponível com data, hora e status “Enviado”.

### Cenário 2.1.b: Validar preenchimento obrigatório
- **Dado que** o técnico está preenchendo o formulário de registro de atendimento com os seguintes dados:
    - **Data:** 22/06/2025
    - **Hora:** 14:30
    - **Tipo de serviço:** (campo não preenchido)
    - **Equipamento atendido:** “Nobreak APC 3000VA”
    - **Observações técnicas:** “Equipamento apresentou oscilação de tensão”
- **Quando** ele tenta enviar o formulário
- **Então** o sistema impede o envio e exibe a mensagem “Preencha todos os campos obrigatórios”

### Cenário 2.1.c: Acesso ao histórico do cliente
- **Dado que** há conexão ativa com o sistema e o técnico preenche o formulário com os seguintes dados:
    - **Data:** 22/06/2025
    - **Hora:** 15:10
    - **Tipo de serviço:** "Manutenção preventiva"
    - **Equipamento atendido:** “Servidor Dell R730”
    - **Observações técnicas:** “Limpeza interna e troca de pasta térmica”
- **Quando** a conexão com a internet é perdida antes do envio do formulário
- **Então** o sistema salva os dados preenchidos e exibe a mensagem “Formulário salvo. Envie quando a conexão for restabelecida.”

### Cenário 2.2.a: Anexar imagem ao atendimento
- **Dado que** o técnico está em campo com o número de atendimento 24567
- **Quando**  ele anexa uma imagem no formato .jpeg de 2MB
- **Então** o sistema salva a imagem vinculada ao atendimento 24567 com a data, hora e tipo de evidência "imagem"

### Cenário 2.2.b: Vincular evidência ao número do atendimento
- **Dado que** o técnico anexa uma foto do equipamento ao atendimento de número ATD-48291
- **Quando**  ele envia a imagem com 3MB em formato .jpeg
- **Então** o sistema deve exibir a imagem listada na seção de evidências vinculadas ao atendimento

### Cenário 2.3.b: Confirmação de encerramento
- **Dado que** o técnico clicou no botão "Encerrar atendimento"
- **Quando**  o sistema exibe a mensagem de confirmação com as informações preenchidas
- **Então** o técnico deve confirmar o encerramento antes da finalização

### Cenário 2.3.c: Atendimento bloqueado após encerramento
- **Dado que** o atendimento foi encerrado com sucesso
- **Quando**  o técnico tenta editar qualquer campo do formulário
- **Então** o sistema deve exibir uma mensagem "Registro bloqueado para edição"

### Cenário 3.1.a: Atualização automática do status da solicitação
- **Dado que** o atendimento foi iniciado pelo técnico com o status "Em execução"
- **Quando** o sistema detecta a mudança de fase para "Finalização"
- **Então** o status da solicitação do cliente é atualizado automaticamente para "Finalizando atendimento"

### Cenário 3.1.b: Visualização da previsão de chegada do técnico
- **Dado que** o técnico foi designado para o atendimento das 14h às 16h no dia 24/06
- **Quando** o cliente acessa a tela de status da solicitação às 13h
- **Então** o sistema exibe a previsão de chegada do técnico entre 14h e 16h

### Cenário 3.2.a: Envio de notificações por e-mail
- **Dado que** a solicitação está em andamento e o e-mail do cliente está cadastrado como "cliente@empresa.com"
- **Quando** o status da solicitação muda de "Agendado" para "Em execução"
- **Então** o cliente deve receber um e-mail com o título "Atualização de atendimento"

### Cenário 3.2.b: Configuração da frequência de atualizações
- **Dado que** o cliente configurou para receber atualizações apenas no início e fim do atendimento
- **Quando** o status muda de "Em execução" para "Finalizado"
- **Então** apenas essa mudança deve gerar uma nova notificação

### Cenário 3.3.b: Exibição de data e responsável por cada etapa
- **Dado que** o técnico João Silva concluiu a etapa “Diagnóstico” em 21/06/2025 às 10h30
- **Quando** o cliente acessa os detalhes dessa etapa
- **Então** o sistema deve mostrar “Diagnóstico – João Silva – 21/06/2025 10:30”

### Cenário 4.1.b: Preenchimento automático dos dados básicos
- **Dado que** o atendimento nº 8392 foi finalizado no dia 22/06/2025 pelo técnico Marcos Lima para o cliente ACME Ltda
- **Quando** o técnico inicia o preenchimento do relatório
- **Então** o sistema deve preencher automaticamente os campos: "Cliente: ACME Ltda", "Data: 22/06/2025", "Técnico: Marcos Lima"

### Cenário 4.1.c: Geração do relatório em formato PDF
- **Dado que** o técnico concluiu o preenchimento de todos os campos obrigatórios
- **Quando** ele clica no botão “Gerar PDF”
- **Então** o sistema deve disponibilizar o relatório em formato PDF para download

### Cenário 4.2.a: Envio do relatório com cliente destinatário selecionado
- **Dado que** o técnico preencheu o relatório do atendimento nº 4921
- **Quando** ele seleciona o cliente "Hospital Santa Luzia" como destinatário
- **Então** o sistema deve habilitar o botão de envio e registrar o destinatário como "Hospital Santa Luzia"

### Cenário 4.2.b: Cliente recebe o relatório por e-mail em até 5 minutos
- **Dado que** técnico enviou o relatório final às 14:00
- **Quando** o tempo de envio for processado
- **Então** o cliente deve receber o relatório por e-mail até às 14:05 com o título "Relatório Técnico – Atendimento nº 4921"

### Cenário 4.3.b: Notificação de novo relatório na central
- **Dado que** a central recebeu um novo relatório do atendimento nº 5278
- **Quando** um gestor da central acessa a área “Relatórios Recebidos”
- **Então** o sistema deve exibir uma notificação com o título “Novo relatório técnico recebido – Técnico Carlos, 22/06/2025”

### Cenário 4.3.c: Acesso aos relatórios por filtros de data, técnico ou cliente
- **Dado que** a central possui um histórico de relatórios no sistema
- **Quando** o gestor aplicar os filtros “Cliente: Clínica Vida”, “Técnico: Carlos”, e “Data: Junho/2025”
- **Então** o sistema deve exibir todos os relatórios que correspondem aos critérios selecionados

### Cenário 5.1.b: Aplicação de filtros nas estatísticas
- **Dado que** a diretora está visualizando os dados consolidados de feedback
- **Quando** ela aplica os filtros "Região: Sudeste", "Tipo de atendimento: Preventivo", e "Período: Maio de 2025"
- **Então** o painel deve exibir apenas os resultados estatísticos correspondentes a esses critérios

### Cenário 5.1.c: Exportação de estatísticas em diferentes formatos
- **Dado que** a diretora deseja compartilhar as análises de feedbacks com a equipe de qualidade
- **Quando** ela clica na opção “Exportar” e seleciona o formato Excel
- **Então** o sistema deve gerar um arquivo .xlsx com os gráficos, os dados brutos e as métricas consolidadas

### Cenário 5.2.a: Envio automático do formulário de feedback
- **Dado que** um atendimento foi encerrado com sucesso às 15h do dia 10/06/2025
- **Quando** o sistema identifica o status como “concluído”
- **Então** deve enviar automaticamente um formulário de feedback para o e-mail do cliente vinculado ao atendimento encerrado

### Cenário 5.2.c: Registro de metadados do feedback
- **Dado que** o cliente João da Silva respondeu ao feedback no dia 12/06/2025 às 09h12
- **Quando** a resposta for recebida
- **Então** o sistema deve armazenar os metadados com: nome do cliente, data/hora da resposta e código do atendimento relacionado

### Cenário 6.1.a: Cálculo do tempo entre agendamento e conclusão
- **Dado que** um atendimento foi agendado para o dia 10/06/2025 às 08h00
- **Quando** o sistema calcular o tempo de atendimento
- **Então** deve registrar a duração como 2 horas e 30 minutos

### Cenário 6.1.c: Visualização segmentada por técnico e região
- **Dado que** existem 45 atendimentos registrados entre os dias 01 e 10 de junho
- **Quando** a diretora aplicar filtros em técnico para Lucas e região para Norte
- **Então** o sistema deve exibir apenas os 15 atendimentos correspondentes

### Cenário 6.2.a: Exibição de total de atendimentos e variação em relação à média
- **Dado que** o sistema possui registros de atendimentos dos técnicos João, Carla e Diego
- **Quando** a diretora acessar a listagem de atendimentos
- **Então** o sistema deve exibir:
    - João: 12 atendimentos (+2)
    - Carla: 9 atendimentos (–1)
    - Diego: 8 atendimentos (–2)

### Cenário 6.2.b: Aplicação de filtros por período e tipo de atendimento
- **Dado que** a diretora deseja analisar os atendimentos de maio de 2025 do tipo “manutenção corretiva”
- **Quando** aplicar os filtros em período para 01/05 a 31/05 e em tipo para "manutenção corretiva”
- **Então** o sistema deve mostrar apenas os atendimentos compatíveis com esses critérios

### Cenário 6.3.a: Cálculo da taxa de resolução por técnico e por região
- **Dado que** o sistema registra 100 atendimentos para o técnico Bruno, dos quais 85 foram marcados como “resolvidos”
- **Quando** a diretora acessar o painel de efetividade
- **Então** o sistema deve exibir:
    - Técnico Bruno: 85% de resolução
    - Região Norte: 80% de resolução

### Cenário 6.3.d: Consulta ao histórico mensal da taxa de resolução
- **Dado que** o sistema armazena dados de resolução por mês
- **Quando** a diretora selecionar o filtro “histórico mensal”
- **Então** o sistema deve exibir um gráfico de linha com as taxas dos últimos meses

### Cenário 6.4.a: Exibição consolidada dos principais indicadores
- **Dado que** o sistema possui registros atualizados de atendimentos realizados, SLA, taxa de resolução e média de feedbacks
- **Quando**  a diretora acessar o dashboard de desempenho
- **Então** o painel deve exibir:
    - Total de atendimentos: 380
    - Cumprimento de SLA: 94%
    - Taxa de resolução: 89%
    - Feedback médio: 4,7 estrelas

### Cenário 6.4.b: Personalização do painel com filtros e widgets
- **Dado que** a diretora deseja ajustar o painel conforme suas necessidades
- **Quando** ela selecionar os filtros por período, tipo de serviço e equipe
- **Então** o sistema deve atualizar os dados do dashboard com base nos filtros

### Cenário 6.5.b: Inclusão de logotipo, data e assinatura digital
- **Dado que** a diretora está exportando o relatório em PDF
- **Quando**  o sistema gerar o documento
- **Então** ele deve conter o logotipo da empresa no topo, a data de emissão “22/06/2025” e uma assinatura digital validada no rodapé da última página

### Cenário 6.5.d: Seleção de métricas para exportação
- **Dado que** a diretora deseja preparar um relatório com foco em produtividade
- **Quando**  ela selecionar os indicadores “Total de atendimentos”, “SLA” e “Feedback médio”
- **Então** o sistema deve gerar o arquivo contendo apenas essas métricas e excluir os indicadores não selecionados da visualização final

---
## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
16/06/2025 | 1.0 | Elaboração inicial do estudo de caso | João Pedro, Thago Melo e Willian Silva | Willian Silva |
23/06/2025 | 1.1 | Elaboração final do estudo de caso | Willian Silva ||
12/07/2025 | 1.2 | Correção do estudo de caso | Willian Silva ||