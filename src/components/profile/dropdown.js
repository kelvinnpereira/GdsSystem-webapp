import {useState, useRef, useEffect} from "react";
import {CgProfile} from 'react-icons/cg'

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!buttonRef?.current?.contains(event.target) && !dropdownRef?.current?.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [buttonRef, dropdownRef])
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={buttonRef}
            className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
            onClick={(event) => {setOpen(!open)}}
          >
            <CgProfile style={{color: 'rgb(229, 231, 235)'}} size={30}/>
          </button>
        </div>
        <div
          ref={dropdownRef}
          className={`bg-gray-700 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${open ? '' : 'hidden'}`}
        >
          <div
            className="py-1"
          >
            <button
              className="text-gray-200 block w-full px-4 py-2 text-left text-sm hover:text-white hover:bg-gray-600"
            >
              Perfil
            </button>
            <button
              className="text-gray-200 block w-full px-4 py-2 text-left text-sm hover:text-white hover:bg-gray-600"
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