import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";

function NewsDetail({article}) {
  return (
    <div className="lg:ml-5">
      <div className="lg:ml-3 my-3 w-full">
      <div className="card text-xs text-500 font-bold">
          <div><Chip label={article.date} className="w-10rem h-1 text-xs my-2 mx-1" /></div>
          <div><Chip label={article.category} className="w-10rem h-1 text-xs my-2 mx-1" /></div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
