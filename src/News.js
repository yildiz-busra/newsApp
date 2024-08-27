import React, { useState, useEffect } from "react";
import Cards from "./newsComponents/Cards";
import Navi from "./commonComponents/Navi";
import SearchBar from "./commonComponents/SearchBar";
import "/node_modules/primeflex/primeflex.css";
import Menu from "./commonComponents/Menu";
import NewsPaginator from "./newsComponents/NewsPaginator";
import Footer from "./commonComponents/Footer";
import { ScrollTop } from "primereact/scrolltop";

function News({
  categories,
  setCurrentCategory,
  articles,
  currentCategory,
  setCurrentArticle,
}) {
  const [currentPageData, setCurrentPageData] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    // Filter articles based on the current category
    const filtered = currentCategory
      ? articles.filter((article) =>
          article.category.toLowerCase().includes(currentCategory.toLowerCase())
        )
      : articles;

    setFilteredArticles(filtered);
    onPageChange(0, 20);
  }, [currentCategory, articles]);

  const onPageChange = (first, rows) => {
    const paginatedArticles = filteredArticles.slice(first, first + rows);
    setCurrentPageData(paginatedArticles);
  };

  const handleSearch = (searchTerm) => {
    // Filter articles based on search term
    const searchFiltered = filteredArticles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredArticles(searchFiltered);
    onPageChange(0, 20); // Reset to the first page and update the displayed articles
  }; 

  return (
    <div className="bg-bluegray-100">
      <Navi />
      <div className="grid nested-grid">
        <div className="w-full">
          <SearchBar setCurrentCategory={setCurrentCategory} onSearch={handleSearch}/>
        </div>
        <div className="lg:col-2 lg:pt-7">
          <Menu
            categories={categories}
            setCurrentCategory={setCurrentCategory}
          />
        </div>

        <div className="lg:col-9">
          <Cards
            articles={currentPageData}
            setCurrentArticle={setCurrentArticle}
          />
          <NewsPaginator
            totalRecords={filteredArticles.length}
            onPageChangeCallback={onPageChange}
          />
        </div>
      </div>
      <Footer />
      <ScrollTop
        className="lg:w-3rem w-2rem lg:h-3rem h-2rem border-round-md bg-bluegrey-400"
        threshold={100}
      />
    </div>
  );
}

export default News;
