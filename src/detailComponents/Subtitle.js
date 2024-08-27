import React from "react";
import { Link } from "react-router-dom";

function Subtitle({article}) {
  return (
    <div className="card lg:px-6 px-4">
      <div className="text-base font-semibold text-700 mt-2">
        {article.description}
      </div>
    </div>
  );
}

export default Subtitle;
