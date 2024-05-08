import { useEffect, useState } from "react";
import { MdFavorite, MdOpenInNew, MdFavoriteBorder, MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg'
import useRequest from "../../hooks/request";

const HomePage = () => {
  const { request } = useRequest('/projeto')
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await request()
      if (response?.data) {
        setCards(response.data)
      }
    }
    fetch()
  }, []);

  const buildCard = (card) => {
    return (
      <>
        <div
          className="mx-5 my-5 bg-white border border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          style={{width: '600px', height: '430px'}}
        >
          <div>
            <img className="p-8 rounded-t-lg object-contain h-48 w-96" src={`${process.env.REACT_APP_SERVER_HOST}/media/${card.imagem}`} alt="product image"/>
          </div>
          <div className="px-5 pb-5">
            <div
              className="flex justify-between my-5"
            >
              <div>
                <a className="flex flex-row items-center" href={`/project/${card.id}`}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{card.titulo}</h5>
                  <MdOpenInNew className="cursor-pointer ml-2 mt-1" size={20}/>
                </a>
                
              </div>
              <div>
                <MdFavoriteBorder className="cursor-pointer" size={30}/>
              </div>
            </div>
            <div className="w-full bg-gray-700 border border-gray-700 rounded-lg grid grid-cols-3 divide-x sm:p-4">
              <div
                className="flex flex-col items-center justify-center"
              >
                <span className="flex flex-row text-lg text-gray-200">{card.disciplina}</span>
                <span className="flex flex-row text-sm text-gray-400">Conteudo</span>
              </div>
              <div
                className="flex flex-col items-center justify-center col-span-2"
              >
                <span className="flex flex-row text-lg text-gray-200">{card.grau}</span>
                <span className="flex flex-row text-sm text-gray-400">Grau de aplicação</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex flex-row">
                <div className="mx-1">
                  <CgProfile className="cursor-pointer" style={{color: 'rgb(229, 231, 235)'}} size={30}/>
                </div>
                <div className="mx-1">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{card.usuario}</span>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mx-2 flex flex-col items-center">
                  <AiOutlineLike className="cursor-pointer" size={30}/>
                  {card.likes}
                </div>
                <div className="mx-2 flex flex-col items-center">
                  <MdOutlineRemoveRedEye className="cursor-pointer" size={30}/>
                  {card.visualizacoes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-5"
      >
        <span className="flex text-6xl py-5">Projetos gamificados</span>
        <span className="flex text-2xl">Projetos relacionados ao tema selecionados para você</span>
        <div
          className="grid grid-cols-3 mt-5"
        >
          {cards.map(card => buildCard(card))}
        </div>
      </div>
    </>
  );
};

export default HomePage;