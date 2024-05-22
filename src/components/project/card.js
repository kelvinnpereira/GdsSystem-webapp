import { MdFavorite, MdOpenInNew, MdFavoriteBorder, MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { ImCross } from 'react-icons/im'
import useRequest from "hooks/request";

const ProjectCard = ({ card, isOwner = false, fetch = null }) => {
	const { request: deleteProject } = useRequest('/projeto_usuario', 'delete')
	return (
		<>
			<div
				className="mx-5 my-5 text-base bg-gray-200 dark:bg-gray-800 border border-2 border-gray-400 dark:border-gray-500 rounded-lg shadow"
				style={{ width: '470px', height: '450px' }}
			>
				<div className="flex justify-end pr-2 pt-2">
					<ImCross
						className={`cursor-pointer ${isOwner ? "" : "invisible"}`}
						size={15}
						onClick={async (event) => {
							if (window.confirm(`Você tem certeza que deseja excluir o projeto ${card.titulo}?`) === 'true') {
								const response = await deleteProject({}, {}, card.id)
								if (response?.data) {
									alert(response?.data)
									if (fetch) fetch();
								}
							}
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
								<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{card.titulo}</h5>
								<MdOpenInNew className="cursor-pointer ml-2 mt-1 fill-black dark:fill-white" size={20} />
							</a>

						</div>
						<div>
							<MdFavoriteBorder className="cursor-pointer fill-black dark:fill-white" size={30} />
						</div>
					</div>
					<div className="w-full bg-gray-300 dark:bg-gray-700 border border-gray-500 rounded-lg grid grid-cols-3 divide-x sm:p-4">
						<div
							className="flex flex-col items-center justify-center"
						>
							<span className="flex flex-row text-base text-gray-700 dark:text-gray-200">{card.disciplina}</span>
							<span className="flex flex-row text-sm text-gray-500 dark:text-gray-400">Conteudo</span>
						</div>
						<div
							className="flex flex-col items-center justify-center col-span-2"
						>
							<span className="flex flex-row text-base text-gray-700 dark:text-gray-200">{card.grau}</span>
							<span className="flex flex-row text-sm text-gray-500 dark:text-gray-400">Grau de aplicação</span>
						</div>
					</div>
					<div className="flex items-center justify-between mt-5">
						<div className="flex flex-row">
							<div className="mx-1">
								<FaRegUserCircle className="cursor-pointer fill-black dark:fill-white" size={30} />
							</div>
							<div className="mx-1">
								<span className="text-xl font-bold text-gray-900 dark:text-white">{card.usuario}</span>
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