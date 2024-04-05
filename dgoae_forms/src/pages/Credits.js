import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Credits = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto m-10">
        <div className="flex justify-end">
          <div className="w-full">
            <div className="container mx-auto">
              <div className="flex justify-between">
                <div className="w-1/2"></div>
                <div className="w-1/2 flex justify-end"></div>
              </div>
              <div className="flex">
                <div className="w-full">
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                    
                  <h3 className="text-center text-blue-700">
                    Universidad Nacional Autónoma de México
                  </h3>
	          <h5 className="text-center text-blue-900">Rector</h5>
                  <h4 className="text-center">Dr. Enrique Graue Wiechers</h4>
                
                  <hr className="my-4" />
                  <h5 className="text-center text-blue-900">
                    Secretaria de Atención a la Comunidad
                  </h5>
                  <h4 className="text-center">Dr. Leonardo Lomelí Vanegas</h4>
                  <hr className="my-4" />
                  <h5 className="text-center text-blue-900">
                    Dirección de Orientación y Atención Educativa
                  </h5>
                  <h4 className="text-center">
                  Director General
                  </h4>
                  <h4 className="text-center">
                    Dr. Germán Alvarez Díaz de León
                  </h4>
                  <hr className="my-4" />
                  <h5 className="text-center text-blue-900">
                    Centro de Orientación Educativa
                  </h5>
                  
                  <h4 className="text-center">
                    Coordinadora
                  </h4>
                  <h4 className="text-center">
                    Dra. Wendy Abigail Bautista Montoya
                  </h4>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex">
                <div className="w-full">
                  <h5 className="text-center text-blue-900">
                    Dirección de Apoyo Técnico
                  </h5>
                  <h4 className="text-center">
                    Director
                  </h4>
                  
                  <h4 className="text-center">
                    Lic. José Antonio Sánchez Yllanez (Director)
                  </h4>                  
                </div>
                </div>
                
                <hr className="my-4" />
                <div className="w-full">
                  <h5 className="text-center text-blue-900">
                    Departamento de Diseño y Publicaciones
                  </h5>
                  <h4 className="text-center">Lic. Jaime Monroy Galindo</h4>
                  <h4 className="text-center">Mtra. Verónica Balderas Rivas</h4>
                </div>
                <hr className="my-4" />
                  
                  <h5 className="text-center text-blue-900">
                    Desarrollador Jefe 
                  </h5>
                  <h4 className="text-center">
                    M. en C. Pedro Xavier Contla Romero
                  </h4>
                  <h4 className="text-center">
                    Desarollador Servicio Social
                  </h4>
                  <h4 className="text-center">
                    Ángel Avelay
                  </h4>
              
              <hr className="my-4" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Credits;
