# 2. Solução Proposta

## 2.1 Objetivo do Produto 

O objetivo do produto é informatizar o registro de ponto pelos empregados domésticos por meio de um aplicativo mobile, que permite registrar os horários de entradas, saídas e pausas para almoço, e com base nesses registros, calcular automaticamente o salário, as horas extras e os descontos. Além disso, os dados calculados serão enviados automaticamente para a *Legalize Folha Doméstica*, facilitando a gestão da folha de pagamento e garantindo que os empregadores estejam em conformidade com a legislação trabalhista.

---
## 2.2 Características da Solução 

As caractéristicas da solução proposta, até o momento, incluem:

- Interface minimalista e intuitiva, voltada para usuários com pouca familiaridade tecnológica.

- Controle exclusivo da *Legalize Folha Doméstica* sobre o cadastro de empregadores e empregados.

- Liberação de acesso ao aplicativo condicionada à validação do vínculo empregatício e à autorização da empresa *Legalize Folha Doméstica*.

- Envio automático de notificações aos empregados sobre os registros de ponto.

- Registro de ponto vinculado à presença física no local de trabalho, por geolocalização.

- Justificativas de faltas e ausências registradas diretamente no aplicativo, com envio de arquivos.

- Cálculo automático da jornada mensal, salário, descontos legais e horas extras.

- Geração e envio de relatórios mensais para o empregador e para a *Legalize Folha Doméstica*.

- Exclusividade da *Legalize Folha Doméstica* para realizar alterações nos dados dos relatórios.

---

## 2.3 Tecnologias a Serem Utilizadas 

1. **Frontend (Mobile):** React Native e Expo

2. **Frontend (Painel de Administrador):** React

3. **Backend:** Node e Express

4. **Banco de Dados:** Supabase

5. **Testes**: Jest

6. **Comunicação da Equipe:** Google Meet, Teams e Discord

7. **Controle de Código e Versionamento:** Git e GitHub

8. **Organização e Gerenciamento da Equipe:** GitHub Issues e GitHub Projects

O aplicativo mobile será desenvolvido com **React Native**, utilizando o **Expo**. A comunicação com o backend será feito por meio de uma API REST construída com **Node.js** e **Express**, que será responsável pelas regras de negócio e conexão com o banco de dados. Para armazenamento dos dados, será utilizado o Supabase que oferece autenticação, armazenamento e banco de dados em tempo real baseado no PostgreSQL.

Além disso, será desenvolvido um painel administrativo web utilizando o **React**, acessado via navegador. Esse painel permitirá o gerenciamento completo da aplicação, como cadastro de empregadores e empregados, controle de permissões e visualização dos dados.

Os testes da aplicação (tanto frontend quanto backend) serão feitos utilizando o **Jest**, que permitirá a verificação da lógica de negócio, componentes, e endpoints da API.

 A equipe se comunicará por **Google Meet** (quando o cliente estiver presente) e **Discord** (reuniões internas da equipe), enquanto o controle de código será feito com **Git** e **GitHub**, que também será utilizado para organização de tarefas via **GitHub Issues** e **GitHub Projects**.

---
## 2.4 Pesquisa de Mercado e Análise Competitiva 

**Análise do Mercado**

O mercado de gestão de folha de ponto digital é composto principalmente por soluções destinadas a empresas de médio e grande porte. Contudo, empregadores domésticos e pequenas empresas ainda são pouco atendidos por essas soluções, especialmente aquelas que oferecem funcionalidades simplificadas e acessíveis.

Além disso, a obrigatoriedade da folha de ponto para empregados domésticos, determinada pela [Lei Complementar 150](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp150.htm), é frequentemente ignorada por empregadores, o que evidencia uma oportunidade de oferecer uma solução acessível e eficiente.

**Concorrentes**

