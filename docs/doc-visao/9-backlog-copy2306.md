# 9. Backlog do Produto

## 9.1 Backlog Geral

No Scrum, o Product Backlog (Backlog do produto) é uma lista dinâmica e priorizada que contém todos os itens necessários para a evolução do produto. Ela é considerada dinâmica, porque essa lista é constantemente atualizada à medida que novas necessidades surgem ou quando há mudanças nas prioridades. Além disso, ela é priorizada, pois o objetivo é garantir  o maior valor possível nas entregas desde o começo do desenvolvimento. O Product Backlog é a única fonte de trabalho para um Scrum Team (Equipe Scrum). Cada item no backlog é uma tarefa ou requisito, o que pode incluir funcionalidades, melhorias, correções, e ajustes.

No caso da nossa equipe, a SeuPontoDigital, utilizaremos user stories para representar os itens do nosso backlog. Uma user story (história de usuário) define funcionalidades que agregam valor tanto para os usuários quanto para os donos de um software ou sistema. Sua estrutura inclui uma descrição escrita que serve como referência para o planejamento e recordação. Além disso, uma história de usuário também é composta por testes que não apenas documentam as especificações, mas também são utilizados para avaliar se a funcionalidade foi implementada corretamente e está pronta para ser entregue. Esses testes serão usados como critérios de aceitação, na etapa de validação e verificação.

Para gerar estas histórias, utilizamos o Product Backlog Building é uma técnica colaborativa de construção de backlog, popularizada por Felipe Aguiar, que foca em um processo dinâmico e inclusivo na definição e priorização das funcionalidades do produto. No Product Backlog Building (PBB), features são os blocos principais de funcionalidade do produto que são priorizados e detalhados ao longo do tempo para serem entregues nas iterações. Elas são grandes o suficiente para descrever funcionalidades importantes, mas precisam ser quebradas em tarefas menores para implementação prática. A nossa equipe utiliza Features para organizar o backlog.

<!-- //falta adicionar o "para que..." e confirmar com INVEST. -->

### **9.1.1 — Features**
Nome    | Título | Descrição
--------| ------ | ---------
F01 | Painel de controle para administradores | Através dessa funcionalidade, será possível cadastrar e controlar o uso do aplicativo pelos usuários
F02 | Sistema de marcação de ponto digital | Através dessa funcionalidade, será possível marcar o ponto de trabalho com horário e espaço, e gerenciar histórico de marcações com o tempo
F03 | Envio automático de dados de ponto | Através dessa funcionalidade, será possível receber dados dos formatados no padrão ideal para contabilização

