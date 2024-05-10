import { useEffect, useState } from "react";
import useRequest from "../../hooks/request";
import ProjectCard from "../../components/project/card";

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
          {cards.map(card => <ProjectCard card={card} />)}
        </div>
      </div>
    </>
  );
};

export default HomePage;