- **Concorrentes diretos**

    Aplicativos como [PontoMais](https://app2.pontomais.com.br/) e [MeuPonto](https://meuponto.app/) disponibilizam soluções completas para o controle de ponto digital e gestão da jornada de trabalho, oferecendo funcionalidades como cálculo automatizado de horas extras, administração do banco de horas e geração de relatórios detalhados, como o espelho de ponto. No entanto, os planos disponíveis são voltados para empresas com um grande número de funcionários, e a opção mais acessível contempla até 10 colaboradores — um número superior ao necessário para empregadores domésticos. Além disso, funcionalidades avançadas como geolocalização só estão disponíveis em modalidades superiores, tornando sua adoção menos acessível.

- **Concorrentes indiretos**

    Planilhas manuais, como Google Sheets e Excel, oferecem aos usuários uma maneira prática de registrar diversos tipos de dados, incluindo o controle de ponto digital, por meio de tabelas. Além disso, permitem cálculos automatizados de horas trabalhadas e horas extras por meio de fórmulas e automações. Contudo, o preenchimento manual está sujeito a erros e pode aumentar a carga de trabalho do empregador.


**Diferenciais Competitivos do *SeuPontoDigital***

- Automatização do cálculo de horas e geração automática de relatórios mensais.
- Uso de geolocalização para assegurar registros confiáveis.
- **interface intuitiva** – que adota padrões familiares de design, minimiza a curva de aprendizado ao privilegiar reconhecimento sobre memorização e orienta o usuário com elementos visuais autoexplicativos e feedback imediato, permitindo que empregadores domésticos e pequenas empresas, mesmo sem experiência prévia em sistemas de RH, registrem o ponto em poucos passos.

---
## 2.5 Análise de Viabilidade
A viabilidade do projeto *SeuPontoDigital* pode ser avaliada sob três dimensões principais: técnica, de prazo e de mercado. Cada uma dessas dimensões foi analisada para garantir que a solução proposta seja não apenas executável, mas também sustentável e alinhada às necessidades reais do público-alvo.

**Viabilidade Técnica**

O projeto é tecnicamente viável, considerando as tecnologias selecionadas para o desenvolvimento. O uso de React Native com Expo facilita a construção de um aplicativo multiplataforma com um único código-fonte, otimizando recursos de desenvolvimento. O backend será construído com Node.js, uma tecnologia amplamente adotada e bem documentada, e o banco de dados relacional PostgreSQL garante segurança e desempenho no armazenamento dos dados. A integração com geolocalização, notificações e cálculos automáticos, embora tecnicamente desafiadora, é totalmente viável com as ferramentas escolhidas e com a arquitetura proposta.

**Viabilidade de Prazo**

Apesar dos requisitos do MVP ainda não estarem completamente definidos, a viabilidade do cronograma pode ser defendida com base em outros fatores relevantes. Primeiramente, o projeto apresenta uma complexidade moderada, com funcionalidades que, embora importantes, não exigem o uso de tecnologias ou algoritmos avançados. Isso permite uma implementação mais direta e ágil.

Além disso, a equipe optou por utilizar tecnologias que possuem ampla documentação e comunidade ativa, facilitando a curva de aprendizado e reduzindo o tempo gasto com pesquisa e resolução de problemas.


**Viabilidade de Mercado**

O *SeuPontoDigital* propõe uma solução acessível e prática para o controle de ponto no contexto doméstico, alinhada às exigências legais. Com funcionalidades que informatizam o controle de jornada, geram relatórios legais e promovem transparência entre empregador e empregado, a proposta busca atender um público com necessidades específicas de forma simples.

## 2.6 Impacto da Solução 

 Espera-se que a solução facilite a rotina do empregado, do empregador e da *Legalize Folha Doméstica*, proporcionando maior controle sobre a organização das folhas de ponto e também dos dados relacionados à folha de pagamento. Como resultado, a empresa será positivamente impactada pela redução de falhas manuais e pela economia de tempo, fortalecendo sua competitividade no mercado e ampliando sua capacidade de atender clientes de forma mais eficiente.

 ---

## Historico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
15/04/2025 | 1.0 | Características da solução e Ferramentas utilizadas | Lucas Guimarães | Thiago Tonin|
16/04/2025 | 1.1 | Pesquisa de Mercado e Análise Competitiva e Objetivo do Produto (correção de adjetivos) | Joao Pedro | Davi de Aguiar|
17/04/2025 | 1.2 | Impacto da Solução | Willian Silva | Caio Venâncio|
17/04/2025 | 1.3 | Análise de viabilidade (técnica, prazo e mercado) | Davi de Aguiar | Guilherme Moura|
21/04/2025 | 1.4 | Correção e revisão da Solução Proposta| Lucas Guimarães | Davi de Aguiar |
