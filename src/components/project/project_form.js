import { GiTeacher, GiForest, GiGreaseTrap } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { FaPencilRuler, FaGamepad, FaGlobe, FaRunning, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/request";
import { useNavigate } from "react-router-dom";

const formElements = [
  {
    component: 'text',
    index: 0,
    title: 'Titulo do Projeto',
    key: 'titulo',
    values: '',
  },
  {
    component: 'radio',
    index: 0,
    title: 'O que você pretende alcançar com esta gamificação?',
    key: 'objetivo',
    values: [
      'Engajamento',
      'Aprendizado',
      'Interação social',
    ],
  },
  {
    component: 'select',
    index: 0,
    title: 'O que você planeja gamificar?',
    key: 'planejamento',
    values: [
      'Aula',
      'Curso',
      'Evento',
    ],
  },
  {
    component: 'text',
    index: 1,
    title: 'Qual a duração estimada da gamificação? (em minutos, horas, dias)',
    key: 'duracao',
    values: '',
  },
  {
    component: 'text',
    index: 1,
    title: 'Qual o assunto que deseja que aprendam?',
    key: 'assunto',
    values: '',
  },
  {
    component: 'radio',
    index: 1,
    title: 'Onde a gamificação será realizada?',
    key: 'local',
    values: [
      'Presencial',
      'Online',
      'Híbrido (presencial e online)',
    ],
  },
  {
    component: 'text',
    index: 2,
    title: 'Quantas pessoas participarão da atividade gamificada?',
    key: 'pessoas',
    values: '',
  },
  {
    component: 'checkbox',
    index: 2,
    title: 'Qual a faixa etária dos participantes?',
    key: 'idade',
    values: [
      'Criança (03 -12 anos)',
      'Adolescente (13-17 anos)',
      'Jovem adulto (18-24 anos)',
      'Adulto jovem (25-34 anos)',
      'Adulto de meia-idade (35-54 anos)',
      'Idoso (55 anos ou mais)',
    ],
  },
  {
    component: 'checkbox',
    index: 3,
    title: 'Qual é o perfil dos participantes, o que eles gostam?',
    key: 'perfil',
    values: [
      'Esportes e Atividades Físicas: Esportes ao ar livre, Fitness, musculação, Esportes em equipe (futebol, basquete, etc.), Atividades aquáticas (natação, surf, etc.)',
      'Arte e Criatividade: Pintura, desenho, Música, instrumentos, Fotografia, Artesanato',
      'Entretenimento e Cultura: Filmes, séries, Livros, leitura, Teatro, artes cênicas, Eventos culturais',
      'Jogos e Entretenimento Digital: Jogos de vídeo game, tabuleiro, Jogos online, Streaming de conteúdo',
      'Viagens e Aventuras: Exploração de natureza, Viagens culturais, Aventuras radicais, Turismo gastronômico',
      'Culinária e Gastronomia: Culinária caseira, Experimentação gastronômica, Coquetelaria, Visitar restaurantes e cafés',
      'Tecnologia e Inovação: Novas tecnologias, Programação e desenvolvimento, Exploração de gadgets, Participação em comunidades tech',
      'Atividades Sociais: Encontros sociais, Networking profissional, Participação em clubes ou grupos, Organização de eventos sociais',
      'Bem-Estar e Espiritualidade: Meditação, mindfulness, Yoga, práticas holísticas, Leitura espiritual, participação em comunidades espirituais',
      'Mundo Animal e Natureza: Observação de aves, Cuidado com animais de estimação, Ativismo ambiental,  Exploração de parques naturais',
    ],
  },
  {
    component: 'radio',
    index: 3,
    title: 'Existe algum tema específico que gostaria de incorporar na gamificação?',
    key: 'tema',
    values: [
      'Cidade Sustentável',
      'Mundo Subaquático',
      'Caça ao Tesouro Pirata',
      'Viagem no Tempo',
      'Exploração Espacial',
      'Construção de Utopia',
      'Jornada Mística',
      'Viagem pelo Sistema Solar',
      'Mundo das Fábulas',
      'Investigação Criminal',
      'Desbravadores da Selva',
      'Aventura no Mundo Antigo',
      'Magia e Feitiçaria',
      'Resgate na Montanha',
      'Aventuras no Faroeste',
      'Caçadores de Alienígenas',
      'Arqueologia Aventuresca',
      'Corrida Espacial',
      'Mundo dos Robôs',
      'Guerreiros Medievais',
    ],
  },
  {
    component: 'checkbox',
    index: 4,
    title: 'Os participantes terão a oportunidade de personalizar suas experiências na gamificação?',
    key: 'personalizar',
    values: [
      'Escolha de Avatar',
      'Seleção de Tema de Interesse',
      'Customização de Distintivos Virtuais',
      'Personalização do Nome Virtual',
      'Escolha de Itens Virtuais (roupas, acessórios, etc.)',
      'Adaptação do Ambiente Virtual de Jogo',
      'Escolha de Trilha Específica de Desafios',
      'Customização de Plano de Fundo do Perfil',
      'Configurações de Privacidade do Perfil',
      'Personalização de Notificações',
      'Escolha de Modo de Participação (Individual ou em Equipe)',
      'Seleção de Desafios Extras ou Missões Especiais',
      'Escolha de Avatar Representativo de Equipe (em casos de competições)',
      'Adaptação de Configurações de Acessibilidade',
      'Personalização de Emblemas ou Insignias Virtuais',
      'Escolha de Apelido ou Nome de Jogador',
      'Seleção de Papéis ou Funções Específicas',
      'Ajuste de Preferências de Comunicação',
      'Personalização de Respostas a Desafios',
      'Escolha de Desafios Compatíveis com Nível de Dificuldade Preferido',
    ],
  },
  {
    component: 'text',
    index: 5,
    title: 'Descreva sobre o conteúdo que será aprendido nesta missão?',
    key: 'conteudo',
    values: '',
  },
  {
    component: 'radio',
    index: 5,
    title: 'Qual será o tipo de avaliação?',
    key: 'avaliacao',
    values: [
      'Provas escritas.',
      'Testes de múltipla escolha.',
      'Questionários',
      'Trabalhos escritos',
      'Projetos práticos',
      'Simulações',
      'Laboratórios',
      'Apresentações',
      'Apresentações orais',
      'Entrevistas',
      'Discussões em grupo',
      'Participação em sala de aula',
      'Discussões em fóruns',
      'Colaboração em projetos de grupo',
      'Demonstração de habilidades específicas',
      'Testes práticos',
      'Portfólios de trabalhos',
      'Autoavaliações',
      'Relatórios reflexivos',
      'Diários de aprendizagem',
      'Apresentação de projetos',
      'Avaliação de um produto final',
      'Relatórios de progresso do projeto',
      'Contribuições em plataformas de aprendizagem online',
      'Respostas em fóruns de discussão',
      'Comentários em blogs ou wikis',
      'Entrega de seminários',
      'Apresentação de trabalhos',
      'Pitches de projetos',
      'Avaliação entre colegas',
      'Revisão por pares de projetos',
      'Feedback de colegas',
      'Avaliação do desempenho do grupo',
      'Contribuição individual para projetos de grupo',
      'Resolução de casos práticos',
      'Tomada de decisões em situações simuladas',
    ],
  },
  {
    component: 'checkbox',
    index: 6,
    title: 'Quais tipos de desafios você gostaria de incluir?',
    key: 'desafios',
    values: [
      'Quizzes Interativos',
      'Missões de Exploração',
      'Quebra-Cabeças',
      'Desafios de Sobrevivência',
      'Caça ao Tesouro Digital',
      'Simulações Científicas',
      'Criação de Projetos',
      'Desafios Colaborativos',
      'Tomada de Decisão Ética',
      'Simulações de Negócios',
      'Desafios de Codificação',
      'Investigação e Resolução de Mistérios',
      'Desafios de Arte',
      'Desafios de Compreensão de Texto',
      'Simulações Históricas',
      'Desafios de Liderança',
      'Adivinhação e Enigmas',
      'Desafios de Debate',
      'Desafios de Velocidade',
      'Avaliação de Casos de Estudo',
    ],
  },
  {
    component: 'checkbox',
    index: 6,
    title: 'Como os participantes interagirão entre si e com o sistema de gamificação?',
    key: 'interacao',
    values: [
      'Fórum de Discussão',
      'Equipes Colaborativas',
      'Chat ao Vivo',
      'Competições Amigáveis',
      'Desafios Compartilhados',
      'Feedback entre Pares',
      'Sessões de Perguntas e Respostas',
      'Votação e Tomada de Decisão Coletiva',
      'Reconhecimento Social',
      'Compartilhamento em Redes Sociais',
      'Ranqueamento de Equipes',
      'Desafios de Colaboração',
    ],
  },
  {
    component: 'checkbox',
    index: 7,
    title: 'Que tipo de recompensas motivariam os participantes nesta missão?',
    key: 'recompensa',
    values: [
      'Pontos',
      'Distintivos Virtuais',
      'Certificados Personalizados',
      'Medalhas Virtuais',
      'Prêmios Físicos',
      'Reconhecimento Público',
      'Privilégios Especiais',
      'Personalização do Avatar',
      'Bônus de XP',
      'Oportunidades de Liderança',
      'Recompensas Digitais',
      'Cupons de Desconto',
      'Missões Exclusivas',
      'Reconhecimento no Hall da Fama',
      'Acesso Antecipado a Conteúdo',
      'Participação em Eventos Especiais',
      'Feedback Personalizado',
      'Badges Virtuais',
      'Conexões Profissionais',
      'Destaques em Publicações',
    ],
  },
  {
    component: 'checkbox',
    index: 7,
    title: 'Como será feita a avaliação do desempenho dos participantes na gamificação?',
    key: 'desempenho',
    values: [
      'Pontuação Total',
      'Taxa de Conclusão de Desafios',
      'Participação Ativa em Fóruns',
      'Tempo de Resposta em Quizzes',
      'Nível de Colaboração em Equipes',
      'Criatividade em Projetos',
      'Precisão em Simulações',
      'Resolução de Problemas em Quebra-Cabeças',
      'Tomada de Decisão Ética',
      'Envolvimento em Atividades Colaborativas',
      'Contribuição para Discussões em Grupo',
      'Adesão a Prazos',
      'Progresso Individual',
      'Feedback Recebido e Implementado',
      'Participação em Eventos Especiais',
      'Engajamento em Missões de Exploração',
      'Habilidade de Comunicação em Chat ao Vivo',
      'Colaboração em Desafios Criativos',
      'Resolução Efetiva de Simulações de Negócios',
      'Adaptabilidade em Desafios Surpresa',
    ],
  },
  {
    component: 'checkbox',
    index: 8,
    title: 'Como os participantes receberão feedback durante a gamificação?',
    key: 'feedback',
    values: [
      'Feedback Imediato após Quizzes',
      'Comentários sobre Contribuições em Fóruns',
      'Avaliação de Desempenho em Simulações',
      'Reconhecimento de Conclusão de Missões',
      'Comentários sobre Projetos Criativos',
      'Orientações após Desafios de Sobrevivência',
      'Feedback sobre Participação em Equipes',
      'Destaque para Decisões Éticas',
      'Avaliação de Resolução de Problemas em Quebra-Cabeças',
      'Reconhecimento de Velocidade em Desafios Cronometrados',
      'Feedback sobre Colaboração em Eventos Especiais',
      'Correções e Sugestões após Avaliação de Casos de Estudo',
      'Comentários sobre Envolvimento em Atividades Colaborativas',
      'Reconhecimento por Progresso Individual',
      'Apontamentos sobre Comunicação em Chat ao Vivo',
      'Feedback Personalizado em Sessões de Perguntas e Respostas',
      'Destaque para Contribuições em Desafios Criativos',
      'Observações sobre Feedback Recebido e Implementado',
      'Apreciação por Participação em Discussões em Grupo',
      'Instruções Adicionais para Missões de Exploração',
    ],
  },
  {
    component: 'checkbox',
    index: 8,
    title: 'O que acontece se alguém não conseguir completar a missão?',
    key: 'falha',
    values: [
      'Será dada uma segunda chance para tentar completar a missão',
      'Os participantes terão acesso a recursos adicionais ou dicas para superar obstáculos',
      'Serão oferecidas missões alternativas para permitir que todos participem ativamente',
      'Feedback construtivo será fornecido para orientar o participante na melhoria',
      'Mesmo que a missão não seja totalmente concluída, recompensas parciais serão concedidas com base no esforço',
      'Aqueles que não completarem a missão atual ainda poderão participar dos próximos desafios',
      'A comunidade poderá oferecer suporte e dicas para ajudar na conclusão da missão',
      'Uma análise individual será fornecida para identificar áreas de melhoria e aprendizado',
      'A experiência será projetada para promover o aprendizado contínuo, independentemente do sucesso imediato',
      'Incentivos adicionais serão oferecidos para aqueles que persistirem e tentarem novamente',
      'Mesmo sem completar a missão, os participantes terão acesso a conteúdo educativo adicional',
      'Suporte individualizado será oferecido para ajudar o participante a superar desafios específicos',
      'Oportunidades de colaboração entre participantes serão incentivadas para superar desafios',
      'Os participantes terão a chance de revisar e ajustar estratégias para a próxima tentativa',
    ],
  },
  {
    component: 'file',
    index: 8,
    title: 'Adicione uma capa',
    key: 'imagem',
    values: '',
  },
]


const FormComponent = ({ project, selectedIndex, setSelectedIndex }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, clearErrors, watch } = useForm();
  const [errors, setErrors] = useState({});
  const { request, isLoading } = useRequest('/projeto_usuario', 'post');

  const onSubmit = async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => Array.isArray(data[key]) ? formData.set(key, data[key].join(', ')) : formData.set(key, data[key]))
    formData.set('imagem', data.imagem[0])
    const response = await request(
      formData,
      { "Content-Type": "multipart/form-data" }
    ).catch(err => {
      alert(err)
    });
    if (response?.data) {
      alert('Projeto criado com sucesso')
      navigate('/project/:id')
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
    const onChange = (event) => {
      if (event.target.value) {
        delete errors[element.key]
        setErrors(errors)
      }
    }
    if (element.component === 'select') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <select
          ref={register({ validate: notEmpty })}
          name={element.key}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
        >
          <option key="default" value="">Selecione uma opção</option>
          {element.values?.map((value, index) => <option key={index} value={value}>{value}</option>)}
        </select>
      </>
    } else if (element.component === 'text') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <input
          ref={register({ validate: notEmpty })}
          name={element.key}
          type="text"
          onChange={onChange}
          className="w-full bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'textarea') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <textarea
          ref={register({ validate: notEmpty })}
          name={element.key}
          rows={2}
          cols={5}
          onChange={onChange}
          className="w-full bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'file') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <input
          ref={register({ validate: hasFile })}
          name={element.key}
          type="file"
          onChange={onChange}
          className="form-input text-gray-800 dark:text-gray-200"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'checkbox') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <fieldset className="flex flex-col border border-gray-800 rounded dark:border-gray-200">
          {
            element.values?.map((value, index) => <>
              <label className="form-label text-gray-800 dark:text-gray-200 px-4 py-1" key={`${element.key}${index}`}>
                <input className="mr-2 scale-150" type="checkbox" value={value} name={element.key} ref={register} />
                {value}
              </label>
            </>)
          }
          <div className="pb-2"></div>
        </fieldset>
      </>
    }
    else if (element.component === 'radio') {
      component = <>
        <div className="form-label text-gray-800 dark:text-gray-200 pb-2">{element.title}</div>
        <fieldset className="flex flex-col border border-gray-800 rounded dark:border-gray-200">
          {
            element.values?.map((value, index) => <>
              <label className="form-label text-gray-800 dark:text-gray-200 px-4 py-1" key={`${element.key}${index}`}>
                <input 
                  className="mr-2 scale-150" 
                  type="radio" 
                  value={value} 
                  name={element.key} 
                  ref={register} 
                />
                {value}
              </label>
            </>)
          }
          <div className="pb-2"></div>
        </fieldset>
      </>
    }    
    return (
      <div
        key={element.key}
        className={`flex flex-col form-element w-full px-10 py-2`}
      >
        {component}
        {errors[element.key] ? <div className="text-red-500">{errors[element.key].message}</div> : null}
      </div>
    );
  }

  return (
    <>
      <form
        className={`w-full form flex items-center flex-col text-xl`}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>

        </div>
        {formElements.map((element, index) => {
          return <div
            className={`w-full flex flex-col space-x-4 ${element.index !== selectedIndex ? "hidden" : ""}`}
            key={index}
          >
            {selectComponent(element)}
          </div>
        })}
        <div
          className="container flex flex-rol items-center w-3/5"
        >
            {
              selectedIndex > 0 ? 
               <button
                  type='button'
                  className="w-full mx-3 btn btn-default bg-blue-500 hover:bg-blue-600 text-gray-200 btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4"
                  onClick={(event) => {
                    setSelectedIndex(selectedIndex - 1);
                  }}
                >
                  Voltar
                </button> 
               : null
            }
            {
              selectedIndex < 8 ? 
               <button
                  type='button'
                  className="w-full mx-3 btn btn-default bg-blue-500 hover:bg-blue-600 text-gray-200 btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4"
                  onClick={(event) => {
                    setSelectedIndex(selectedIndex + 1);
                  }}
                >
                  Próximo
                </button> 
               : null
            }
            {
              selectedIndex === 8 ?
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mx-3 btn btn-default bg-blue-500 hover:bg-blue-600 text-gray-200 btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4 ${isLoading ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex flex-row items-center justify-center">{isLoading ? <FaSpinner className="spin-spinner stroke-current mr-2 mt-1"/> : null}
                  Submeter</div>
                  
                </button>
                : null
            }
        </div>
      </form>
    </>
  )
}

const ProjectForm = ({ project = null }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex flex-col lg:flex-row"
        >
          <div
            style={{ width: '1000px', }}
            className=""
          >
            <div
              className={`w-full rounded-lg border border-gray-800 dark:border-gray-200 p-4 shadow-black`}
            >
              <FormComponent
                project={project}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectForm