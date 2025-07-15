# Especificação de Caso de Uso: Solicitar Serviços Essenciais

### 1. Breve Descrição
Esta especificação de caso de uso permite ao Refugiado realizar a solicitação de um serviço essencial através da plataforma HopeBridge. O processo se inicia com a escolha de uma categoria de serviço, como abrigo, assistência médica ou alimentação. O fluxo principal detalha a solicitação de vaga em abrigo, enquanto os demais serviços são tratados em fluxos alternativos. O sistema valida a disponibilidade e elegibilidade para cada tipo de solicitação e confirma o registro do benefício ao final do processo.

### 2. Fluxo Básico de Eventos
Este caso de uso é iniciado quando o ator Refugiado seleciona a opção “Solicitar Serviço Essencial”.

1.  O sistema apresenta as seguintes opções de serviço:
    * Solicitar Vaga em Abrigo;
    * Agendar Assistência Médica [FA01];
    * Solicitar Voucher de Alimentação [FA02].
2.  O usuário seleciona a opção “Solicitar Vaga em Abrigo”.
3.  O sistema exibe uma lista de abrigos disponíveis na região do usuário, com uma opção para visualizá-los em um mapa [FA03]. [FE02]
4.  O usuário seleciona um abrigo da lista para ver os detalhes completos (capacidade, regras, etc.).
5.  O usuário aciona a opção para confirmar a solicitação da vaga.
6.  O sistema valida a disponibilidade da vaga e a compatibilidade do perfil do usuário [RN01] [FE01] [FE03].
7.  O sistema apresenta uma mensagem de “Solicitação realizada com sucesso” e gera um protocolo.
8.  O caso de uso é encerrado.

### 3. Fluxos Alternativos

#### 3.1 Solicitação de Serviços Específicos

##### 3.1.1 FA01 - Agendar Assistência Médica
1.  No passo 1 do Fluxo Básico, o usuário seleciona a opção "Agendar Assistência Médica".
2.  O sistema exibe uma lista de clínicas ou pontos de atendimento médico disponíveis. [FE02]
3.  O usuário seleciona um local de atendimento.
4.  O sistema exibe um calendário com as datas e os horários disponíveis para agendamento.
5.  O usuário seleciona uma data e um horário e confirma a ação.
6.  O sistema valida a disponibilidade do horário [RN01] [FE01].
7.  O fluxo continua a partir do passo 7 do Fluxo Básico.

##### 3.1.2 FA02 - Solicitar Voucher de Alimentação
1.  No passo 1 do Fluxo Básico, o usuário seleciona a opção "Solicitar Voucher de Alimentação".
2.  O sistema exibe os pontos de distribuição de alimentos parceiros. [FE02]
3.  O usuário seleciona um ponto de distribuição.
4.  O usuário aciona a opção para confirmar a solicitação do voucher.
5.  O sistema valida a elegibilidade do usuário para o benefício [RN01] [FE03].
6.  O fluxo continua a partir do passo 7 do Fluxo Básico.

#### 3.2 Interação com a Interface

##### 3.2.1 FA03 - Visualizar Serviços no Mapa
1.  No passo 3 do Fluxo Básico, o usuário aciona a opção para visualizar os serviços no mapa.
2.  O sistema exibe um mapa com ícones que representam os locais dos serviços disponíveis.
3.  O usuário seleciona um ícone no mapa para ver seus detalhes.
4.  O fluxo continua a partir do passo 4 do Fluxo Básico.

### 4. Fluxos de Exceção

#### 4.1 FE01 - Serviço Indisponível
1.  Durante a validação (passo 6 do FB ou passo 6 do FA01), o sistema detecta que não há mais vagas ou horários disponíveis.
2.  O sistema exibe uma mensagem informativa explicando a indisponibilidade.
3.  O caso de uso retorna ao passo 3 do respectivo fluxo (FB ou FA01) para uma nova seleção.

#### 4.2 FE02 - Nenhum Serviço Encontrado
1.  No passo 3 do FB ou no passo 2 dos FAs, o sistema não encontra serviços disponíveis para a categoria/localidade.
2.  O sistema emite um alerta informativo de indisponibilidade.
3.  O caso de uso retorna ao passo 1 do FB.

#### 4.3 FE03 - Perfil Incompatível / Não Elegível
1.  Durante a validação (passo 6 do FB ou passo 5 do FA02), o sistema detecta que o usuário não atende aos critérios do serviço.
2.  O sistema exibe uma mensagem explicando o motivo da incompatibilidade.
3.  O caso de uso retorna ao passo de seleção anterior (ex: passo 3 do FB).

### 5. Pré-Condições

#### 5.1 O Refugiado deve estar autenticado no sistema.

#### 5.2 Deve existir uma rede de serviços (abrigos, clínicas, etc.) cadastrada na plataforma.

### 6 Pós-Condições

#### 6.1 Um novo registro de solicitação (reserva de vaga, agendamento ou voucher) é criado e associado ao perfil do Refugiado.

### 7. Pontos de Extensão
Não se aplica.

### 8. Requisitos Especiais
Não se aplica.

### 9. Informações Adicionais
Não se aplica.