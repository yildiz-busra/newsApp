import React, { useState } from "react";
import { Link } from "react-router-dom";

function Menu({ categories, setCurrentCategory, filterArticlesByCategory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    filterArticlesByCategory(category.name);
    //setCurrentCategory(category.name);
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-xl m-4 p-2 border-200 border-round-md"
        >
          ☰
        </button>
      </div>
      <div className={`lg:block ${isMenuOpen ? "block" : "hidden"}`}>
        {categories.map((category) => (
          <div className="lg:w-full card m-2" key={category.name}>
            <Link
              //to="/"
              onClick={() => handleCategoryClick(category)}
              className="block text-xl font-semibold text-700 no-underline lg:my-2 ml-4"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
