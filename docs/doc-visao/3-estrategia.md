# 3. Estratégias de Engenharia de Software

## 3.1 Estratégia Priorizada

**Abordagem de Desenvolvimento de Software:** Ágil

**Ciclo de vida:** Iterativo e Incremental 

**Processo de Engenharia de Software:** Scrum/XP

---
## 3.2 Quadro Comparativo 

<table border="1" cellspacing="0" cellpadding="4">
  <thead>
    <tr>
      <th style="text-align: center; vertical-align: middle;">Características</th>
      <th style="text-align: center; vertical-align: middle;">Scrum/XP (eXtreme Programming)</th>
      <th style="text-align: center; vertical-align: middle;">AUP (Agile Unified Process)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Abordagem Geral</td>
      <td style="text-align: center; vertical-align: middle;">Iterativo e incremental, com entregas contínuas e feedbacks constantes</td>
      <td style="text-align: center; vertical-align: middle;">Iterativo e incremental, baseado no processo RUP (Rational Unified Process)</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Foco em arquitetura</td>
      <td style="text-align: center; vertical-align: middle;">Arquitetura não é o foco no início do projeto, sendo desenvolvida ao decorrer das iterações e incrementos</td>
      <td style="text-align: center; vertical-align: middle;">Foco em arquitetura baseada em riscos. É proposto identificar uma arquitetura para o projeto na fase de iniciação e na fase de elaboração, a arquitetura é colocada à prova</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Estrutura de Processos</td>
      <td style="text-align: center; vertical-align: middle;">Focada em sprints curtas (1 - 2 semanas) e flexíveis com pequenas entregas ao final de cada sprint</td>
      <td style="text-align: center; vertical-align: middle;">Focado em iterações (1 - 4 semanas) e quatro fases sequenciais: Concepção, Elaboração, Construção e Transição</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Flexibilidade de Requisitos</td>
      <td style="text-align: center; vertical-align: middle;">Alta flexibilidade durante todo o projeto fundamentada pelo feedback constante do cliente</td>
      <td style="text-align: center; vertical-align: middle;">Permite mudanças durante todo o ciclo de vida do projeto</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Colaboração com o cliente</td>
      <td style="text-align: center; vertical-align: middle;">Envolvimento do cliente em todas as sprints, com feedbacks ao final de cada sprint</td>
      <td style="text-align: center; vertical-align: middle;">Envolvimento e feedback do cliente ao longo de todo o projeto durante as frequentes demonstrações</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Complexidade do processo</td>
      <td style="text-align: center; vertical-align: middle;">Processo mais "simples". Com foco menor em documentação, e foco maior na entrega contínua</td>
      <td style="text-align: center; vertical-align: middle;">Complexidade um pouco maior, pois combina a estruturação dos processos do RUP com práticas ágeis</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Controle de Qualidade</td>
      <td style="text-align: center; vertical-align: middle;">Controle de qualidade de acordo com as práticas do XP, como TDD e integração contínua</td>
      <td style="text-align: center; vertical-align: middle;">Incorporta práticas como desenvolvimento orientado a testes, validação contínua e feedbacks do usuário</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Documentação</td>
      <td style="text-align: center; vertical-align: middle;">Documentação mínima, apenas o essencial</td>
      <td style="text-align: center; vertical-align: middle;">Adota o princípio de "documentação suficiente", apenas o necessário para atender às necessidades do projeto</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Escalabilidade</td>
      <td style="text-align: center; vertical-align: middle;">Difícil escalar para projetos maiores, pois é voltado para equipes pequenas</td>
      <td style="text-align: center; vertical-align: middle;">Escalável para projetos médios e grandes</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">Suporte a Equipes de Desenvolvimento</td>
      <td style="text-align: center; vertical-align: middle;">Equipes menores e com papéis flexíveis, permite maior adaptação durante o projeto</td>
      <td style="text-align: center; vertical-align: middle;">Menos adequado para equipes inexperientes, recomendado para equipes com experiência mista</td>
    </tr>
  </tbody>
</table>

---
## 3.3 Justificativa 

A escolha do Scrum/XP foi baseada em três principais fatores, sendo eles:

- Cliente disponível na maior do tempo, facilitando as entregas contínuas, oferecendo feedbacks constantes em todas as sprints e podendo participar de todas as sprints review.
- Equipe pequena, papéis flexíveis e pouco conhecimento em desenvolvimento mobile, permitindo que os membros participem de várias etapas e possam se adaptar durante o projeto, sendo mais eficiente que o AUP, voltado para equipes mistas ou com algum conhecimento prévio
- Flexibilidade durante todo o projeto, permitindo que algumas mudanças possam ocorrer sem prejudicar todo o andamento do projeto.

Além disso, utilizamos uma versão adaptada do GUPTA Framework para ajudar na escolha do melhor processo. Segue imagem abaixo:

[![GUPTA Framework](../assets/images/GUPTA.png)](../assets/images/GUPTA.png) *Obs:* caso a imagem esteja pequena, clique nela para visualizar melhor.

---
## Historico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
15/04/2025 | 1.0 | Estratégia priorizada para o projeto| Lucas Guimarães | Willian Xavier|