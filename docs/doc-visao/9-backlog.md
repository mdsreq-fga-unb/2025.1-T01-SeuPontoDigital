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
| Código  | Feature Associada | Requisito Funcional Relacionado | Declaração |
|---------|-------------------|-------------------------------|------------|
| **US01** | F01 | RF01 | Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios. |
| **US02** | F01 | RF02 | Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa gerenciar as informações de cada empregador de forma organizada. |
| **US03** | F01 | RF03 | Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores, para que eu possa manter suas informações cadastrais atualizadas sempre que necessário. |
| **US04** | F01 | RF04 | Como gestor de folha de ponto na LFD, devo poder excluir qualquer empregador do sistema pelo painel administrativo, para que eu não tenha problema com empregadores inválidos ou incorretos. |
| **US05** | F01 | RF05 | Como gestor de folha de ponto na LFD, devo poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação, para que eu possa facilitar o processo de contratação e evitar erros. |
| **US06** | F01 | RF06 | Como gestor de folha de ponto na LFD, devo poder editar os dados de contrato, para que eu possa realizar ajustes de forma mais rápida e sem duplicação de esforços. |
| **US07** | F01 | RF07 | Como gestor de folha de ponto na LFD, devo poder excluir contratos, para que eu mantenha apenas dados úteis, evitando armazenar informações que não serão mais úteis. |
| **US08** | F01 | RF08 | Como gestor de folha de ponto na LFD, devo poder visualizar os dados dos empregadores no painel administrativo, para que eu possa consultar facilmente as informações e tomar decisões rapidamente. |
| **US09** | F01 | RF09 | Como gestor de folha de ponto na LFD, devo poder visualizar os dados de contratos no painel administrativo, para facilitar o acesso e a tomada de decisão. |
| **US10** | F01 | RF10 | Como gestor de folha de ponto na LFD, devo poder controlar contratos de trabalho, para que eu possa garantir que o acesso ao aplicativo mobile reflita apenas vínculos ativos e evitar fraudes ou acessos indevidos. |
| **US11** | F01 | RF11 | Como usuário, devo acessar e visualizar os registros de ponto e os relatórios de jornada dos empregados sob minha responsabilidade, para que eu possa monitorar e gerenciar o cumprimento das jornadas de trabalho de forma centralizada. |
| **US12** | F01 | RF12 | Como gestor de folha de ponto na LFD, devo poder adicionar observações a algum dia de trabalho de qualquer empregado, para que eu possa registrar informações complementares quando for necessário. |
| **US13** | F02 | RF13 | Como usuário do aplicativo (empregado ou empregador), devo poder criar uma nova senha, para que eu possa acessar minha conta no primeiro acesso ou caso tenha esquecido minha senha. |
| **US14** | F02 | RF14 | Como usuário do aplicativo (empregado ou empregador), devo poder acessar o aplicativo mobile para que eu possa acessar as funcionalidades do meu perfil. |
| **US15** | F03 | RF15 | Como empregado, devo poder registrar meus pontos de trabalho, para que eu possa ter meus registros de ponto digitalmente de maneira válida e precisa. |
| **US16** | F03 | RF16 | Como empregado, devo poder justificar minhas faltas diretamente pelo aplicativo, para que eu possa documentar e formalizar a minha justificativa de maneira prática. |
| **US17** | F03 | RF17 | Como empregado, devo poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo, para que eu possa acompanhar minhas horas de trabalho e verificar a precisão dos registros. |
| **US18** | F03 | RF18 | Como gestor de folha de ponto na LFD, devo poder receber um relatório mensal dos registros de ponto, para que eu possa revisar e aprovar as folhas de pagamento de forma eficiente. |


### **9.1.3 — Lista de requisitos não-funcionais**

- **RNF01:** A interface do aplicativo deve ser projetada de forma a oferecer uma navegação rápida, permitindo que os usuários realizem as principais tarefas com no máximo 4  interações por tela.

- **RNF02:** A interface principal do aplicativo deve ser projetada com foco nos elementos diretamente relacionados ao registro de ponto, garantindo que informações ou funcionalidades secundárias não prejudiquem os usuários no tempo de identificação máximo de 5 segundos dos controles principais. 