### **9.1.2 — Histórias de usuário**
Nome    | Feature Associada | Requisito Funcional relacionado | Descrição
--------| --------- | -------- | --------
**US01** | F01 | RF01 | Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios. 
**US02** | F01 | RF02 | Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa visualizar, gerenciar e acompanhar as informações de cada empregador de forma organizada.
**US03** | F01 | RF03 | Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores pelo painel de administrador, para que eu possa corrigir ou atualizar as informações quando necessário.
**US04** | F01 | RF04 | Como gestor de folha de ponto na LFD, devo poder excluir qualquer empregador do sistema pelo painel de administrador, para que eu possa remover empregadores desnecessários ou inválidos.
**US05** | F01 | RF05 | Como gestor de folha de ponto na LFD, devo poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação, para que eu possa facilitar o processo de contratação e evitar erros.
**US06** | F01 | RF06 | Como gestor de folha de ponto na LFD, devo poder editar os dados de contrato e do empregado em uma única operação, para que eu possa realizar ajustes de forma mais rápida e sem duplicação de esforços.
**US07** | F01 | RF07 | Como gestor de folha de ponto na LFD, devo excluir o contrato e o empregado associado, para que eu possa manter o sistema organizado e remover informações que não são mais necessárias.
**US08** | F01 | RF08 | Como gestor de folha de ponto na LFD, devo visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo, para que eu possa consultar facilmente as informações e tomar decisões rapidamente.
**US09** | F01 | RF09 | Como gestor de folha de ponto na LFD, devo visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo, para que eu possa ter uma visão clara e organizada dos contratos em andamento.
**US10** | F01 | RF10 | Como gestor de folha de ponto na LFD, devo buscar os dados dos empregados, empregadores e de contratos existentes, para que eu possa localizar rapidamente as informações necessárias. 
**US11** | F01 | RF11 | Como gestor de folha de ponto na LFD, devo filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo, para que eu possa realizar consultas mais específicas e organizar melhor os dados. 
**US12** | F01 | RF12 | Como gestor de folha de ponto na LFD, devo controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho, para que eu possa garantir que apenas usuários autorizados acessem o sistema. 
**US13** | F01 | RF13 | Como gestor de folha de ponto na LFD, devo visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores, para que eu possa gerenciar os registros de forma centralizada.
**US14** | F02 | RF14 | Como gestor, devo poder colocar observações necessárias para dias de trabalho para que eu possa registrar detalhes importantes relacionados aos dias específicos de trabalho ou eventos. 
**US15** | F02 | RF15 | Como empregado, devo poder acessar o aplicativo mobile, para que eu possa realizar o registro de ponto e consultar minhas informações relacionadas ao trabalho.
**US16** | F02 | RF16 | Como empregador, devo poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada, para que eu possa gerenciar os dados dos meus empregados de maneira eficiente. 
**US17** | F02 | RF17 | Como usuário do aplicativo (empregado ou empregador) que estiver acessando o aplicativo pela primeira vez devo cadastrar uma senha de acesso, para que possam começar a utilizar o aplicativo de forma segura.
**US18** | F02 | RF18 | Como usuário do aplicativo (empregado ou empregador), devo poder recuperar a senha se esquecido, para que eu possa acessar minha conta novamente sem complicações.
**US19** | F02 | RF19 | Como usuário do aplicativo (empregado ou empregador), devo poder alterar a minha senha de acesso.
**US20** | F02 | RF20 | Como empregado, devo poder registrar meus pontos de trabalho (incluindo as pausas) levando em conta as regras de tolerância de distância máxima do local de trabalho, para garantir que os registros sejam válidos e dentro dos limites contratuais.
**US21** | F02 | RF21 | Como gestor, devo poder ter alertas de falta de marcação do empregado, para que eu possa agir rapidamente e corrigir quaisquer ausências não registradas. 
**US22** | F02 | RF22 | Como empregador, devo receber notificações sempre que um empregado realizar um registro de ponto e quando houver pendência de registro dentro do limite de horário estabelecido em contrato, para que eu possa acompanhar e corrigir qualquer falha no processo de registro de ponto.
**US23** | F02 | RF23 | Como empregado, devo poder justificar minhas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência, para que eu possa documentar e formalizar a minha justificativa de maneira prática.
**US24** | F02 | RF24 | Como empregador, devo poder marcar certos dias de trabalho como feriado, para que eu possa garantir que os registros de ponto sejam ajustados corretamente para esses dias.
**US25** | F03 | RF25 | Como empregado, devo poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo, para que eu possa acompanhar minhas horas de trabalho e verificar a precisão dos registros. 
**US26** | F03 | RF26 | Como empregador, devo poder acessar o histórico de registros de ponto dos meus respectivos empregados, para que eu possa monitorar o cumprimento das jornadas de trabalho. 
**US27** | F03 | RF27 | Como gestor de folha de ponto na LFD, devo receber automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, descontos legais, dentre outros), para que eu possa revisar e aprovar as folhas de pagamento de forma eficiente.
**US28** | F03 | RF28 | Como empregado, devo receber a folha de ponto preenchida após o encerramento, para que eu possa verificar se os registros de ponto e os cálculos de pagamento estão corretos.

### **9.1.3 — Lista de requisitos não-funcionais**

- **RNF01:** A interface do aplicativo deve permitir que usuários realizem as principais tarefas com poucas interações por tela e elementos visuais de fácil leitura e toque.

- **RNF02:** A interface principal do aplicativo deve conter apenas os elementos essenciais para o registro de ponto, organizados de forma a facilitar a identificação e o uso.

- **RNF03:** O sistema deverá ser capaz de escalar sem degradação perceptível à medida que o número de usuários cresce.

- **RNF04:** Implementar cobertura de testes automatizados de pelo menos 80% de código, garantindo detecção precoce de regressões.

- **RNF05:** Os dados de empregados e empregadores devem estar em conformidade com a LGPD, incluindo anonimização ou criptografia de campos sensíveis.

- **RNF06:** As notificações de ponto (batido ou pendente) devem ser entregues em até 5 segundos após o evento ocorrer, em 95% dos casos.

- **RNF07:** Limitar o envio de notificações críticas a, no máximo, 4 por dia por usuário, com intervalo mínimo de 15 min entre elas, para não sobrecarregar o usuário.

- **RNF08:** O tempo de resposta do sistema para a realização de um registro de ponto não deverá exceder 2 segundos em 95% das operações.

- **RNF09:** Todas as APIs devem usar JWT, com tokens expirando após 30 min de inatividade e renovação segura via refresh tokens.

