## User Story Mapping - ComunEventos

<div id="miro-placeholder">
  <p>Este conteúdo vem do Miro. Clique abaixo para carregar o embed:</p>
  <button onclick="loadMiro()"><a>Carregar Mapa no Miro</a></button>
</div>

<script>
  function loadMiro() {
    const container = document.getElementById('miro-placeholder');
    container.innerHTML = `
      <iframe
        width="768"
        height="432"
        src="https://miro.com/app/live-embed/uXjVInpQKj4=/?embedMode=view_only_without_ui&moveToViewport=-3193,-2302,4166,2268&embedId=238208750994"
        frameborder="0"
        scrolling="no"
        allow="fullscreen; clipboard-read; clipboard-write"
        allowfullscreen>
      </iframe>
    `;
  }
</script>

<!-- <iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVInpQKj4=/?embedMode=view_only_without_ui&moveToViewport=-3193,-2302,4166,2268&embedId=238208750994" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe> -->

## Introdução
A ComunEventos é uma startup dedicada a criar uma plataforma para otimizar a experiência de organizadores e participantes de eventos comunitários. O produto integra ferramentas de gerenciamento de eventos, comunicação, inscrição, pagamentos, colaboração com fornecedores, patrocínios e voluntários, resolvendo desafios como:

- Fragmentação de informações em múltiplas planilhas e canais de mensagem.
- Dificuldade de engajar e coordenar participantes, fornecedores, patrocinadores e voluntários.
- Falta de um canal único de comunicação e feedback.
- Necessidade de recursos acessíveis e escaláveis para eventos de diversos tamanhos.

O objetivo é oferecer ao mercado uma solução única, intuitiva e acessível, capaz de cobrir todas as etapas de um evento — desde o planejamento até o pós-evento — com um fluxo integrado de cadastro, comunicação, pagamento e coleta de feedback.

## User Story Map da ComunEventos

|       Atores          |                      Objetivos                          |                            Atividades Principais                     |
|---------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
|Organizador de Evento  | Organizar evento, Gerenciar colaborações                | Marcar evento, Promover evento, Coletar feedback, Organizar reuniões | 
|Participante de Evento | Comprar ingresso, Comunicar-se, Compartilhar impressões | Registrar na plataforma, Comprar ingresso, Comunicar com inscritos   | 
|Fornecedor Local       | Registrar na plataforma, Escolher fornecedor            | Cadastrar fornecedores, Gerenciar fornecedores                       | 
|Patrocinador           | Escolher patrocinador, Enviar feedback                  | Selecionar patrocinador, Gerenciar apoio financeiro                  | 
|Voluntário             | Escolher voluntários, Gerenciar equipe                  | Definir funções e horários, Organizar equipe de voluntários          | 


## Usuários (Personas)
##### 1. Organizador de Evento
- Busca uma visão centralizada de todas as etapas de planejamento.
- Precisa integrar agenda, inscrições, comunicação e relatórios de feedback.
![Persona 1](../assets/images/Persona1.png)

##### 2. Participante de Evento
- Quer facilidade para se inscrever e receber informações em tempo real.
- Deseja métodos de pagamento diversos e ingressos digitais (QR Code).
![Persona 2](../assets/images/Persona2.png)

##### 3. Fornecedor Local 
- Precisa registrar serviços, preços e contatos de forma clara.
- Busca visibilidade e agendamento de participação em eventos.
![Persona 3](../assets/images/Persona3.png)

##### 4. Patrocinador
- Quer propor e formalizar apoio de forma digital, receber relatórios de retorno.
- Avalia parcerias com base em público e resultados anteriores.
![Persona 4](../assets/images/Persona4.png)

##### 5. Voluntário 
- Deseja se inscrever para colaborar, ter clareza de funções e horários.
- Precisa de instruções e acesso a materiais de suporte.
![Persona 5](../assets/images/Persona5.png)

## Objetivos de usuário
- **Organizador de Evento:** Centralizar o planejamento e acompanhamento de todas as atividades e colaborações.
- **Participante de Evento:** Facilitar inscrição, pagamento e acesso às informações do evento.
- **Fornecedor Local:** Gerenciar serviços e acordos de modo ágil.
- **Patrocinador:** Propor e formalizar patrocínios digitalmente, acompanhar resultados.
- **Voluntário:** Inscrever-se, receber instruções e gerenciar sua participação.

## Jornadas de usuário

##### 1. Organizador de Evento

- Marcar evento → Promover evento (redes sociais, site) → Organizar reuniões → Coletar feedback → Ajustar planejamento.

##### 2. Participante de Evento

- Registrar na plataforma → Comprar ingresso → Receber confirmação e QR Code → Acompanhar programação → Enviar feedback.

##### 3. Fornecedor Local

- Registrar serviço → Escolher eventos → Negociar contrato → Fornecer serviço → Avaliar resultados.

