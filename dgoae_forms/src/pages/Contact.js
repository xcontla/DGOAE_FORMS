import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
  
   <div>
    <NavBar/>
     <div className="container mx-auto px-4">
      <div className="py-8">
        <h2 className="text-center text-3xl text-blue-800">Contacto</h2>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="slide-right">
            <div className="p-6 bg-white shadow-xl">
              <h3 className="text-2xl text-blue-800 ">
                Coordinación de Orientación Educativa
              </h3>
              <h4 className="text-xl">Lic. Alejandro Garrido Hernández</h4>
              <h4 className="text-lg">Jefe del Departamento de Instrumentos</h4>
              <h4>dgoae.instrumentos@unam.mx</h4>
            </div>
          </div>
          <div className="slide-right">
            <div className="p-6 bg-white shadow-xl">
              <h3 className="text-2xl text-blue-800">
                Dirección de Apoyo Técnico
              </h3>
              <h4 className="text-xl">M. C. Pedro Xavier Contla Romero</h4>
              <h4 className="text-lg">Técnico Académico Titular 'A'</h4>
              <h4>innovaoe@unam.mx</h4>
            </div>
          </div>
        </div>
        <div className="slide-right">
          <div className="row">
            <div className="col">
              <h2 className="text-center text-3xl text-blue-800">
                Escuela Nacional Preparatoria y el Colegio de Ciencias y
                Humanidades
              </h2>
              <h4 className="text-lg  text-center">
                La ENP y el CCh cuentan con los siguientes correos para mantener
                el contacto con alumnas y alumnos que presenten alguna
                dificultad o requieran orientación durante la aplicación del
                PROUNAM II e INVOCA.
              </h4>
            </div>
          </div>
        </div>
        <div className="slide-right">
          <div className="flex">
            <div className="bg-white bg-opacity-50 p-6 shadow-xl w-1/2">
              <img
                className="mx-auto rounded w-1/2"
                src="https://innovaoe.dgoae.unam.mx/PortalOAE/resources/img/logo/logo_cch.png"
                alt="Logo CCH"
              />
            </div>
            <div className="bg-white bg-opacity-50 p-6 shadow-xl w-1/2">
              <img
                className="mx-auto rounded w-1/2"
                src="https://innovaoe.dgoae.unam.mx/PortalOAE/resources/img/logo/logo_prepa.png"
                alt="Logo Preparatoria"
              />
            </div>
          </div>
        </div>

        <div className="slide-right">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {responsables.map((resp) => (
              <div className="p-6 bg-white shadow-xl rounded" key={resp.title}>
                <h5 className="text-center text-lg">{resp.title}</h5>
                <h5 className="text-center text-xl">{resp.name}</h5>
                <h5 className="text-center">{resp.email}</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="slide-right">
          <div className="col col-md-12 slide-right">
            <h4 className="bg-blue-100 text-center text-blue-800 p-4 rounded">
              Escribe un correo con asunto "PROUNAM Ayuda" explicando la
              situación que se presentó dirigido a tu plantel. No olvides poner
              tu número de cuenta, nombre completo, fecha de nacimiento y grupo
              para ayudarte rápidamente.
            </h4>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
    <Footer/>
   </div>
  );
};

const responsables = [
  {
    title: "CCH Azcapotzalco",
    name: "Lic. Adriana Astrid Getsemaní Castillo Juárez",
    email: "planea.azcapotzalco@cch.unam.mx",
  },
  {
    title: "CCH Naucalpan",
    name: "Lic. Reyna Iztlalzitlali Valencia López",
    email: "planea.naucalpan@cch.unam.mx",
  },
  {
    title: "CCH Vallejo",
    name: "Lic. Elvira Xarani Correa Gatica",
    email: "planeacion.vallejo@cch.unam.mx",
  },
  {
    title: "CCH Oriente",
    name: "Ing. Rubén Guevara López",
    email: "planea.oriente@cch.unam.mx",
  },
  {
    title: "CCH Sur",
    name: "Mtra. Clara León Ríos",
    email: "planea.sur@cch.unam.mx",
  },
];
export default Contact;
