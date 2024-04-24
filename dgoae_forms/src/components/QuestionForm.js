
import react, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useParams } from "react-router";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";

import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import CheckboxIcon from "@material-ui/icons/CheckBox";
import SubjectIcon from "@material-ui/icons/Subject";
import { BsTrash, BsFileText } from "react-icons/bs";
import { IconButton, MenuItem, Typography } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import { FcRightUp } from "react-icons/fc";
import CloseIcon from "@material-ui/icons/Close";
import RadioIcon from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import SaveIcon from "@material-ui/icons/Save";

import "./QuestionForm.css";
import ShortText from "@material-ui/icons/ShortText";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { API_URL, MAX_OPCIONES } from "../constants";

import Footer from "./Footer";

function QuestionForm() {

  const { id } = useParams();
  const [{ }, dispatch] = useStateValue();

  const { user, getIdTokenClaims } = useAuth0();

  function getConfigHeader(_token) {
    return {
      headers: {
        dgoaetoken: _token
      }
    };
  }

  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const t = await getIdTokenClaims()
      setToken(t.__raw);
      localStorage.setItem('token', t.__raw);
    };
    getToken();
  }, [token]);

  const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;

  const navigate = useNavigate();
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [isRequired, setIsRequired] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [document_name, setDocName] = useState("Documento sin título");
  const [document_description, setDocDesc] = useState("Agrega una descripción");
  const [questions, setQuestions] = useState([
    {
      questionText: "Pregunta",
      questionType: "radio",
      options: [{ optionText: "Opción 1" }],
      answer: false,
      answerkey: "",
      points: 0,
      open: true,
      required: false,
    },
  ]);


  useEffect(() => {
    async function data_adding() {

      if (token) {
        var request = await axios.get(
          API_URL + `/data?username=${user.name}&doc_id=${id}`, getConfigHeader(token)
        );

        var reqIsEnable = await axios.get(
          API_URL + `/isFormEnabled?username=${user.name}&doc_id=${id}`, getConfigHeader(token)

        )        


        console.log(request.data, reqIsEnable.data);
        var question_data = request.data.formdata.questions;

        var doc_name = request.data.formdata.document_name;
        var doc_desc = request.data.formdata.document_description;
        var isEncrypt = request.data.isEncrypted;
        var reqEnabled = reqIsEnable.data.isFormEnabled;
        setDocName(doc_name);
        setDocDesc(doc_desc);
        setQuestions(question_data);
        setIsEncrypt(isEncrypt);
        setIsEnabled(reqEnabled)

        dispatch({
          type: actionTypes.SET_DOC_NAME,
          document_name: doc_name,
        });

        dispatch({
          type: actionTypes.SET_DOC_DESC,
          document_description: doc_desc,
        });

        dispatch({
          type: actionTypes.SET_QUESTIONS,
          questions: question_data,
        });
        dispatch({
          type: actionTypes.SET_DOC_ENCRYPT,
          isEncrypted: isEncrypt,
        });
      }
    }

    data_adding();
  }, [token]);

  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  const decryptInformation = (wordTextCipher) => {
    var bytes = CryptoJS.AES.decrypt(
      wordTextCipher,
      ENCRYPT_STRING
    );
    var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
    return textoPlano;
  };

  function changeQuestion(_text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = _text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  function addQuestionType(i, _type) {
    let qType = [...questions];
    qType[i].questionType = _type;
    setQuestions(qType);
    console.log(qType);
  }

  function changeOptionValue(_value, i, j) {
    let optionsQuestions = [...questions];
    optionsQuestions[i].options[j].optionText = _value;
    setQuestions(optionsQuestions);
    console.log(optionsQuestions);
  }

  function removeOption(i, j) {
    let removeOptions = [...questions];
    if (removeOptions[i].options.length > 1) {
      removeOptions[i].options.splice(j, 1);
      setQuestions(removeOptions);
      console.log(removeOptions);
    }
  }

  function addOption(i) {
    var myquestions = [...questions];
    if (myquestions[i].options.length < MAX_OPCIONES) {
      myquestions[i].options.push({
        optionText: "Opción " + (myquestions[i].options.length + 1),
      });
    } else {
      console.log("Número de opciones máximo es " + MAX_OPCIONES);
    }
    setQuestions(myquestions);
  }

  function copyQuestion(i) {
    expandCloseAll();
    let qs = [...questions];
    var newQuestion = { ...qs[i] };
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i) {
    var reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    setQuestions(reqQuestion);
  }

  const sensitiveInformationQuestion = () => {
    setIsEncrypt(!isEncrypt);
    console.log(isEncrypt);
  };

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Pregunta: ",
        questionType: "radio",
        options: [{ optionText: "Opción 1" }],
        open: true,
        required: false,
      },
    ]);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, start_index, end_index) => {
    const result = Array.from(list);
    const [removed] = result.splice(start_index, 1);
    result.splice(end_index, 0, removed);
    return result;
  };

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
    
  }

  function setOptionAnswer(ans, i) {
    var qs = [...questions];
    qs[i].answerkey = ans;
    setQuestions(qs);
  }

  function setOptionPoints(points, i) {
    var qs = [...questions];
    qs[i].points = points;
    setQuestions(qs);
  }

  function doneAnswer(i) {
    var qs = [...questions];
    qs[i].answer = !qs[i].answer;
    setQuestions(qs);
  }

  function addAnswer(i) {
    var qs = [...questions];
    qs[i].answer = !qs[i].answer;
    setQuestions(qs);
  }

  const encryptSensitiveInformation = (i) => {
    var reqQuestion = [...questions];
    var encryptInfo = encryptInformation(JSON.stringify(reqQuestion[i]));
    console.log("Encripta" + encryptInfo);
    setQuestions(encryptInfo);
  };

  async function commitToDB() {
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: questions,
    });

    dispatch({
      type: actionTypes.SET_DOC_ENCRYPT,
      isEncrypted: isEncrypt,
    });

    try {
      //console.log(API_URL + `/add_question?username=${user.name}&doc_id=${id}`);
      const response = await axios.post(
        API_URL + `/add_question?username=${user.name}&doc_id=${id}`,
        {
          document_name: document_name,
          document_description: document_description,
          questions: questions,
          isEncrypted: isEncrypt,
        }, getConfigHeader(token)
      );
    } catch (err) {
      console.log(err);
    }

    navigate(`/saveform/${id}`);
  }

  function regresarPrincipal() {
    navigate("/");
  }

  async function removeForm() {

    console.log("Borraremos el formulario: " + { id });

    try {
      const response = await axios.post(

        API_URL + `/remove_form?username=${user.name}&doc_id=${id}`, {}, getConfigHeader(token)

      );
    } catch (err) {
      console.log(err);
    }

    regresarPrincipal()
  }


  function questionUI() {
    return questions?.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      postion: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />

                  <div key={i}>
                    <Accordion
                      expanded={questions[i].open}
                      onChange={() => {
                        handleExpand(i);
                      }}
                      className={questions[i].open ? "add_border" : ""}
                    >
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        elevation={1}
                        style={{ width: "100%" }}
                      >
                        {!questions[i].open ? (
                          <div className="saved_questions">
                            <Typography
                              style={{
                                fontSize: "15px",
                                fontWeight: "400",
                                letterSpacing: ".1px",
                                lineHeight: "24px",
                                paddingBottom: "8px",
                              }}
                            >
                              {i + 1}.{questions[i].questionText}
                            </Typography>

                            {ques.options.map((op, j) => (
                              <div key={j}>
                                <div style={{ display: "flex" }}>
                                  <FormControlLabel
                                    style={{
                                      marginLeft: "5px",
                                      marginBottom: "5px",
                                    }}
                                    disabled
                                    control={
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        style={{ marginRight: "3px" }}
                                        required={ques.required}
                                      />
                                    }
                                    label={
                                      <Typography
                                        style={{
                                          fontFamily:
                                            "Arial, Helvetica, sans-serif",
                                          fontSize: "13px",
                                          fontWeight: "400",
                                          letterSpacing: ".2px",
                                          lineHeight: "20px",
                                          color: "#202124",
                                        }}
                                      >
                                        {ques.questionType !== "text"
                                          ? op.optionText
                                          : ""}
                                      </Typography>
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </AccordionSummary>

                      <div className="question_boxes">
                        {!questions[i].answer ? (
                          <AccordionDetails className="add_question" >
                            <Typography
                              style={{
                                fontSize: "15px",
                                fontWeight: "400",
                                letterSpacing: ".1px",
                                lineHeight: "24px",
                                paddingBottom: "8px",
                                alignItems: "initial",
                              }}
                              title="Número de pregunta"
                            >
                              {i + 1 + "."}
                            </Typography>
                            <div className="add_question_top">
                              <input
                                type="text"
                                className="question"
                                placeholder='Escribe una pregunta'
                                value={ques.questionText}
                                onChange={(e) =>
                                  changeQuestion(e.target.value, i)
                                }
                              ></input>
                              <Select
                                className="select"
                                style={{ color: "#5f6368" }}
                                value={ques.questionType}
                              >
                                <MenuItem
                                  className="menuitem"
                                  id="text"
                                  // value={"text"}
                                  onClick={() => {
                                    addQuestionType(i, "text");
                                  }}
                                >
                                  {" "}
                                  <SubjectIcon
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Párrafo (texto)
                                </MenuItem>
                                <MenuItem
                                  className="menuitem"
                                  id="checkbox"
                                  value={"checkbox"}
                                  onClick={() => {
                                    addQuestionType(i, "checkbox");
                                  }}
                                >
                                  {" "}
                                  <CheckboxIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Casilla de Verificación
                                </MenuItem>
                                <MenuItem
                                  className="menuitem"
                                  id="radio"
                                  value={"radio"}
                                  onClick={() => {
                                    addQuestionType(i, "radio");
                                  }}
                                >
                                  {" "}
                                  <RadioIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                  />{" "}
                                  Opción Multiple
                                </MenuItem>
                              </Select>
                            </div>
                            {ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                {ques.questionType !== "text" ? (
                                  <input
                                    type={ques.questionType}
                                    style={{ marginRight: "10px" }}
                                  />
                                ) : (
                                  <ShortText style={{ marginRight: "10px" }} />
                                )}
                                <div>
                                  <input
                                    type="text"
                                    className="text_input"
                                    placeholder="Escribe una Respuesta"
                                    value={
                                      ques.questionType !== "text"
                                        ? op.optionText
                                        : ""
                                    }
                                    onChange={(e) =>
                                      changeOptionValue(e.target.value, i, j)
                                    }
                                  ></input>
                                </div>

                                <IconButton
                                  style={{
                                    color: "#5f6368",
                                    marginRight: "10px",
                                  }}
                                  aria-label="delete"
                                  title="Borrar Opción"
                                  onClick={() => {
                                    removeOption(i, j);
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                            ))}

                            {ques.options.length < MAX_OPCIONES &&
                              ques.questionType !== "text" ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    ques.questionType !== "text" ? (
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        inputprops={{
                                          "arial-label": "secondary checkbox",
                                        }}
                                        style={{
                                          marginLeft: "15px",
                                          marginRight: "10px",
                                        }}
                                        disabled
                                      />
                                    ) : (
                                      <ShortText
                                        style={{ marginRight: "10px" }}
                                      />
                                    )
                                  }
                                  label={
                                    <div>

                                      <Button
                                        size="small"
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        onClick={() => {
                                          addOption(i);
                                        }}
                                      >
                                        Agregar Opción
                                      </Button>
                                    </div>
                                  }
                                />
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="add_footer">
                              <div className="add_question_bottom_left">
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  onClick={() => {
                                    addAnswer(i);
                                  }}
                                >
                                  <FcRightUp
                                    style={{
                                      border: "2px solid #4285f4",
                                      padding: "2px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Hoja de respuestas
                                </Button>
                              </div>
                              <div className="add_question_bottom">
                                <IconButton
                                  title="Copiar Pregunta"
                                  aria-label="Copy"
                                  onClick={() => {
                                    copyQuestion(i);
                                  }}
                                >
                                  <FilterNoneIcon />
                                </IconButton>
                                <IconButton
                                  title="Borrar Pregunta"
                                  arial-label="Delete"
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <BsTrash />
                                </IconButton>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      color="primary"
                                      checked={questions[i].required ? true : false}
                                      onClick={() => {
                                        requiredQuestion(i);
                                      }}
                                      name="isEncrypted"
                                    />
                                  }
                                  labelPlacement="start"
                                  label="Requerido"
                                  title="Pregunta Obligatoria"
                                />

                              </div>
                            </div>
                          </AccordionDetails>
                        ) : (
                          <AccordionDetails className="add_question">
                            <div className="top_header">
                              Elige la respuesta correcta
                            </div>
                            <div>
                              <div className="add_question_top">
                                <input
                                  type="text"
                                  className="question"
                                  placeholder="Escribe una Pregunta"
                                  value={ques.questionText}
                                  disabled
                                />
                                <input
                                  type="number"
                                  className="points"
                                  min="0"
                                  step="1"
                                  placeholder="0"
                                  value={ques.points}
                                  onChange={(e) => {
                                    setOptionPoints(e.target.value, i);
                                  }}
                                />
                              </div>
                              {ques.options.map((op, j) => (
                                <div
                                  className="add_question_body"
                                  key={j}
                                  style={{
                                    marginLeft: "8px",
                                    marginBottom: "10px",
                                    marginTop: "5px",
                                  }}
                                >
                                  <div key={j}>
                                    <div
                                      style={{ display: "flex" }}
                                      className=""
                                    >
                                      <div className="form-check">
                                        <label
                                          style={{ fontSize: "13px" }}
                                          onClick={() => {
                                            setOptionAnswer(op.optionText, i);
                                          }}
                                        >
                                          {ques.questionType !== "text" ? (
                                            <input
                                              type={ques.questionType}
                                              name={ques.questionText}
                                              className="form-check-input"
                                              required={ques.required}

                                              checked={questions[i].answerkey === op.optionText}
                                              style={{
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                              }}
                                            />
                                          ) : (
                                            <ShortText
                                              style={{ marginRight: "10px" }}
                                            />
                                          )}
                                          {op.optionText}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="add_question_body">
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  <BsFileText
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "8px",
                                    }}
                                  >
                                    Agrega un retroalimentación a la respuesta
                                  </BsFileText> {questions[i].answer}
                                </Button>
                              </div>
                              <div className="add_question_bottom">
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "12px",
                                    marginTop: "12px",
                                    fontWeight: "600",
                                  }}
                                  onClick={() => {
                                    doneAnswer(i);
                                  }}
                                > 
                                  Hecho
                                </Button>
                              </div>
                            </div>
                          </AccordionDetails>
                        )}
                        {!ques.answer ? (
                          <div className="question_edit" title="Agrega nueva pregunta">
                            <IconButton onClick={addMoreQuestionField}>
                              <AddCircleOutlineIcon className="edit" />
                            </IconButton>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_Title_section">
            <div className="question_form_top">
              <div className="top_form_sensitive_information">
                <input
                  type="text"
                  className="question_form_top_name"
                  style={{ color: "black" }}
                  placeholder="Documento Sin Título"
                  value={document_name}
                  onChange={(e) => {
                    setDocName(e.target.value);
                  }}
                ></input>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={isEncrypt ? true : false}
                      onChange={sensitiveInformationQuestion}
                      name="isEncrypted"
                    />
                  }
                  labelPlacement="start"
                  label="El formulario contiene datos sensibles"
                />
              </div>
              <textarea
                type="text"
                className="question_form_top_desc"
                placeholder="Descripción del formulario"
                value={document_description}
                onChange={(e) => {
                  setDocDesc(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <br></br>
          <div className="save_form">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={commitToDB}
              startIcon={<SaveIcon />}
              disabled={isEnabled}
              
            >
              Guardar formulario
            </Button>
            {<Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => { if (window.confirm('¿Quieres borrar el formulario?')) { removeForm() } }}
              startIcon={<BsTrash />}
              disabled={isEnabled}
            >
              Borrar Formulario
            </Button>}
          </div>
          <br></br>
          <hr />
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default QuestionForm;



