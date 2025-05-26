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
Nome    | Feature Associada  | Descrição
--------| --------- | ----- 
**US01** | F01 | Como gestor de folha de ponto na LFD, devo poder acessar o painel de administrador para que eu possa gerenciar os usuários (empregadores e empregados) e receber relatórios. 
**US02** | F01 | Como gestor de folha de ponto na LFD, devo poder cadastrar empregadores no sistema pelo painel de administrador para que eu possa visualizar, gerenciar e acompanhar as informações de cada empregador de forma organizada.
**US03** | F01 | Como gestor de folha de ponto na LFD, devo poder editar os dados dos empregadores pelo painel de administrador.
**US04** | F01 | Como gestor de folha de ponto na LFD, devo excluir qualquer empregador do sistema pelo painel de administrador.
**US05** | F01 | Como gestor de folha de ponto na LFD, devo criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação.
**US06** | F01 | Como gestor de folha de ponto na LFD, devo editar os dados de contrato e do empregado em uma única operação.
**US07** | F01 | Como gestor de folha de ponto na LFD, devo excluir o contrato e o empregado associado.
**US08** | F01 | Como gestor de folha de ponto na LFD, devo visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo.
**US09** | F01 | Como gestor de folha de ponto na LFD, devo visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo.
**US10** | F01 | Como gestor de folha de ponto na LFD, devo buscar os dados dos empregados, empregadores e de contratos existentes. 
**US11** | F01 | Como gestor de folha de ponto na LFD, devo filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo. 
**US12** | F01 | Como gestor de folha de ponto na LFD, devo controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho. 
**US13** | F01 | Como gestor de folha de ponto na LFD, devo visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.
**US14** | F02 | Como empregado, devo poder acessar o aplicativo mobile
**US15** | F02 | Como empregador, devo poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada. 
**US16** | F02 | Como usuário do aplicativo (empregado ou empregador) que estiverem acessando o aplicativo pela primeira vez deverão ter a opção de serem redirecionados para uma nova página para cadastrar uma senha de acesso.
**US17** | F02 | Como empregado, devo poder recuperar a senha se esquecido.
**US18** | F02 | Como empregado, devo poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho levando em conta as regras de tolerância de horário e de distância mínima do local de trabalho.
**US19** | F02 | Como empregador, devo receber notificações quando houver pendência de registro dentro do limite de horário estabelecido em contrato.
**US21** | F02 | Como gestor, devo poder ter alertas de falta de marcação do empregado (precisa disso) 
**US22** | F02 | Como empregador, devo receber notificações sempre que um empregado realizar uma batida de ponto no registro, dentro do horário estipulado pelo contrato. 
**US23** | F02 | Como empregado, devo poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência
**US24** | F02 | Como empregador, devo poder marcar certos dias de trabalho como feriado.
**US25** | F02 | Como gestor, devo poder colocar observações necessárias para dias de trabalho 
**US26** | F03 | Como empregado, devo poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo. 
**US27** | F03 | Como empregador, devo poder acessar o histórico de registros de ponto dos meus respectivos empregados. 
**US28** | F03 | Como gestor de folha de ponto na LFD, devo receber automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, descontos legais, dentre outros).
**US29** | F03 | Como empregado, devo receber a folha de ponto preenchida após o encerramento.

## 9.2 Priorização do Backlog Geral

Nesta seção, foi realizado a priorização dos itens do backlog utilizando a técnica MoSCoW. A princípio, acreditávamos que não seria possível aplicá-la, pois havíamos classificado as categorias diretamente nas funcionalidades em vez dos requisitos. Contudo, ao corrigir esse entendimento—focando os requisitos em vez das funcionalidades—ficou claro que a priorização MoSCoW se aplica perfeitamente.

A seguir, apresentamos as quatro categorias da técnica MoSCoW:
- **Must have** (Precisa ter): requisitos essenciais para o funcionamento do produto, que devem ser entregues obrigatoriamente.
- **Should have** (Deve ter): requisitos importantes, mas que podem ser implementados após os essenciais.
- **Could have** (Poderia ter): requisitos desejáveis, que agregam valor ao produto, porém não são prioritários no escopo inicial.
- **Won’t have** (Não vai ter): requisitos que não serão incluídos no momento, sendo considerados para versões futuras.

Segue a abaixo a tabela de prioridades:
//a lista está desatualizada, siga a lista acima

