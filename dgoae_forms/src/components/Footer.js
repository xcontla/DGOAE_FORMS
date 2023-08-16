import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-2 ">
            <h2 className="text-2xl font-bold mb-4 ml-8 ">DGOAE</h2>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <img
                src="https://posgrado.unam.mx/trabajosocial/wp-content/uploads/2021/05/logo-unam-png-blanco-ok.png"
                alt="UNAM"
                className="w-40"
              />
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <p className="text-sm ">Teléfono: 5622-0424, Fax 5616-2079</p>
            <p className="text-sm mb-5">Email: dgoae.correspondencia@unam.mx</p>
            <h2 className="text-2xl font-bold mb-4">Redes Sociales</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm hover:text-gray-400 transition-colors"
              >
                Instagram
              </a>
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
                <Link to={"/contact"}>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link to={"/credits"}>
                  <a
                    href="/credits"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Creditos
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-500 my-5" />
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs mb-3">
            Hecho en México, todos los derechos reservados 2018-2023. Esta
            página puede ser reproducida sin fines de lucro, siempre y cuando no
            se mutile, se cite la fuente completa y su dirección electrónica.
          </p>
          <p className="text-xs text-center md:text-right">
            © {new Date().getFullYear()} Trabajo realizado con el apoyo del
            Programa UNAM-DGAPA-PAPIME-PE406318.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
