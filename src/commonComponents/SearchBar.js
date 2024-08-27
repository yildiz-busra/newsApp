import React, { useState } from "react";
import "/node_modules/primeflex/primeflex.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";

function SearchBar({setCurrentCategory, filterArticlesByCategory}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterArticlesByCategory(searchTerm);
  };

  return (
    <div className="flex justify-content-center m-5 lg:mb-5 ">
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search"> </InputIcon>
        <InputText
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          className="border-round-xl hover:border-500 focus:border-500 shadow-2  md:w-25rem bg-white"
        />
      </IconField>
    </div>
  );
}

export default SearchBar;