##### 4. Patrocinador

- Buscar eventos → Enviar proposta → Formalizar contrato digital → Acompanhar métricas.

##### 5. Voluntário

- Visualizar vagas → Preencher inscrição → Receber instruções → Participar → Relatar experiência.

## Detalhamento por Backnone - ComunEventos

#### BB01 - Gerenciar Eventos

##### Atividade: Marcar Evento
US01: Marcar Evento 
- "Eu, como organizador de evento, quero marcar um novo evento na plataforma para iniciar seu planejamento e torná-lo visível aos participantes."

US02: Definir data e hora
- "Eu, como organizador de evento, quero definir a data e hora do evento para garantir que todos os envolvidos possam se planejar adequadamente."

##### Atividade: Promover Evento

US03: Realizar publicações em redes sociais com descrição, data, local e atividades
- "Eu, como organizador de evento, quero realizar publicações integradas em redes sociais para divulgar o evento e atrair mais participantes da comunidade."

US04: Enviar email para contatos
- "Eu, como organizador de evento, quero enviar emails para meus contatos cadastrados a fim de divulgar o evento e aumentar o número de inscritos."

US05: Recorrer a parceiros locais para ajudar na divulgação
- "Eu, como organizador de evento, quero recorrer a parceiros locais para ajudar na divulgação do evento, aproveitando sua rede de contatos e influência na comunidade."

US06: Permitir o download de material informativo
- "Eu, como organizador do evento, quero poder disponibilizar o download de materiais informativos relacionados ao evento para os participantes se informarem com antecedência, atualizando em tempo real caso haja mudanças"

##### Atividade: Coletar feedback
US07: Gerar formulário de avaliação
- "Eu, como organizador do evento, quero poder gerar um formulário de avaliação para coletar feedback dos participantes." 

US08: Visualizar resultados das avaliações
- "Eu, como organizador do evento, quero poder visualizar as avaliações dos participantes para obter o feedback geral do evento"

US09: Criar espaço para depoimentos na plataforma
- NAO TEM US AINDA

US10: Analisar interações nas redes sociais
- "Eu, como organizador do evento, quero poder analisar interações nas redes sociais de forma simplificada, única e automática"

#### BB02 - Gerenciar Colaborações

##### Atividade: Centralizar comunicação entre organizadores, parceiros e equipe
US11: Criar grupo de discussão por evento
- "Como organizador do evento, eu quero criar um grupo exclusivo para cada evento, para que eu possa centralizar a comunicação com todos os colaboradores."

US12: Atribuir tarefas e prazos a membros da equipe
- "Como organizador do evento, eu quero atribuir tarefas com prazos aos membros da equipe para que eu possa acompanhar o andamento do planejamento de forma centralizada."

US13: Compartilhar documentos e materiais
- "Como organizador do evento, eu quero um espaço para compartilhar documentos com os colaboradores para que todos tenham acesso a uma fonte única de informação."

US14: Monitorar o progresso das atividades em tempo real
- Como organizador do evento, eu quero monitorar o progresso das atividades em tempo real para que eu possa garantir que o cronograma do evento seja cumprido.

#### BB03 - Organizar Reuniões

##### Atividade: Planejar e coordenar reuniões da organização

US15: Agendar reuniões com fornecedores e patrocinadores
- Como organizador de evento, eu quero agendar reuniões com fornecedores e patrocninadores para que todos os envolvidos estejam alinhados com as expectativas, responsabilidades e prazos.

US16: Compartilhar pautas e atas de reunião
- Como organizador do evento, eu quero compartilhar as pautas e atas das reuniões com os colaboradores para que todos tenham um registro claro das discussões e decisões.

US17: Registrar decisões tomadas em cada encontro
- Como organizador do evento, eu quero registrar as decisões  de cada reunião, para que exista um histórico oficial que possa ser consultado pelos colaboradores.

US18: Criar lembretes automáticos de reunião
- Como organizador do evento, eu quero configurar lembretes automáticos para as reuniões agendadas para que os colaboradores sejam notificados com antecedência

## Critérios de Priorização
//esta parte está sendo atualizada para 1.2

### Release 1
//esta parte está sendo atualizada para 1.2

### Release 2
//esta parte está sendo atualizada para 1.2

### Release 3
//esta parte está sendo atualizada para 1.2

## Histórico de Versão
Data     | Versão | Descrição | Autor(es) | Revisor(es)
-------- | ------ | --------- | ----- | ---------
09/06/2025 | 1.0 | Elaboração inicial do estudo de caso | Caio Venâncio, Lucas Guimarães, Guilherme Moura e Davi de Aguiar | |
23/06/2025 | 1.1 | Elaboração final do estudo de caso | Davi de Aguiar, Guilherme Moura ||
14/07/2025 | 1.2 | Detalhamento do Miro no GitPages | Joao Pedro Ferreira Moraes ||