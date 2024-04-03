
import React, { useEffect, useState } from "react";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import "./Template.css";

import blank from "../images/forms-blank.png";
import contact from "../images/contact.png";

import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL} from "../constants";

function Template() {
  const navigate = useNavigate();
  const { user, getIdTokenClaims } = useAuth0();

  const [token, setToken] = useState("");
  useEffect(() => {
    async function getToken() {
      const t = await getIdTokenClaims()
      setToken(t.__raw);
      localStorage.setItem('token', t.__raw);
    };
    getToken();
  }, [token]);


  const createForm = async () => {
    const id_ = uuid();
    console.log(id_, user.name);
    var question_list = [
      {
        questionText: "Escribe una pregunta",
        questionType: "radio",
        options: [{ optionText: "Opción 1" }],
        open: true,
        required: false,
        isEncrypt: false
      },
    ];
    try {
      const response = await axios({

        url:  API_URL +`/add_question?username=${user.name}&doc_id=${id_}`,  
        method: "post",
        headers: {
          "Content-Type": "application/json",        
          dgoaetoken: token,
        },
        data: {
          id:id_,
          document_name: "Documento Sin título",
          document_description: "Agrega una Descripción",
          questions: question_list,

        },
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/form/" + id_);
  };

  const createFormRegist = async () => {
    const id_ = uuid();
    console.log(id_, user.name);
    var question_list = [
      {
        questionText: "Nombre Completo",
        questionType: "text",
        options: [{ optionText: "nombre_completo" }],
        open: true,
        required: true,
        isEncrypt: true
      },
      {
        questionText: "Correo electrónico",
        questionType: "text",
        options: [{ optionText: "correo" }],
        open: false,
        required: true,
        isEncrypt: true
      },
      {
        questionText: "Número de Cuenta",
        questionType: "text",
        options: [{ optionText: "ncuenta" }],
        open: false,
        required: true,
        isEncrypt: true
      },
    ];
    try {
      const response = await axios({
        url:  API_URL +`/add_question_encrypted?username=${user.name}&doc_id=${id_}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",       
          dgoaetoken: token,
        },
        data: {
          document_name: "Registro Simple",
          document_description:
            "La Dirección General de Orientación y Atención Educativa (en adelante DGOAE) de la Universidad Nacional Autónoma de México, por conducto de la Dirección de Orientación Educativa, Dirección de Apoyo Técnico y el Centro de Orientación Educativa y el Departamento de Orientación Especializada, recaba datos personales para el registro y administración de solitudes de servicios y programas administrados por la DGOAE. Se realizarán transferencias de datos personales de conformidad con las finalidades establecidas por cada programa de orientación educativa por esta área universitaria. Podrá ejercer sus derechos ARCO en la Unidad de Transparencia de la UNAM, o a través de la Plataforma Nacional de Transparencia (http://www.plataformadetransparencia.org.mx/). El aviso de privacidad integral se puede consultar en la sección Aviso de Privacidad de nuestro sitio web http://www.dgoae.unam.mx/",
          questions: question_list,
        },
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/form/" + id_);
  };

  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontsize: "16px", color: "#202124" }}>
            Empezar con un nuevo formulario
          </span>
        </div>
        <div className="template_right">
          <div className="gallery_button">
            Galeria de Formatos
            <UnfoldMoreIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createForm}>
          <img src={blank} alt="no image" className="card_image" />
          <p className="card_title">En Blanco</p>
        </div>
        <div className="card" onClick={createFormRegist}>
          <img src={contact} alt="no image" className="card_image" />
          <p className="card_title">Registro Simple</p>
        </div>
      </div>
    </div>
  );
}

export default Template;


/*

import React from "react";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import "./Template.css";

import blank from "../images/forms-blank.png";
import contact from "../images/contact.png";

import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL} from "../constants";

function Template() {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const createForm = async () => {
    const id_ = uuid();
    var question_list = [
      {
        questionText: "Escribe una pregunta",
        questionType: "radio",
        options: [{ optionText: "Opción 1" }],
        open: true,
        required: false,
        isEncrypt: false
      },
    ];
    try {
      const response = await axios({
        url:  API_URL +`/add_question?username=${user.name}&doc_id=${id_}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id:id_,
          document_name: "Documento Sin título",
          document_description: "Agrega una Descripción",
          questions: question_list,

        },
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/form/" + id_);
  };

  const createFormRegist = async () => {
    const id_ = uuid();
    var question_list = [
      {
        questionText: "Nombre Completo",
        questionType: "text",
        options: [{ optionText: "nombre_completo" }],
        open: true,
        required: true,
        isEncrypt: true
      },
      {
        questionText: "Correo electrónico",
        questionType: "text",
        options: [{ optionText: "correo" }],
        open: false,
        required: true,
        isEncrypt: true
      },
      {
        questionText: "Número de Cuenta",
        questionType: "text",
        options: [{ optionText: "ncuenta" }],
        open: false,
        required: true,
        isEncrypt: true
      },
    ];
    try {
      const response = await axios({
        url:  API_URL +`/add_question_encrypted?username=${user.name}&doc_id=${id_}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          document_name: "Registro Simple",
          document_description:
            "La Dirección General de Orientación y Atención Educativa (en adelante DGOAE) de la Universidad Nacional Autónoma de México, por conducto de la Dirección de Orientación Educativa, Dirección de Apoyo Técnico y el Centro de Orientación Educativa y el Departamento de Orientación Especializada, recaba datos personales para el registro y administración de solitudes de servicios y programas administrados por la DGOAE. Se realizarán transferencias de datos personales de conformidad con las finalidades establecidas por cada programa de orientación educativa por esta área universitaria. Podrá ejercer sus derechos ARCO en la Unidad de Transparencia de la UNAM, o a través de la Plataforma Nacional de Transparencia (http://www.plataformadetransparencia.org.mx/). El aviso de privacidad integral se puede consultar en la sección Aviso de Privacidad de nuestro sitio web http://www.dgoae.unam.mx/",
          questions: question_list,
        },
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/form/" + id_);
  };

  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontsize: "16px", color: "#202124" }}>
            Empezar con un nuevo formulario
          </span>
        </div>
        <div className="template_right">
          <div className="gallery_button">
            Galeria de Formatos
            <UnfoldMoreIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createForm}>
          <img src={blank} alt="no image" className="card_image" />
          <p className="card_title">En Blanco</p>
        </div>
        <div className="card" onClick={createFormRegist}>
          <img src={contact} alt="no image" className="card_image" />
          <p className="card_title">Registro Simple</p>
        </div>
      </div>
    </div>
  );
}

export default Template;

*/