- **RNF10:** Dados sensíveis (senhas) devem ser criptografados em repouso pela bcrypt.

- **RNF11:** O sistema deve ser capaz de armazenar informações de usuários, registros de ponto e outros dados relacionados por pelo menos 5 anos.

- **RNF12:** O aplicativo mobile deve ser compatível com Android (versões 7.0 em diante) e iOS (12.0 em diante), rodando em smartphones de diferentes fabricantes sem ajustes específicos no código.

- **RNF13:** Código modular e bem documentado; uso de comentários claros, padronização de commits.


## 9.2 Priorização do Backlog Geral

As técnicas de priorização que serão utilizadas pela equipe para priorizar os itens do backlog são **MoSCoW**, para análise qualitativa, e **ICE**, para análise quantitativa, uma vez que ambos se complementam ao suprir as limitações um do outro e assegurar maior objetividade 
e alinhamento na priorização. Sob esse viés, seguem as explicações detalhadas de cada modelo:

O modelo MoSCoW realiza uma segmentação qualitativa de prioridade ao dividir os requisitos em quatro categorias, conforme o grau de importância da presença de cada um no produto:

- **Must have (Precisa ter):** requisitos essenciais para o funcionamento do produto e que devem ser implementados obrigatoriamente.
- **Should have (Deve ter):** requisitos importantes, mas que podem ser inseridos após os essenciais.
- **Could have (Poderia ter):** requisitos desejáveis que agregam valor ao produto, porém não são prioritários no escopo inicial.
- **Won’t have (Não terá por agora):** requisitos que não serão incluídos no momento, sendo considerados para versões futuras. 

Como modelo quantitativo, o modelo ICE é aplicado por meio da atribuição de pontos em uma escala de 1 a 10, em que 1 representa a menor e 10 a maior pontuação possível. Além disso, essa avaliação será realizada coletivamente pela equipe, o que permite alinhar as percepções de priorização e promover a coerência nas decisões.

Nesse processo, cada item do backlog é avaliado com base em três critérios, representados pelo acrônimo **ICE**: **Impact** (Impacto), **Confidence** (Confiança) e **Ease** (Facilidade). Após essa avaliação, a pontuação final é obtida por meio da multiplicação dos três valores:

<div align="center">
  
  ICE Score = Impacto × Confiança × Facilidade
  
</div>

Com isso, o item que alcançar o maior ICE Score deve ser considerado como o mais prioritário para implementação, já que ele indica a melhor combinação entre valor gerado, viabilidade e nível de certeza.

A seguir, detalham-se os três critérios utilizados:

- **Impacto:** refere-se ao potencial do requisito em gerar valor para o negócio.
- **Confiança:** expressa o grau de certeza da equipe em relação à ocorrência do impacto estimado.
- **Facilidade:** avalia o nível de simplicidade, velocidade e baixo custo envolvidos na implementação do requisito. 

Portanto, a tabela a seguir apresenta os requisitos devidamente priorizados.

