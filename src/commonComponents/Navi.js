import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "reactstrap";

function Navi() {
  return (
    <Nav className="NavbarItems w-full sticky top-0 surface-50 h-4rem shadow-2">
      <div className="lg:pl-6 text-600">
        <h1 className=" text-3xl lg:text-5xl">
          <Link to="/" className="pi pi-home text-600 text-3xl px-3 "></Link> HABERLER
        </h1>
      </div>
    </Nav>
  );
}
export default Navi;
