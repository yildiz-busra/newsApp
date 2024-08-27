import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "primereact/divider";

const linkItems = [
  { to: "", icon: "pi pi-globe", label: "World" },
  { to: "", icon: "pi pi-wallet", label: "Business" },
  { to: "", icon: "pi pi-microchip", label: "Technology" },
  { to: "", icon: "pi pi-bolt", label: "Science" },
  { to: "", icon: "pi pi-trophy", label: "Sports" },
  { to: "", icon: "pi pi-palette", label: "Art" },
  { to: "", icon: "pi pi-headphones", label: "Entertainment" },
  { to: "", icon: "pi pi-envelope", label: "Contact" },
  { to: "", icon: "pi pi-inbox", label: "Newsletter" },
  { to: "", icon: "pi pi-sign-in", label: "Log-in" },
  { to: "", icon: "pi pi-link", label: "Subscribe" },
];

function Links() {
  return (
    <div className="card m-4 mt-5 p-4 lg:mt-8 lg:pl-4 lg:w-15rem lg:ml-6 line-height-4 border-round-lg">
      <div className="card">
        {linkItems.slice(0, 7).map(item => (
          <div className="card my-2 lg:my-3" key={item.label}>
            <Link
              to={item.to}
              className={`${item.icon} text-600 font-bold lg:text-xl text-lg no-underline`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <Divider />
      <div className="card">
        {linkItems.slice(7).map(item => (
          <div className="card my-2 lg:my-3" key={item.label}>
            <Link
              to={item.to}
              className={`${item.icon} text-600 font-bold text-lg no-underline`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Links;
