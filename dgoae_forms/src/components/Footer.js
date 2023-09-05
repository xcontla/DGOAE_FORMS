import React from "react";
import { Link } from "react-router-dom";
import unamblanco from "../images/logoUNAM.png";
import dgoaeblanco from "../images/LogoDGOAEBlanco.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="col-span-3 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <img
                src={unamblanco}
                alt="UNAM"
                className="w-40"
              />
            </div>
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
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Redes Sociales</h2>
            <div className="flex space-x-4">
              <ul className="text-sm">
                <li className="mb-2">
                  <a
                    href="https://www.youtube.com/@dgoae-unam"
                    className="text-sm hover:text-gray-400 transition-colors">
                    YouTube
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    href="https://www.facebook.com/dgoae.unam/"
                    className="text-sm hover:text-gray-400 transition-colors">
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.instagram.com/dgoaeunam/"
                    className="text-sm hover:text-gray-400 transition-colors" >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Recursos</h2>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="http://www.dgoae.unam.mx/dgoae/AvisosdePrivacidad/ApoyoTecnico_integral.pdf"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  Aviso de Privacidad
                </a>
              </li>
              <li className="mb-2">
                <Link to={"./contact"}>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"./credits"}>
                  <a
                    href="/credits"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Créditos
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-500 my-5" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs mb-3">
            Hecho en México, todos los derechos reservados 2023. Esta
            página puede ser reproducida sin fines de lucro, siempre y cuando no
            se mutile, se cite la fuente completa y su dirección electrónica. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