- **RNF03:** O sistema deve limitar o envio de notificações importantes — aquelas que envolvem ações essenciais do usuário, como confirmação de registros de ponto, lembretes de horários ou comunicações obrigatórias. Cada usuário poderá receber no máximo 4 dessas notificações por dia, com um intervalo mínimo de 15 minutos entre elas, a fim de preservar a atenção do usuário e evitar interrupções frequentes que possam afetar negativamente sua experiência de uso.

- **RNF04:** Implementar cobertura de testes automatizados de pelo menos 80% de código, garantindo detecção precoce de regressões.

- **RNF05:** As notificações de ponto (batido ou pendente) devem ser entregues em até 5 segundos após o evento ocorrer, em 95% dos casos.

- **RNF06:** O sistema deverá garantir que o tempo de resposta para qualquer operação no sistema seja menor que 200ms.

- **RNF07:** Todas as APIs devem usar JWT, com tokens expirando após 30 min de inatividade e renovação segura via refresh tokens.

- **RNF08:** O sistema deverá utilizar a criptografia (geração de hash) do bcrypt para armazenar dados sensíveis.

- **RNF09:** O sistema deve ser capaz de armazenar informações de usuários, registros de ponto e outros dados relacionados por pelo menos 5 anos.

- **RNF10:** O aplicativo mobile deve ser compatível com dispositivos que utilizem Android, em sua versão 10 ou superior.


## 9.2 Priorização do Backlog Geral

As técnicas de priorização que serão utilizadas pela equipe para priorizar os itens do backlog são **MoSCoW**, para análise qualitativa, e **ICE**, para análise quantitativa, uma vez que ambos se complementam ao suprir as limitações um do outro e assegurar maior objetividade e alinhamento na priorização. Sob esse viés, seguem as explicações detalhadas de cada modelo:

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

|   Nome    | Requisito associado | MoSCoW      | Impacto | Confiança | Facilidade | ICE Score | Quadrante |
|-----------|---------------------|-------------|---------|-----------|------------|-----------|-----------|
| **US10**  | RF10                | Must Have   | 10      | 8         | 10         | 800       | 1         |
| **US01**  | RF01                | Must Have   | 9       | 9         | 8          | 648       | 1         |
| **US14**  | RF14                | Must Have   | 10      | 9         | 7          | 630       | 1         |
| **US02**  | RF02                | Must Have   | 8       | 8         | 9          | 576       | 1         |
| **US03**  | RF03                | Must Have   | 9       | 9         | 7          | 567       | 1         |
| **US04**  | RF04                | Must Have   | 7       | 9         | 8          | 504       | 1         |
| **US06**  | RF06                | Must Have   | 9       | 9         | 6          | 486       | 2         |
| **US18**  | RF18                | Must Have   | 9       | 8         | 6          | 432       | 2         |
| **US13**  | RF13                | Must Have   | 8       | 8         | 6          | 384       | 2         |
| **US05**  | RF05                | Must Have   | 8       | 6         | 7          | 336       | 2         |
| **US17**  | RF17                | Must Have   | 6       | 7         | 7          | 294       | 2         |
| **US16**  | RF16                | Should Have | 9       | 9         | 7          | 567       | 2         |
| **US15**  | RF15                | Should Have | 9       | 9         | 6          | 486       | 2         |
| **US08**  | RF08                | Should Have | 9       | 8         | 7          | 432       | 2         |
| **US09**  | RF09                | Could Have  | 6       | 10        | 10         | 600       | 3         |
| **US12**  | RF12                | Could Have  | 5       | 7         | 9          | 315       | 4         |
| **US11**  | RF11                | Could Have  | 6       | 6         | 8          | 288       | 4         |
| **US07**  | RF07                | Could Have  | 6       | 7         | 3          | 126       | 4         |

A matriz de esforço e impacto será utilizada como apoio na definição das prioridades das histórias de usuário que compõem o MVP. Para isso, essa ferramenta é estruturada em dois eixos: o eixo vertical representa o impacto, ou seja, o valor de negócio que cada funcionalidade pode gerar; enquanto o eixo horizontal representa o esforço, que corresponde à complexidade e aos recursos necessários para sua implementação.

Dessa forma, a combinação desses dois critérios permite visualizar com clareza quais funcionalidades devem ser priorizadas. A seguir, estão descritos os quatro quadrantes da matriz através de sua relação com o MVP:

