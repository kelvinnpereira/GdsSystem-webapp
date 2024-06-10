import {useState, useRef, useEffect} from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!buttonRef?.current?.contains(event.target) && !dropdownRef?.current?.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [buttonRef, dropdownRef])
  const logOut = (event) => {
    dispatch({type: "LOGOUT",});
    navigate('/login')
  }
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={buttonRef}
            className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-400 dark:text-gray-900 shadow-sm"
            onClick={(event) => {setOpen(!open)}}
            title="profile"
          >
            <FaRegUserCircle className="fill-white" size={30} />
          </button>
        </div>
        <div
          ref={dropdownRef}
          className={`bg-white dark:bg-gray-700 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${open ? '' : 'hidden'}`}
        >
          <div
            className="py-1"
          >
            <a
              href="/profile"
              className="text-gray-700 dark:text-gray-200 block w-full px-4 py-2 text-left text-sm hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Perfil
            </a>
            <button
              className="text-gray-700 dark:text-gray-200 block w-full px-4 py-2 text-left text-sm hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={logOut}
            >
              Deslogar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileDropdown