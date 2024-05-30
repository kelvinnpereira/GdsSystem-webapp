import {SiGamedeveloper} from "react-icons/si";
import {BsSun, BsSunFill} from "react-icons/bs";
import Search from "../search/search_projects";
import ProfileDropdown from "../profile/dropdown";

const Navbar = () => {
  return (
    <>
      <header>
        <nav
          className="bg-purple-900 border-gray-200 px-4 lg:px-6 py-2.5"
        >
          <div
            className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
          >
            <a
              href="/home"
              className="flex items-center"
            >
              <SiGamedeveloper size={25}/>
              <span
                className="self-center text-xl font-semibold whitespace-nowrap text-white ml-2"
              >
                Gds System
              </span>
            </a>
            <div
              className="flex items-center lg:order-2"
            >
              <div>
                <Search/>
              </div>
              <div>
                <ProfileDropdown/>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (localStorage.getItem('color-theme')) {
                    if (localStorage.getItem('color-theme') === 'light') {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    }
                } else {
                    if (document.documentElement.classList.contains('dark')) {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    } else {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    }
                }
                }}
              >
                <BsSunFill size={25}/>
              </div>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 ml-28 text-base lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="/home"
                    className="block text-gray-200 hover:text-white"
                  >
                    <span className="rounded-lg border-4 border-purple-900 bg-purple-900 hover:bg-purple-950 hover:border-purple-950">Para você</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/project_new"
                    className="block text-gray-200 hover:text-white"
                  >
                    <span className="rounded-lg border-4 border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700">Novo Projeto</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar;