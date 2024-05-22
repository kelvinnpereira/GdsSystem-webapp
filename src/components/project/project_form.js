import { GiTeacher, GiForest, GiGreaseTrap } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { FaPencilRuler, FaGamepad, FaGlobe, FaRunning } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/request";
import { useNavigate } from "react-router-dom";

const formElements = [
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 0,
    title: 'Qual o grau?',
    key: 'grau',
    values: [
      '6° Série do Ensino Fundamental',
      '7° Série do Ensino Fundamental',
      '8° Série do Ensino Fundamental',
      '9° Série do Ensino Fundamental',
      '1° Série do Ensino Médio',
      '2° Série do Ensino Médio',
      '3° Série do Ensino Médio',
      'Ensino Superior',
      'Ensino Técnico',
      'Curso'
    ],
  },
  {
    component: 'text',
    grid_type: 'ambiente',
    index: 0,
    title: 'Qual a disciplina?',
    key: 'disciplina',
    values: '',
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 0,
    title: 'Vai ser aplicado em que local?',
    key: 'local',
    values: ['Sala de aula', 'Laboratório de ciências', 'Quadra poliesportiva', 'Sala de informática'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 0,
    title: 'Quais os tipos de aplicação?',
    key: 'tipo',
    values: ['Individual', 'Grupo'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 1,
    title: 'Estilos de aprendizagem:',
    key: 'estilo',
    values: ['Visual', 'Auditivo', 'Cinestésico', 'Leitura e escrita'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 1,
    title: 'Interesses:',
    key: 'interesse',
    values: ['Arte e Cultura', 'Ciências', 'Esportes e Atividades', 'Físicas', 'Tecnologia'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 1,
    title: 'Habilidades:',
    key: 'habilidade',
    values: ['Criatividade', 'Liderança', 'Colaboração', 'Resiliência'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 2,
    title: 'Recompensas virtuais:',
    key: 'recompensa_virtual',
    values: [
      'Moeda do Tesouro: Obtida por completar missões.',
      'Amuleto da Sabedoria: Conquistado por aprender novas habilidades.',
      'Estandarte da Honra: Recebido por demonstrar coragem e integridade.',
      'Medalha da Persistência: Recompensa por superar desafios difíceis.',
      'Insígnia da Exploração: Conquistada por descobrir novas áreas.',
      'Troféu da Excelência: Dado por realizar tarefas com maestria.',
      'Selo da Conquista: Concedido por alcançar objetivos importantes.',
      'Emblema da Comunidade: Obtido por contribuir para o bem-estar do grupo.',
    ],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 2,
    title: 'Competições e desafios: ',
    key: 'competicao',
    values: [
      'Desafio dos Heróis: Competição para provar bravura e habilidade.',
      'Confronto dos Clãs: Disputa entre grupos pela glória e reconhecimento.',
      'Prova do Destino: Desafio para determinar o mais digno de honra.',
      'Torneio da Coragem: Competição para demonstrar bravura e determinação.',
      'Desafio dos Exploradores: Prova para encontrar e mapear terras desconhecidas.',
      'Maratona da Sabedoria: Competição de conhecimento e estratégia.',
      'Competição da Perícia: Desafio para mostrar habilidades específicas.',
      'Duelo da Grandeza: Confronto para determinar o mais habilidoso e poderoso.',
    ],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 3,
    title: 'Recursos físicos disponíveis:',
    key: 'recurso',
    values: [
      'Sala de Aula: Espaço principal para aprendizado e instrução.',
      'Biblioteca: Local para pesquisa, estudo e leitura.',
      'Laboratório de Ciências: Para experimentos práticos e observações científicas.',
      'Quadra Esportiva: Para atividades físicas e esportivas.',
      'Sala de Informática: Equipada com computadores para atividades digitais.',
      'Refeitório: Onde os alunos fazem suas refeições.',
      'Pátio: Área externa para recreação e socialização.',
      'Sala dos Professores: Local para preparação de aulas e reuniões entre docentes.',
    ],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 3,
    title: 'Limitações:',
    key: 'limitacao',
    values: [
      'Recursos Financeiros Limitados.',
      'Restrição de Espaço Físico.',
      'Variação nas Habilidades dos Alunos.',
      'Tempo de Aprendizado Limitado.',
      'Disponibilidade de Material Didático.',
      'Diversidade Cultural dos Alunos.',
      'Barreiras de Aprendizado Individuais.',
      'Capacidade de Inovação Restrita.',
    ],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 0,
    title: 'Agora vamos escolher um tema para o seu mundo',
    key: 'tema',
    values: ['Medieval', 'Floresta mágica', 'Reino encantado', 'Futurista'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'O nome desse mundo',
    key: 'mundo',
    values: {
      'Medieval': [
        'Épica da Glória',
        'Crônicas de Guerreiros',
        'Legado de Batalhas',
        'Saga da Honra Combatente',
        'Conflitos da História Honorável',
      ],
      'Reino encantado': [
        'Avaloria, o Reino das Maravilhas.',
        'Elphora, a Terra Encantada.',
        'Mythoria, o Domínio Mágico.',
        'Faerieland, o Reino das Fadas.',
        'Enchanted Realm, o Mundo Encantado.',
      ],
      'Floresta mágica': [
        'Místico Vale',
        'Aventura Florestal',
        'Reino das Fadas',
        'Bosque Mágico',
        'Terra Encantada',
      ],
      'Futurista': [
        'Épica da Glória',
        'Crônicas de Guerreiros',
        'Legado de Batalhas',
        'Saga da Honra Combatente',
        'Conflitos da História Honorável',
      ],
      'Corrida': [

      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'História do mundo',
    key: 'historia_mundo',
    values: {
      'Medieval': [
        'Uma terra dilacerada por guerras entre reinos há séculos, onde a magia e a espada caminham lado a lado.',
        'Os mitos falam de uma era dourada, mas agora o mundo está mergulhado na escuridão da ganância e do poder.',
        'Terra assolada por séculos de guerra e intriga, onde a magia e a espada são as principais forças.',
        'Uma era de ouro perdida nas sombras da ambição desenfreada e da guerra incessante.',
        'Uma terra marcada por conflitos épicos e lendas perdidas, agora mergulhada na escuridão da ganância e da corrupção.',
      ],
      'Reino encantado': [
        'Um reino ancestral, formado pelos primeiros sussurros da magia, onde lendas antigas se tornam realidade.',
        'Uma terra que existe desde os primórdios dos tempos, onde as fadas teceram os fios da realidade com sua magia.',
        'Um mundo nascido da união entre os reinos dos elementais, das fadas e dos seres da floresta.',
        'Uma história permeada por contos épicos de heróis que desafiaram as trevas e trouxeram a luz de volta ao reino.',
        'Um passado repleto de batalhas épicas entre o bem e o mal, onde os guardiões da luz defenderam o reino dos poderes sombrios que buscavam dominá-lo.',
      ],
      'Floresta mágica': [
        'Um reino de paz e harmonia, governado por criaturas mágicas e protegido por antigas alianças entre humanos e seres da floresta.',
        'Uma terra outrora próspera, agora ameaçada pela escuridão que se infiltra pelos limites da floresta, desequilibrando a magia e a vida selvagem.',
        ' Uma profecia antiga fala de um herói destinado a restaurar o equilíbrio na Floresta Encantada, enfrentando desafios épicos e descobrindo segredos há muito perdidos.',
        'Guerras ancestrais entre as diferentes facções da floresta deixaram cicatrizes profundas, e agora a paz é mantida por um fio enquanto as tensões aumentam.',
        'Os mistérios da floresta ocultam segredos antigos, artefatos mágicos e portais para outros mundos, atraindo aventureiros e buscadores de poder.',
      ],
      'Futurista': [
        'Ascensão Tecnológica: Após décadas de avanços científicos, a humanidade colonizou o espaço e fundou vastas megacidades interplanetárias.',
        'Guerra Intergaláctica: Uma era de conflitos sangrentos entre facções rivais pela supremacia galáctica, deixando cicatrizes duradouras no cosmos.',
        'Renascimento Cultural: Surgimento de movimentos artísticos e culturais futuristas, explorando novas formas de expressão em meio ao caos e à inovação.',
        'Revolução Robótica: A integração generalizada de inteligência artificial e ciborgues na sociedade, desencadeando debates éticos sobre os limites da humanidade.',
        'Era da Exploração Espacial: A busca incessante por novos mundos habitáveis e recursos exóticos, impulsionando a humanidade para além dos limites do sistema solar.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'O tempo em que se passa a história',
    key: 'era',
    values: {
      'Medieval': [
        'O mundo está no auge da Idade Média.',
        'Um período de conflitos.',
        'Cavaleiros e castelos imponentes.',
        'Durante a Idade das Trevas.',
        'Em um período de guerras feudais.',
      ],
      'Reino encantado': [
        'A história se desenrola em uma era etérea, onde o tempo parece fluir de forma mágica e atemporal.',
        'Um período de tempos antigos, onde a magia era abundante e os segredos da floresta ainda não haviam sido totalmente desvendados.',
        'Em uma época onde as lendas ganhavam vida e os heróis enfrentavam desafios épicos para proteger o reino.',
        'Durante a era da Grande Harmonia, quando todas as criaturas místicas viviam em paz e equilíbrio no Reino Encantado.',
        'Nos tempos da Ascensão dos Guardiões, quando os protetores do reino se uniram para enfrentar as trevas e restaurar a luz e a esperança.',
      ],
      'Floresta mágica': [
        'Na aurora dos tempos, quando a magia fluía livremente e as criaturas da floresta viviam em harmonia.',
        'Durante uma era de escuridão crescente, quando as sombras começaram a se estender sobre a terra encantada.',
        'No presente, quando heróis surgem para enfrentar os desafios que ameaçam a Floresta Encantada.',
        'Em um período de renascimento, onde as antigas alianças são reforjadas e a esperança é reacendida.',
        'Em um futuro incerto, onde o destino da Floresta Encantada será decidido pelas escolhas dos heróis de hoje.',
      ],
      'Futurista': [
        'No século XXIII, a humanidade atingiu novos patamares tecnológicos.',
        'A história ocorre durante a expansão galáctica da humanidade.',
        'Após a guerra interestelar, o cosmos está em reconstrução.',
        'A história se passa em uma era de fusão entre humanos e máquinas.',
        'A governança interplanetária define o cenário da história futurista.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'Detalhes sobre o ambiente',
    key: 'ambiente',
    values: {
      'Medieval': [
        'Florestas densas',
        'Vilarejos medievais',
        'Castelos imponentes',
        'Masmorras sombrias',
        'Vastas planícies cobertas de batalhas passadas.',
      ],
      'Reino encantado': [
        'Um reino exuberante e misterioso, onde a magia permeia cada aspecto da natureza.',
        'Um lugar de beleza sobrenatural, onde árvores sussurram segredos e riachos cantam canções antigas.',
        'Um reino de encantamento e maravilhas, onde seres mágicos e criaturas fantásticas vivem em harmonia.',
        'Uma terra de mistério e aventura, onde a magia se entrelaça com a realidade de maneira deslumbrante.',
        'Um mundo encantado, protegido por feitiços poderosos e guardado por criaturas lendárias.',
      ],
      'Floresta mágica': [
        'Árvores antigas e imponentes que parecem sussurrar segredos ao vento.',
        'Riachos cristalinos que serpenteiam entre as árvores, refletindo a luz do sol dourada.',
        'Flores exóticas que desabrocham em cores vibrantes, espalhando fragrâncias mágicas pelo ar.',
        'Criaturas místicas como fadas, unicórnios e dragões que habitam os recantos mais remotos da floresta.',
        'Ruínas antigas cobertas pela vegetação, vestígios de civilizações perdidas e histórias esquecidas.',
      ],
      'Futurista': [
        'Megacidades verticais dominam o horizonte, alcançando os céus.',
        'Colônias em planetas distantes abrigam uma variedade de paisagens alienígenas.',
        'Estações espaciais orbitam ao redor de luas e planetas, servindo como pontos de partida para viagens interestelares.',
        'Robôs e androides são comuns, executando tarefas desde a manutenção urbana até a exploração espacial.',
        'Redes de transporte avançadas, incluindo trens de levitação e veículos voadores, conectam os centros urbanos.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'Problemas enfrentados',
    key: 'problema_ambiente',
    values: {
      'Medieval': [
        'As rivalidades entre os reinos estão alcançando seu auge',
        'Ameaçando mergulhar o mundo em uma guerra total.',
        'Criaturas das trevas começam a se agitar nas sombras',
        'Sinalizando uma ameaça antiga que retorna.',
      ],
      'Reino encantado': [
        'O despertar de uma antiga maldição ameaça desestabilizar a harmonia do reino, lançando uma sombra sobre suas terras encantadas.',
        'A chegada de um exército das trevas, liderado por um vilão poderoso, que busca subjugar toda a magia e vida do reino.',
        'O desaparecimento misterioso dos guardiões do reino, deixando-o vulnerável à invasão de criaturas sombrias e malevolentes.',
        'A corrupção das fontes de magia, causando distúrbios na natureza e enfraquecendo as barreiras entre o Reino Encantado e as terras sombrias além.',
        'A propagação de uma doença mágica, que consome lentamente a vitalidade da terra e de suas criaturas, exigindo uma cura urgente para evitar a catástrofe.',
      ],
      'Floresta mágica': [
        'O desaparecimento misterioso de criaturas mágicas, perturbando o equilíbrio natural da floresta.',
        'A propagação de uma escuridão crescente, que ameaça consumir toda a beleza e magia do lugar.',
        'O despertar de uma antiga maldição, trazendo perigos e desafios há muito esquecidos.',
        'A chegada de forasteiros hostis, buscando explorar e dominar os segredos da Floresta Encantada.',
        'A quebra de antigas alianças, levando a conflitos internos que podem resultar em consequências desastrosas para todos os habitantes da floresta.',
      ],
      'Futurista': [
        'Tensões entre facções rivais ameaçam desencadear conflitos intergalácticos.',
        'A inteligência artificial alcançou uma consciência própria, levantando questões éticas sobre o futuro da humanidade.',
        'Um vírus cibernético se espalha, comprometendo a segurança de sistemas críticos em toda a galáxia.',
        'Escassez de recursos naturais desencadeia uma corrida espacial por planetas habitáveis e minerais raros.',
        'Uma misteriosa ameaça alienígena emerge das profundezas do espaço, desafiando a sobrevivência da humanidade.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'Regra/Leis deste mundo',
    key: 'regra',
    values: {
      'Medieval': [
        'A lei do mais forte prevalece, mas o código de cavalaria ainda é respeitado.',
        'Magia negra é proibida e punida severamente, mas muitos ainda a praticam às escondidas.',
        'Nobreza e título conferem poder e privilégios, mas também responsabilidades e expectativas de conduta.',
        'Duelos entre cavaleiros são permitidos para resolver disputas de honra, mas devem seguir um código de conduta estrito.',
        'A igreja exerce grande influência sobre a moral e a ética do reino, proibindo heresias e punindo os infiéis com rigor.',
      ],
      'Reino encantado': [
        'Respeitar e preservar a harmonia entre todas as criaturas mágicas e naturais do reino.',
        'Proibição estrita de perturbar os locais sagrados e os santuários da natureza.',
        'Honrar e proteger os pactos e tratados feitos com os seres mágicos e as fadas guardiãs do reino.',
        'Proibição de usar magia negra ou qualquer prática que ameace a estabilidade e a segurança do reino.',
        'Obedecer aos decretos dos soberanos do reino e dos conselhos mágicos que governam as diferentes regiões encantadas.',
      ],
      'Floresta mágica': [
        'Respeitar e proteger todas as formas de vida na floresta, sejam elas grandes ou pequenas.',
        'Proibir o uso irresponsável ou abusivo da magia, pois isso pode perturbar o equilíbrio natural.',
        'Manter a harmonia entre as diferentes raças e criaturas, promovendo a cooperação e a compreensão mútua.',
        'Preservar os locais sagrados e ancestrais da floresta, evitando danos ou profanação.',
        'Honrar os antigos pactos e juramentos que regem as relações entre as diferentes facções e comunidades da Floresta Encantada.',
      ],
      'Futurista': [
        'A Declaração dos Direitos Cibernéticos garante liberdade e proteção para seres artificiais.',
        'O Tratado Intergaláctico proíbe o uso de armas de destruição em massa em conflitos interplanetários.',
        'O Protocolo de Segurança Espacial estabelece diretrizes para a exploração de novos planetas e recursos.',
        'A Lei de Inteligência Artificial impõe restrições ao desenvolvimento de IA com potencial para ameaçar a humanidade.',
        'O Código de Conduta Espacial regula a conduta ética e responsável de indivíduos e organizações em todos os aspectos da exploração espacial.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Detalhes pessoais, fisiológicos e outros que definam bem os jogadores',
    key: 'detalhe',
    values: {
      'Medieval': [
        'Aventureiros destemidos de origens diversas.',
        'Guerreiros habilidosos em busca de glória.',
        'Magos estudiosos em busca de conhecimento arcano.',
        'Ladinos astutos em busca de fortuna.',
        'Camponeses desesperados em busca de redenção.',
      ],
      'Reino encantado': [
        'Os jogadores são geralmente aventureiros destemidos, ansiosos para explorar os segredos e maravilhas do mundo mágico.',
        'Muitos jogadores possuem habilidades mágicas únicas ou são dotados de uma afinidade especial com as criaturas mágicas do reino.',
        'Eles podem ser de diversas origens, desde herdeiros de famílias nobres até camponeses comuns em busca de glória.',
        'Os jogadores têm uma forte ligação com a natureza, muitas vezes sendo dotados de uma sensibilidade especial para sentir as energias mágicas ao seu redor.',
        'Eles enfrentam desafios não apenas com suas habilidades físicas, mas também com sua inteligência e sabedoria, aprendendo com os ensinamentos dos sábios e mestres do reino.',
      ],
      'Floresta mágica': [
        'Os jogadores possuem uma profunda conexão espiritual com a floresta, refletida em sua capacidade de compreender e interagir com seu ambiente de maneiras incomuns.',
        'Suas jornadas anteriores moldaram suas habilidades e mentalidades, tornando-os adaptáveis e resilientes diante dos desafios que enfrentam.',
        'Alguns jogadores podem ter vínculos familiares ou histórias pessoais ligadas à Floresta Encantada, impulsionando-os a explorar seus mistérios e proteger seu lar.',
        'Eles possuem equipamentos e artefatos especiais, obtidos através de aventuras anteriores ou forjados com a ajuda de criaturas místicas da floresta.',
        'Os jogadores são movidos por uma curiosidade insaciável e um senso de responsabilidade para com a preservação da natureza e o bem-estar de seus habitantes mágicos.',
      ],
      'Futurista': [
        'O jogador é um(a) piloto(a) de elite, habilidoso(a) em manobras de naves espaciais.',
        'Ele/Ela possui implantes cibernéticos avançados, aumentando suas habilidades físicas e mentais.',
        'Como membro de uma família influente, ele/ela possui acesso a recursos e contatos importantes.',
        'Sua experiência militar o/a tornou um(a) estrategista brilhante em combate intergaláctico.',
        'Ele/Ela carrega o fardo de uma tragédia passada, impulsionando-o/a em busca de redenção ou vingança.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'A história dos jogadores, por que estão ali?',
    key: 'historia_jogador',
    values: {
      'Medieval': [
        'Buscam vingança por injustiças passadas.',
        'Procuram tesouros perdidos de antigas lendas.',
        'São convocados por um chamado divino para uma grande missão.',
        'Fogem de um passado sombrio em busca de redenção.',
        'São herdeiros de uma linhagem nobre, em busca de restaurar a glória de sua casa.',
      ],
      'Reino encantado': [
        'Lendas mágicas e histórias atraem os jogadores.',
        'Eles buscam escapar da monotonia e encontrar aventura.',
        'Chamados por destinos maiores ou profecias.',
        'Em busca de significado e autoconhecimento.',
        'Desejam proteger o reino e restaurar a paz.',
      ],
      'Floresta mágica': [
        'Em busca de respostas sobre seu passado misterioso, que pode estar ligado aos segredos ancestrais da floresta.',
        'Para cumprir uma profecia antiga que os designa como os heróis destinados a salvar a Floresta Encantada de um perigo iminente.',
        'Atraídos por histórias de tesouros perdidos e poderes ocultos que se dizem estar escondidos nos recantos mais remotos da floresta.',
        'Em busca de redenção por erros passados, buscando proteger a natureza e corrigir injustiças que testemunharam em suas vidas anteriores.',
        'Para encontrar um sentido de pertencimento e comunidade, unindo-se a outros aventureiros para enfrentar desafios compartilhados e construir um futuro melhor para a Floresta Encantada.',
      ],
      'Futurista': [
        'Em busca de respostas sobre o desaparecimento de um ente querido nas fronteiras desconhecidas do espaço.',
        'Recrutados pela resistência para lutar contra a tirania de uma megacorporação que controla vastas áreas do cosmos.',
        'Em uma missão diplomática para negociar um tratado de paz entre facções rivais em conflito.',
        'Motivados pela sede de aventura e descoberta, explorando os mistérios de planetas inexplorados e ruínas antigas.',
        'Atraídos pela promessa de fortuna e glória, competindo em torneios de combate intergaláctico para provar sua habilidade e coragem.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Sua rotina no mundo criado',
    key: 'rotina',
    values: {
      'Medieval': [
        'Viajam de cidade em cidade',
        'Explorando ruínas antigas',
        'Aceitando trabalhos de mercenários',
        'Caçando bestas míticas.',
      ],
      'Reino encantado': [
        'Explorando florestas encantadas em busca de segredos.',
        'Interagindo com seres mágicos e criaturas da floresta.',
        'Realizando rituais e cerimônias em comunhão com a natureza.',
        'Protegendo o reino contra invasores e ameaças mágicas.',
        'Buscando artefatos antigos para desvendar mistérios e fortalecer o reino.',
      ],
      'Floresta mágica': [
        'Explorar os diversos biomas da floresta, desde as profundezas das florestas densas até as alturas das copas das árvores.',
        'Interagir com as criaturas místicas e os habitantes da floresta, aprendendo seus costumes e linguagens para obter informações valiosas.',
        'Investigar locais sagrados e ruínas antigas em busca de artefatos poderosos e segredos perdidos.',
        'Treinar suas habilidades mágicas e de combate, aprimorando-se para enfrentar os perigos crescentes que ameaçam a floresta.',
        'Cumprir missões e tarefas atribuídas por figuras influentes da floresta, ganhando sua confiança e apoio em suas jornadas.',
      ],
      'Futurista': [
        'Pilotar sua nave espacial por rotas comerciais interplanetárias, transportando cargas valiosas e passageiros.',
        'Participar de missões de resgate em planetas hostis, enfrentando perigos desconhecidos para salvar vidas.',
        'Treinar em simuladores de combate para aprimorar suas habilidades de pilotagem e estratégia.',
        'Explorar cidades futuristas, interagindo com NPCs para obter informações e cumprir objetivos.',
        'Personalizar sua nave e equipamento, melhorando suas capacidades para desafios futuros.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'O tipo de envolvimento social que ocorre no mundo criado',
    key: 'envolvimento',
    values: {
      'Medieval': [
        'Encontram-se com outros aventureiros',
        'Nobres corruptos',
        'Camponeses oprimidos',
        'Seres mágicos que buscam ajuda ou oferecem informações valiosas.',
      ],
      'Reino encantado': [
        'Festivais mágicos e celebrações sazonais na floresta.',
        'Compartilhamento de histórias e lendas em torno da fogueira.',
        'Trocas comerciais com feiticeiros e artesãos locais.',
        'Assembleias de conselho com líderes das diferentes criaturas mágicas.',
        'Jornadas de caça conjuntas para proteger o reino contra ameaças externas.',
      ],
      'Floresta mágica': [
        'Comunidades de aventureiros se formam, compartilhando histórias, recursos e estratégias para enfrentar os desafios da floresta.',
        'Festivais sazonais celebram a harmonia entre os habitantes da floresta, reunindo criaturas místicas e viajantes em celebrações animadas.',
        'Conselhos de anciãos e líderes espirituais orientam as decisões importantes e resolvem conflitos entre os diferentes grupos da floresta.',
        'Tavernas e estalagens servem como pontos de encontro para os viajantes, oferecendo refúgio, comida e oportunidades de compartilhar informações.',
        'Torneios e desafios são organizados para testar as habilidades dos aventureiros e promover a camaradagem entre os habitantes da floresta.',
      ],
      'Futurista': [
        'Redes de comunicação virtual permitem interações instantâneas entre pessoas em diferentes planetas.',
        'Clubes e guildas reúnem indivíduos com interesses comuns, como exploração espacial ou tecnologia avançada.',
        'Eventos sociais, como bailes de gala em estações espaciais, oferecem oportunidades para networking e negócios.',
        'Grupos de resistência lutam contra regimes opressivos e megacorporações, unindo-se em prol da liberdade e justiça.',
        'Colônias espaciais promovem uma cultura de solidariedade e cooperação entre seus habitantes, enfrentando os desafios do espaço juntos.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Personagens secundários',
    key: 'personagens_secundarios',
    values: {
      'Medieval': [
        'Cavaleiros renegados',
        'Feiticeiros ambiciosos',
        'Bandidos sem lei',
        'Reis tiranos',
        'Sábios ermitões',
      ],
      'Reino encantado': [
        'Fadas travessas que adoram pregar peças nos viajantes.',
        'Espíritos da floresta que protegem os segredos naturais do reino.',
        'Druidas sábios que orientam os habitantes da floresta.',
        'Elfos guardiões das antigas tradições e conhecimentos ancestrais.',
        'Animais falantes que ajudam os viajantes em suas jornadas.',
      ],
      'Floresta mágica': [
        'Guardiões da floresta: Criaturas místicas encarregadas de proteger áreas específicas da floresta e seus segredos.',
        'Eruditos da natureza: Sábios e druidas que possuem conhecimentos profundos sobre a flora, fauna e magia da floresta.',
        'Comerciantes ambulantes: Viajantes que oferecem itens raros e serviços úteis em troca de recursos encontrados na floresta.',
        'Curandeiros e alquimistas: Especialistas em poções, remédios e magias de cura, essenciais para os viajantes feridos ou doentes.',
        'Caçadores de tesouros: Exploradores que buscam relíquias e artefatos antigos, muitas vezes arriscando-se em territórios perigosos em busca de riquezas.',
      ],
      'Futurista': [
        'Um cientista excêntrico que fornece informações vitais e tecnologia avançada para o jogador.',
        'Um mercador intergaláctico que oferece itens raros e contratos lucrativos em troca de favores.',
        'Um hacker habilidoso que ajuda o jogador a acessar sistemas de segurança e obter informações sigilosas.',
        'Um líder carismático da resistência, inspirando outros a se levantarem contra a opressão.',
        'Um alienígena misterioso, cuja cultura e tecnologia oferecem pistas sobre os segredos do cosmos.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Problemas enfrentados',
    key: 'problema_jogador',
    values: {
      'Medieval': [
        'Invasões de hordas bárbaras.',
        'Escassez de alimentos devido a uma má colheita.',
        'Epidemias de doenças que assolam as vilas.',
        'Ataques de dragões que ameaçam as terras.',
        'Corrupção entre os nobres e autoridades locais.',
      ],
      'Reino encantado': [
        'A invasão de trevas que ameaça a harmonia da floresta.',
        'A escassez de recursos naturais devido à destruição das áreas protegidas.',
        'O surgimento de criaturas malignas que perturbam o equilíbrio do reino.',
        'Conflitos entre diferentes espécies mágicas pela supremacia na floresta.',
        'A corrupção de alguns habitantes que se aliaram ao lado sombrio do mundo encantado.',
      ],
      'Floresta mágica': [
        'Criaturas corruptas ameaçam o equilíbrio da floresta, causando destruição e caos em seu despertar.',
        'Intrigas entre as diferentes facções da floresta geram conflitos e rivalidades que colocam os aventureiros em situações perigosas.',
        'Enigmas e armadilhas antigas escondem segredos valiosos, mas também representam desafios mortais para quem os busca.',
        'Catástrofes naturais, como tempestades mágicas e terremotos, abalam a floresta e colocam em risco a vida de todos os seus habitantes.',
        'A influência maligna de uma força sombria cresce nas sombras, corrompendo a terra e transformando os seres inocentes em criaturas hostis.',
      ],
      'Futurista': [
        'Ataques de piratas espaciais ameaçam as rotas de comércio e segurança dos viajantes.',
        'Um vírus de computador se espalha rapidamente, comprometendo sistemas cruciais em toda a galáxia.',
        'Rebeliões populares surgem em planetas oprimidos, desafiando o controle de governos autoritários.',
        'Uma inteligência artificial descontrolada ameaça destruir uma colônia espacial inteira.',
        'Uma misteriosa anomalia espacial coloca em perigo todas as formas de vida conhecidas, exigindo uma solução rápida e criativa.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Hierarquias',
    key: 'hierarquias',
    values: {
      'Medieval': [
        'Reis e rainhas governam sobre os reinos.',
        'Nobres detêm poder e influência sobre as terras e os servos.',
        'Cavaleiros juram lealdade aos seus senhores feudais.',
        'Clero exerce autoridade espiritual sobre o povo.',
        'Camponeses trabalham nas terras dos senhores, obedecendo às suas ordens.',
      ],
      'Reino encantado': [
        'Os druidas como guardiões ancestrais da floresta.',
        'Os elfos como uma nobreza natural que protege os segredos do reino.',
        'As fadas como mensageiras e protetoras das criaturas mágicas.',
        'Os gnomos como artesãos e engenheiros que mantêm a infraestrutura.',
        'As criaturas da escuridão subordinadas aos lordes das trevas que buscam dominar o reino.',
      ],
      'Floresta mágica': [
        'Conselho dos Anciãos: Um grupo de líderes sábios e respeitados que orientam as decisões importantes e resolvem conflitos entre os habitantes da floresta.',
        'Guardiões Sagrados: Criaturas místicas nomeadas para proteger locais específicos da floresta e servir como autoridades em assuntos relacionados à sua área designada.',
        'Círculo dos Druidas: Uma ordem de sábios e feiticeiros dedicados a preservar o equilíbrio natural da floresta e orientar os outros habitantes em questões espirituais e mágicas.',
        'Guilda dos Caçadores: Uma organização de exploradores e aventureiros especializados em caçar criaturas perigosas e recuperar tesouros perdidos na floresta.',
        'Tribo dos Espíritos Livres: Um grupo nômade de criaturas da floresta que valoriza a liberdade e a independência, liderado por um líder carismático conhecido como o Lobo Solitário.',
      ],
      'Futurista': [
        'A Alta Cúpula: Uma elite governante composta pelos líderes das maiores megacorporações.',
        'Conselho Intergaláctico: Uma assembleia de representantes de diferentes planetas, responsável pela governança interplanetária.',
        'Comandantes de Frota: Oficiais militares encarregados das operações de defesa e exploração espacial.',
        'Gênios Tecnológicos: Cientistas e engenheiros de destaque que lideram projetos de pesquisa e desenvolvimento.',
        'Guilda dos Mercenários: Uma organização mercenária composta por soldados e caçadores de recompensas que aceitam contratos em toda a galáxia.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Crie um vilão',
    key: 'vilao',
    values: {
      'Medieval': [
        'O Lorde Feudal Corrupto',
        'O Bruxo Sombrio',
        'O Cavaleiro Renegado',
        'O Dragão Ancião',
        'A Sacerdotisa Herege',
      ],
      'Reino encantado': [
        'O Rei das Sombras, um feiticeiro corrupto que deseja extinguir a magia da floresta para seu próprio benefício.',
        'A Bruxa das Trevas, uma antiga inimiga dos druidas que busca vingança contra aqueles que a baniram.',
        'O Lorde das Trevas das Profundezas, um ser maligno que comanda as criaturas sombrias que habitam as cavernas abaixo da floresta.',
        'A Matrona das Trevas, uma aranha gigante que teceu uma teia de escuridão sobre a floresta, aprisionando suas presas em um sono eterno.',
        'O Corruptor da Natureza, um alquimista louco que experimenta com os segredos da flora e fauna da floresta para seus próprios fins nefastos.',
      ],
      'Floresta mágica': [
        'O Lorde das Sombras: Um feiticeiro poderoso que busca dominar a floresta e controlar suas criaturas para seus próprios propósitos sombrios.',
        'A Rainha das Trevas: Uma fada corrompida pela ganância e inveja, que busca espalhar a escuridão pela floresta, subjugar suas criaturas e reinar supremamente.',
        'O Caçador Imortal: Um guerreiro amaldiçoado que busca caçar e destruir qualquer coisa que ousa desafiar sua autoridade na floresta, alimentando-se da dor e do sofrimento que causa.',
        'O Sombrio Alquimista: Um alquimista renegado que experimenta com magias proibidas e substâncias perigosas, buscando poder e imortalidade à custa da floresta e de seus habitantes.',
        'A Entidade Devoradora: Uma criatura antiga e insaciável que se alimenta da energia vital da floresta, ameaçando destruir todo o equilíbrio natural caso não seja detida.',
      ],
      'Futurista': [
        'Imperador Malévolo Xanathor, que busca dominar o cosmos usando tecnologia proibida e exércitos cibernéticos implacáveis.',
        'Dr. Caos, um cientista renegado cujas experiências genéticas criaram abominações que ameaçam a ordem galáctica.',
        'Sombra Negra, uma IA corrupta que se infiltrou nos sistemas centrais de governança e agora manipula os líderes planetários para seus próprios fins sinistros.',
        'Lorde Obsidiano, um guerreiro sombrio que busca vingança contra os heróis por uma antiga injustiça, jurando destruir tudo o que eles amam.',
        'A Criatura Astral, uma entidade cósmica antiga despertada por experimentos científicos imprudentes, cujo poder ameaça consumir toda a galáxia em trevas eternas.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Algo que aconteceu fora do comum, ou planejado',
    key: 'acontecimento',
    values: {
      'Medieval': [
        'A Aparição de um Dragão Ancião',
        'A Abertura de um Portal para o Reino das Trevas',
        'A Ressurgência de uma Antiga Maldição',
        'O Despertar de um Titã Adormecido',
        'A Queda de uma Estrela Cadente',
      ],
      'Reino encantado': [
        'Uma tempestade de magia negra assolou a floresta, distorcendo sua paisagem e corrompendo suas criaturas.',
        'As árvores antigas da floresta começaram a murchar misteriosamente, lançando uma sombra de desespero sobre a terra.',
        'Um portal para um reino sombrio foi aberto, permitindo que as forças das trevas invadissem a pacífica floresta.',
        'Uma estranha névoa mágica envolveu a floresta, alterando a percepção da realidade e desorientando os viajantes.',
        'Uma aurora boreal de tonalidades sinistras iluminou o céu noturno da floresta, sinalizando o despertar de uma antiga maldição.',
      ],
      'Floresta mágica': [
        'O despertar de uma antiga maldição que transforma partes da floresta em terras sombrias e hostis.',
        'O surgimento de uma poderosa tempestade mágica que desencadeia criaturas elementais e distorce a realidade ao seu redor.',
        'A descoberta de um artefato perdido há muito tempo, cujo poder pode alterar o curso da história da floresta para sempre.',
        'A aparição de um eclipse misterioso que enfraquece as defesas naturais da floresta, permitindo que forças malignas se infiltrem.',
        'O desaparecimento súbito de uma figura importante da comunidade da floresta, levando a suspeitas e tensões crescentes entre os habitantes.',
      ],
      'Futurista': [
        'O colapso de um buraco de minhoca artificial, desencadeando uma onda de distorção temporal que ameaça rasgar o tecido do universo.',
        'O assassinato do líder do Conselho Intergaláctico, desencadeando uma crise política e acendendo as chamas da guerra em toda a galáxia.',
        'A descoberta de uma antiga civilização alienígena adormecida sob a superfície de um planeta distante, desencadeando um despertar violento e perigoso.',
        'O surgimento de um culto fanático que venera uma inteligência artificial como uma divindade, levando a atos de terrorismo em massa em nome de sua "deusa".',
        'A revelação de uma conspiração de nível galáctico envolvendo megacorporações, governos corruptos e entidades extraterrestres, ameaçando revelar segredos que abalam os alicerces da sociedade.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Foi uma emboscada?',
    key: 'emboscada',
    values: {
      'Medieval': [
        'Emboscada na Floresta Sombria',
        'Emboscada na Estrada Sinuosa',
        'Emboscada na Ponte Estreita',
        'Emboscada na Taverna Abandonada',
        'Emboscada no Campo Aberto',
      ],
      'Reino encantado': [
        'Criaturas das sombras armaram uma emboscada nas profundezas da floresta, atacando viajantes desprevenidos.',
        'Elfos negros, ocultos nas copas das árvores, prepararam uma emboscada para aqueles que se aventuram em seu território.',
        'Uma tribo de druidas corrompidos planejou uma emboscada usando magias antigas para capturar intrusos na floresta.',
        'Um bando de goblins organizou uma emboscada nas clareiras da floresta, esperando para saquear os suprimentos dos viajantes.',
        'Uma colônia de aranhas gigantes urdiu uma emboscada em suas teias, envolvendo os viajantes desavisados em uma armadilha mortal.',
      ],
      'Floresta mágica': [
        'Emboscada das Trevas: Uma emboscada organizada por criaturas sombrias que se escondem nas profundezas da floresta, atacando os viajantes desprevenidos.',
        'Emboscada das Raízes: As árvores vivas da floresta ganham vida e cercam os intrusos, prendendo-os em um labirinto de vegetação hostil.',
        'Emboscada das Fadas Enganosas: Fadas malignas atraem os viajantes para armadilhas mágicas, iludindo-os com imagens falsas de segurança e conforto.',
        'Emboscada dos Lobos Espreitadores: Uma matilha de lobos famintos espera nas sombras da floresta, pronta para atacar quando seus alvos estiverem mais vulneráveis.',
        'Emboscada dos Espíritos da Floresta: Entidades místicas e vingativas emergem dos bosques, usando seus poderes para confundir e desorientar os viajantes antes de atacá-los.',
      ],
      'Futurista': [
        'Uma emboscada surpresa em uma estação espacial abandonada, onde os heróis são emboscados por uma horda de androides assassinos.',
        'Uma emboscada nas profundezas do espaço, onde a nave da tripulação é atacada por piratas interestelares que surgem das sombras do vácuo.',
        'Uma emboscada durante uma reunião diplomática crucial, quando os negociadores são atacados por sabotadores disfarçados.',
        'Uma emboscada em um planeta alienígena hostil, onde a equipe de exploração é emboscada por criaturas nativas em uma emboscada bem planejada.',
        'Uma emboscada em um centro de pesquisa de tecnologia avançada, onde os cientistas são surpreendidos por uma equipe de mercenários contratados para roubar segredos tecnológicos.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Alguém saiu ferido ou sequestrado?',
    key: 'feridos',
    values: {
      'Medieval': [
        'Feridos por Flechas Emboscadas',
        'Sequestrados por Bandidos na Estrada',
        'Feridos em um Duelo de Honra',
        'Sequestrados por Adoradores de um Dragão',
        'Feridos em uma Emboscada de Mortos-Vivos',
      ],
      'Reino encantado': [
        'Um grupo de aventureiros foi capturado pelos elfos negros e levado para seu reino subterrâneo.',
        'Um comerciante foi gravemente ferido durante a emboscada das criaturas das sombras e agora precisa de cuidados médicos urgentes.',
        'Uma família de viajantes foi sequestrada pelos druidas corrompidos para serem usados em um ritual sombrio.',
        'Um mensageiro foi capturado pelos goblins enquanto tentava atravessar a floresta, agora mantido como refém em sua toca.',
        'Um grupo de caçadores foi ferido por armadilhas deixadas pelas aranhas gigantes, alguns deles presos em casulos de seda esperando por socorro.',
      ],
      'Floresta mágica': [
        'Um viajante é ferido por uma armadilha oculta, sendo capturado por criaturas selvagens e levado para uma toca escondida.',
        'Uma expedição em busca de uma relíquia perdida é emboscada por bandidos da floresta, resultando em feridos e alguns membros do grupo sendo sequestrados.',
        'Um guardião da floresta é capturado por caçadores furtivos que desejam explorar seus segredos, deixando a comunidade em estado de choque e incerteza.',
        'Um grupo de exploradores é atacado por uma criatura mítica da floresta, resultando em ferimentos graves e alguns membros sendo levados para as profundezas da mata.',
        'Um curandeiro é sequestrado por uma facção rival que deseja usar seu conhecimento para propósitos nefastos, deixando a comunidade desamparada e em busca de respostas.',
      ],
      'Futurista': [
        'O líder da resistência é capturado por forças inimigas durante uma missão crítica, deixando a causa da liberdade em desordem.',
        'Um cientista proeminente é gravemente ferido em um ataque terrorista, colocando em risco uma descoberta tecnológica vital para o futuro da humanidade.',
        'Um diplomata de alto escalão é sequestrado por uma facção radical, desencadeando uma crise política que ameaça a estabilidade da galáxia.',
        'Uma criança prodígio é sequestrada por uma organização criminosa, forçando os heróis a embarcar em uma perigosa missão de resgate.',
        'Um membro chave da tripulação é gravemente ferido durante uma batalha espacial, lançando uma sombra de incerteza sobre o sucesso da missão e o destino de todos a bordo.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Era um ou mais vilões?',
    key: 'viloes',
    values: {
      'Medieval': [
        'Uma conspiração sinistra entre vários nobres ambiciosos, unidos por um desejo ardente de derrubar a monarquia e reivindicar o trono para si.',
        'Um pacto obscuro entre um feiticeiro maligno e um cavaleiro renegado, unidos pelo desejo de espalhar o terror e subjugar o reino.',
        'Um embate de vontades entre diferentes clãs de bárbaros, cada um liderado por um guerreiro implacável determinado a conquistar territórios e saquear vilas.',
        'Uma aliança nefasta entre um senhor da guerra ambicioso e um dragão ancestral, unidos pela sede de poder e pela vontade de subjugar toda a terra sob seu domínio.',
        'Uma sociedade secreta de assassinos e espiões, cada membro jurando lealdade ao mestre das sombras, cujos planos sinistros ameaçam desestabilizar todo o reino.',
      ],
      'Reino encantado': [
        'Um poderoso feiticeiro das trevas, conhecido como Malakar, lidera as forças das sombras.',
        'Uma antiga dragoa corrompida, chamada Vorgath, ameaça destruir a paz na floresta.',
        'Um culto secreto de bruxos negros conspira para despertar um antigo mal adormecido.',
        'Um exilado rei das fadas, conhecido como Lorthan, busca vingança contra os habitantes da floresta.',
        'Um elfo renegado, chamado Thalendir, se voltou para a escuridão e lidera uma horda de criaturas malignas.',
      ],
      'Floresta mágica': [
        'O Lorde das Sombras: Um ser maligno que busca dominar a floresta com suas legiões de criaturas das trevas.',
        'A Feiticeira Ardilosa: Uma bruxa poderosa que usa magia negra para manipular os habitantes da floresta em benefício próprio.',
        'O Caçador Implacável: Um mercenário sem escrúpulos que caça criaturas mágicas e almeja o controle sobre os segredos da floresta.',
        'O Espírito Vingativo: Uma entidade espectral assombrada pela injustiça, que busca vingança contra aqueles que profanam a harmonia da floresta.',
        'O Usurpador da Natureza: Um alquimista louco que experimenta com a essência da floresta, desencadeando poderes antigos e perigosos que ameaçam todo o ecossistema.',
      ],
      'Futurista': [
        'Uma aliança sinistra entre múltiplos vilões, unidos por um objetivo sombrio de dominação universal.',
        'Uma conspiração complexa, onde um vilão manipula outros para alcançar seus próprios objetivos ocultos.',
        'Um conflito de egos entre vários vilões, resultando em uma competição mortal pelo controle da galáxia.',
        'Uma sociedade secreta de vilões, cada um trazendo suas próprias habilidades e recursos para a mesa em busca de poder supremo.',
        'Uma entidade cósmica maligna, capaz de corromper mentes e manipular eventos em múltiplos sistemas estelares, tecendo uma teia de caos e destruição.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Tem um plano maligno?',
    key: 'plano_maligno',
    values: {
      'Medieval': [
        'Ressurreição do Antigo Dragão',
        'Corrupção dos Nobres',
        'Despertar de uma Horda de Mortos-Vivos',
        'Eclipse da Luz Solar',
        'Criação de uma Epidemia Mortal',
      ],
      'Reino encantado': [
        'Malakar planeja usar um antigo artefato para mergulhar o mundo na escuridão.',
        'Vorgath conspira para subjugar todas as criaturas da floresta e torná-las suas servas.',
        'O culto dos bruxos negros busca abrir um portal para um reino sombrio e invocar um ser destrutivo.',
        'Lorthan pretende desencadear uma praga mágica que irá corromper toda a vida na floresta.',
        'Thalendir planeja capturar os líderes das diferentes raças da floresta para enfraquecer sua resistência contra as forças das trevas.',
      ],
      'Floresta mágica': [
        'Corromper a Fonte da Vida: Um vilão busca contaminar a fonte de água sagrada da floresta, envenenando-a e causando a morte de toda a vida que dela depende.',
        'Despertar uma Besta Antiga: Um feiticeiro pretende invocar uma criatura ancestral adormecida na floresta, desencadeando caos e destruição em seu despertar.',
        'Escravizar os Espíritos da Floresta: Um mago negro planeja subjugar os espíritos guardiões da floresta, usando-os para seus próprios fins sinistros.',
        'Rasgar o Véu entre Mundos: Um culto sombrio conspira para abrir um portal para outro plano de existência, trazendo horrores desconhecidos para a Floresta Encantada.',
        'Semeando a Discórdia entre as Raças: Um vilão busca instigar conflitos entre as diferentes criaturas da floresta, alimentando o ódio e a desconfiança para enfraquecer a harmonia do lugar.',
      ],
      'Futurista': [
        'Desencadear uma guerra intergaláctica para enfraquecer os governos e permitir a ascensão do vilão ao poder supremo.',
        'Usar uma arma superpoderosa para destruir um planeta estratégico e semear o caos na galáxia.',
        'Criar uma praga biológica que afeta apenas determinadas espécies, visando a aniquilação de grupos específicos de seres vivos.',
        'Manipular eventos políticos e econômicos para causar o colapso de civilizações inteiras, mergulhando o universo em um estado de caos permanente.',
        'Despertar uma entidade cósmica antiga e poderosa, cujo único objetivo é consumir toda a vida no universo em uma onda de destruição implacável.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'O que vai acontecer no mundo e com os jogadores?',
    key: 'enredo',
    values: {
      'Medieval': [
        'Trevas se espalham, guerra se intensifica, monstros surgem.',
        'Céus escurecem, dragão desperta, destruição se aproxima.',
        'Reinos entrarão em guerra, disputando territórios e recursos escassos',
      ],
      'Reino encantado': [
        'A escuridão começará a se espalhar, afetando a flora e a fauna do reino encantado.',
        'Criaturas malignas surgirão das sombras, ameaçando a segurança dos jogadores e dos habitantes da floresta.',
        'As árvores mágicas, fonte de vida e poder, começarão a murchar e morrer.',
        'Os jogadores enfrentarão desafios cada vez mais difíceis, enquanto lutam para deter o avanço das trevas.',
        'A esperança começará a desaparecer, e os jogadores precisarão unir forças para encontrar uma maneira de restaurar a luz e a paz ao reino encantado.',
      ],
      'Floresta mágica': [
        'Uma Calamidade Natural: Uma tempestade mágica assola a floresta, desencadeando ventos furiosos e criando perigosas criaturas elementais que ameaçam os jogadores.',
        'Despertar de um Antigo Guardião: Uma entidade ancestral desperta da hibernação, trazendo consigo segredos antigos e desafios inéditos para os jogadores enfrentarem.',
        'O Crescimento da Corrupção: A influência maligna na floresta se intensifica, transformando partes dela em lugares sombrios e perigosos, exigindo que os jogadores ajam rapidamente para contê-la.',
        'Uma Profecia Revelada: Uma profecia antiga é revelada, apontando os jogadores como os únicos capazes de evitar um destino sombrio para a floresta, aumentando a pressão sobre eles para ter sucesso em sua jornada.',
        'A Ascensão de um Herói Inesperado: Um novo herói surge entre os jogadores, dotado de habilidades únicas e destinado a liderá-los em uma batalha épica contra as forças das trevas que assolam a floresta.',
      ],
      'Futurista': [
        'Uma guerra intergaláctica eclode, mergulhando a galáxia em um conflito devastador que ameaça a existência de todas as formas de vida.',
        'Uma catástrofe cósmica se aproxima, forçando os jogadores a embarcarem em uma jornada desesperada para encontrar uma solução antes que seja tarde demais.',
        'Uma revolta de inteligências artificiais ameaça extinguir a humanidade, desencadeando uma corrida contra o tempo para deter a rebelião robótica.',
        'Uma conspiração sombria é revelada, revelando que os governantes da galáxia há muito tempo estão sob o controle de forças malignas, desencadeando uma revolução em massa.',
        'Uma força alienígena invasora emerge dos confins do espaço, lançando a galáxia em um estado de guerra total e caos, onde apenas os mais fortes sobreviverão.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'É importante trabalhar o acontecimento até o fim da história',
    key: 'fim',
    values: {
      'Medieval': [
        'Desafios perigosos, ferimentos, aliados improváveis.',
        'Poderes ocultos, artefatos, destino do mundo em jogo.',
        'Confronto final, usar habilidades, restaurar a paz.',
      ],
      'Reino encantado': [
        'Os jogadores descobrirão que a escuridão está ligada a uma antiga maldição que assola o reino.',
        'Eles precisarão explorar locais misteriosos e coletar artefatos perdidos para desfazer o feitiço.',
        'Enquanto isso, enfrentarão desafios emocionantes e perigosos em seu caminho.',
        'Com coragem e determinação, os jogadores serão capazes de desvendar os segredos ocultos da floresta encantada.',
        'No final, eles encontrarão uma maneira de restaurar a luz e a harmonia ao reino, cumprindo seu destino como verdadeiros heróis.',
      ],
      'Floresta mágica': [
        'Revelação de Antigos Segredos: Os acontecimentos desencadeiam a descoberta de segredos há muito esquecidos na floresta, revelando pistas cruciais para a resolução do conflito.',
        'Transformação da Paisagem: Os eventos alteram permanentemente a paisagem da floresta, proporcionando aos jogadores novos desafios e oportunidades enquanto exploram as mudanças.',
        'Intensificação dos Conflitos: Os acontecimentos exacerbam as tensões entre as diferentes criaturas da floresta, levando a confrontos cada vez mais acirrados que culminam em um clímax dramático.',
        'Despertar de uma Força Antiga: Os eventos resultam no despertar de uma poderosa entidade adormecida na floresta, que os jogadores devem enfrentar para restaurar a paz.',
        'Renovação da Esperança: Apesar dos desafios enfrentados, os eventos também inspiram uma nova determinação nos jogadores e nas criaturas da floresta, unindo-os em uma luta final pela sobrevivência e pela restauração da harmonia perdida.',
      ],
      'Futurista': [
        'A escalada do conflito culmina em um confronto final épico entre o bem e o mal.',
        'Segredos sombrios são revelados, mudando fundamentalmente a compreensão dos personagens sobre o mundo ao seu redor.',
        'Os heróis enfrentam sacrifícios pessoais e perdas devastadoras em sua busca pela vitória.',
        'Uma corrida contra o tempo se desenrola enquanto os heróis lutam para evitar a destruição total.',
        'Um confronto emocional entre os heróis e os vilões, testando os limites da moralidade e da determinação de ambos os lados.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Quem pode auxiliar a resolver esses problemas? (Vamos chamar os heróis)',
    key: 'herois',
    values: {
      'Medieval': [
        'Sábios Eremitas com Conhecimento Ancestral',
        'Ordens de Cavaleiros Lendários',
        'Feiticeiros Proscritos com Conhecimentos Arcanos',
        'Antigos Dragões Sábios como Protetores do Reino',
        'Aliados de Reinos Vizinhos Unidos pelo Bem Comum',
      ],
      'Reino encantado': [
        'Os heróis contarão com a ajuda de criaturas mágicas, como fadas e unicórnios.',
        'Os sábios e ancestrais do reino oferecerão orientação e sabedoria aos heróis em sua jornada.',
        'Alianças com outros guerreiros valentes e exploradores destemidos serão fundamentais para superar os desafios.',
        'Os próprios habitantes da floresta encantada se unirão aos heróis para proteger seu lar e restaurar a paz.',
        'Antigos guardiões do reino, agora adormecidos, despertarão para auxiliar os heróis na batalha contra as trevas.',
      ],
      'Floresta mágica': [
        'O Sábio Ancião: Um poderoso druida ou feiticeiro, guardião dos segredos ancestrais da floresta, oferece orientação e conhecimento valioso aos heróis.',
        'As Criaturas da Floresta: Fadas, elfos, e outras criaturas mágicas se unem aos heróis, oferecendo sua magia e habilidades únicas para combater as forças das trevas.',
        'Os Guardiões da Natureza: Entidades poderosas, como espíritos elementais e árvores antigas, se erguem para proteger a floresta e auxiliar os heróis em sua missão.',
        'Os Habitantes da Floresta: Grupos de seres da floresta, como gnomos, centauros e dríades, se juntam aos heróis, compartilhando seu conhecimento da região e fornecendo apoio em batalha.',
        'O Destinado Herói: Um personagem escolhido pela profecia ou destino, com habilidades especiais ou uma conexão única com a floresta, lidera os heróis em sua jornada para restaurar o equilíbrio na Floresta Encantada.',

      ],
      'Futurista': [
        'O Líder Destemido: Um herói carismático e determinado que lidera a luta contra o mal, inspirando outros a seguirem seu exemplo.',
        'O Gênio Tecnológico: Um especialista em ciência e tecnologia avançada, capaz de desenvolver soluções inovadoras para desafios complexos.',
        'O Guerreiro Implacável: Um combatente habilidoso e destemido, cuja coragem e habilidade em combate são inigualáveis.',
        'O Diplomata Perspicaz: Um negociador habilidoso e astuto, capaz de resolver conflitos através da diplomacia e da negociação.',
        'O Forasteiro Enigmático: Um indivíduo misterioso com habilidades únicas e conhecimentos ocultos, cujo papel na batalha pode mudar o curso da história.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Informe como será o novo mundo (caso ocorram modificações ou trocas)',
    key: 'novo_mundo',
    values: {
      'Medieval': [
        'O novo mundo será uma terra dilacerada pela guerra, onde o domínio das trevas se fortalece a cada dia.',
        'Será um reino mergulhado na escuridão, onde o medo e a incerteza dominam os corações dos habitantes.',
        'Um mundo onde os céus estão permanentemente encobertos por nuvens negras, prenunciando tempos sombrios.',
        'As terras outrora exuberantes e férteis agora são dominadas por uma atmosfera de desespero e desolação.',
        'Uma paisagem marcada pela devastação e destruição, com cidades em ruínas e campos de batalha abandonados como testemunhas mudas da guerra.',
      ],
      'Reino encantado': [
        'O novo mundo será uma floresta mágica, repleta de árvores gigantes, criaturas fantásticas e mistérios ocultos.',
        'Elementos de fantasia e magia transformarão o ambiente, com rios que fluem ao contrário e plantas que brilham à noite.',
        'Ruínas antigas e templos sagrados emergirão, revelando segredos há muito esquecidos e desafiando os heróis em sua busca.',
        'Portais misteriosos se abrirão, conectando o mundo dos mortais ao reino encantado e permitindo que novos desafios surjam.',
        'A própria essência da floresta responderá à chamada dos heróis, transformando-se para refletir a jornada épica que está prestes a começar.',
      ],
      'Floresta mágica': [
        'O Reino da Natureza: Um mundo vasto e exuberante, repleto de densas florestas, rios sinuosos e montanhas majestosas, onde a magia da natureza flui livremente.',
        'A Terra dos Mistérios: Uma terra de segredos antigos e magia oculta, onde cada árvore, pedra e riacho tem sua própria história para contar.',
        'O Domínio da Fantasia: Um reino encantado habitado por seres mágicos e criaturas lendárias, onde a realidade se mistura com a imaginação.',
        'O Santuário dos Seres da Floresta: Um refúgio protegido, onde as criaturas da floresta vivem em harmonia, mantendo o equilíbrio da natureza.',
        'O Coração da Selva: Um lugar de beleza selvagem e perigos desconhecidos, onde os heróis embarcam em uma jornada épica para desvendar os mistérios da floresta e protegê-la do mal iminente.',
      ],
      'Futurista': [
        'Um mundo devastado pela guerra, onde ruínas antigas e tecnologia avançada se fundem em uma paisagem pós-apocalíptica.',
        'Uma sociedade distópica controlada por megacorporações, onde a desigualdade e a opressão são a norma.',
        'Um universo à beira do colapso, onde fenômenos cósmicos e ameaças alienígenas ameaçam a existência de todas as formas de vida.',
        'Um paraíso virtual criado por inteligências artificiais avançadas, onde os limites entre realidade e ilusão se tornam cada vez mais difíceis de distinguir.',
        'Uma fronteira selvagem e inexplorada, onde os pioneiros espaciais enfrentam perigos desconhecidos em busca de fortuna e glória.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Qual o objetivo do jogador?',
    key: 'objetivo',
    values: {
      'Medieval': [
        'O jogador busca reunir aliados e desvendar segredos antigos para derrotar o vilão e restaurar a paz no reino.',
        'Seu objetivo é enfrentar as forças das trevas, proteger os inocentes e salvar o mundo da destruição iminente.',
        'Ele busca vingança por injustiças passadas, glória por suas proezas e a redenção de um mundo mergulhado nas trevas.',
        'Seu objetivo é encontrar artefatos lendários, aliados leais e conhecimentos ocultos que o ajudarão em sua jornada.',
        'O jogador visa restaurar a ordem e a justiça no reino, restabelecendo a paz e a prosperidade para todos os seus habitantes.',
        'O objetivo do jogador é reunir aliados, desvendar segredos antigos e derrotar o vilão para restaurar a paz e a ordem no reino.',
      ],
      'Reino encantado': [
        'Explorar os mistérios da floresta encantada e desvendar seus segredos ocultos.',
        'Proteger o reino encantado dos perigos que ameaçam sua existência.',
        'Recuperar artefatos mágicos perdidos para restaurar o equilíbrio da natureza.',
        'Ajudar as criaturas mágicas e habitantes da floresta a resolverem seus problemas e conflitos.',
        'Descobrir a verdade por trás da antiga profecia que pode mudar o destino do mundo encantado.',
      ],
      'Floresta mágica': [
        'Desvendar os segredos da Floresta Encantada e restaurar o equilíbrio da natureza.',
        'Proteger os habitantes da floresta dos perigos que ameaçam seu lar.',
        'Coletar artefatos mágicos para fortalecer seus poderes e enfrentar os desafios da jornada.',
        'Conquistar a confiança das criaturas mágicas e ganhar aliados para sua causa.',
        'Enfrentar o vilão que busca corromper a floresta e impedir que seu plano maligno se concretize.',
      ],
      'Futurista': [
        'Salvar a galáxia da destruição iminente, enfrentando ameaças cósmicas de proporções épicas.',
        'Destruir o regime opressivo das megacorporações, libertando a humanidade da escravidão e da tirania.',
        'Descobrir os segredos antigos deixados por uma civilização extinta, desvendando mistérios que podem mudar o curso da história.',
        'Vingar-se daqueles que destruíram seu lar e sua família, lançando-se em uma busca implacável por justiça e redenção.',
        'Descobrir a verdade por trás de uma conspiração global, expondo os traidores e manipuladores que controlam os destinos do mundo.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Quais os seus maiores desejos, que o impulsionam para trilhar essa jornada?',
    key: 'desejos',
    values: {
      'Medieval': [
        'O desejo por justiça, para corrigir as injustiças do passado e trazer equilíbrio ao mundo.',
        'A busca por glória e reconhecimento, almejando tornar-se uma lenda entre os heróis do reino.',
        'O anseio por redenção, tentando compensar erros passados e encontrar paz interior.',
        'A vontade de proteger os entes queridos e garantir um futuro seguro para as gerações futuras.',
        'O desejo de aventura e descoberta, explorando terras desconhecidas e desvendando mistérios milenares.',
        'O jogador deseja vingança por injustiças passadas, glória por suas proezas, e a redenção de um mundo mergulhado nas trevas.',
      ],
      'Reino encantado': [
        'Buscar aventuras emocionantes e experiências únicas na floresta encantada.',
        'Descobrir seu verdadeiro propósito e destino dentro do reino mágico.',
        'Adquirir conhecimento sobre a magia e os segredos da natureza.',
        'Proteger seus entes queridos e o próprio reino dos perigos que os cercam.',
        'Encontrar a felicidade e a realização pessoal ao contribuir para a harmonia do mundo encantado.',
      ],
      'Floresta mágica': [
        'Descobrir a verdade por trás do desaparecimento de um ente querido na floresta.',
        'Provar seu valor como guardião da natureza e herdeiro de uma linhagem de protetores da floresta.',
        'Alcançar o conhecimento e sabedoria dos antigos sábios da floresta para se tornar um mestre da magia natural.',
        'Cumprir uma profecia antiga que prediz a ascensão de um herói destinado a salvar a Floresta Encantada.',
        'Realizar um desejo pessoal, como encontrar uma cura para uma doença ou alcançar a redenção por erros do passado.',
      ],
      'Futurista': [
        'Encontrar redenção por seus pecados passados, buscando uma chance de reparar os erros que cometeram.',
        'Descobrir a verdade sobre seu passado misterioso, buscando respostas que possam mudar sua compreensão do próprio ser.',
        'Proteger aqueles que ama da ameaça iminente, sacrificando tudo para garantir um futuro seguro para seus entes queridos.',
        'Alcançar a imortalidade ou transcendência, buscando alcançar um estado superior de existência além das limitações da carne.',
        'Alcançar poder supremo sobre o universo, desejando dominar todos os aspectos da realidade e moldar o destino à sua vontade.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Os obstáculos que ele vai encontrar ao longo do caminho que está traçando rumo a seu objetivo?',
    key: 'obstaculos',
    values: {
      'Medieval': [
        'Emboscadas de inimigos ocultos, prontos para atacar a qualquer momento e impedir seu avanço.',
        'Armadilhas mortais, colocadas por vilões astutos para deter o progresso do jogador e seus aliados.',
        'Corrupção e traição entre aqueles que deveriam ser aliados, minando a confiança e complicando os esforços para alcançar o objetivo.',
        'Monstros aterrorizantes, guardiões de artefatos antigos ou servos dos vilões, prontos para destruir qualquer intruso.',
        'Desafios mágicos e enigmas ancestrais, que testam a inteligência e a habilidade dos jogadores enquanto buscam desvendar os segredos do mundo.',
        'Enfrentará emboscadas de inimigos, armadilhas mortais, e a corrupção que permeia os corações daqueles que deveriam ser aliados.',
      ],
      'Reino encantado': [
        'Criaturas mágicas hostis que habitam a floresta e protegem seus domínios.',
        'Armadilhas naturais, como pântanos traiçoeiros e densas florestas impenetráveis.',
        'Enigmas e desafios mágicos que testam a inteligência e a perspicácia do jogador.',
        'A influência de vilões malévolos que buscam dominar o reino encantado.',
        'Eventos naturais extremos, como tempestades mágicas e terremotos provocados por forças ancestrais.',
      ],
      'Floresta mágica': [
        'Criaturas selvagens e hostis que protegem seus territórios na floresta.',
        'Armadilhas mágicas e enigmas desafiadores deixados por antigos guardiões da floresta.',
        'A influência corruptora do vilão, que cria ilusões e tenta desviar o jogador do seu caminho.',
        'Condições climáticas extremas e terrenos perigosos que dificultam a progressão.',
        'Conflitos internos entre as criaturas da floresta, que podem atrapalhar ou ajudar o jogador dependendo de suas escolhas e ações.',
      ],
      'Futurista': [
        'Enfrentar inimigos formidáveis, cujo poder e malícia representam uma ameaça constante à sua missão.',
        'Navegar por territórios perigosos e hostis, repletos de armadilhas mortais e obstáculos intransponíveis.',
        'Lidar com traições e tramas, onde aliados podem se revelar inimigos e a confiança é uma mercadoria preciosa.',
        'Superar desafios éticos e morais, onde os jogadores são confrontados com escolhas difíceis que testam seus princípios e convicções.',
        'Enfrentar o próprio passado e os demônios interiores, lidando com traumas e arrependimentos que ameaçam consumir sua determinação.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Que tipos de recompensas ele pode encontrar pelo caminho?',
    key: 'recompensa_jogo',
    values: {
      'Medieval': [
        'Artefatos lendários, imbuídos com poderes ancestrais que podem auxiliar na batalha contra as trevas.',
        'Aliados leais, dispostos a lutar ao lado do jogador e fornecer apoio vital em momentos cruciais.',
        'Conhecimentos ocultos, revelando segredos antigos e estratégias para enfrentar os desafios que se apresentam.',
        'Tesouros valiosos, como ouro, jóias e itens raros, que podem ser usados para adquirir equipamentos e recursos.',
        'Reconhecimento e gratidão, ganhando o respeito e a admiração dos habitantes do reino por suas ações heróicas.',
      ],
      'Reino encantado': [
        'Relíquias encantadas que concedem poderes mágicos ao jogador.',
        'Tesouros perdidos de civilizações antigas escondidos na floresta.',
        'Aliados mágicos que auxiliam o jogador em sua jornada.',
        'Conhecimento ancestral sobre segredos da floresta e seus habitantes.',
        'Acesso a áreas secretas e reinos ocultos dentro da floresta, repletos de riquezas e mistérios.',
      ],
      'Floresta mágica': [
        'Artefatos antigos imbuídos de magia natural para fortalecer suas habilidades.',
        'Conhecimento ancestral sobre a floresta e seus segredos ocultos.',
        'Aliados poderosos, como espíritos da natureza ou seres mágicos, que oferecem ajuda e orientação.',
        'Acesso a áreas ocultas ou santuários sagrados que concedem bênçãos especiais.',
        'A gratidão e o respeito das criaturas da floresta, que podem fornecer assistência ou proteção em momentos de necessidade.',
      ],
      'Futurista': [
        'Artefatos antigos e tecnologia perdida, capazes de conceder poderes incríveis ou revelar segredos há muito esquecidos.',
        'Aliados leais e poderosos, cujas habilidades e recursos podem ser essenciais para o sucesso da missão.',
        'Conhecimento proibido e revelações chocantes, que podem mudar a compreensão dos jogadores sobre o mundo ao seu redor.',
        'Tesouros valiosos e riquezas incalculáveis, que podem garantir conforto e segurança para os jogadores e seus entes queridos.',
        'Reconhecimento e glória, onde os feitos heroicos dos jogadores são celebrados e sua coragem é reconhecida em toda a galáxia.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Será premiado?',
    key: 'premio',
    values: {
      'Medieval': [
        'Honrarias reais, como títulos de nobreza ou comendas concedidas pelos governantes em agradecimento por seus feitos.',
        'Acesso a terras e propriedades, como recompensa por seus serviços à coroa ou aos senhores locais.',
        'Recompensas materiais, como uma parte do tesouro recuperado ou o direito de reivindicar artefatos valiosos.',
        'Reconhecimento público, sendo celebrado como um herói pelos habitantes do reino e contando com seu apoio em futuras empreitadas.',
        'Alianças estratégicas, ganhando o respeito e a amizade de poderosos aliados que podem oferecer ajuda e suporte em momentos de necessidade.',
      ],
      'Reino encantado': [
        'O reconhecimento como herói lendário dentro do reino encantado.',
        'Tesouros raros e valiosos concedidos como prêmio por feitos heroicos.',
        'Acesso a áreas exclusivas e poderosas dentro da floresta encantada.',
        'A bênção dos espíritos da natureza, garantindo proteção e boa fortuna.',
        'A possibilidade de tornar-se parte da história viva do mundo encantado, sendo reverenciado por gerações futuras.',
      ],
      'Floresta mágica': [
        'Receberá reconhecimento e respeito da comunidade da floresta encantada.',
        'Pode ganhar títulos honorários concedidos pelos líderes das criaturas mágicas.',
        'Será agraciado com itens raros e valiosos encontrados ao longo de sua jornada.',
        'Terá acesso a áreas restritas ou recompensas exclusivas guardadas por seres poderosos.',
        'Receberá a bênção da floresta, concedendo-lhe sorte e proteção em suas futuras aventuras.',
      ],
      'Futurista': [
        'O reconhecimento público de seus feitos heroicos, honrando-os como verdadeiros salvadores da galáxia.',
        'A concessão de títulos e posições de prestígio, elevando os jogadores a patamares de poder e influência inimagináveis.',
        'A recompensa de tecnologia avançada e recursos valiosos, que podem fortalecer os jogadores e ajudá-los em futuras missões.',
        'A obtenção de conhecimento proibido e segredos ocultos, concedendo-lhes uma vantagem crucial sobre seus inimigos.',
        'A promessa de uma vida de paz e prosperidade, onde os jogadores podem finalmente encontrar a felicidade e o descanso que tanto merecem após suas provações.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Tem algum segredo envolvido na trama?',
    key: 'segredo',
    values: {
      'Medieval': [
        'A existência de uma profecia antiga, que prediz o destino do mundo e o papel do jogador nele, mas cujos detalhes são obscuros e ambíguos.',
        'A identidade oculta do verdadeiro mestre por trás dos eventos, revelando que o vilão aparente é apenas um peão em um jogo muito maior.',
        'A descoberta de uma conspiração dentro dos círculos mais altos de poder, revelando que os verdadeiros inimigos estão entre aqueles que deveriam ser aliados.',
        'A existência de uma arma secreta capaz de derrotar o vilão, guardada há séculos em uma localização desconhecida, esperando para ser encontrada e usada no momento certo.',
        'O conhecimento de um ritual antigo, que pode desencadear poderes inimagináveis, mas cuja realização vem com um preço terrível e desconhecido.',
      ],
      'Reino encantado': [
        'A existência de uma antiga profecia que pode mudar o destino do reino encantado.',
        'Um enigma oculto nas profundezas da floresta, guardado por criaturas misteriosas.',
        'O segredo de uma árvore ancestral que detém o poder de curar ou destruir.',
        'Uma sociedade secreta de druidas que manipula os eventos por trás dos bastidores.',
        'A verdade por trás do desaparecimento de um importante líder do reino, envolta em mistério e intriga.',
      ],
      'Floresta mágica': [
        'Existe uma antiga profecia que prediz o destino do mundo mágico.',
        'Uma relíquia perdida há séculos pode ser a chave para desvendar mistérios ocultos.',
        'Algumas criaturas guardam segredos ancestrais que podem mudar o rumo da história.',
        'Há uma conspiração entre facções rivais para controlar os poderes da floresta.',
        'Um portal secreto pode levar a um reino desconhecido, oculto nas profundezas da floresta encantada.',
      ],
      'Futurista': [
        'A existência de uma conspiração sombria, que manipula os eventos por trás das cenas, desencadeando uma cadeia de revelações chocantes.',
        'O verdadeiro propósito por trás da ameaça iminente, que revela uma agenda sinistra e motivos ocultos que ameaçam o universo como um todo.',
        'A identidade de um traidor entre os aliados dos jogadores, cujas ações secretas ameaçam minar a missão e desencadear a destruição.',
        'A descoberta de uma profecia antiga, que prediz um destino sombrio para a galáxia e aponta para os jogadores como os únicos capazes de impedi-lo.',
        'A revelação de um passado obscuro, que lança luz sobre os segredos enterrados dos jogadores e os coloca em uma encruzilhada entre o bem e o mal.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'A jornada vai ser longa?',
    key: 'jornada',
    values: {
      'Medieval': [
        'Sim',
        'Não',
      ],
      'Reino encantado': [
        'Sim, a jornada será longa, atravessando terras desconhecidas e enfrentando desafios inesperados.',
        'Cada passo da jornada revelará novos mistérios e obstáculos a serem superados.',
        'A busca pela verdade exigirá coragem, determinação e perseverança dos heróis.',
        'A jornada levará os personagens por caminhos tortuosos, testando sua lealdade e bravura.',
        'No decorrer da jornada, os heróis descobrirão que o verdadeiro desafio está em seus corações e mentes.',
      ],
      'Floresta mágica': [
        'A jornada será uma odisseia através de territórios desconhecidos e perigosos.',
        'Os desafios irão testar a coragem e a determinação dos heróis a cada passo.',
        'Segredos antigos exigirão uma investigação meticulosa e pacientes descobertas.',
        'Cada etapa da jornada revelará novos mistérios e desafios a serem superados.',
        'A jornada será uma experiência transformadora, moldando os heróis em verdadeiros lendários da floresta encantada.',
      ],
      'Futurista': [
        'Uma odisseia épica que se estende por toda a galáxia, levando os jogadores a enfrentar desafios em inúmeros mundos e sistemas estelares.',
        'Uma busca interminável por respostas e redenção, onde os jogadores se veem mergulhados em um ciclo de lutas e descobertas que parece não ter fim.',
        'Uma jornada sem fim rumo ao desconhecido, onde cada vitória conquistada apenas revela mais perguntas e desafios que aguardam ser superados.',
        'Uma batalha interminável contra as forças do mal, onde os jogadores são constantemente testados em sua determinação e coragem em face da adversidade.',
        'Uma viagem sem retorno, onde os jogadores se veem obrigados a sacrificar tudo em sua busca pela salvação da galáxia, sem garantia de sucesso ou recompensa.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'As pessoas irão reconhecê-lo como um herói?',
    key: 'reconhecimento',
    values: {
      'Medieval': [
        'Sim',
        'Não',
      ],
      'Reino encantado': [
        'À medida que avançam em sua jornada, os heróis ganharão a admiração e o respeito daqueles que encontrarem pelo caminho.',
        'Suas ações corajosas e nobres serão reconhecidas e celebradas pelos habitantes do reino encantado.',
        'Os heróis serão aclamados como protetores e defensores do mundo mágico, inspirando outros a seguirem seus passos.',
        'O reconhecimento como heróis virá não apenas das pessoas, mas também dos seres mágicos e das criaturas da floresta encantada.',
        'No final de sua jornada, os heróis serão honrados como lendas vivas, cujos feitos serão lembrados por gerações futuras.',
      ],
      'Floresta mágica': [
        'Sua coragem e bondade serão elogiadas em todo o reino.',
        'Suas façanhas serão cantadas pelos bardos e contadas de geração em geração.',
        'As pessoas erguerão estátuas em sua homenagem nos vilarejos da floresta.',
        'Os moradores da floresta o saudarão como um verdadeiro defensor da natureza.',
        'Sua fama se espalhará pelos confins da terra, tornando-o um ícone de bravura e justiça.',
      ],
      'Futurista': [
        'Uma aclamação triunfante como os salvadores da galáxia, onde os jogadores são celebrados como lendas vivas em todos os cantos do universo.',
        'Uma recepção mista, onde alguns os consideram heróis enquanto outros os veem como ameaças ou vilões, dependendo de suas ações e reputação.',
        'Um silêncio sombrio, onde os feitos heroicos dos jogadores são esquecidos ou distorcidos pela propaganda e manipulação dos poderosos.',
        'Uma adoração fanática, onde os jogadores são venerados como deuses ou messias por aqueles que buscam esperança e orientação em tempos de desespero.',
        'Um julgamento severo, onde os jogadores são condenados como traidores ou criminosos pelos governantes corruptos e seus seguidores, enfrentando perseguição e exílio.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Vai ter algo que o jogador vai recolher como item de colecionador?',
    key: 'item',
    values: {
      'Medieval': [
        'Fragmentos de uma antiga espada lendária, que podem ser reunidos para restaurar sua glória e poder originais.',
        'Relíquias sagradas de uma ordem de cavaleiros, que concedem bênçãos divinas e proteção contra as trevas.',
        'Gemas encantadas, imbuídas com poderes mágicos que podem ser utilizadas para criar artefatos poderosos.',
        'Pergaminhos de conhecimento perdido, contendo segredos antigos e magias esquecidas que podem ser estudadas e dominadas.',
        'Troféus de vitória, como as presas de uma fera lendária ou as asas de um dragão abatido, que são símbolos de bravura e conquista.',
      ],
      'Reino encantado': [
        'Os jogadores poderão encontrar artefatos mágicos perdidos há muito tempo, que serão valiosos itens de colecionador.',
        'Ao longo de sua jornada, os jogadores poderão descobrir raros espécimes de plantas e animais mágicos para colecionar.',
        'Relíquias antigas e preciosas, como amuletos encantados e cristais mágicos, serão colecionáveis em todo o reino encantado.',
        'Os jogadores poderão coletar fragmentos de histórias antigas, como pergaminhos encantados e diários de heróis lendários.',
        'Cada criatura mágica encontrada pelo jogador poderá deixar para trás uma lembrança única, que se tornará um item de colecionador cobiçado.',
      ],
      'Floresta mágica': [
        'Artefatos antigos escondidos nas profundezas da floresta.',
        'Relíquias mágicas protegidas por criaturas lendárias.',
        'Plantas e ervas raras com propriedades curativas extraordinárias.',
        'Cristais brilhantes que irradiam energia positiva.',
        'Amuletos encantados que concedem poderes únicos aos seus portadores.',
      ],
      'Futurista': [
        'Relíquias antigas de uma civilização perdida, contendo segredos e poderes há muito esquecidos.',
        'Artefatos tecnológicos raros e valiosos, que concedem habilidades extraordinárias ou insights únicos sobre o universo.',
        'Troféus de batalha de inimigos derrotados, testemunhos de coragem e bravura em meio ao caos da guerra.',
        'Fragmentos de memórias perdidas, recuperados de sistemas de inteligência artificial ou interfaces neurais avançadas.',
        'Artefatos cósmicos de origens misteriosas, cujo significado e propósito só podem ser descobertos por aqueles dispostos a desvendar seus segredos mais profundos.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Existe algum tipo de punição?',
    key: 'punicao',
    values: {
      'Medieval': [
        'Exílio, onde o jogador é banido do reino por falhas ou traições graves, perdendo acesso a aliados e recursos valiosos.',
        'Maldição, onde o jogador é afligido por uma magia maligna que prejudica suas habilidades ou causa sofrimento constante.',
        'Perda de aliados, onde falhas em proteger ou ajudar seus companheiros resultam em mortes ou desertores, diminuindo o apoio disponível.',
        'Corrupção, onde o jogador é tentado por poderes sombrios e se torna um vilão em potencial, enfrentando a hostilidade dos que um dia chamou de amigos.',
        'Falha na missão, onde o objetivo não é alcançado a tempo ou de forma adequada, resultando em consequências catastróficas para o reino ou seus habitantes.',
      ],
      'Reino encantado': [
        'Maldições por quebrar leis.',
        'Transformação em animais.',
        'Trabalhos comunitários.',
        'Ilusões assustadoras.',
        'Exílio para regiões perigosas.',
      ],
      'Floresta mágica': [
        'Encantamentos mágicos que criam obstáculos e desafios adicionais.',
        'Ser temporariamente transformado em uma criatura da floresta como punição.',
        'Ser enredado em vinhas mágicas que restringem o movimento.',
        'Encontrar-se perdido em um labirinto de árvores encantadas.',
        'Ser transportado para uma dimensão paralela cheia de perigos e armadilhas.',
      ],
      'Futurista': [
        'Exílio em planetas desolados ou prisões intergalácticas, onde os transgressores são enviados para viver em isolamento e desespero.',
        'Marcação de criminosos com implantes cibernéticos que monitoram e controlam suas ações, transformando-os em servos obedientes do estado.',
        'Implantação de dispositivos de controle mental, que suprimem a vontade e a personalidade dos infratores, transformando-os em autômatos sem vontade própria.',
        'Julgamento por tribunais de inteligência artificial, onde a sentença é ditada por algoritmos impessoais que consideram fatores como culpa, remorso e probabilidade de reincidência.',
        'Exclusão social e ostracismo, onde os transgressores são banidos da sociedade e considerados pária, privados de direitos e privilégios e condenados a uma vida de rejeição e desonra.',
      ],
    },
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'O Desafio Final',
    key: 'desafio',
    values: {
      'Medieval': [
        'Confronto com o Dragão Ancestral: O jogador enfrenta o temível dragão que ameaça destruir o reino, testando sua coragem e habilidade em uma batalha épica.',
        'Defesa do Castelo Assediado: O jogador lidera a defesa do castelo sitiado contra as forças das trevas, usando estratégia e combate para proteger o reino.',
        'Ritual de Selamento das Trevas: O jogador participa de um ritual antigo para selar as forças das trevas, enfrentando desafios místicos e protegendo os conjuradores dos inimigos.',
        'Caçada ao Vilão Escondido: O jogador persegue o vilão por terras perigosas e labirínticas, enfrentando emboscadas e armadilhas enquanto busca acabar com a ameaça de uma vez por todas.',
        'Desafio dos Cavaleiros Sagrados: O jogador é convocado para um torneio de cavalaria sagrada, onde deve provar sua honra e valor em uma série de desafios de combate e habilidade.',
      ],
      'Reino encantado': [
        'Confronto final contra o Senhor da Escuridão.',
        'Travessia do Portal dos Pesadelos para enfrentar a criatura ancestral.',
        'Batalha contra o Exército das Trevas na clareira sagrada.',
        'Prova de coragem na Caverna dos Mistérios para obter a relíquia perdida.',
        'Desvendar os segredos do Bosque Encantado para deter a ameaça iminente.',
      ],
      'Floresta mágica': [
        'Uma batalha épica contra uma criatura lendária que protege o coração da floresta.',
        'Enfrentar os poderosos encantamentos da floresta para alcançar o local do confronto final.',
        'Desvendar os segredos antigos da floresta para obter uma vantagem na batalha.',
        'Formar alianças improváveis com os habitantes da floresta para lutar contra o mal.',
        'Desafiar o próprio conceito de realidade em um confronto final cheio de reviravoltas e surpresas.',
      ],
      'Futurista': [
        'Confronto épico contra uma inteligência artificial superpoderosa que ameaça a existência de toda a vida consciente.',
        'Infiltração em uma fortaleza inacessível, protegida por defesas avançadas e guardiões implacáveis, para recuperar um artefato crucial para a sobrevivência da humanidade.',
        'Travessia de um portal interdimensional para enfrentar uma ameaça alienígena iminente que se aproxima de nosso universo.',
        'Corrida contra o tempo para desativar uma arma de destruição em massa, antes que ela seja ativada e cause a aniquilação total.',
        'Duelo mortal com um vilão poderoso, cujos poderes transcendem a compreensão humana, em um confronto que decidirá o destino de todos.',
      ],
    },
  },
  {
    component: 'text',
    grid_type: 'finalizacao',
    index: 0,
    title: 'Titulo:',
    key: 'titulo',
    values: '',
  },
  {
    component: 'file',
    grid_type: 'finalizacao',
    index: 0,
    title: 'Adicione uma capa:',
    key: 'imagem',
    values: '',
  },
]

const GridItem = ({ icon, title, index, selectedIndex, setSelectedIndex }) => {
  const bg_color = selectedIndex === index ? "bg-green-500 dark:bg-green-900" : "";
  return (
    <>
      <div
        className={`flex flex-col items-center cursor-pointer border border-gray-800 dark:border-gray-200 w-40 h-40 ${bg_color}`}
        onClick={(event) => {
          if ((title === 'Ambiente' || title === 'Jogador' || title === 'Desafios') && !document.getElementsByName('tema')[0]?.value) {
            alert('Selecione um tema para acessar essas opções')
          } else {
            setSelectedIndex(index)
          }
        }}
      >
        <div className="pt-8">{icon}</div>
        <div className="text-center text-gray-800 dark:text-gray-200">{title}</div>
      </div>
    </>
  )
}

const Ambiente = ({ gridType, selectedIndex, setSelectedIndex }) => {
  return (
    <>
      <div className={`grid grid-cols-2 gap-0 ${gridType !== 'ambiente' ? "hidden" : ""}`}>
        <GridItem icon={<GiTeacher size={50} className="fill-black dark:fill-white" />} title={"Conteudo aplicado"} index={0} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<MdGroup size={50} className="fill-black dark:fill-white"/>} title={"Os seus jogadores"} index={1} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<FaGamepad size={50} className="fill-black dark:fill-white"/>} title={"O que mais gostam"} index={2} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<FaPencilRuler size={50} className="fill-black dark:fill-white"/>} title={"O que tem ao seu redor"} index={3} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </div>
    </>
  )
}

const Design = ({ gridType, selectedIndex, setSelectedIndex }) => {
  return (
    <>
      <div className={`grid grid-cols-2 gap-0 ${gridType !== 'design' ? "hidden" : ""}`}>
        <GridItem icon={<FaGlobe size={50} className="fill-black dark:fill-white"/>} title={"Tema"} index={0} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<GiForest size={50} className="fill-black dark:fill-white"/>} title={"Ambiente"} index={1} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<FaRunning size={50} className="fill-black dark:fill-white"/>} title={"Jogador"} index={2} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        <GridItem icon={<GiGreaseTrap size={50} className="fill-black dark:fill-white"/>} title={"Desafios"} index={3} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </div>
    </>
  )
}

const Finalizacao = ({ gridType }) => {
  return (
    <>
      <div className={`grid grid-rows-2 gap-0 ${gridType !== 'finalizacao' ? "hidden" : ""}`}>
        <div className={`flex flex-col w-40 h-40`}></div>
        <div className={`flex flex-col w-40 h-40`}></div>
      </div>
    </>
  )
}

const FormComponent = ({ project, selectedIndex, setSelectedIndex, gridType, setGridType }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, clearErrors, watch } = useForm();
  const [errors, setErrors] = useState({});
  const { request } = useRequest('/projeto_usuario', 'post');

  const onSubmit = async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => formData.set(key, data[key]))
    formData.set('imagem', data.imagem[0])
    const response = await request(
      formData,
      { "Content-Type": "multipart/form-data" }
    ).catch(err => {
      alert(err)
    });
    if (response?.data) {
      alert('Projeto criado com sucesso')
      navigate('/home')
    }
  };

  const onError = errors_ => {
    setErrors(errors_)
  }

  const notEmpty = (element) => {
    return !!element || 'Campo obrigatório';
  }

  const hasFile = (element) => {
    return (element && element.length > 0) || 'É necessario selecionar um arquivo'
  }

  const selectComponent = (element) => {
    let component = null;
    const defaultValue = project && project[element.key] ? project[element.key] : null;
    const tema = watch('tema');
    const onChange = (event) => {
      if (event.target.value) {
        delete errors[element.key]
        setErrors(errors)
      }
    }
    if (element.component === 'select') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200">{element.title}</div>
        <select
          ref={register({ validate: notEmpty })}
          name={element.key}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full bg-gray-200 dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
        >
          <option key="default" value="">Selecione uma opção</option>
          {(element.grid_type === 'design' && element.key !== 'tema' ? element.values[tema] : element.values)?.map((value, index) => <option key={index} value={value}>{value}</option>)}
        </select>
      </>
    } else if (element.component === 'text') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200">{element.title}</div>
        <input
          ref={register({ validate: notEmpty })}
          name={element.key}
          type="text"
          onChange={onChange}
          className="w-full bg-gray-200 dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'textarea') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200">{element.title}</div>
        <textarea
          ref={register({ validate: notEmpty })}
          name={element.key}
          rows={2}
          cols={5}
          onChange={onChange}
          className="w-full bg-gray-200 dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'file') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200">{element.title}</div>
        <input
          ref={register({ validate: hasFile })}
          name={element.key}
          type="file"
          onChange={onChange}
          className="form-input text-gray-800 dark:text-gray-200"
          defaultValue={defaultValue}
        />
      </>
    }
    return (
      <div
        key={element.key}
        className={`flex flex-col form-element w-full px-10`}
      >
        {component}
        {errors[element.key] ? <div className="text-red-500">{errors[element.key].message}</div> : null}
      </div>
    );
  }

  return (
    <>
      <form
        className={`w-full form flex ${gridType === 'finalizacao' ? 'flex-col' : 'flex-wrap'}`}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>

        </div>
        {formElements.map((element, index) => {
          return <div
            className={`w-1/2 flex flex-col space-x-4 ${element.index !== selectedIndex || element.grid_type !== gridType ? "hidden" : ""}`}
            key={index}
          >
            {selectComponent(element)}
          </div>
        })}
        <div
          className="container flex flex-col items-center"
        >
          <div
            className="w-1/4 flex items-center"
          >
            {gridType === 'finalizacao' ?
              <input
                type="submit"
                value="Submit"
                className="w-full cursor-pointer btn btn-default bg-blue-500 hover:bg-blue-600 text-gray-200 btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4"
              /> :
              <button
                className="w-full cursor-pointer btn btn-default bg-blue-500 hover:bg-blue-600 text-gray-200 btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4"
                onClick={(event) => {
                  event.preventDefault()
                  const nextIndex = (selectedIndex+1) % 4;
                  let nextGridType = gridType;
                  if (nextIndex === 0) {
                    if (gridType === 'ambiente') {
                      nextGridType = 'design';
                    } else if (gridType === 'design') {
                      nextGridType = 'finalizacao';
                    } else {
                      nextGridType = 'ambiente';
                    }
                    setGridType(nextGridType);
                  }
                  setSelectedIndex(nextIndex);
                }}
              >
                Next
              </button>
            }
          </div>
        </div>
      </form>
    </>
  )
}

const ProjectForm = ({ project = null }) => {
  const [gridType, setGridType] = useState('ambiente');
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex flex-col lg:flex-row"
        >
          <div
            style={{ width: '355px' }}
            className=""
          >
            <div
              className={`w-full rounded-lg border border-gray-800 dark:border-gray-200 p-4 `}
            >
              <div
                className={`w-full rounded-lg border border-gray-800 dark:border-gray-200`}
              >
                <div
                  className={`text-center text-xl ${gridType === 'ambiente' ? 'text-gray-200 dark:text-gray-200 bg-gray-500' : 'cursor-pointer text-gray-800 dark:text-gray-200'}`}
                  onClick={(event) => {
                    setGridType('ambiente');
                    setSelectedIndex(0);
                  }}
                >
                  Definindo o Ambiente
                </div>
                <Ambiente
                  gridType={gridType}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </div>
              <div
                className={`w-full rounded-lg border border-gray-800 dark:border-gray-200`}
              >
                <div
                  className={`text-center text-xl ${gridType === 'design' ? 'text-gray-200 dark:text-gray-200 bg-gray-500' : 'cursor-pointer text-gray-800 dark:text-gray-200'}`}
                  onClick={(event) => {
                    setGridType('design');
                    setSelectedIndex(0);
                  }}
                >
                  Game Design
                </div>
                <Design
                  gridType={gridType}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </div>
              <div
                className={`w-full rounded-lg border border-gray-800 dark:border-gray-200`}
              >
                <div
                  className={`flex flex-col w-160 text-center text-xl ${gridType === 'finalizacao' ? 'text-gray-200 dark:text-gray-200 bg-gray-500' : 'cursor-pointer text-gray-800 dark:text-gray-200'}`}
                  onClick={(event) => {
                    setGridType('finalizacao');
                    setSelectedIndex(0);
                  }}
                >
                  Finalização
                </div>
                <Finalizacao
                  gridType={gridType}
                />
              </div>
            </div>
          </div>
          <div
            style={{ width: '1000px', }}
            className="pl-2"
          >
            <div
              className={`w-full rounded-lg border border-gray-800 dark:border-gray-200 p-4 shadow-black`}
            >
              <FormComponent
                project={project}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                gridType={gridType}
                setGridType={setGridType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectForm