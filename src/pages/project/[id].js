import { useEffect, useState } from "react";
import useRequest from "hooks/request";
import useFetch from "hooks/fetch";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Project = () => {
  const { id } = useParams();
  const { data, reValidate } = useFetch(`/projeto/${id}`)
  const [projeto, setProjeto] = useState({});
  const { request: perfilPut } = useRequest(`/perfil/${id}`, 'put')
  const { handleSubmit, register, clearErrors, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    data.type = 'comentar_projeto'
    const response = await perfilPut(data)
    if (response?.data) {
      Swal.fire({
        icon: "success",
        text: 'Comentario publicado com sucesso',
        timer: 3000,
        backdrop: false,
        position: "top-end",
        width: 500,
        showConfirmButton: false,
      })
      setValue('comentario', '')
      reValidate()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Algum erro aconteceu`,
      })
      console.log(response)
    }
  }

  const onError = (data) => {
    Swal.fire({
      icon: "error",
      text: 'O texto não pode ser vazio',
      timer: 3000,
      backdrop: false,
      position: "top-end",
      width: 500,
      showConfirmButton: false,
    })
  }

  useEffect(() => {
    if (data?.data) {
      setProjeto(data.data)
    }
  }, [data])

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="w-[1920px] mx-4 mt-16 text-gray-900"
        >
          <div className="rounded-t-lg h-96 overflow-hidden">
            <img className="object-cover object-top w-full" src={`${process.env.REACT_APP_SERVER_HOST}/media/${projeto?.imagem}`} alt='Mountain' />
          </div>
          <div className="mt-4 border rounded-lg shadow-lg shadow-gray-300 dark:shadow-gray-900 border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between my-5"
            >
              <div className="flex items-center justify-center">
                <h5 className="pl-8 text-2xl font-semibold text-black dark:text-white">{projeto?.titulo}</h5>
              </div>
              <div className="mr-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 border border-gray-500 rounded-lg grid grid-cols-3 divide-x p-4">
                  <div
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="flex flex-row text-base text-gray-700 dark:text-gray-100">{projeto?.campos?.conteudo}</span>
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
          <div className="mt-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto h-[500px]" tabIndex={0}>
            <div className="text-black dark:text-white text-lg mx-8 my-8">
              <div className="text-xl mb-8" style={{whiteSpace: "pre-wrap"}}>
                {projeto?.descricao}
              </div>
            </div>
          </div>
          <form 
            className="mt-4 flex flex-row items-center justify-center"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FaRegUserCircle className="fill-black dark:fill-white" size={50} />
            <input
              id="comentario"
              name="comentario"
              type="text"
              className="w-1/2 ml-4 bg-white dark:bg-gray-800 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight"
              placeholder="Adicione um comentário..."
              ref={register({required: true})}
            />
            <button
              className="w-32 mx-3 btn btn-default bg-blue-600 hover:bg-blue-700 text-white btn-rounded btn-icon shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded ml-4"
            >
                Publicar
            </button>
          </form>
          <div className="w-full flex flex-col pl-[353px] pt-4">
            {projeto?.comentarios?.map((element) => {
              return <>
                <div class="flex items-start justify-start space-x-4 p-4">
                  <div class="flex-shrink-0 w-8 mr-4">
                    <FaRegUserCircle className="fill-black dark:fill-white" size={50} />
                  </div>
                  <div class="flex flex-col w-1/2">
                    <div class="flex flex-col w-full">
                      <div class="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {element.usuario}
                      </div>
                      <div class="text-sm text-gray-800 dark:text-gray-200">
                        {element.comentario}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Project;