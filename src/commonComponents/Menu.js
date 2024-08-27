import React, { useState } from "react";
import { Link } from "react-router-dom";

function Menu({ categories, setCurrentCategory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false); // Close menu after selection on small screens
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
          ☰ {/* Simple Hamburger Icon */}
        </button>
      </div>
      <div
        className={`lg:block ${isMenuOpen ? "block" : "hidden"}`}
      >
        {categories.map((category) => (
          <div className="lg:w-full card m-2" key={category.name}>
            <Link
              onClick={() => handleCategoryClick(category)}
              className="card text-xl font-semibold text-700 no-underline block lg:my-2 ml-4"
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
