## Objetivo do Produto 

&nbsp;&nbsp;&nbsp;&nbsp;O objetivo do produto é automatizar a marcação do ponto pelos empregados por meio de um aplicativo intuitivo — que permite registrar entrada e saída sem necessidade de manual ou treinamento, com feedback visual com o menor tempo possível — e de navegação fácil — em que todas as funções principais (registro de ponto, histórico, relatórios) são acessíveis em no máximo três toques, com menus padronizados e rótulos claros —, permitindo a contabilização automática das horas diretamente para o contador. Isso reduzirá o tempo de processamento e garantirá uma carga horária justa e corretamente remunerada. Além disso, a solução proporcionará competitividade regional e abrirá a possibilidade de atender clientes em todo o país por meio de uma folha de ponto digital.

---
## Características da Solução 

As caractéristicas da solução proposta, até o momento, incluem:

- Interface minimalista e intuitiva, voltada para usuários com pouca familiaridade tecnológica.

- Controle exclusivo do cliente sobre o cadastro de empresas/empregadores e funcionários.

- Liberação de acesso ao aplicativo condicionada à validação do vínculo empregatício.

- Envio automático de notificações aos funcionários antes dos registros de ponto.

- Registro de ponto vinculado à presença física no local de trabalho, por geolocalização.


- Justificativas de faltas e ausências registradas diretamente pelo aplicativo, com envio de arquivos.

- Cálculo automático da jornada mensal, salário, descontos legais e horas extras.

- Geração e envio de relatórios mensais para cliente, empregador e funcionário.

- Exclusividade do cliente para realizar alterações nos dados dos relatórios.

---

## Tecnologias a Serem Utilizadas 

1. **Frontend (Mobile):** React Native e Expo

2. **Backend:** Node.js

3. **Banco de Dados:** Supabase e PostgreSQL

4. **Comunicação da Equipe:** Google Meet e Discord

5. **Controle de Código e Versionamento:** Git e GitHub

6. **Organização e Gerenciamento da Equipe:** GitHub Issues

O aplicativo mobile será desenvolvido com **React Native**, utilizando o **Expo**. A comunicação com o backend será feito por meio de uma API REST construída com **Node.js**, que será responsável pelas regras de negócio e conexão com o banco de dados. Para armazenamento dos dados, será utilizado o Supabase que oferece autenticação, armazenamento e banco de dados em tempo real baseado no PostgreSQL. A equipe se comunicará por **Google Meet** (quando o cliente estiver presente) e **Discord** (reuniões internas da equipe), enquanto o controle de código será feito com **Git** e **GitHub**, que também será utilizado para organização de tarefas via **GitHub Issues**.

---
## Pesquisa de Mercado e Análise Competitiva 

**Análise do Mercado**

&nbsp;&nbsp;&nbsp;&nbsp;O mercado de gestão de folha de ponto digital é composto principalmente por soluções destinadas a empresas de médio e grande porte. Contudo, empregadores domésticos e pequenas empresas ainda são pouco atendidos por essas soluções, especialmente aquelas que oferecem funcionalidades simplificadas e acessíveis.

&nbsp;&nbsp;&nbsp;&nbsp;Além disso, a obrigatoriedade da folha de ponto para empregados domésticos, determinada pela Lei Complementar 150, é frequentemente ignorada por empregadores, o que evidencia uma oportunidade de oferecer uma solução acessível e eficiente.

**Concorrentes**

- **Concorrentes diretos**

    Aplicativos como PontoMais e MeuPonto disponibilizam soluções completas para o controle de ponto digital e gestão da jornada de trabalho, oferecendo funcionalidades como cálculo automatizado de horas extras, administração do banco de horas e geração de relatórios detalhados, como o espelho de ponto. No entanto, os planos disponíveis são voltados para empresas com um grande número de funcionários, e a opção mais acessível contempla até 10 colaboradores — um número superior ao necessário para empregadores domésticos. Além disso, funcionalidades avançadas como geolocalização só estão disponíveis em modalidades superiores, tornando sua adoção menos acessível.