Código     | Descrição | MoSCoW | Impacto | Confiança | Facilidade | ICE Score | Pontuação | MVP
--------| --------- | ----- | ----- | ----- | ----- | ----- | --------- | ------
**US01**| Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios.|Must Have| 9 | 9 | 8 | 648 | 1296 | X |
**US02**| Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa visualizar, gerenciar e acompanhar as informações de cada empregador de forma organizada.|Must Have| 8 | 8 | 9 | 576 | 1152 | X |
**US03**| Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores pelo painel de administrador, para que eu possa corrigir ou atualizar as informações quando necessário.|Must Have| 9 | 9 | 8 | 648 | 1296 | X |
**US04**| Como gestor de folha de ponto na LFD, devo poder excluir qualquer empregador do sistema pelo painel de administrador, para que eu possa remover empregadores desnecessários ou inválidos.|Must Have| 7 | 9 | 9 | 567 | 1134 | X |
**US05**| Como gestor de folha de ponto na LFD, devo poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação, para que eu possa facilitar o processo de contratação e evitar erros.|Must Have| 8 | 6 | 7 | 336 | 672 | X |
**US06**| Como gestor de folha de ponto na LFD, devo poder editar os dados de contrato e do empregado em uma única operação, para que eu possa realizar ajustes de forma mais rápida e sem duplicação de esforços. |Must Have| 9 | 9 | 6 | 486 | 972 | X |
**US07**| Como gestor de folha de ponto na LFD, devo excluir o contrato e o empregado associado, para que eu possa manter o sistema organizado e remover informações que não são mais necessárias. |Must Have| 8 | 8 | 6 | 384 | 768 | X |
**US08**| Como gestor de folha de ponto na LFD, devo visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo, para que eu possa consultar facilmente as informações e tomar decisões rapidamente. |Should have| 9 | 8 | 7 | 504 | 907 |  |
**US09**| Como gestor de folha de ponto na LFD, devo visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo, para que eu possa ter uma visão clara e organizada dos contratos em andamento.|Could have| 7 | 8 | 8 | 448 | 672 |  |
**US10**| Como gestor de folha de ponto na LFD, devo buscar os dados dos empregados, empregadores e de contratos existentes, para que eu possa localizar rapidamente as informações necessárias. |Could have| 7 | 7 | 8 | 392 | 588 |  |
**US11**| Como gestor de folha de ponto na LFD, devo filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo, para que eu possa realizar consultas mais específicas e organizar melhor os dados. |Could have| 6 | 7 | 9 | 378 | 567 |  |
**US12**| Como gestor de folha de ponto na LFD, devo controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho, para que eu possa garantir que apenas usuários autorizados acessem o sistema.|Must have| 9 | 9 | 7 | 567 | 1134 | X |
**US13**| Como gestor de folha de ponto na LFD, devo visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores, para que eu possa gerenciar os registros de forma centralizada.|Should Have| 4 | 6 | 8 | 192 | 345 | X |
**US14**| Como gestor, devo poder colocar observações necessárias para dias de trabalho para que eu possa registrar detalhes importantes relacionados aos dias específicos de trabalho ou eventos. |Could have| 5 | 7 | 9 | 315 | 472 | |
**US15**| Como empregado, devo poder acessar o aplicativo mobile, para que eu possa realizar o registro de ponto e consultar minhas informações relacionadas ao trabalho. |Must have| 9 | 9 | 7 | 567 | 1134 | X |
**US16**| Como empregador, devo poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada, para que eu possa gerenciar os dados dos meus empregados de maneira eficiente.|Should have| 8 | 5 | 7 | 280 | 504 | X |
**US17**| Como usuário do aplicativo (empregado ou empregador) que estiver acessando o aplicativo pela primeira vez devo cadastrar uma senha de acesso, para que possam começar a utilizar o aplicativo de forma segura.|Must have| 8 | 8 | 6 | 384 | 768 | X |
**US18**|Como usuário do aplicativo (empregado ou empregador), devo poder recuperar a senha se esquecido, para que eu possa acessar minha conta novamente sem complicações.|Must have| 8 | 8 | 7 | 448 | 896 | X |
**US19**| Como usuário do aplicativo (empregado ou empregador), devo poder alterar a minha senha de acesso.|Must have| 7 | 8 | 5 | 280 | 560 | X |
**US20**| Como empregado, devo poder registrar seus pontos de trabalho (incluindo as pausas) levando em conta as regras de tolerância de distância máxima do local de trabalho, para garantir que os registros sejam válidos e dentro dos limites contratuais. |Should have| 9 | 9 | 8 | 648 | 1166 | |
**US21**| Como gestor, devo poder ter alertas de falta de marcação do empregado, para que eu possa agir rapidamente e corrigir quaisquer ausências não registradas. |Must have| 7 | 6 | 8 | 336 | 672 | X |
**US22**| Como empregador, devo receber notificações sempre que um empregado realizar um registro de ponto e quando houver pendência de registro dentro do limite de horário estabelecido em contrato, para que eu possa acompanhar e corrigir qualquer falha no processo de registro de ponto. |Should have| 7 | 6 | 7 | 294 | 529 | |
**US23**| Como empregado, devo poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência, para que eu possa documentar e formalizar a minha justificativa de maneira prática.|Could have| 9 | 9 | 8 | 648 | 972 |  |
**US24**| Como empregador, devo poder marcar certos dias de trabalho como feriado, para que eu possa garantir que os registros de ponto sejam ajustados corretamente para esses dias.| Should Have | 8 | 8 |7 | 448 | 806 | |
**US25**| Como empregado, devo poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo, para que eu possa acompanhar minhas horas de trabalho e verificar a precisão dos registros. |Must have| 6 | 7 | 8 | 336 | 672 | |
**US26**| Como empregador, devo poder acessar o histórico de registros de ponto dos meus respectivos empregados, para que eu possa monitorar o cumprimento das jornadas de trabalho. |Must Have |6 | 7 | 9 | 378 | 756 | X |
**US27** | Como gestor de folha de ponto na LFD, devo receber automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, descontos legais, dentre outros), para que eu possa revisar e aprovar as folhas de pagamento de forma eficiente. |Must Have| 9 | 9 | 6 | 486 | 972 | | X |
**US28** | Como empregado, devo receber a folha de ponto preenchida após o encerramento, para que eu possa verificar se os registros de ponto e os cálculos de pagamento estão corretos. | Must Have | 7 | 8 | 5 | 280 | 560 | X |

