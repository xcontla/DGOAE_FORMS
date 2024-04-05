import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
  
   <div>
    <NavBar/>
     <div className="container mx-auto px-4">
      <div className="py-8">
        <h1 className="text-center text-3xl text-blue-800">Contacto </h1>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="slide-right">
            <div className="p-6 bg-white shadow-xl">
              <h3 className="text-2xl text-blue-800 ">
                Coordinación de Orientación Educativa
              </h3>
              <h4 className="text-xl">Dr. Wendy Abigaíl Bautista Montoya</h4>
              <h4 className="text-lg">Coordinadora del Centro de Orientación Educativa</h4>
              <h4>dgoae.coe@unam.mx</h4>
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
