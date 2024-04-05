import React from "react";
import { Link } from "react-router-dom";
import unamblanco from "../images/logoUNAM.png";
import dgoaeblanco from "../images/LogoDGOAEBlanco.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="col-span-2 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <img
                src={unamblanco}
                alt="UNAM"
                className="w-40"
              />
           </div>
          </div>
	  
          <div className="col-span-2">
           <h2 className="text-2xl font-bold mb-4">Recursos</h2>
            <ul className="text-sm">
             <li className="mb-2">
              <a href="http://www.dgoae.unam.mx/dgoae/AvisosdePrivacidad/ApoyoTecnico_integral.pdf"
                 target="_blank"
               className="text-gray-400 hover:text-white transition-colors">
                  Aviso de Privacidad

              </a>
             </li>
             <li className="mb-2">
               <Link to={"/contacto"} className="text-gray-400 hover:text-white transition-colors">
                
                    Contacto
                  
                </Link>
              </li>
              <li className="mb-2">

                <Link to={"/creditos"}className="text-gray-400 hover:text-white transition-colors">
                  
                   
                    Créditos
                  
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <img
                src={dgoaeblanco}
                alt="DGOAE"
                className="w-40"
              />
            </div>
          </div>

        </div>
        <hr className="border-gray-500 my-5" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs mb-3">
            Hecho en México, todos los derechos reservados  © {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
