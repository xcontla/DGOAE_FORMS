import { useAuth0 } from "@auth0/auth0-react";
import {

  Button,

} from "@material-ui/core";
import React from "react";

import LogoUNAM from "../images/logoUNAM.png";
import LogoDGOAE from "../images/LogoDGOAEBlanco.png";

import "./Login.css";

import PrivaceNotice from "../components/PrivaceNotice";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="app">
    <nav className="flex justify-between items-center bg-transparent p-4 ml-8 relative">
      <div>
        <img className="logo logo_sm mt-8" src={LogoUNAM} alt="Logo UNAM" />
        <img className="logo logo_sm mt-1" src={LogoDGOAE} alt="Logo DGOAE" />
      </div>
      <div className="flex justify-between items-center bg-transparent p-4 mr-10">
        <PrivaceNotice />
      </div>
    </nav>
 
    <div className="text">
      <h2>DGOAE FORMULARIOS</h2>
      <h3>Bienvenid@s</h3>
      <p>
        Una manera sencilla de hacer y resolver cuestionarios en la Dirección General de Orientación y Atención Educativa
      </p>
      <Button
        color="primary"
        variant="contained"
        style={{ border: "2px solid blueviolet" }}
        onClick={() => loginWithRedirect()}
      >
        Iniciar Sesión
      </Button>
    </div>
   
  </div>
  );
};

export default LoginButton;

{

}
