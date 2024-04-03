
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import axios from "axios";
import "./Responses.css";
import CryptoJS from "crypto-js";

import ReactPaginate from "react-paginate";
import Button from "@material-ui/core/Button";
import { API_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";


function Responses() {
  const { user, getIdTokenClaims } = useAuth0();
  const { id } = useParams();
  var [responses, setResponses] = useState([]);
  var [isCripted, setCripted] = useState(false);
  var [rsize, setRSize] = useState(0);
  var [rcols, setRCols] = useState([]);
  var [dname, setDName] = useState("");
  var [state, setState] = useState({ perPage: 2, page: 0, pages: 0 });
  var [items, setItems] = useState([]);
  var navigate = useNavigate();
  const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;
  const [token, setToken] = useState("");

  function getConfigHeader(_token) {
    return {
      headers: {
        dgoaetoken: _token
      }
    };
  }

  useEffect(() => {
    async function getToken() {
      const t = await getIdTokenClaims()
      setToken(t.__raw);
      localStorage.setItem('token', t.__raw);
    };
    getToken();
  }, [token]);

  useEffect(() => {

    async function getReponses() {
      if (token) {
        var request = await axios.get(
          API_URL + `/getResponses?id=${id}&username=${user.name}`, getConfigHeader(token)
        );

        /* = await axios.post(
          API_URL + `/hasCryptedInfo`,
          {
            fid: id,
            uname: user.name
          }, getConfigHeader(token)
        );*/


        var cripted = request.data.isEncrypted;
        responses = request.data.resp;
        console.log(responses);
        rsize = request.data.rsize;
        rcols = request.data.columns;
        dname = request.data.doc_name;

        setResponses(responses);
        setRSize(rsize);
        setRCols(rcols);
        setDName(dname);


        state.pages = Math.floor(rsize / state.perPage);
        setState(state);

        items = responses.slice(
          state.page * state.perPage,
          (state.page + 1) * state.perPage
        );

        setItems(items);



        isCripted = cripted;
        setCripted(isCripted);
      }
    }

    getReponses();
  }, [token]);

  function handlePageClick(event) {
    state.page = event.selected;
    setState(state);

    items = responses.slice(
      state.page * state.perPage,
      (state.page + 1) * state.perPage
    );

    setItems(items);
  }

  async function enableForm(event, checked) {
    try {
      const response = await axios.post(
        API_URL + `/enable_disable`,
        {
          fid: id,
          enabled: checked,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }


  function regresarPrincipal() {
    navigate("/");
  }

  const decryptInformation = (wordTextCipher) => {


    if (!isCripted)
      return wordTextCipher;

     //console.log("Decrypt: " + wordTextCipher);

    var bytes = CryptoJS.AES.decrypt(
      wordTextCipher,
      ENCRYPT_STRING
    );


    var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
    //console.log("Decrypt: " + textoPlano);
    return textoPlano;
  };

  return (
    <div className="submit" style={{ height: "76vh" }}>
      <div className="user_form">
        <div className="user_form_section">
          <div
            className="user_form_questions"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Typography
              style={{
                fontWeight: "700",
                letterSpacing: ".2px",
                lineHeight: "24px",
                paddingBottom: "8px",
                fontSize: "28px",
              }}
            >
              Cuestionario : {dname}
            </Typography>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                  fontSize: "24px",
                }}
              >
                Total de respuestas: {rsize}
              </Typography>
              <div>
                <IconButton>
                  <MoreVert className="form_header_icon" />
                </IconButton>
              </div>
            </div>
            <br></br>
          </div>
        </div>

        <div className="user_form_section">
          <div
            className="user_form_questions"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                  fontSize: "24px",
                }}
              >
                Respuestas { }
              </Typography>
            </div>
            <br></br>
            <div style={{ marginBottom: "5px" }}></div>
            {rsize > 0 ? (
              items.map((element, rindex) => (
                <div key={rindex} className="w3">
                  <div style={{ fontWeight: "600" }}>
                    {" "}
                    Respuesta - {state.page * state.perPage + rindex + 1}
                  </div>
                  {rcols.map((elem, colindex) => (
                    <div key={colindex}>
                      {colindex + 1}. {elem.header} - {decryptInformation(element[elem.header])}
                    </div>
                  ))}

                  <br></br>
                </div>
              ))
            ) : (
              <h1>No hay respuestas por mostrar</h1>
            )}

            <br></br>

            <br></br>

            <div className="pagination-txt">
              Mostrando {state.page + 1} de {state.perPage} páginas{" "}
            </div>
            <br />
            <br />
            <div className="float-end">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={state.perPage}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
            <br></br>
            <div className="save_form">
              <Button
                variant="contained"
                color="secondary"
                onClick={regresarPrincipal}
                style={{ fontSize: "14px" }}
              >
                Regresar
              </Button>
            </div>
	 
	  <div className="footer">
          <Footer />
	  
          </div>
          </div>
          </div>
	  </div>
	  </div>
  );
}

