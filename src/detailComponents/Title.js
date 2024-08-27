import React from "react";

function Title({article}) {
  
  return (
    <div className="card text-center text-700  lg:p-7 lg:mx-8 px-3 lg:text-3xl text-xl">
      {article.title}
    </div>
  );
}

export default Title;
