import { Button } from "@material-ui/core";
import axios from "axios";
import Lottie from "lottie-web";
import React, { useEffect, useState } from "react";

import {
  RiCheckboxBlankCircleFill,
  RiPlayFill,
  RiStarFill,
} from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import LottieImage from "./LottieImage";

const Submitted = () => {
      const { global_id } = useParams();
    var navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const goBack = () => {
        navigate("/response/" + global_id);
    }

  return (
    <section id="home" className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8">
      {/* Information */}
      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl xl:text-4xl font-bold xl:leading-[7.5rem]">
            Formulario enviado con exito
          </h1>

          {/* <p className="text-gray-500 text-2xl leading-[2.5rem]">
            Copia el siguiente link para el uso del cuestionario:
            <br />
          </p> */}
          
          
          <div className="flex flex-col md:flex-row items-center gap-4">
           
             <button
              onClick={goBack}
              className="w-full xl:w-auto bg-sky-800 text-white py-2 px-8 rounded-xl text-xl"
            >
              Contestar de nuevo
            </button>
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
    </section>
  );
};

export default Submitted;