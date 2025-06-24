# 4 Engenharia de Requisitos

## 4.1 Atividades e Técnicas de ER

### Elicitação e Descoberta
- **Entrevistas com stakeholders**: entrevistas realizadas com o stakeholder responsável pela Legalize Folha Doméstica (LFD), e colaboladores, ajudam a entender desejos, necessidades, sendo interpretados como ideias capazes de resolver o problema enfretado.
- **Brainstorming**: uma forma de vasculhar entre diferentes ideias e propostas, estimulando a livre expressão de ideias e criatividade. No projeto, é utilizado para que se possa encontrar o melhor caminho de implementação para a solução.

### Análise e consenso
- **Product Backlog Building (PBB)**: PBB (Product Backlog Building) é uma técnica usada para construir e estruturar o backlog do produto de forma colaborativa e alinhada ao negócio. No contexto da Legalize Folha Doméstica, o uso de PBB facilitará a análise ao conectar objetivos com tarefas concretas, enquanto promove o consenso da equipe e do cliente.
- **Priorização MoSCoW**: a priorização MoSCoW é uma técnica utilizada para classificar requisitos ou funcionalidades com base em sua importância para o sucesso do projeto. Suas iniciais representam as categorias "Must have", "Should have", "Could have" e "Won't have". Como a equipe apontou, o projeto do SeuPontoDigital apresenta uma complexidade variável — podendo abranger desde um escopo amplo, com diversas etapas da carteira de trabalho, até um escopo mais restrito, focado apenas na marcação de ponto. Considerando que nosso objetivo principal é resolver o problema da LFD, é essencial aplicar técnicas de priorização que nos permitam distinguir as funcionalidades indispensáveis das que podem ser planejadas para o futuro.
- **Planning Game**: o planning game é uma prática central do Extreme Programming (XP) usado para equilibrar o que precisa ser desenvolvido com seu esforço e complexidade. Com a dificuldade de estimar tempo de requisitos, Planning Game se torna uma opção favorável para equipe estimar capacidade de realizar o requisito na semana.
- **Priorização ICE**:  é uma técnica para classificar e priorizar iniciativas, tarefas ou projetos com base em três critérios principais: Impacto, Confiança e Esforço. Na nossa equipe, ela serve para gerar uma pontuação de prioridade antes do sprint planning.

### Declaração de Requisitos
- **User Story**: histórias de usuário são uma forma simples e informal de descrever requisitos funcionais, de forma que serve muito bem para a equipe SeuPontoDigital para instruir ou lembrar como o requisito deve ser implementado.
<!-- - **Épicos**: épicos são histórias de usuário grandes demais para uma única interação, tornando-se agrupamentos de histórias. São ótimos para ver o quadro mais amplo em uma história, e também para procurar uma história maior sem perder a vantagem de estimar através de histórias menores. -->

### Representação de Requisitos
<!-- podemos fazer protótipos ou mockups -->
- **Storyboards**: storyboards é uma forma informal de representação de fluxo de interação de usuário com um sistema ou produto, sendo utilizado uma sequência de quadros virtuais. Storyboards são úteis para entendimento do contexto de uso e para comunicação com stakeholders, sendo uma forma de SeuPontoDigital ser pensado e configurado graficamente.

### Verificação e Validação de Requisitos
- **Critérios de aceitação**: são condições específicas que uma funcionalidade ou história de usuário passam a ser considerada concluída e aceita pelo Product Owner ou Cliente. No caso do SeuPontoDigital, elas podem ser usadas para orientar o time e guiar testes durante o desenvolvimento do requisito. 
- **Definition of Done (DoD)**: DoD é uma lista clara e objetiva de tudo que precisa ser feito para uma tarefa ou história ser considerada 100% pronto. Aqui, ela terá o objetivo de complementar os critérios de aceitação e de abranger todo o requisito e sua qualidade.
- **Definition of Ready(DoR)**: DoR é uma lista ou conjunto de critério de tudo que a história ou tarefa precisa cumprir antes de ser puxada para o desenvolvimento. a DoR deve ser cumprida durante a sprint planning para que a DoD seja executada na nossa equipe.
- **Revisão informal ou formal**: uma avaliação de trabalho e artefatos realizados, com objetivo de identificar erros e inconsistências, além de buscar compartilhar o conhecimento e conformidade com nossos critérios de aceitação e DoD.
- **Feedback do Cliente**: é uma obinião ou comentário dado pelo cliente através do que foi entregue. É uma forma de verificar se atende às necessidades do usuário e orienta futuras melhorias e práticas na equipe.

