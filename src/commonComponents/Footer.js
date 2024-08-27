import React from "react";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";

const linkItems = [
  { to: "", icon: "pi pi-info-circle", label: "About Us" },
  { to: "", icon: "pi pi-envelope", label: "Contact" },
  { to: "", icon: "pi pi-briefcase", label: "Career" },
  { to: "", icon: "pi pi-inbox", label: "Newsletter" },
  { to: "", icon: "pi pi-link", label: "Subscriptions" },
];

const socialIcons = ["pi pi-linkedin", "pi pi-twitter", "pi pi-instagram", "pi pi-youtube"];

const footerLinks = ["Information", "Terms of service", "Privacy Policy", "Help"];

function Footer() {
  const header = <h3 className="text-600 pl-2 lg:pl-4 ">Company Name</h3>;

  return (
    <Panel header={header} className="shadow-2">
      <div className="flex flex-wrap justify-content-start lg:justify-content-center border-round-lg shadow-2">
        <div className="lg:col-2 m-3 lg:m-2 pt-3">
          {linkItems.map(item => (
            <div className="my-3" key={item.label}>
              <Link to={item.to} className={`${item.icon} lg:text-xl text-lg text-600 no-underline`}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="lg:col-1 m-3 lg:m-2 pt-4">
          {socialIcons.map(icon => (
            <div key={icon}>
              <Link to="" className={`${icon} my-2 text-600 text-3xl no-underline`}></Link>
            </div>
          ))}
        </div>
        <div className="lg:col-6 p-3 pt-4 lg:px-7 text-sm lg:text-lg text-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      <div className="flex justify-content-center text-600 ">
        <p>©2024 Company Name. All rights reserved. </p>
      </div>
      <div className="flex flex-wrap justify-content-center text-sm">
        {footerLinks.map(link => (
          <Link to="" className="text-600 mr-1" key={link}>
            {link}
          </Link>
        ))}
      </div>
    </Panel>
  );
}

export default Footer;
