import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://posgrado.unam.mx/trabajosocial/wp-content/uploads/2021/05/logo-unam-png-blanco-ok.png"
              alt="UNAM"
              className="w-20"
            />
            <div className="ml-10 flex items-center">
            
              
              <Link to={"/"}>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </a>
              </Link>
             
              <Link to={"/credits"}>
                <a
                  href="/credits"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Creditos
                </a>
              </Link>
              <Link to={"/contact"}>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contacto
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

/*
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://posgrado.unam.mx/trabajosocial/wp-content/uploads/2021/05/logo-unam-png-blanco-ok.png"
              alt="UNAM"
              className="w-20"
            />
            <div className="ml-10 flex items-center">
            
              
              <Link to={"/"}>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </a>
              </Link>
             
              <Link to={"/credits"}>
                <a
                  href="/credits"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Creditos
                </a>
              </Link>
              <Link to={"/contact"}>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contacto
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


*/