Data     | Descrição | Prioridade | MVP
--------| --------- | ----- | ---------
**US01**| A LFD deve poder realizar login no painel de administrador.|Must Have| X |
**US02**| A LFD deve poder cadastrar empregadores no sistema pelo painel de administrador.|Must Have| X |
**US03**| A LFD deve poder editar os dados dos empregadores pelo painel de administrador.|Must Have| X |
**US04**| A LFD deve poder excluir qualquer empregador do sistema pelo painel de administrador.|Must Have| X |
**US05**| A LFD deve poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação.|Must Have| X |
**US06**| A LFD deve poder editar os dados de contrato e do empregado em uma única operação.|Must Have| X |
**US07**| A LFD deve poder excluir o contrato e o empregado associado.|Must Have| X |
**US08**| A LFD deve poder visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo (empregados deverão ser acessados dentro da tabela de empregadores).|Should have|  |
**US09**| A LFD deve poder visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo.|Could have|
**US10**| A LFD deve poder buscar os dados dos empregados, empregadores e de contratos existentes.|Could have|
**US11**| A LFD deve poder filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo.|Could have|
**US12**| A LFD deve poder controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho.|Must have|X
**US13**| A LFD deve poder visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.|Should Have|X
**US14**| A LFD deve poder editar os dados de registro de pontos e relatórios de jornada dos empregados através de um empregador, na tabela de empregadores.|Could have|
**US15**| Os usuários (empregados e empregadores) deverão poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada.|Must have|X
**US16**| Os usuários (empregados e empregadores) que estiverem acessando o aplicativo pela primeira vez deverão ter a opção de serem redirecionados para uma nova página para cadastrar uma senha de acesso.|Should have|X
**US17**| O empregado deve poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho, levando em conta as regras de tolerância de horário.|Must have|X
**US18**| O sistema deve validar se o empregado está em um raio mínimo de 50 metros e máximo de 100 metros do local definido em contrato como ponto autorizado para registro de jornada.|Must have|X
**US19**| O sistema deve enviar notificações aos empregados quando houver pendência de registro dentro dos horários estabelecidos em contrato.|Must have|X
**US20**| O sistema deve enviar notificações aos empregadores sempre que um empregado realizar uma batida de ponto, ou quando houver pendência no registro dentro do horário estipulado pelo contrato.|Should have|
**US21**| Os empregados devem poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência.|Must have|X
**US22**| Um empregador deve poder adicionar hora extra para o empregado, respeitando o limite estabelecido pela lei.|Should have|
**US23**| O empregado deve poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo.|Could have|
**US24**| O sistema deve permitir que os empregadores acessem o histórico de registros de ponto dos seus respectivos empregados.|Should have|
**US25**| O sistema deve realizar automaticamente o cálculo do salário dos empregados, incluindo horas regulares, horas extras e descontos legais, com base nas marcações de ponto registradas e nas regras de negócio definidas no contrato de trabalho e na legislação vigente.|Should have|
**US26**| O sistema deve gerar automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, etc), e enviá-lo à LFD e ao empregador responsável.|Must Have|X

## 9.3 MVP
O MVP (Produto Mínimo Viável) do sistema foi definido com base nos requisitos classificados como essenciais para o funcionamento básico e viável da solução, considerando principalmente as funcionalidades **Must Have** e algumas **Should Have** que complementam a jornada do usuário. A seleção foi realizada levando em conta a **prioridade de negócio**, a **viabilidade técnica inicial** e a **necessidade de validar a proposta de valor do sistema com usuários reais**. O foco foi garantir que a LFD (administração) possa gerenciar empregadores, contratos e empregados, e que usuários (empregados e empregadores) possam acessar e utilizar o aplicativo para controle de jornada de forma funcional e segura.

#### **Itens que compõem o MVP**

| Código   | Descrição                                                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US01** | A LFD deve poder realizar login no painel de administrador.                                                                                                                                                                                               |
| **US02** | A LFD deve poder cadastrar empregadores no sistema pelo painel de administrador.                                                                                                                                                                          |
| **US03** | A LFD deve poder editar os dados dos empregadores pelo painel de administrador.                                                                                                                                                                           |
| **US04** | A LFD deve poder excluir qualquer empregador do sistema pelo painel de administrador.                                                                                                                                                                     |
| **US05** | A LFD deve poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação.                                                                                                                                               |
| **US06** | A LFD deve poder editar os dados de contrato e do empregado em uma única operação.                                                                                                                                                                        |
| **US07** | A LFD deve poder excluir o contrato e o empregado associado.                                                                                                                                                                                              |
| **US12** | A LFD deve poder controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho.                                                                                                                         |
| **US13** | A LFD deve poder visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.                                                                                                 |
| **US15** | Os usuários (empregados e empregadores) deverão poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada. |
| **US16** | Os usuários (empregados e empregadores) que estiverem acessando o aplicativo pela primeira vez deverão ter a opção de serem redirecionados para uma nova página para cadastrar uma senha de acesso.                                                       |
| **US17** | O empregado deve poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho, levando em conta as regras de tolerância de horário.                                                               |
| **US18** | O sistema deve validar se o empregado está em um raio mínimo de 50 metros e máximo de 100 metros do local definido em contrato como ponto autorizado para registro de jornada.                                                                            |
| **US19** | O sistema deve enviar notificações aos empregados quando houver pendência de registro dentro dos horários estabelecidos em contrato.                                                                                                                      |
| **US21** | Os empregados devem poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência.                                                                                                                      |
| **US26** | O sistema deve gerar automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, etc), e enviá-lo à LFD e ao empregador responsável.                                    |

---
## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
20/05/2025 | 1.0 | BackLog Geral | Caio Venâncio e João Pedro | |