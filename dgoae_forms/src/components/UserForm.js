import React, { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { API_URL } from '../constants';
import axios from "axios";
import Footer from "./Footer"
import CryptoJS from "crypto-js";
import "./UserForm.css";
import DGOAEfull from "../images/DGOAEfull.png"
import UNAMfull from "../images/UNAMfull.png"

export const UserForm = () => {
  const { global_id } = useParams();

  var [quest_excel, setColumn] = useState([]);
  var navigate = useNavigate();
  var [answer, setAnswer] = useState([]);

  const [doc_name, setDocName] = useState("Documento Sin título");
  const [doc_desc, setDocDesc] = useState("Agrega una descripción");
  const [SuccessMsg, setSuccessMsg] = useState("")
  const [ErrorMsg, setErrorMsg] = useState("")
  const [valid_token, setValidToken] = useState([]);
  const [captchaVerification, setcaptchaVerification] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isEncrypted, setIsEncrypted] = useState({});

  const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY;
  const RECAPTCHA_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;


  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  const captcha = useRef(null);

  const onChange = async (e) => {

    let token = e;

    if (token) {
      let new_valid_token = await verifyToken(token);
      setValidToken([new_valid_token[0]]);

      if (new_valid_token[0].verification_info.success === true) {
        setSuccessMsg("Hurray!! you have submitted the form");
        console.log(SuccessMsg);
        setcaptchaVerification(new_valid_token[0].verification_info.success);
      } else {
        setErrorMsg(" Sorry!! Verify you are not a bot");
        console.log(ErrorMsg);
        setcaptchaVerification(new_valid_token[0].verification_info.success);
      }
    }
  };

  const verifyToken = async (token) => {
    let APIResponse = [];

    try {
      let response = await axios.post(API_URL + `/verify-token`, {
        reCAPTCHA_TOKEN: token,
        Secret_Key: RECAPTCHA_SECRET_KEY,
      });

      APIResponse.push(response['data']);
      return APIResponse;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getForm() {

      var request = await axios.get(
        API_URL + `/getform?global_id=${global_id}`
      );
      var question_data = request.data.questions;
      var doc_name = request.data.document_name;
      var doc_desc = request.data.document_description;
      var isEncrypted = request.data.isEncrypted;

      question_data.map((q, qindex) => {
        answer.push({
          question: q.questionText,
          answer: "",
        });
      });

      question_data.map((q, qindex) => {
        quest_excel.push({ header: q.questionText, key: q.questionText });
      });

      setIsEncrypted(isEncrypted);
      setDocName(doc_name);
      setDocDesc(doc_desc);
      setQuestions(question_data);
    }
    getForm();
  }, []);

  var post_answer_data = {};

  function select(que, option, e) {
    setAnswer(answer);

    var k = answer.findIndex((ele) => ele.question === que);
    answer[k].answer = option;
    setAnswer(answer);
  }

  function selectInput(que, option, e) {
    setAnswer(answer);
    var k = answer.findIndex((ele) => ele.question === que);
    answer[k].answer = option;
    setAnswer(answer);
  }

  function selectCheck(que, option, e) {
    setAnswer(answer);
    var d = [];
    var k = answer.findIndex((ele) => ele.question === que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }

    answer[k].answer = d.join(",");
    setAnswer(answer);
  }



  function submit() {

    answer.map((ele) => {
      if (isEncrypted === true) {
        post_answer_data[ele.question] = encryptInformation(ele.answer);
      } else {
        post_answer_data[ele.question] = ele.answer;
      }


    });




    var send_info = false;
    questions.map((ele) => {
  
      if (ele.required) {
        var k = answer.findIndex((el) => el.question === ele.questionText);
        if (k === -1 || answer[k].answer.trim() === "") {
          alert("Hay preguntas que debes de responder, son requeridas para el formulario");
          send_info = false;
        } else {
          send_info = true;
        }
      }

    });
    if(send_info){
      console.log("Respuestas Enviando Respuestas");
          axios.post(API_URL + `/student_response`, {
            global_id: global_id,
            column: quest_excel,
            doc_name: doc_name,
            answer_data: [post_answer_data],
          }).then(() => {
            navigate("/submitted/" + global_id);
          }).catch((error) => {
            console.error("Error al enviar la respuesta:", error);
          });
    }
    /*
    
      axios.post(API_URL + `/student_response`, {
        global_id: global_id,
        column: quest_excel,
        doc_name: doc_name,
        answer_data: [post_answer_data],
      });
    */
    // navigate("/submitted/" + global_id);

  }

  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          <div className="user_form_row">
            <div className="user_form_column_left">
              <img
                src={UNAMfull}
                alt="UNAM"
                width="400px"
                className="form_image"
              />
            </div>
            <div className="user_form_column_right">
              <img
                src={DGOAEfull}
                alt="DGOAE"
                width="400px"
                className="form_image"
              />
            </div>
          </div>

          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{doc_name}</Typography>
            <Typography style={{ fontSize: "15px" }}>{doc_desc}</Typography>
          </div>
          {questions.length > 0 ? (
            questions.map((question, qindex) => (
              <div className="user_form_questions" key={qindex}>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    letterSpacing: ".1px",
                    lineHeight: "24px",
                    paddingBottom: "8px",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="mr-2">
                      {qindex + 1}. {question.questionText}
                    </span>
                    {question.required ? (
                      <label className="text-red-500">
                        La pregunta es requerida
                      </label>
                    ) : null}
                  </div>
                </Typography>
                {question.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: "5px" }}>
                    <div style={{ display: "flex" }}>
                      <div className="form_check">
                        {question.questionType !== "radio" ? (
                          question.questionType !== "text" ? (
                            <label>
                              <input
                                type="checkbox"
                                name={qindex}
                                value={option.optionText}
                                className="form_check_input"
                                required={question.required}
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  selectCheck(
                                    question.questionText,
                                    option.optionText,
                                    e.target.checked
                                  );
                                }}
                              />
                              {option.optionText}
                            </label>
                          ) : (
                            <label>
                              <input
                                type="text"
                                name={qindex}
                                className="form_check_input_text"
                                required={question.required}
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  selectInput(
                                    question.questionText,
                                    e.target.value
                                  );
                                }}
                              />
                              {""}
                            </label>
                          )
                        ) : (
                          <label>
                            <input
                              type="radio"
                              name={qindex}
                              value={option.optionText}
                              className="form_check_input"
                              required={question.required}
                              style={{ marginLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                select(
                                  question.questionText,
                                  option.optionText,
                                  e.target.value
                                );
                              }}
                            />
                            {option.optionText}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="user_form_questions">
              <Typography
                style={{
                  fontSize: "24px",
                  fontWeight: "400",
                  letterSpacing: ".2px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                }}
              >
                Comunicate con el administrador para habilitar el formulario.
              </Typography>
            </div>
          )}

          <div className="recaptcha">
            <ReCAPTCHA
              ref={captcha}
              sitekey={RECAPTCHA_SITE_KEY}

              onChange={onChange}
            />
          </div>

          <div className="user_form_submit">
            <Button
              disabled={!captchaVerification}
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ fontSize: "14px" }}
            >
              Enviar respuesta
            </Button>

          </div>

          <div className="footer">
            <Footer />
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserForm;
