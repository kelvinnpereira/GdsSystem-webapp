import { MdFavorite, MdOpenInNew, MdFavoriteBorder, MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { ImCross } from 'react-icons/im'
import useRequest from "hooks/request";
import { useSWRConfig } from 'swr'
import Swal from "sweetalert2";

const ProjectCard = ({ card, isOwner = false }) => {
	const { request: deleteProject } = useRequest('/projeto_usuario', 'delete')
  const { mutate } = useSWRConfig()
	return (
		<>
			<div
				className="mx-5 my-5 text-base bg-gray-300 dark:bg-gray-900 border border-gray-300 dark:border-gray-900 rounded-lg shadow"
				style={{ width: '470px', height: '450px' }}
        key={card.id}
			>
				<div className="flex justify-end pr-2 pt-2">
					<ImCross
						className={`cursor-pointer ${isOwner ? "" : "invisible"}`}
						size={15}
						onClick={async (event) => {
              Swal.fire({
                title: "Excluir Projeto",
                text: `Você tem certeza que deseja excluir o projeto "${card.titulo}"?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: "Cancelar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const response = await deleteProject({}, {}, card.id)
                  if (response?.data) {
                    Swal.fire({
                      title: "Excluido!",
                      icon: "success",
                      text: "Projeto excluido com sucesso",
                      timer: 3000,
                      backdrop: false,
                      position: "top-end",
                      width: 500,
                      showConfirmButton: false,
                    })
                    mutate('/perfil');
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: `Algum erro aconteceu`,
                    })
                  }
                }
              });
						}}
					/>
				</div>
				<div>
					<img className="p-8 rounded-t-lg object-contain h-48 w-96" src={`${process.env.REACT_APP_SERVER_HOST}/media/${card.imagem}`} alt="product image" />
				</div>
				<div className="px-5 pb-5">
					<div
						className="flex justify-between my-5"
					>
						<div>
							<a className="flex flex-row items-center" href={`/project/${card.id}`}>
								<h5 className="text-xl font-bold tracking-tight text-black dark:text-white">{card.titulo}</h5>
								<MdOpenInNew className="cursor-pointer ml-2 mt-1 fill-black dark:fill-white" size={20} />
							</a>

						</div>
						<div>
							<MdFavoriteBorder className="cursor-pointer fill-black dark:fill-white" size={30} />
						</div>
					</div>
					<div className="w-full bg-gray-200 dark:bg-gray-700 border border-gray-500 rounded-lg grid grid-cols-3 divide-x sm:p-4">
						<div
							className="flex flex-col items-center justify-center"
						>
							<span className="flex flex-row text-base text-black dark:text-white">{card?.campos?.conteudo}</span>
							<span className="flex flex-row text-sm text-gray-600 dark:text-gray-300">Conteudo</span>
						</div>
						<div
							className="flex flex-col items-center justify-center col-span-2"
						>
							<span className="flex flex-row text-base text-black dark:text-white">{card?.campos?.idade}</span>
							<span className="flex flex-row text-sm text-gray-600 dark:text-gray-300">Grau de aplicação</span>
						</div>
					</div>
					<div className="flex items-center justify-between mt-5">
						<div className="flex flex-row">
							<div className="mx-1">
								<FaRegUserCircle className="cursor-pointer fill-black dark:fill-white" size={30} />
							</div>
							<div className="mx-1">
								<span className="text-xl text-black dark:text-white">{card.usuario}</span>
							</div>
						</div>
						<div className="flex flex-row">
							<div className="mx-2 flex flex-col items-center">
								<AiOutlineLike className="cursor-pointer fill-black dark:fill-white" size={30} />
                <div className="text-gray-800 dark:text-gray-200">{card.likes}</div>
							</div>
							<div className="mx-2 flex flex-col items-center">
								<MdOutlineRemoveRedEye className="cursor-pointer fill-black dark:fill-white" size={30} />
                <div className="text-gray-800 dark:text-gray-200">{card.visualizacoes}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectCard;