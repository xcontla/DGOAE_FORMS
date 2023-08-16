import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Switch, Typography } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import axios from "axios";
import "./Responses.css";
import CryptoJS from "crypto-js";

import ReactPaginate from "react-paginate";
import Button from "@material-ui/core/Button";

function Responses() {
  const { id } = useParams();

  var [responses, setResponses] = useState([]);
  var [rsize, setRSize] = useState(0);
  var [rcols, setRCols] = useState([]);
  var [dname, setDName] = useState("");
  var [state, setState] = useState({ perPage: 2, page: 0, pages: 0 });
  var [items, setItems] = useState([]);
  var navigate = useNavigate();

  useEffect(() => {
    async function getReponses() {
      var request = await axios.get(
        `https://dgoae.digitaloe.unam.mx/apiforms/getResponses?id=${id}`
      );
      console.log(request.data.resp)

      responses = request.data.resp;

      rsize = request.data.rsize;
      rcols = request.data.columns;
      dname = request.data.doc_name;
      console.log(dname);

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
         `https://dgoae.digitaloe.unam.mx/apiforms/enable_disable`,
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
    var bytes = CryptoJS.AES.decrypt(
      wordTextCipher,
      "@DGOAE_3NCRYPT_1NF0RM4T10N"
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
                Total de respuestas {rsize}
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
                Respuestas{" "}
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

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FormControl, InputAdornment, styled, TextField } from "@mui/material";

// import {
//   Box,
//   FormControlLabel,
//   IconButton,
//   InputLabel,
//   Modal,
//   OutlinedInput,
//   Switch,
//   Typography,
// } from "@material-ui/core";
// import MoreVert from "@material-ui/icons/MoreVert";
// import axios from "axios";
// import "./Responses.css";
// import ReactPaginate from "react-paginate";
// import Button from "@material-ui/core/Button";
// import CryptoJS from "crypto-js";
// import { useAuth0 } from "@auth0/auth0-react";
// import { actionTypes } from "./Reducer";
// import { useStateValue } from "./StateProvider";

// function Responses() {
//   const { id } = useParams();
//   const { user } = useAuth0();

//   var [responses, setResponses] = useState([]);
//   var [rsize, setRSize] = useState(0);
//   var [rcols, setRCols] = useState([]);
//   var [dname, setDName] = useState("");
//   var [state, setState] = useState({ perPage: 2, page: 0, pages: 0 });
//   var [items, setItems] = useState([]);
//   const [showSensitiveData, setShowSensitiveData] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [password, setPassword] = useState("");
//   const [alerta, setAlerta] = useState({});
//   const [formInfo, setFormInfo] = useState({});

//   const [{}, dispatch] = useStateValue();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPassword("");
//     handleClose();
//   };

//   const mostrarAlerta = (alerta) => {
//     setAlerta(alerta);
//   };

//   const passwordCorrect = () => {
//     if (password === "1234abcd") {
//       commitToDB();
//       mostrarAlerta({
//         msg: "Contraseña Correcta",
//       });
//     } else {
//       mostrarAlerta({
//         msg: "Introduce una contraseña",
//       });
//     }
//   };

//   const handleChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   var navigate = useNavigate();

//   const { msg } = alerta;
//   const { isEncrypted } = formInfo;

//   async function getForm() {
//     try {
//       var request = await axios.get(
//         `http://localhost:9000/data?username=${user.name}&doc_id=${id}`
//       );
//       var question_data = request.data;
//       setFormInfo(question_data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function commitToDB() {
//     dispatch({
//       type: actionTypes.SET_DOC_ENCRYPT,
//       isEncrypted: false,
//     });

//     try {
//       const response = await axios.post(
//         `http://localhost:9000/add_question?username=${user.name}&doc_id=${id}`,
//         {
//           isEncrypted: false,
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     async function getReponses() {
//       var request = await axios.get(
//         `http://localhost:9000/getResponses?id=${id}`
//       );

//       responses = request.data.resp;

//       rsize = request.data.rsize;
//       rcols = request.data.columns;
//       dname = request.data.doc_name;

//       setResponses(responses);
//       setRSize(rsize);
//       setRCols(rcols);
//       setDName(dname);

//       items = responses.slice(
//         state.page * state.perPage,
//         (state.page + 1) * state.perPage
//       );
//       setItems(items);
//       state.pages = Math.floor(rsize / state.perPage);
//       setState(state);
//     }

//     getReponses();
//     getForm();
//     passwordCorrect();
//   }, [password]);

//   function handlePageClick(event) {
//     state.page = event.selected;
//     setState(state);

//     items = responses.slice(
//       state.page * state.perPage,
//       (state.page + 1) * state.perPage
//     );

//     setItems(items);
//   }

//   async function enableForm(event, checked) {
//     try {
//       const response = await axios.post(
//         `http://localhost:9000/enable_disable`,
//         {
//           fid: id,
//           enabled: checked,
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",

//     border: "2px solid #fff",
//     boxShadow: 24,
//     p: 4,
//   };

//   function regresarPrincipal() {
//     navigate("/");
//   }

//   const encryptInformation = (wordTextPlain) => {
//     var textoCifrado = CryptoJS.AES.encrypt(
//       JSON.stringify(wordTextPlain),
//       "@DGOAE_3NCRYPT_1NF0RM4T10N"
//     );
//     return textoCifrado.toString();
//   };

//   return (
//     <div className="submit" style={{ height: "76vh" }}>
//       <div className="user_form">
//         <div className="user_form_section">
//           <div
//             className="user_form_questions"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               marginBottom: "20px",
//             }}
//           >
//             <Typography
//               style={{
//                 fontWeight: "700",
//                 letterSpacing: ".2px",
//                 lineHeight: "24px",
//                 paddingBottom: "8px",
//                 fontSize: "28px",
//               }}
//             >
//               Cuestionario : {dname}
//             </Typography>
//             <br></br>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Typography
//                 style={{
//                   fontWeight: "400",
//                   letterSpacing: ".1px",
//                   lineHeight: "24px",
//                   paddingBottom: "8px",
//                   fontSize: "24px",
//                 }}
//               >
//                 Total de respuestas {rsize}
//               </Typography>
//               <div>
//                 <IconButton>
//                   <MoreVert className="form_header_icon" />
//                 </IconButton>
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "flex-end",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div className="App">
//                 <div>
//                   {isEncrypted ? (
//                     <Button
//                       margin="dense"
//                       variant="contained"
//                       color="primary"
//                       type="submit"
//                       className="w-full"
//                       onClick={handleOpen}
//                     >
//                       Mostrar datos sensibles
//                     </Button>
//                   ) : (
//                     ""
//                   )}
//                   <div>
//                     <Modal
//                       open={open}
//                       onClose={handleClose}
//                       aria-labelledby="modal-modal-title"
//                       aria-describedby="modal-modal-description"
//                     >
//                       <Box sx={style}>
//                         <Typography
//                           id="modal-modal-title"
//                           variant="h6"
//                           component="h2"
//                         >
//                           Introduce una contraseña
//                         </Typography>
//                         <form onSubmit={handleSubmit}>
//                           <TextField
//                             type="password"
//                             label="Contraseña"
//                             value={password}
//                             onChange={handleChange}
//                             variant="outlined"
//                             className="w-full"
//                             margin="dense"
//                           />

//                           <Button
//                             margin="dense"
//                             variant="contained"
//                             color="primary"
//                             type="submit"
//                             className="w-full"
//                             onClick={passwordCorrect}
//                           >
//                             Aceptar
//                           </Button>
//                         </form>
//                         {showSensitiveData ? (
//                           <div
//                             className={`${"from-red-400 to-red-600"} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}
//                           >
//                             {msg}
//                           </div>
//                         ) : (
//                           <div
//                             className={`${"from-blue-400 to-blue-600"} bg-gradient-to-br text-center p-3 rounded-md uppercase text-white font-bold text-sm my-10 `}
//                           >
//                             {msg}
//                           </div>
//                         )}
//                       </Box>
//                     </Modal>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <br></br>
//           </div>
//         </div>

//         <div className="user_form_section">
//           <div
//             className="user_form_questions"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               marginBottom: "20px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Typography
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: "400",
//                   letterSpacing: ".1px",
//                   lineHeight: "24px",
//                   paddingBottom: "8px",
//                   fontSize: "24px",
//                 }}
//               >
//                 Respuestas{" "}
//               </Typography>
//             </div>
//             <br></br>
//             <div style={{ marginBottom: "5px" }}></div>
//             {rsize > 0 ? (
//               items.map((element, rindex) => (
//                 <div key={rindex} className="w3">
//                   <div style={{ fontWeight: "600" }}>
//                     {" "}
//                     Respuesta - {state.page * state.perPage + rindex + 1}
//                   </div>
//                   {rcols.map((elem, colindex) => (
//                     <div key={colindex}>
//                       {colindex + 1}. {elem.header} -{" "}
//                       {isEncrypted === true
//                         ? ` ${encryptInformation(
//                             element[elem.header]
//                           ).substring(1, 15)} ...`
//                         : element[elem.header]}
//                     </div>
//                   ))}

//                   <br></br>
//                 </div>
//               ))
//             ) : (
//               <h1>No hay respuestas por mostrar</h1>
//             )}
//             <div className="pagination-txt">
//               Mostrando {state.page + 1} de {state.perPage} páginas{" "}
//             </div>
//             <br />
//             <br />
//             <div className="float-end">
//               <ReactPaginate
//                 previousLabel={"<<"}
//                 nextLabel={">>"}
//                 pageCount={state.perPage}
//                 onPageChange={handlePageClick}
//                 containerClassName={"pagination"}
//                 activeClassName={"active"}
//               />
//             </div>
//             <br></br>
//             <div className="save_form">
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={regresarPrincipal}
//                 style={{ fontSize: "14px" }}
//               >
//                 Regresar
//               </Button>
//             </div>

//             <div className="user_footer">DGOAE FORMS</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Responses;