### Organização e Atualização de Requisitos
- **Backlog de Requisitos**: é lista dinâmica, priorizada e ordenada de tudo o que deve ser desenvolvido no produto. No nosso caso, deve ser utilizada para atualização e priorização de requisitos, como uma lista aberta de acesso geral.

## 4.2 Engenharia de Requisitos e o Scrum/XP
Fases do Processo     | Atividades ER | Prática | Técnica | Resultado Esperado
-------- | ------ | --------- | ----- | ---------
Planejamento de Release | [Elicitação e Descoberta](#elicitacao-e-descoberta) | Levantamento de requisitos | Entrevistas com Stakeholders, Brainstorming, Product Backlog Building (PBB) | Entedimento de problemas, identificação de funcionalidades e lista de necessidades |
 | [Análise e Consenso](#analise-e-consenso) | Product Backlog Building (PBB), Priorização MoSCoW, Priorização ICE | Priorização dos Requisitos | Escopo e funcionalidades essenciais definidas e priorizadas em comum acordo. | 
| [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Validação de requisitos | Critérios de aceitação | Confirmação de que requisito entrega valor |
 | [Declaração](#declaracao-de-requisitos) | Registro dos requisitos | User Story | Histórias de usuário que detalham as funcionalidades do projeto e Features agrupam essas histórias. |
  | [Organização e Atualização](#organizacao-e-atualizacao-de-requisitos) | Organização dos requisitos implementados ou atrasados | Backlog de requisitos | Backlog atualizado |
Sprint Planning | [Análise e Consenso](#analise-e-consenso) | Mensurar viabilidade de requisitos | Planning Game, Priorização ICE | Negociação do desenvolvimento na interação com desenvolvedores |
 | [Declaração](#declaracao-de-requisitos) | Definição de Critérios de Aceitação | Critérios de aceitação, User Stories | User Stories dfinidos com escopo limitado |
Execução da Sprint | [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Verificação de implementação | Critérios de aceitação, DoD e DoR, Revisão informal ou formal | Confirmação de que entrega atende requisito |
| [Representação](#representacao-de-requisitos) | Criação de storyboard | Storyboards | Storyboards orientam a equipe |
Sprint Review | [Verificação e Validação](#verificacao-e-validacao-de-requisitos) | Apresentação ao cliente dos incrementos desenvolvidos ao longo da Sprint. | Feedback do Cliente. | Funcionalidades avaliadas com base no retorno dos clientes. |
 | [Organização e Atualização](#organizacao-e-atualizacao-de-requisitos) | Organização dos requisitos implementados ou atrasados | Backlog de requisitos | Backlog atualizado |



## Historico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
17/05/2025 | 1.0 | Adição de Atividades e Técnicas de ER | Caio Venâncio  | | 
21/06/2025 | 1.1 | Retirar ambiguidade de USM e PBB [(#74)](https://github.com/mdsreq-fga-unb/2025.1-T01-SeuPontoDigital/issues/74) | Caio Venâcio  | |
21/06/2025 | 1.1 | Adicionar Organização/atualização e Verificação/validação na página [(#75)](https://github.com/mdsreq-fga-unb/2025.1-T01-SeuPontoDigital/issues/75) | Caio Venâcio  | |

## Referências Bibliográficas 
- COHN, Mike. User Stories Applied: For Agile Software Development. Boston: Addison-Wesley, 2004. (para critérios de aceitação como testes de aceitação)
- CRISPIN, Lisa; GREGORY, Janet. Agile Testing: A Practical Guide for Testers and Agile Teams. Addison-Wesley, 2009.
- BECK, Kent. Extreme Programming Explained: Embrace Change. 1st ed. Boston: Addison-Wesley, 1999. (para planning game)