import { useAuth0 } from "@auth0/auth0-react";
import {

  Button,

} from "@material-ui/core";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import LogoUNAM from "../images/logoUNAM.png";
import LogoDGOAE from "../images/LogoDGOAEBlanco.png";

import "./Login.css";

import PrivaceNotice from "../components/PrivaceNotice";
import Footer from "../components/Footer"
const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();
  const [idForm, setIdForm] = useState("");


  var navigate = useNavigate();
  const onChangeId = event => {

    setIdForm(event.target.value);
  }
  const searchForm = () => {
    console.log("Search Form" + idForm);
    navigate("/responseform/" + idForm);
  }

  return (
    <div>
      <div className="app">
        <div>
          <nav className="flex justify-between items-center bg-transparent p-4 ml-8 relative">
            <div>
              <img className="logo logo_sm mt-8" src={LogoUNAM} alt="Logo UNAM" />
              <img className="logo logo_sm mt-1" src={LogoDGOAE} alt="Logo DGOAE" />
            </div>
            <div className="flex justify-between items-center bg-transparent p-4 mr-10">
              <PrivaceNotice />
            </div>
          </nav>
        </div>
        <div className="text">
          <h2>DGOAE FORMULARIOS</h2>
          <h3>Bienvenid@s</h3>
          <p>
            Una manera sencilla de hacer y resolver cuestionarios en la Dirección General de Orientación y Atención Educativa
          </p>
        </div>
        <div className="columnas">
          <div className="text columna columna1">
            <Button color="primary" variant="contained" style={{ border: "2px solid blueviolet" }} onClick={() => loginWithRedirect()}>
              Iniciar Sesión
            </Button>
          </div>
          <div className="text columna columna2">
            <input onChange={onChangeId} value={idForm} placeholder="    Ingresa el Identificador de Formulario" />
            <Button color="secondary" variant="contained" onClick={() => searchForm()}>Buscar Formulario</Button>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LoginButton;

/*
import { useAuth0 } from "@auth0/auth0-react";
import {

  Button,

} from "@material-ui/core";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import LogoUNAM from "../images/logoUNAM.png";
import LogoDGOAE from "../images/LogoDGOAEBlanco.png";
import "./Login.css";
import PrivaceNotice from "../components/PrivaceNotice";
import Footer from "../components/Footer"
const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();
  const [idForm, setIdForm] = useState("");


  var navigate = useNavigate();
  const onChangeId = event => {

    setIdForm(event.target.value);
  }
  const searchForm = () => {
    navigate("/responseform/" + idForm);
  }

  return (
    <div>
      <div className="app">
        <div>
          <nav className="flex justify-between items-center bg-transparent p-4 ml-8 relative">
            <div>
              <img className="logo logo_sm mt-8" src={LogoUNAM} alt="Logo UNAM" />
              <img className="logo logo_sm mt-1" src={LogoDGOAE} alt="Logo DGOAE" />
            </div>
            <div className="flex justify-between items-center bg-transparent p-4 mr-10">
              <PrivaceNotice />
            </div>
          </nav>
        </div>
        <div className="text">
          <h2>DGOAE FORMULARIOS</h2>
          <h3>Bienvenid@s</h3>
          <p>
            Una manera sencilla de hacer y resolver cuestionarios en la Dirección General de Orientación y Atención Educativa
          </p>
        </div>
        <div className="columnas">
          <div className="text columna columna1">
            <Button color="primary" variant="contained" style={{ border: "2px solid blueviolet" }} onClick={() => loginWithRedirect()}>
              Iniciar Sesión
            </Button>
          </div>
          <div className="text columna columna2">
            <input onChange={onChangeId} value={idForm} placeholder="    Ingresa el Identificador de Formulario" />
            <Button color="secondary" variant="contained" onClick={() => searchForm()}>Buscar Formulario</Button>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LoginButton;
*/
