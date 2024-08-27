import React from "react";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import { Link } from "react-router-dom";

function Cards({ articles, setCurrentArticle }) {
  const handleArticleClick = (article) => {
    setCurrentArticle(article);
  };

  if (!articles || articles.length === 0) {
    return <div>No articles available.</div>;
  }

  return (
    <div className="flex lg:flex-col flex-row flex-wrap justify-content-center m-auto">
      {articles.map((article, index) => (
        <div className="card" key={index}>
          <Card
            title={
              <Link
                to="/detail"
                onClick={() => handleArticleClick(article)}
                className="text-sm no-underline line-height-1"
              >
                {article.title}
              </Link>
            }
            header={
              <Chip label={article.category} className="w-8rem h-1 text-xs mx-4 mt-3" />
            }
            className="w-20rem h-25rem m-2 p-2 border-solid border-round-xl border-200 hover:border-500 text-xs surface-100 shadow-2"
          >
            <p className="text-sm">{article.description}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Cards;
