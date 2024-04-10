import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");

  return (
    <div className="w-full max-w-xs mr-2 navbar-search">
      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Pesquisar projeto..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setText("");
            }
          }}
          onChange={event => setText(event.target.value)}
          className="pl-3 pr-0 appearance-none h-10 w-full rounded-full text-sm focus:outline-none bg-purple-950 text-white"
        />
        <button className="absolute top-0 mt-3 pr-3 right-0">
          <FiSearch className="stroke-current h-4 w-4"/>
        </button>
      </div>
    </div>
  );
};

export default Search;
