Esta lista de requisitos foi elaborada com base na metodologia Product Backlog Building (PBB), um processo colaborativo e estruturado concebido para a criação e o refinamento contínuo de um Product Backlog coeso e de alto valor, essencial para o sucesso de iniciativas ágeis. Diferente de abordagens que focam apenas na listagem de funcionalidades, o PBB investe na compreensão do problema a ser resolvido e das necessidades do usuário, garantindo que cada item do backlog contribua diretamente para a entrega de valor real.

O resultado do PBB pode ser visualizado abaixo:

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIzOTYj4=/?moveToViewport=-10768,-6704,13478,6696&embedId=592726896557" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para
atender às necessidades do negócio. Eles incluem integrações, processos e interações do usuário com o
sistema.

---

### Objetivo específico 1 - Controle exclusivo da LFD sobre usuários e dados
#### Quanto ao painel de administrador

**RF01: Realizar login no painel de administrador** <br>
A LFD deve poder realizar login no painel de administrador.

**RF02: Cadastrar empregadores**  
A LFD deve poder cadastrar empregadores no sistema pelo painel de administrador.

**RF03: Editar empregadores**  
A LFD deve poder editar os dados dos empregadores pelo painel de administrador.

**RF04: Excluir empregadores**  
A LFD deve poder excluir qualquer empregador do sistema pelo painel de administrador.

**RF05: Cadastrar contrato de trabalho**  
A LFD deve poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação.

**RF06: Editar contrato de trabalho**  
A LFD deve poder editar os dados de contrato e do empregado em uma única operação.

**RF07: Excluir contrato de trabalho**  
A LFD deve poder excluir o contrato e o empregado associado.

**RF08: Visualizar os dados dos usuários**  
A LFD deve poder visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo (empregados deverão ser acessados dentro da tabela de empregadores).

**RF09: Visualizar os dados dos contratos**  
A LFD deve poder visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo.

**RF10: Buscar os dados**  
A LFD deve poder buscar os dados dos empregados, empregadores e de contratos existentes.

**RF11: Filtrar os dados**  
A LFD deve poder filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo.

**RF12: Controlar acesso ao aplicativo**  
A LFD deve poder controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho.

**RF13: Visualizar registros de ponto**  
A LFD deve poder visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.

**RF14: Adicionar observações para dias de trabalho**
A LFD deve poder adicionar observações necessárias para dias de trabalho.

---
### Objetivo específico 2 - Digitalização da marcação de ponto
#### Quanto ao acesso ao aplicativo mobile de registro de ponto

**RF15: Realizar login no aplicativo mobile**  
Os usuários (empregados e empregadores) deverão poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada.

**RF16: Redefinir senha como novo usuário**  
Os usuários (empregados e empregadores) que estiverem acessando o aplicativo pela primeira vez deverão alterar a senha de acesso.

**RF17: Redefinir senha**
Os usuários (empregados e empregadores) devem poder alterar a senha de acesso ao aplicativo.

**RF18: Recuperar senha**
Os usuários (empregados e empregadores) devem poder recuperar o acesso ao aplicativo cadastrando uma nova senha.

---

#### Quanto ao registro de ponto de trabalho no aplicativo mobile

**RF19: Registrar ponto**  
O empregado deve poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho, levando em conta as regras de tolerância de horário.

**RF20: Validar distância do ponto de batida**  
O sistema deve validar se o empregado está em um raio mínimo de 50 metros e máximo de 100 metros do local definido em contrato como ponto autorizado para registro de jornada.

**RF21: Notificar LFD sobre o ponto**  
O sistema deve enviar notificações à LFD quando houver pendência de registro de ponto dentro dos horários estabelecidos em contrato.

**RF22: Notificar empregador sobre o ponto**  
O sistema deve enviar notificações aos empregadores sempre que um empregado realizar uma batida de ponto, ou quando houver pendência no registro dentro do horário estipulado pelo contrato.

**RF23: Justificar falta com envio de arquivo**
Os empregados devem poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência.

**RF24: Adicionar hora extra:**
Um empregador deve poder adicionar hora extra para o empregado, respeitando o limite estabelecido pela lei.

**RF25: Indicar feriados:**
Um empregador deve poder indicar quais dias são feriados.

---

### Objetivo específico 3 - Informatização dos dados
#### Quanto ao sistema de relatórios dos registros de ponto

**RF26: Visualizar histórico do registro de ponto**  
O empregado deve poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo.

**RF26: Visualizar histórico de pontos dos empregados**  
O sistema deve permitir que os empregadores acessem o histórico de registros de ponto dos seus respectivos empregados.

**RF27: Calcular salário, horas extras e descontos**
O sistema deve realizar automaticamente o cálculo do salário dos empregados, incluindo horas regulares, horas extras e descontos legais, com base nas marcações de ponto registradas e nas regras de negócio definidas no contrato de trabalho e na legislação vigente.

**RF28: Enviar relatório mensal**  
O sistema deve gerar automaticamente um relatório mensal contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, etc), e enviá-lo à LFD e ao empregador responsável em um dia selecionado.

**RF29: Enviar folha de ponto mensal**
O sistema deve enviar automaticamente a folha de ponto preenchida ao empregado após o encerramento do mês.

<br>

---

## Requisitos Não Funcionais

### Usability (Usabilidade):
- **RNF01 : Interface Intuitiva**
A interface do aplicativo deve permitir que usuários realizem as principais tarefas com poucas interações por tela e elementos visuais de fácil leitura e toque.

- **RNF02: Interface Simples** 
A interface principal do aplicativo deve conter apenas os elementos essenciais para o registro de ponto, organizados de forma a facilitar a identificação e o uso.

### Reliability (Confiabilidade):

- **RNF03: Sistema Escalável**
O sistema deverá ser capaz de escalar sem degradação perceptível à medida que o número de usuários cresce.

- **RNF04: Teste automatizados**
Implementar cobertura de testes automatizados de pelo menos 80% de código, garantindo detecção precoce de regressões.

- **RNF05: Dados Confiáveis**
Os dados de empregados e empregadores devem estar em conformidade com a LGPD, incluindo anonimização ou criptografia de campos sensíveis.

### Performance (Desempenho):

- **RNF06: Notificações Rápidas**
As notificações de ponto (batido ou pendente) devem ser entregues em até 5 segundos após o evento ocorrer, em 95% dos casos.

- **RNF07: Notificações Agradáveis**
Limitar o envio de notificações críticas a, no máximo, 4 por dia por usuário, com intervalo mínimo de 15 min entre elas, para não sobrecarregar o usuário.

### Security (Segurança):

- **RNF08: APIs com rotas seguras** 
Todas as APIs devem usar JWT, com tokens expirando após 30 min de inatividade e renovação segura via refresh tokens.

- **RNF09: Dados Seguros**
Dados sensíveis (senhas) devem ser criptografados em repouso pela bcrypt.

### Portability (Portabilidade):

- **RNF10: Compatibilidade com vários aparelhos**
O aplicativo mobile deve ser compatível com Android (versões 7.0 em diante) e iOS (12.0 em diante), rodando em smartphones de diferentes fabricantes sem ajustes específicos no código.

### Maintainability (Manutenibilidade):

- **RNF11: Código padronizado** - Código modular e bem documentado; uso de comentários claros, padronização de commits.

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