# 7. Requisitos de software

Esta lista de requisitos foi elaborada com base na metodologia Product Backlog Building (PBB), um processo colaborativo e estruturado concebido para a criação e o refinamento contínuo de um Product Backlog coeso e de alto valor, essencial para o sucesso de iniciativas ágeis. Diferente de abordagens que focam apenas na listagem de funcionalidades, o PBB investe na compreensão do problema a ser resolvido e das necessidades do usuário, garantindo que cada item do backlog contribua diretamente para a entrega de valor real.

O resultado do PBB pode ser visualizado abaixo:

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIzOTYj4=/?moveToViewport=-10768,-6704,13478,6696&embedId=592726896557" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## 7.1 Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para
atender às necessidades do negócio. Eles incluem integrações, processos e interações do usuário com o
sistema.

---

### Objetivo específico 1 - Controle exclusivo da LFD sobre usuários e dados
#### Quanto ao painel de administrador

**RF01: Realizar login no painel de administrador** <br>

**RF02: Cadastrar empregador no painel de administrador** 

**RF03: Editar dados de empregador no painel de administrador** 

**RF04: Excluir dados de empregador no painel de administrador** 

**RF05: Cadastrar contrato de trabalho** 

**RF06: Editar contrato de trabalho** 

**RF07: Excluir contrato de trabalho** 

**RF08: Visualizar dados dos empregadores** 

**RF09: Visualizar dados de contrato de trabalho** 

**RF10: Controlar acesso de usuários ao aplicativo mobile** 

**RF11: Visualizar registros de ponto de trabalho dos empregados** 

**RF12: Adicionar observações a dias de trabalho dos empregados** 

---
### Objetivo específico 2 - Digitalização da marcação de ponto
#### Quanto ao acesso ao aplicativo mobile de registro de ponto

**RF13: Criar nova senha de acesso no aplicativo mobile** 

**RF14: Realizar login no aplicativo mobile** 

---

#### Quanto ao registro de ponto de trabalho no aplicativo mobile

**RF15: Registrar ponto de trabalho** 

**RF16: Enviar justificativa de falta no aplicativo mobile** 

---

### Objetivo específico 3 - Informatização dos dados
#### Quanto ao sistema de relatórios dos registros de ponto

**RF17: Visualizar próprio histórico de ponto de trabalho** 

**RF18: Gerar relatório de registro de ponto** 

<br>

---

## 7.2 Requisitos Não Funcionais

## Usability (Usabilidade):

- **RNF01 - Navegação Rápida:**

A interface do aplicativo deve ser projetada de forma a oferecer uma navegação rápida, permitindo que os usuários realizem as principais tarefas com no máximo 4  interações por tela.

- **RNF02 - Foco em Registro de Ponto:**

A interface principal do aplicativo deve ser projetada com foco nos elementos diretamente relacionados ao registro de ponto, garantindo que informações ou funcionalidades secundárias não prejudiquem os usuários no tempo de identificação máximo de 5 segundos dos controles principais. 

- **RNF03 - Controle de Notificações:**

O sistema deve limitar o envio de notificações importantes — aquelas que envolvem ações essenciais do usuário, como confirmação de registros de ponto, lembretes de horários ou comunicações obrigatórias. Cada usuário poderá receber no máximo 4 dessas notificações por dia, com um intervalo mínimo de 15 minutos entre elas, a fim de preservar a atenção do usuário e evitar interrupções frequentes que possam afetar negativamente sua experiência de uso.


## Reliability (Confiabilidade):

- **RNF04 - Teste automatizados:**

Implementar cobertura de testes automatizados de pelo menos 80% de código, garantindo detecção precoce de regressões.

## Performance (Desempenho):

<!-- anterior era 06 -->
- **RNF05 - Notificações Rápidas:**

As notificações de ponto (batido ou pendente) devem ser entregues em até 5 segundos após o evento ocorrer, em 95% dos casos.

<!-- esta estava ok, não sei porque foi substituída -Caio -->
<!-- - **RNF08 - Tempo de Resposta do Registro de Ponto:**
O tempo de resposta do sistema para a realização de um registro de ponto não deverá exceder 2 segundos em 95% das operações. -->

<!--  anterior 04-->
- **RNF06 - Tempo de Resposta:**

O sistema deverá garantir que o tempo de resposta para qualquer operação no sistema seja menor que 200ms.

## Security (Segurança):

<!-- RN08 anterior -->
- **RNF07 - APIs com rotas seguras:** 

Todas as APIs devem usar JWT, com tokens expirando após 30 min de inatividade e renovação segura via refresh tokens.

<!-- esta estava ok, não sei porque foi substituída -Caio -->
<!-- - **RNF10 - Dados Seguros:**
Dados sensíveis (senhas) devem ser criptografados em repouso pela bcrypt. -->

<!-- RN05 anterior -->
- **RNF08 - Armazenamento Seguro de Dados Sensíveis:**

O sistema deverá utilizar a criptografia (geração de hash) do bcrypt para armazenar dados sensíveis.

<!-- RN11 anterior -->
- **RNF09 - Armazenamento de Dados:**

O sistema deve ser capaz de armazenar informações de usuários, registros de ponto e outros dados relacionados por pelo menos 5 anos.

## Portability (Portabilidade):

<!-- permanece RNF06 -->
- **RNF10 - Compatibilidade com Android:**

O aplicativo mobile deve ser compatível com dispositivos que utilizem Android, em sua versão 10 ou superior.

<!-- ## Maintainability (Manutenibilidade): -->
<!-- vai ficar sem mesmo será? -Caio -->


---

<h2>Histórico de Versão</h2>
<table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
  <thead>
    <tr>
      <th>Data</th>
      <th>Versão</th>
      <th>Descrição</th>
      <th>Autor(es)</th>
      <th>Revisor(es)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>25/05/2025</td>
      <td>1.0</td>
      <td>Adiciona a lista de requisitos funcionais</td>
      <td>Guilherme Moura</td>
      <td></td>
    </tr>
    <tr>
      <td>26/05/2025</td>
      <td>1.1</td>
      <td>Adiciona a lista de requisitos nao funcionais</td>
      <td>Joao Pedro Ferreira Moraes</td>
      <td></td>
    </tr>
  </tbody>
</table>
