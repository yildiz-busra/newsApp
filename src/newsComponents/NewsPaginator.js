import React, { useState } from "react";
import { Paginator } from "primereact/paginator";

function NewsPaginator({ totalRecords = 120, onPageChangeCallback }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    onPageChangeCallback(event.first, event.rows);
  };

  return (
    <div className="lg:mx-8 lg:my-5 mx-5 my-4">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="card bg-bluegrey-100 shadow-1 border-round-xl"
      />
    </div>
  );
}

export default NewsPaginator;


 
