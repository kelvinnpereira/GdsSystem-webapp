import useFetch from "hooks/fetch";
import ProjectCard from "components/project/card";

const HomePage = () => {
  const { data } = useFetch('/projeto')

  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-5"
      >
        <span className="flex text-6xl py-5 text-gray-800 dark:text-gray-200">Projetos gamificados</span>
        <span className="flex text-2xl text-gray-800 dark:text-gray-200">Projetos relacionados ao tema selecionados para você</span>
        <div
          className="grid grid-cols-3 mt-5"
        >
          {data?.data?.map(card => <ProjectCard card={card} />)}
        </div>
      </div>
    </>
  );
};

export default HomePage;