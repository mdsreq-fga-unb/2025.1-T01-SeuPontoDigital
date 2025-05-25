# 7. Requisitos de software

## 7.1

## 7.2

//por favor, retire o padrão USXX da lista, e verifique se todos estes requisitos estão no padrão <ação><verbo>, e não esqueça de conferir se está refletindo a lista no tópico 9
**US01** - A LFD deve poder realizar login no painel de administrador.

**US02**: A LFD deve poder cadastrar empregadores no sistema pelo painel de administrador.

**US03**: A LFD deve poder editar os dados dos empregadores pelo painel de administrador.

**US04**: A LFD deve poder excluir qualquer empregador do sistema pelo painel de administrador.

**US05**: A LFD deve poder criar um novo contrato e, junto dele, cadastrar os dados do empregado numa única operação.

**US06**: A LFD deve poder editar os dados de contrato e do empregado em uma única operação.

**US07**: A LFD deve poder excluir o contrato e o empregado associado.

**US08**: A LFD deve poder visualizar os dados dos empregados e empregadores em formato de tabela no painel administrativo (empregados deverão ser acessados dentro da tabela de empregadores).

**US09**: A LFD deve poder visualizar os dados dos contratos de trabalho em formato de tabela no painel administrativo.

**US10**: A LFD deve poder buscar os dados dos empregados, empregadores e de contratos existentes.

**US11**: A LFD deve poder filtrar os dados dos empregados, empregadores e de contratos existentes baseado em status ativo ou inativo.

**US12**: A LFD deve poder controlar o acesso de empregados e empregadores ao aplicativo mobile através da tabela de contratos de trabalho.

**US13**: A LFD deve poder visualizar os dados de registro de ponto e os relatórios de jornada de um empregado através de um empregador, na tabela de empregadores.

**US15**: Os usuários (empregados e empregadores) deverão poder acessar o aplicativo mobile se estiverem cadastrados no sistema, possuírem um contrato de trabalho ativo e tiverem permissão de acesso. O login deverá ser feito utilizando CPF e senha cadastrada.

**US16**: Os usuários (empregados e empregadores) que estiverem acessando o aplicativo pela primeira vez deverão ter a opção de serem redirecionados para uma nova página para cadastrar uma senha de acesso.

**US17**: Como empregado, devo poder recuperar a senha se esquecido.

**US18**: O empregado deve poder registrar seus pontos de trabalho (incluindo as pausas) apenas no horário especificado no contrato de trabalho, levando em conta as regras de tolerância de horário. (inclui o **US18**: O sistema deve validar se o empregado está em um raio mínimo de 50 metros e máximo de 100 metros do local definido em contrato como ponto autorizado para registro de jornada.)

**US19**: O sistema deve enviar notificações aos empregados quando houver pendência de registro dentro dos horários estabelecidos em contrato.

**USXX**: Como gestor, devo poder ter alertas de falta de marcação do empregado
(precisa disso)

**US20**: Como empregador, devo receber notificações sempre que um empregado realizar uma batida de ponto no registro, dentro do horário estipulado pelo contrato.

**US21**: Os empregados devem poder justificar suas faltas diretamente pelo aplicativo, enviando um arquivo que comprove o motivo da ausência.

**USXX**: Como empregador, devo poder marcar certos dias de trabalho como feriado.

**USXX**: Como gestor, devo poder colocar observações necessárias para dias de trabalho

**US23**: O empregado deve poder visualizar seu próprio histórico de registros de ponto diretamente no aplicativo.

**US24**: O sistema deve permitir que os empregadores acessem o histórico de registros de ponto dos seus respectivos empregados.

**US26**: O sistema deve gerar automaticamente, todo dia 25 de cada mês, um relatório contendo os registros de ponto e os cálculos relacionados (salário base, horas extras, etc), e enviá-lo à LFD e ao empregador responsável. (inclui **US25**: O sistema deve realizar automaticamente o cálculo do salário dos empregados, incluindo horas regulares, horas extras e descontos legais, com base nas marcações de ponto registradas e nas regras de negócio definidas no contrato de trabalho e na legislação vigente.)

**US27**: O empregado deve receber a folha de ponto preenchida após o encerramento