- **Quadrante 1 — Baixo esforço e alto impacto:** deve compor o MVP. Alto impacto é considerado Must Have ou Should Have no Moscow pela equipe. Baixo esforço é a partir do 500 no ICE pela equipe.
- **Quadrante 2 — Alto esforço e alto impacto:** pode compor parcialmente o MVP, caso seja essencial. Alto impacto é considerado Must Have ou Should Have no Moscow pela equipe. Alto esforço é abaixo do 500 no ICE pela equipe.
- **Quadrante 3 — Baixo esforço e baixo impacto:** pode compor o MVP, se houver margem de tempo ou recursos disponíveis. Baixo impacto é considerado Could Have ou Won’t Have no Moscow pela equipe. Baixo esforço é a partir do 500 no ICE pela equipe.
- **Quadrante 4 — Alto esforço e baixo impacto:** não deve compor o MVP, pois apresenta baixo retorno em relação ao investimento. Baixo impacto é considerado Could Have ou Won’t Have no Moscow pela equipe. Alto esforço é abaixo do 500 no ICE pela equipe.

## 9.3 MVP
O MVP (Produto Mínimo Viável) do sistema foi definido com base nos requisitos classificados como essenciais para o funcionamento básico e viável da solução, considerando principalmente as funcionalidades **Must Have** e algumas **Should Have** que complementam a jornada do usuário. A seleção foi realizada levando em conta a **prioridade de negócio**, a **viabilidade técnica inicial** e a **necessidade de validar a proposta de valor do sistema com usuários reais**. O foco foi garantir que a LFD (administração) possa gerenciar empregadores, contratos e empregados, e que usuários (empregados e empregadores) possam acessar e utilizar o aplicativo para controle de jornada de forma funcional e segura.

#### **Itens que compõem o MVP**

| Código | Descrição |
|--------|-----------|
| **US01** | Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios. |
| **US02** | Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa gerenciar as informações de cada empregador de forma organizada. |
| **US03** | Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores, para que eu possa manter suas informações cadastrais atualizadas sempre que necessário. |
| **US04** | Como gestor de folha de ponto na LFD, devo poder excluir qualquer empregador do sistema pelo painel de administrador, desde que o empregador não possua contratos encerrados há menos de 2 anos, para que eu possa remover empregadores desnecessários ou inválidos. |
| **US05** | Como gestor de folha de ponto na LFD, devo poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação, para que eu possa facilitar o processo de contratação e evitar erros. |
| **US06** | Como gestor de folha de ponto na LFD, devo poder editar os dados de contrato, para que eu possa realizar ajustes de forma mais rápida e sem duplicação de esforços. |
| **US10** | Como gestor de folha de ponto na LFD, devo poder controlar contratos de trabalho, para que eu possa garantir que o acesso ao aplicativo mobile reflita apenas vínculos ativos e evitar fraudes ou acessos indevidos. |
| **US13** | Como usuário do aplicativo (empregado ou empregador), devo poder criar uma nova senha, para que eu possa acessar minha conta no primeiro acesso ou caso tenha esquecido minha senha. |
| **US14** | Como usuário do aplicativo (empregado ou empregador), devo poder acessar o aplicativo mobile para que eu possa acessar as funcionalidades do meu perfil. |
| **US15** | Como empregado, devo poder registrar meus pontos de trabalho, para que eu possa ter meus registros de ponto digitalmente de maneira válida e precisa. |
| **US17** | Como empregado, devo poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo, para que eu possa acompanhar minhas horas de trabalho e verificar a precisão dos registros. |
| **US18** | Como gestor de folha de ponto na LFD, devo poder receber um relatório mensal dos registros de ponto, para que eu possa revisar e aprovar as folhas de pagamento de forma eficiente. |


---
## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
20/05/2025 | 1.0 | Backlog geral | Caio Venâncio e João Pedro | |
25/05/2025 | 1.1 | MVP | Davi de Aguiar | |
26/05/2025 | 1.2 | Critérios de priorização | Willian Silva | |
23/06/2025 | 1.3 | Priorizacao do BackLog, Requisitos Nao Funcionais, US | Caio Venâncio e João Pedro | |

