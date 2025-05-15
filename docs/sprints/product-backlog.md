## Lista de Requisitos Funcionais

---

### Objetivo específico 1 - Controle exclusivo da LFD sobre usuários e dados
#### Quanto ao painel de administrador

**RF01: Realizar login no painel de administrador** <br>
A LFD deve poder realizar login no painel de administrador.

**RF02: Cadastrar empregados**  
A LFD deve poder cadastrar empregados no sistema pelo painel de administrador.

**RF03: Editar empregados**  
A LFD deve poder editar os dados dos empregados pelo painel de administrador.

**RF04: Excluir empregados**  
A LFD deve poder excluir qualquer empregado do sistema pelo painel de administrador.

**RF05: Cadastrar empregadores**  
A LFD deve poder visualizar os dados dos empregadores pelo painel de administrador.

**RF06: Editar empregadores**  
A LFD deve poder editar os dados dos empregadores pelo painel de administrador.

**RF07: Excluir empregadores**  
A LFD deve poder excluir qualquer empregador do sistema pelo painel de administrador.

**RF08: Criar contrato de trabalho**  
A LFD deve poder criar um novo contrato de trabalho entre um empregador e um empregado pelo painel de administrador.

**RF09: Editar contrato de trabalho**  
A LFD deve poder editar um contrato de trabalho já existente entre um empregador e um empregado pelo painel de administrador.

**RF10: Excluir contrato de trabalho**  
A LFD deve poder excluir um contrato de trabalho já existente entre um empregador e um empregado pelo painel de administrador.

**RF11: Visualizar os dados dos usuários**  
A LFD deve poder visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo (empregados deverão ser acessados dentro da tabela de empregadores).

**RF12: Visualizar os dados dos contratos**  
A LFD deve poder visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo.

**RF13: Buscar os dados**  
A LFD deve poder buscar os dados dos empregados, empregadores e de contratos existentes.

**RF14: Filtrar os dados**  
A LFD deve poder filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo.

**RF15: Controlar acesso ao aplicativo**  
A LFD deve poder controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho.

**RF16: Visualizar registros de ponto**  
A LFD deve poder visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.

**RF17: Editar registros de ponto**  
A LFD deve poder editar os dados de registro de pontos e relatórios de jornada dos empregados através de um empregador, na tabela de empregadores.

---
### Objetivo específico 2 - Digitalização da marcação de ponto
#### Quanto ao acesso ao aplicativo mobile de registro de ponto

**RF18: Realizar login no aplicativo mobile**  
Os usuários (empregados e empregadores) deverão poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada.

**RF19: Criar senha como novo usuário**  
Os usuários (empregados e empregadores) que estiverem acessando o aplicativo pela primeira vez deverão ter a opção de serem redirecionados para uma nova página para cadastrar uma senha de acesso.

---

#### Quanto ao registro de ponto de trabalho no aplicativo mobile

**RF20: Registrar ponto**  
O empregado deve poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho, levando em conta as regras de tolerância de horário.

**RF21: Validar distância do ponto de batida**  
O sistema deve validar se o empregado está em um raio mínimo de 50 metros e máximo de 100 metros do local definido em contrato como ponto autorizado para registro de jornada.

**RF22: Notificar empregado sobre o ponto**  
O sistema deve enviar notificações aos empregados quando houver pendência de registro dentro dos horários estabelecidos em contrato.

**RF23: Notificar empregador sobre o ponto**  
O sistema deve enviar notificações aos empregadores sempre que um empregado realizar uma batida de ponto, ou quando houver pendência no registro dentro do horário estipulado pelo contrato.

**RF24: Justificar falta com envio de arquivo**
Os empregados devem poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência.

**RF25: Adicionar hora extra:**
Um empregador deve poder adicionar hora extra para o empregado, respeitando o limite estabelecido pela lei.

---

### Objetivo específico 3 - Informatização dos dados
#### Quanto ao sistema de relatórios dos registros de ponto

**RF26: Visualizar histórico do registro de ponto**  
O empregado deve poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo.

**RF27: Visualizar histórico de pontos dos empregados**  
O sistema deve permitir que os empregadores acessem o histórico de registros de ponto dos seus respectivos empregados.

**RF28: Calcular salário, horas extras e descontos**
O sistema deve realizar automaticamente o cálculo do salário dos empregados, incluindo horas regulares, horas extras e descontos legais, com base nas marcações de ponto registradas e nas regras de negócio definidas no contrato de trabalho e na legislação vigente.

**RF29: Enviar relatório mensal**  
O sistema deve gerar automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, etc), e enviá-lo à LFD e ao empregador responsável.

<br>

## Lista de Requisitos Não-Funcionais

Estamos utilizado o Framework de Sommerville (2019) para requisitos não funcionais.

---

### Objetivo específico 1 - Controle exclusivo da LFD sobre usuários e dados
#### Quanto à usabilidade:
RNF01: A interface principal do aplicativo deve conter apenas os elementos essenciais para o registro de ponto, organizados de forma a facilitar a identificação e o uso.<br>
RNF02: O sistema deve ser compatível com as versões mais recentes de iOS e Android, bem como com os navegadores mais utilizados (Chrome, Firefox, Edge).<br>
#### Quanto à eficiência:
RNF03: O sistema deverá ser capaz de escalar com o aumento de usuários.
#### Quanto à requisitos regulatórios (requisitos externos)
RNF04: Os dados dos empregados e empregadores devem estar em conformidade com a LGPD.

---

### Objetivo específico 2 - Digitalização da marcação de ponto
#### Quanto à usabilidade:
RNF05: O sistema deve entregar 95% das notificações de registro do ponto batido ou pendente em até 5 segundos após o evento ocorrer. (desempenho).<br>
RNF06: O sistema deve limitar o envio de notificações, com no máximo 4 notificações por dia, de eventos críticos de forma a não sobrecarregar o usuário. Com intervalo mínimo de 15 minutos entre as notificações. (usabilidade).<br>
RNF07: O tempo de resposta do sistema para a realização de um registro de ponto não deverá exceder 2 segundos em 95% das operações.<br>
#### Quanto à dependabilidade:
RNF08: O aplicativo mobile deverá ser compatível com versões mais simples de Android.
#### Quanto à segurança da informação:
RNF09: A autenticação de usuários deve ser segura e proteção contra acesso não autorizado.

---

### Objetivo específico 3 - Informatização dos dados

RNF10 – Armazenamento de Dados: O sistema deve ser capaz de armazenar informações de usuários, registros de ponto e outros dados relacionados por pelo menos 5 anos.

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
      <td>01/05/2025</td>
      <td>1.0</td>
      <td>Versão preliminar do Product Backlog</td>
      <td>Caio Venâncio</td>
      <td>Lucas Guimarães</td>
    </tr>
    <tr>
      <td>07/05/2025</td>
      <td>1.1</td>
      <td>Adicionando Requisitos Funcionais do Product Backlog</td>
      <td>Lucas Guimarães</td>
      <td></td>
    </tr>
    <tr>
      <td>11/05/2025</td>
      <td>1.2</td>
      <td>Editar os Requisitos Funcionais do Product Backlog</td>
      <td>Lucas Guimarães</td>
      <td>Caio Venâncio</td>
    </tr>
    <tr>
      <td>14/05/2025</td>
      <td>1.3</td>
      <td>Editar os Requisitos Não-funcionais do Product Backlog</td>
      <td>Caio Venâncio</td>
      <td></td>
    </tr>
  </tbody>
</table>