- **Concorrentes indiretos**

    Planilhas manuais, como Google Sheets e Excel, oferecem aos usuários uma maneira prática de registrar diversos tipos de dados, incluindo o controle de ponto digital, por meio de tabelas. Além disso, permitem cálculos automatizados de horas trabalhadas e horas extras por meio de fórmulas e automações. Contudo, o preenchimento manual está sujeito a erros e pode aumentar a carga de trabalho do empregador.


**Diferenciais Competitivos de SeuPontoDigital**

- Automatização do cálculo de horas e geração automática de relatórios mensais.
- Uso de geolocalização para assegurar registros confiáveis.
- Interface intuitiva para empregadores domésticos e pequenas empresas, permitindo que qualquer usuário, mesmo sem experiência prévia em sistemas de RH, registre o ponto em poucos passos.

---
## Análise de Viabilidade
A viabilidade do projeto SeuPontoDigital pode ser avaliada sob três dimensões principais: técnica, de prazo e de mercado. Cada uma dessas dimensões foi analisada para garantir que a solução proposta seja não apenas executável, mas também sustentável e alinhada às necessidades reais do público-alvo.

### Viabilidade Técnica

O projeto é tecnicamente viável, considerando as tecnologias selecionadas para o desenvolvimento. O uso de React Native com Expo facilita a construção de um aplicativo multiplataforma com um único código-fonte, otimizando recursos de desenvolvimento. O backend será construído com Node.js, uma tecnologia amplamente adotada e bem documentada, e o banco de dados relacional PostgreSQL garante segurança e desempenho no armazenamento dos dados. A integração com geolocalização, notificações e cálculos automáticos, embora tecnicamente desafiadora, é totalmente viável com as ferramentas escolhidas e com a arquitetura proposta.

### Viabilidade de Prazo

Apesar dos requisitos do MVP ainda não estarem completamente definidos, a viabilidade do cronograma pode ser defendida com base em outros fatores relevantes. Primeiramente, o projeto apresenta uma complexidade moderada, com funcionalidades que, embora importantes, não exigem o uso de tecnologias ou algoritmos avançados. Isso permite uma implementação mais direta e ágil.

Além disso, a equipe optou por utilizar tecnologias com as quais já possui familiaridade ou que possuem ampla documentação e comunidade ativa, facilitando a curva de aprendizado e reduzindo o tempo gasto com pesquisa e resolução de problemas.


### Viabilidade de Mercado

O SeuPontoDigital propõe uma solução acessível e prática para o controle de ponto no contexto doméstico, alinhada às exigências legais. Com funcionalidades que automatizam o controle de jornada, geram relatórios legais e promovem transparência entre empregador e empregado, a proposta busca atender um público com necessidades específicas de forma simples e eficiente.

## Impacto da Solução 

&nbsp;&nbsp;&nbsp;&nbsp;Como o escopo da solução consiste na gestão de uma folha de ponto, espera-se que o aplicativo facilite a rotina do empregador, proporcionando maior controle sobre a organização dessas folhas. Além disso, exigiria menos esforço por parte do empregado para cumprir as exigências da legislação trabalhista, como a assinatura da folha, e o contador, por sua vez, receberia automaticamente os dados necessários para o preenchimento, já no formato exigido pela legislação. Dessa forma, avalia-se que a empresa seria impactada positivamente por meio da otimização de processos, redução de erros manuais e economia de tempo.

## Historico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
15/04/2025 | 1.0 | Características da solução e Ferramentas utilizadas | Lucas Guimarães |
16/04/2025 | 1.1 | Pesquisa de Mercado e Análise Competitiva e Objetivo do Produto (Adjetivos) | Joao Pedro |
17/04/2025 | 1.2 | Impacto da Solução | Willian Silva |
17/04/2025 | 1.3 | Análise de viabilidade (técnica, prazo e mercado) | Davi de Aguiar |