## 9.3 MVP
O MVP (Produto Mínimo Viável) do sistema foi definido com base nos requisitos classificados como essenciais para o funcionamento básico e viável da solução, considerando principalmente as funcionalidades **Must Have** e algumas **Should Have** que complementam a jornada do usuário. A seleção foi realizada levando em conta a **prioridade de negócio**, a **viabilidade técnica inicial** e a **necessidade de validar a proposta de valor do sistema com usuários reais**. O foco foi garantir que a LFD (administração) possa gerenciar empregadores, contratos e empregados, e que usuários (empregados e empregadores) possam acessar e utilizar o aplicativo para controle de jornada de forma funcional e segura.

#### **Itens que compõem o MVP**

| Código   | Descrição                                                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US01** | Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios.                                                                                                                                                                                               |
| **US02** | Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa visualizar, gerenciar e acompanhar as informações de cada empregador de forma organizada.                                                                                                                                                                          |
| **US03** | Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores pelo painel de administrador, para que eu possa corrigir ou atualizar as informações quando necessário.                                                                                                                                                                           |
| **US04** | Como gestor de folha de ponto na LFD, devo poder excluir qualquer empregador do sistema pelo painel de administrador, para que eu possa remover empregadores desnecessários ou inválidos.                                                                                                                                                                     |
| **US05** | Como gestor de folha de ponto na LFD, devo poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação, para que eu possa facilitar o processo de contratação e evitar erros.                                                                                                                                               |
| **US06** | Como gestor de folha de ponto na LFD, devo poder editar os dados de contrato e do empregado em uma única operação, para que eu possa realizar ajustes de forma mais rápida e sem duplicação de esforços.                                                                                                                                                                        |
| **US07** | Como gestor de folha de ponto na LFD, devo excluir o contrato e o empregado associado, para que eu possa manter o sistema organizado e remover informações que não são mais necessárias.                                                                                                                                                                                              |
| **US12** | Como gestor de folha de ponto na LFD, devo controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho, para que eu possa garantir que apenas usuários autorizados acessem o sistema.                                                                                                                         |
| **US13** | Como gestor de folha de ponto na LFD, devo visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores, para que eu possa gerenciar os registros de forma centralizada.                                                                                                 |
| **US15** | Como empregado, devo poder acessar o aplicativo mobile, para que eu possa realizar o registro de ponto e consultar minhas informações relacionadas ao trabalho. |
| **US16** | Como empregador, devo poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada, para que eu possa gerenciar os dados dos meus empregados de maneira eficiente. |
| **US17** | Como usuário do aplicativo (empregado ou empregador) que estiver acessando o aplicativo pela primeira vez devo cadastrar uma senha de acesso, para que possam começar a utilizar o aplicativo de forma segura.
| **US18**| Como usuário do aplicativo (empregado ou empregador), devo poder recuperar a senha se esquecido, para que eu possa acessar minha conta novamente sem complicações.                                             |
**US19**| Como usuário do aplicativo (empregado ou empregador), devo poder alterar a minha senha de acesso.|
| **US20** | Como empregado, devo poder registrar meus pontos de trabalho (incluindo as pausas) levando em conta as regras de tolerância de distância máxima do local de trabalho, para garantir que os registros sejam válidos e dentro dos limites contratuais.                                                         |
| **US22** | Como empregador, devo receber notificações sempre que um empregado realizar um registro de ponto e quando houver pendência de registro dentro do limite de horário estabelecido em contrato, para que eu possa acompanhar e corrigir qualquer falha no processo de registro de ponto.                                                                                                                      |
| **US23** | Como empregado, devo poder justificar minhas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência, para que eu possa documentar e formalizar a minha justificativa de maneira prática.                                                                                                                      |
| **US27** | Como gestor de folha de ponto na LFD, devo receber automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, descontos legais, dentre outros), para que eu possa revisar e aprovar as folhas de pagamento de forma eficiente.                                    |

---
## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
20/05/2025 | 1.0 | Backlog geral | Caio Venâncio e João Pedro | |
25/05/2025 | 1.1 | MVP | Davi de Aguiar | |
26/05/2025 | 1.2 | Critérios de priorização | Willian Silva | |
