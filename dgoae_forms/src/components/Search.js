

import axios from "axios";
import React, { useEffect, useState } from "react";


import { Link, useNavigate, useParams } from "react-router-dom";
import LottieImage from "./LottieImage";
import { APP_URL, MAIN_URL,API_URL } from "../constants";

const Search = () => {
  const { id } = useParams();

  var [global_id, setGlobal] = useState(-1);
  
  var navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const serachForm = (global_id) => {
    
    async function searchGlobalID() {
      var request = await axios.get(
         MAIN_URL + API_URL + `/searchGlobalID?id=${id}`
      );
      setGlobal(request.data.gid);
      console.log(request.data);
    }
    navigate("/");
  };

  return (
    <section id="home" className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8">
      {/* Information */}
      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl xl:text-4xl font-bold xl:leading-[7.5rem]">
            Burcar Formulario con id global:
          </h1>
         
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={serachForm}
              className="w-full xl:w-auto bg-sky-800 text-white py-2 px-8 rounded-xl text-xl"
            >
              Regresar al Inicio
            </button>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={goToHome}
              className="w-full xl:w-auto bg-sky-800 text-white py-2 px-8 rounded-xl text-xl"
            >
              Regresar al Inicio
            </button>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="md:col-span-3 flex items-center justify-center relative">
        {/* Content image */}
        <div>
          <LottieImage />
        </div>
      </div>
      </div>
    </section>
  );
};

export default Search;



/*
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Link, useNavigate, useParams } from "react-router-dom";
import LottieImage from "./LottieImage";
import { APP_URL, MAIN_URL,API_URL } from "../constants";

const Search = () => {
  const { id } = useParams();

  var [global_id, setGlobal] = useState(-1);
  useEffect(() => {

  }, []);

  var navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const serachForm = (global_id) => {
    
    async function searchGlobalID() {
      var request = await axios.get(
         MAIN_URL + API_URL + `/searchGlobalID?id=${id}`
      );
      setGlobal(request.data.gid);
    }
    navigate("/");
  };

  return (
    <section id="home" className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8">

      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl xl:text-4xl font-bold xl:leading-[7.5rem]">
            Burcar Formulario con id global:
          </h1>
         
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={serachForm}
              className="w-full xl:w-auto bg-sky-800 text-white py-2 px-8 rounded-xl text-xl"
            >
              Regresar al Inicio
            </button>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={goToHome}
              className="w-full xl:w-auto bg-sky-800 text-white py-2 px-8 rounded-xl text-xl"
            >
              Regresar al Inicio
            </button>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 flex items-center justify-center relative">

        <div>
          <LottieImage />
        </div>
      </div>
      </div>
    </section>
  );
};

export default Search;
*/
