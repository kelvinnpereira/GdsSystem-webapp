import { useEffect, useState } from "react";
import useRequest from "../../hooks/request";
import { useParams } from "react-router-dom";

const options = {
  'Conteudo aplicado': {
    'local': 'Vai ser aplicado em que local?: ',
    'tipo': 'Quais os tipos de aplicação?: ',
  },
  'Os seus jogadores': {
    'estilo': 'Estilos de aprendizagem: ',
    'interesse': 'Interesses: ',
    'habilidade': 'Habilidades: ',
  },
  'O que mais gostam': {
    'recompensa_virtual': 'Recompensas virtuais: ',
    'competicao': 'Competições e desafios: ',
  },
  'O que tem ao seu redor': {
    'recurso': 'Recursos físicos disponíveis: ',
    'limitacao': 'Limitações: ',
  },
  'Tema': {
    'tema': '',
  },
  'Ambiente': {
    'mundo': 'O nome desse mundo: ',
    'historia_mundo': 'História do mundo: ',
    'era': 'O tempo em que se passa a história: ',
    'ambiente': 'Detalhes sobre o ambiente: ',
    'problema_ambiente': 'Problemas enfrentados:',
    'regra': 'Regra/Leis deste mundo: ',
  },
  'Jogador': {
    'detalhe': 'Detalhes pessoais, fisiológicos e outros que definam bem os jogadores: ',
    'historia_jogador': 'A história dos jogadores, por que estão ali?: ',
    'rotina': 'Sua rotina no mundo criado: ',
    'envolvimento': 'O tipo de envolvimento social que ocorre no mundo criado: ',
    'personagens_secundarios': 'Personagens secundários: ',
    'problema_jogador': 'Problemas enfrentados:',
    'hierarquias': 'Hierarquias: ',
    'vilao': 'Crie um vilão: ',
    'acontecimento': 'Algo que aconteceu fora do comum, ou planejado: ',
    'emboscada': 'Foi uma emboscada?: ',
    'feridos': 'Alguém saiu ferido ou sequestrado?: ',
    'viloes': 'Era um ou mais vilões?:',
    'plano_maligno': 'Tem um plano maligno?: ',
    'enredo': 'O que vai acontecer no mundo e com os jogadores?: ',
    'fim': 'É importante trabalhar o acontecimento até o fim da história: ',
    'herois': 'Quem pode auxiliar a resolver esses problemas? (Vamos chamar os heróis): ',
  },
  'Desafios': {
    'novo_mundo': 'Informe como será o novo mundo (caso ocorram modificações ou trocas): ',
    'objetivo': 'Qual o objetivo do jogador?: ',
    'desejos': 'Quais os seus maiores desejos, que o impulsionam para trilhar essa jornada?: ',
    'obstaculos': 'Os obstáculos que ele vai encontrar ao longo do caminho que está traçando rumo a seu objetivo?: ',
    'recompensa_jogo': 'Que tipos de recompensas ele pode encontrar pelo caminho?: ',
    'premio': 'Será premiado?: ',
    'segredo': 'Tem algum segredo envolvido na trama?: ',
    'jornada': 'A jornada vai ser longa?: ',
    'reconhecimento': 'As pessoas irão reconhecê-lo como um herói?: ',
    'item': 'Vai ter algo que o jogador vai recolher como item de colecionador?: ',
    'punicao': 'Existe algum tipo de punição?: ',
    'desafio': 'O Desafio Final: ',
  },
}

const Project = () => {
  const { id } = useParams();
  const { request } = useRequest(`/projeto/${id}`)
  const [projeto, setProjeto] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await request()
      if (response?.data) {
        setProjeto(response.data)
      }
    }
    fetch()
  }, []);
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="w-[1920px] mx-4 mt-16 text-gray-900"
        >
          <div className="rounded-t-lg h-96 overflow-hidden">
            <img className="object-cover object-top w-full" src={`${process.env.REACT_APP_SERVER_HOST}/media/${projeto?.imagem}`} alt='Mountain' />
          </div>
          <div className="mt-4 shadow-lg shadow-gray-900 rounded-lg border border-gray-700">
            <div
              className="flex justify-between my-5"
            >
              <div className="flex items-center justify-center">
                <a href="#">
                  <h5 className="pl-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{projeto?.titulo}</h5>
                </a>
              </div>
              <div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 border border-gray-500 rounded-lg grid grid-cols-3 divide-x sm:p-4">
                  <div
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="flex flex-row text-base text-gray-700 dark:text-gray-200">{projeto?.campos?.conteudo}</span>
                    <span className="flex flex-row text-sm text-gray-500 dark:text-gray-400">Conteudo</span>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center col-span-2"
                  >
                    <span className="flex flex-row text-base text-gray-700 dark:text-gray-200 pl-4">{projeto?.campos?.idade}</span>
                    <span className="flex flex-row text-sm text-gray-500 dark:text-gray-400">Grau de aplicação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-900 overflow-y-auto h-[500px]">
            <div className="text-white text-lg mx-8 my-8">
              <div className="text-xl mb-8" style={{whiteSpace: "pre-wrap"}}>
                {projeto?.descricao}
              </div>
              {/* {Object.keys(options).map((type, index) =>
                <div className="text-xl" index={type}>
                  <div className="font-bold">{type}:</div>
                  <ul class="ml-8 list-disc">
                    {Object.keys(options[type]).map((key, index) =>
                      <li>{options[type][key]}{projeto[key]}</li>
                    )}
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project;