export default Responses;

/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import axios from "axios";
import "./Responses.css";
import CryptoJS from "crypto-js";

import ReactPaginate from "react-paginate";
import Button from "@material-ui/core/Button";
import { API_URL} from "../constants";

function Responses() {
  const { id } = useParams();

  var [responses, setResponses] = useState([]);
  var [isCripted,setCripted] = useState(false);
  var [rsize, setRSize] = useState(0);
  var [rcols, setRCols] = useState([]);
  var [dname, setDName] = useState("");
  var [state, setState] = useState({ perPage: 2, page: 0, pages: 0 });
  var [items, setItems] = useState([]);
  var navigate = useNavigate();
  const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;
  useEffect(() => {
    async function getReponses() {
      var request = await axios.get(
        API_URL + `/getResponses?id=${id}`
      );

      var cripted = await axios.post(
        API_URL + `/hasCryptedInfo`,
        {
          fid: id
        }
      );

      responses = request.data.resp;

      rsize = request.data.rsize;
      rcols = request.data.columns;
      dname = request.data.doc_name;

      setResponses(responses);
      setRSize(rsize);
      setRCols(rcols);
      setDName(dname);

      items = responses.slice(
        state.page * state.perPage,
        (state.page + 1) * state.perPage
      );
      setItems(items);
      state.pages = Math.floor(rsize / state.perPage);
      setState(state);
    
     

      isCripted = cripted.data.isEncrypted;
      setCripted(isCripted);
    }

        getReponses();
  }, []);

  function handlePageClick(event) {
    state.page = event.selected;
    setState(state);

    items = responses.slice(
      state.page * state.perPage,
      (state.page + 1) * state.perPage
    );

    setItems(items);
  }

  async function enableForm(event, checked) {
    try {
      const response = await axios.post(
        API_URL + `/enable_disable`,
        {
          fid: id,
          enabled: checked,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }


  function regresarPrincipal() {
    navigate("/");
  }

  const decryptInformation = (wordTextCipher) => {
    
    
    if(!isCripted)
    return wordTextCipher;    
    var bytes = CryptoJS.AES.decrypt(
      wordTextCipher,
      ENCRYPT_STRING
    );


    var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
    return textoPlano;
  };

  return (
    <div className="submit" style={{ height: "76vh" }}>
      <div className="user_form">
        <div className="user_form_section">
          <div
            className="user_form_questions"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Typography
              style={{
                fontWeight: "700",
                letterSpacing: ".2px",
                lineHeight: "24px",
                paddingBottom: "8px",
                fontSize: "28px",
              }}
            >
              Cuestionario : {dname}
            </Typography>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                  fontSize: "24px",
                }}
              >
                Total de respuestas: {rsize}
              </Typography>
              <div>
                <IconButton>
                  <MoreVert className="form_header_icon" />
                </IconButton>
              </div>
            </div>
            <br></br>
          </div>
        </div>

        <div className="user_form_section">
          <div
            className="user_form_questions"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                  fontSize: "24px",
                }}
              >
                Respuestas {}
              </Typography>
            </div>
            <br></br>
            <div style={{ marginBottom: "5px" }}></div>
            {rsize > 0 ? (
              items.map((element, rindex) => (
                <div key={rindex} className="w3">
                  <div style={{ fontWeight: "600" }}>
                    {" "}
                    Respuesta - {state.page * state.perPage + rindex + 1}
                  </div>
                  {rcols.map((elem, colindex) => (
                    <div key={colindex}>
                      {colindex + 1}. {elem.header} - {decryptInformation(element[elem.header])}
                    </div>
                  ))}

                  <br></br>
                </div>
              ))
            ) : (
              <h1>No hay respuestas por mostrar</h1>
            )}
            <div className="pagination-txt">
              Mostrando {state.page + 1} de {state.perPage} páginas{" "}
            </div>
            <br />
            <br />
            <div className="float-end">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={state.perPage}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
            <br></br>
            <div className="save_form">
              <Button
                variant="contained"
                color="secondary"
                onClick={regresarPrincipal}
                style={{ fontSize: "14px" }}
              >
                Regresar
              </Button>
            </div>

            <div className="user_footer">DGOAE FORMS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Responses;

*/
