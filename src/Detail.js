import React from "react";
import Navi from "./commonComponents/Navi";
import SearchBar from "./commonComponents/SearchBar";
import Footer from "./commonComponents/Footer";
import Article from "./detailComponents/Article";
import { ScrollTop } from "primereact/scrolltop";


function Detail({ article, setCurrentCategory}) {
  return (
    <div className="bg-bluegray-100">
      <Navi />
      <div className="w-full ">
        <SearchBar setCurrentCategory={setCurrentCategory}/>
      </div>
      <div className="flex justify-content-center">
      <div className="flex align-items-center lg:col-8 lg:pr-5">
        <Article article={article} className=''/>
      </div>
      </div>
      <Footer />
      <ScrollTop
        className="lg:w-3rem w-2rem lg:h-3rem h-2rem border-round-md bg-bluegrey-300"
        icon="pi pi-arrow-up text-base"
      />
    </div>
  );
}

export default Detail;
