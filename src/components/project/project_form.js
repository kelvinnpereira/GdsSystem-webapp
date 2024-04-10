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
    values: ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Ensino Técnico', 'Curso'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 0,
    title: 'Qual a série?',
    key: 'serie',
    values: ['1° Série', '2° Série', '3° Série'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 0,
    title: 'Qual a disciplina?',
    key: 'disciplina',
    values: ['Fisica', 'Quimica'],
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
    key: 'recompensa',
    values: ['Moedas ou pontos', 'Avatares personalizáveis', 'Níveis ou rankins'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 2,
    title: 'Competições e desafios: ',
    key: 'competicao',
    values: ['Líderes de placar ou tabelas de classificação', 'Desafios cronometrados que testam a velocidade', 'Missões ou tarefas especiais que pontuam'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 3,
    title: 'Recursos físicos disponíveis:',
    key: 'recurso',
    values: ['Quadro branco ou lousa', 'Laboratório de informática', 'Biblioteca', 'Quadra poliesportiva'],
  },
  {
    component: 'select',
    grid_type: 'ambiente',
    index: 3,
    title: 'Limitações:',
    key: 'limitacao',
    values: ['Restrição de tempo para implementar a gamificação durante as aulas', 'Limitações de acesso á internet ou dispositivos eletrônicos na sala de aula', 'Disponibilidade limitada de recursos financeiros'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 0,
    title: 'Agora vamos escolher um tema para o seu mundo',
    key: 'tema',
    values: ['Medieval', 'Floresta mágica', 'Reino encantado', 'Futurista', 'Corrida'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'Problemas enfrentados',
    key: 'problema',
    values: ['Virus Tecnológico', 'Corporações Dominam', 'Inteligência Artificial', 'Autonoma', 'Escassez de Recursos', 'Naturais'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 1,
    title: 'Regras/Leis deste mundo',
    key: 'regra',
    values: ['Viagem no Tempo Proibida', 'Biotecnologia Modificada', 'Clones Humanos', 'Leis da robótica', 'Exploração de IA'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'Detalhes pessoais, fisiológicos e outros:',
    key: 'detalhe',
    values: ['Possuem implantes cibernéticos avançados', 'Possui um código genético exclusivo', 'Podem pertencer a diferentes raças ou espécies alienígenas'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 2,
    title: 'História dos jogadores',
    key: 'historia',
    values: ['Voluntários em um programa de exploração espacial', 'Recrutados para participar de uma resistência', 'Cientistas que foram enviados para estudar'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Crie um vilão?',
    key: 'vilao',
    values: ['Ex-militar Ciberneticamente', 'Superinteligência Artificial', 'Magnata Corporativo Corrupto'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Algo que aconteceu fora do comum?',
    key: 'enredo',
    values: ['Série de Ataques Cibernéticos', 'Dispositivo experimental de Teletransporte', 'Vírus Biológico Modificado Escapou'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Foi uma emboscada?',
    key: 'emboscada',
    values: ['Fisica', 'Quimica'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Qual a disciplina?',
    key: 'feridos',
    values: ['Sim', 'Não'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'O que vai acontecer no mundo e com os jogadores?',
    key: 'acontecimento',
    values: ['Enfrentará um Período de Caos', 'Ameaça iminente de desastre', 'Todos derrotam o violão'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Descreva o objetivo do jogador:',
    key: 'objetivo',
    values: ['Encontrar e desativar os núcleos de disseminação do vírus', 'Deve ajudar a suprimir a rebelião', 'Rastrear e recuperar o artefato roubado'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'O que acontece se algúem não conseguir completar a missão?',
    key: 'falha',
    values: ['A cidade futuristica sofrerá um colpaso total', 'A rebelião pode se espelhar por outras colônias', 'O artefato poderá cair nas mãos erradas'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Desafio',
    key: 'desafio',
    values: ['Deve decifrar um código complexo para acessar a rede de controle do vírus', 'Precisa encontrar e convencer líderes rebeldes a se renderem', 'Enfrentar guardiões poderosos e resolver enigmas'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Desafio para casa:',
    key: 'desafio_para_casa',
    values: ['Estudar e aprender sobre os diferentes tipos de vírus cibernéticos', 'Criar um plano estratégico para lidar com a rebelião', 'Pesquisar sobre artefatos antigos e mitos'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Exercício em equipe',
    key: 'exercicio_em_equipe',
    values: ['Coordenar-se com outros especialistas em segurança cibernética', 'Trabalhar em conjunto com outros diplomatas e líderes', 'formar uma equipe de especialistas em exploração e combate'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Distintivo',
    key: 'distintivo',
    values: ['Distintivo de "Herói Reconhecido" por salvar uma cidade inteira', 'Distintivo de "Enegenheiro Excepcional" por construir e gerenciar uma base subterrânea', 'Distintivo de "Navegador Estelar" por completar com sucesso uma série de missões de exploração espacial'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Insígnias?',
    key: 'insignias',
    values: ['Insígnia de "Especialista em Hacking" por invadir com sucesso sistemas de segurança', 'Insígnia de "Piloto Ás" por demonstrar habilidades excepcionais de combate espacial', 'Insígnia de "Líder Estratégico" por tomar decisões cruciais e conduzir a equipe á vitória'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Item Secreto',
    key: 'item_secreto',
    values: ['Um traje de camuflagem óptica que permite ao jogador se tornar invisível', 'Um dispositivo de teletransporte portátil', 'Uma arma experimental de energia que causa danos significativos ao inimigo'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Mecânica',
    key: 'mecanica',
    values: ['Explorar uma cidade futurística em busca de pistas e informações', 'Pilotar naves espaciais em batalhas emocionantes contra invasores', 'Gerenciar uma base subterrânea, garantindo recursos e defendendo-se'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Perigos:',
    key: 'perigo',
    values: ['Grupo de mercenários contratados pelo vilão estão à espreita', 'Inimigos cibernéticos avançados estão patrulhando a cidade', 'Radiação perigosas espalhadas pelo ambiente'],
  },
  {
    component: 'select',
    grid_type: 'design',
    index: 3,
    title: 'Algo pode afetá-lo drasticamente?',
    key: 'problema_final',
    values: ['Poder ser infectado por um virús de controle mental', 'Uma tempestade magnética se forma subitamente', 'Um aliado próximo do jogador é capturado pelos inimigos'],
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
    component: 'textarea',
    grid_type: 'finalizacao',
    index: 0,
    title: 'Adicione uma descrição:',
    key: 'descricao',
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

const GridItem = ({icon, title, index, selectedIndex, setSelectedIndex}) => {
  const bg_color = selectedIndex === index ? "bg-green-900" : "";
  return (
    <>
      <div
        className={`flex flex-col items-center cursor-pointer border border-gray-200 w-40 h-40 ${bg_color}`}
        onClick={(event) => {
          setSelectedIndex(index)
        }}
      >
        <div className="pt-8">{icon}</div>
        <div className="text-center">{title}</div>
      </div>
    </>
  )
}

const Ambiente = ({gridType, selectedIndex, setSelectedIndex}) => {
  return (
    <>
      <div className={`grid grid-cols-2 gap-0 ${gridType !== 'ambiente' ? "hidden" : ""}`}>
        <GridItem icon={<GiTeacher size={50}/>} title={"Conteudo aplicado"} index={0} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<MdGroup size={50}/>} title={"Os seus jogadores"} index={1} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<FaGamepad size={50}/>} title={"O que mais gostam"} index={2} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<FaPencilRuler size={50}/>} title={"O que tem ao seu redor"} index={3} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      </div>
    </>
  )
}

const Design = ({gridType, selectedIndex, setSelectedIndex}) => {
  return (
    <>
      <div className={`grid grid-cols-2 gap-0 ${gridType !== 'design' ? "hidden" : ""}`}>
        <GridItem icon={<FaGlobe size={50}/>} title={"Tema"} index={0} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<GiForest size={50}/>} title={"Ambiente"} index={1} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<FaRunning size={50}/>} title={"Player"} index={2} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <GridItem icon={<GiGreaseTrap size={50}/>} title={"Desafios"} index={3} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      </div>
    </>
  )
}

const Finalizacao = ({gridType}) => {
  return (
    <>
      <div className={`grid grid-rows-2 gap-0 ${gridType !== 'finalizacao' ? "hidden" : ""}`}>
        <div className={`flex flex-col w-40 h-40`}></div>
        <div className={`flex flex-col w-40 h-40`}></div>
      </div>
    </>
  )
}

const FormComponent = ({ project, selectedIndex, gridType}) => {
  const navigate = useNavigate();
  const { handleSubmit, register, clearErrors } = useForm();
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
    let component = null
    const defaultValue = project && project[element.key] ? project[element.key] : null
    const onChange = (event) => {
      if (event.target.value) {
        delete errors[element.key]
        setErrors(errors)
      }
    }
    if (element.component === 'select') {
      component = <>
        <div className="form-label">{element.title}</div>
        <select
          ref={register({validate: notEmpty})}
          name={element.key}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
        >
          <option key="default" value="">Selecione uma opção</option>
          {element.values.map((value, index) => <option key={index} value={value}>{value}</option>)}
        </select>
      </>
    } else if (element.component === 'text') {
      component = <>
        <div className="form-label">{element.title}</div>
        <input
          ref={register({validate: notEmpty})}
          name={element.key}
          type="text"
          onChange={onChange}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'textarea') {
      component = <>
        <div className="form-label">{element.title}</div>
        <textarea
          ref={register({validate: notEmpty})}
          name={element.key}
          rows={2}
          cols={5}
          onChange={onChange}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
          defaultValue={defaultValue}
        />
      </>
    } else if (element.component === 'file') {
      component = <>
        <div className="form-label">{element.title}</div>
        <input
          ref={register({validate: hasFile})}
          name={element.key}
          type="file"
          onChange={onChange}
          className="form-input"
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
            <input
              type="submit"
              value="Submit"
              className="w-full cursor-pointer btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded mt-4"
            />
          </div>
        </div>
      </form>
    </>
  )
}

const ProjectForm = ({project = null}) => {
  const [gridType, setGridType] = useState('ambiente');
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex flex-col lg:flex-row"
        >
          <div
            style={{width: '355px'}}
            className=""
          >
            <div
              className={`w-full rounded-lg border border-gray-100 p-4 `}
            >
              <div
                className={`w-full rounded-lg border border-gray-100`}
              >
                <div
                  className={`text-center text-xl ${gridType === 'ambiente' ? 'bg-gray-500' : 'cursor-pointer'}`}
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
                className={`w-full rounded-lg border border-gray-100`}
              >
                <div
                  className={`text-center text-xl ${gridType === 'design' ? 'bg-gray-500' : 'cursor-pointer'}`}
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
                className={`w-full rounded-lg border border-gray-100`}
              >
                <div
                  className={`flex flex-col w-160 text-center text-xl ${gridType === 'finalizacao' ? 'bg-gray-500' : 'cursor-pointer'}`}
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
            style={{width: '1000px', }}
            className="pl-2"
          >
            <div
              className={`w-full rounded-lg border border-gray-100 p-4 shadow-black`}
            >
              <FormComponent
                project={project}
                selectedIndex={selectedIndex}
                gridType={gridType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectForm