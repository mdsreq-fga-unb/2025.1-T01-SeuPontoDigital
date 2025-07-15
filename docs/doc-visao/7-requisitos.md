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


## Reliability (Confiabilidade):

- **RNF03 - Teste automatizados:**

Implementar cobertura de testes automatizados de pelo menos 80% de código, garantindo detecção precoce de regressões.

## Performance (Desempenho):

- **RNF04 - Tempo de Resposta:**

O sistema deverá garantir que o tempo de resposta para qualquer operação no sistema seja menor que 200ms (não garantido no deploy atual, pois está sendo utilizado uma versão gratuita para testes).

## Security (Segurança):


- **RNF05 - Armazenamento Seguro de Dados Sensíveis:**

O sistema deverá utilizar a criptografia (geração de hash) do bcrypt para armazenar dados sensíveis.

- **RNF06 - Armazenamento de Dados:**

O sistema deve ser capaz de armazenar informações de usuários, registros de ponto e outros dados relacionados por pelo menos 2 anos.

## Portability (Portabilidade):

- **RNF07 - Compatibilidade com Android:**

O aplicativo mobile deve ser compatível com dispositivos que utilizem Android, em sua versão 10 ou superior.

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
      <td>Lucas Guimarães</td>
    </tr>
    <tr>
      <td>26/05/2025</td>
      <td>1.1</td>
      <td>Adiciona a lista de requisitos nao funcionais</td>
      <td>Joao Pedro Ferreira Moraes</td>
      <td>Davi de Aguiar</td>
    </tr>
    <tr>
      <td>14/07/2025</td>
      <td>1.2</td>
      <td>Adiciona a lista de requisitos nao funcionais</td>
      <td>Davi de Aguiar</td>
      <td>Lucas Guimarães</td>
    </tr>
  </tbody>
</table>
