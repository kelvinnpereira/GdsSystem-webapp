import { useEffect, useState } from "react";
import useRequest from "../../hooks/request";
import { UnderlinedTabs } from "../../components/tabs/underlinetabs";
import ProjectCard from "../../components/project/card";

const ProfilePage = () => {
	const { request } = useRequest('/perfil')
	const [profile, setProfile] = useState({});

	const fetch = async () => {
		const response = await request()
		if (response?.data) {
			setProfile(response.data)
		}
	}

	useEffect(() => {
		fetch()
	}, []);
	return (
		<div className="flex items-center justify-center">
			<div
				className="w-[1920px] mx-4 mt-16 "
			>
				<div className="rounded-t-lg h-64 overflow-hidden">
					<img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
				</div>

				<div className="flex flex-row justify-center">
					<div className="mx-4">
						<div className="mx-[130px] w-32 h-32 relative -mt-16 border-4 border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
							<img className="object-cover object-center h-32" src='https://i.stack.imgur.com/l60Hf.png' alt='profile' />
						</div>
						<div className="w-96 mt-4 shadow-lg shadow-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
							<div className="text-center mt-2">
								<div className="text-gray-200 text-2xl text-gray-600 dark:text-gray-300">{`${profile?.first_name} ${profile?.last_name}`}</div>
								<div className="text-gray-400 text-xl text-gray-600 dark:text-gray-300">{profile?.username}</div>
							</div>
							<ul className="py-4 mt-2 text-gray-600 dark:text-gray-300 flex items-center justify-around">
								<li className="flex flex-col items-center justify-around">
									<div>{profile?.projetos?.length}</div>
									<div>Publicações</div>
								</li>
								<li className="flex flex-col items-center justify-around">
									<div>{profile?.seguindo?.length}</div>
									<div>Seguindo</div>
								</li>
								<li className="flex flex-col items-center justify-around">
									<div>{profile?.seguidores?.length}</div>
									<div>Seguidores</div>
								</li>
							</ul>
							<div className="p-4 mx-8 mt-2">
								<button className="w-1/2 block mx-auto rounded-full bg-gray-400 dark:bg-gray-600 hover:shadow-lg font-semibold text-gray-800 dark:text-gray-200 px-6 py-2">Editar perfil</button>
							</div>
						</div>
					</div>

					<div className="mx-4 mt-[78px]">
						<UnderlinedTabs tabs={[
							{
								index: 0,
								icon: null,
								title: 'Meus Projetos',
								content: <>
									<div
										className="grid grid-cols-3 mt-5"
									>
										{profile?.projetos?.map(card => <ProjectCard card={card} isOwner={true} fetch={fetch} />)}
									</div>
								</>,
							},
							{
								index: 1,
								icon: null,
								title: 'Projetos Salvos',
								content: <>
									<div
										className="grid grid-cols-3 mt-5"
									>
										{profile?.projetos_salvos?.map(card => <ProjectCard card={card} />)}
									</div>
								</>,
							},
						]} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage;