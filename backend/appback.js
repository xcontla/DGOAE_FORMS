import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import conectarDB from "../backend/config/db.js";
import Form from "../backend/models/Form.js";
import AllAccess from "./models/AllAcces.js";
import Response from "./models/Response.js";
import CryptoJS from "crypto-js";
import axios from "axios";
import { decodeToken } from "react-jwt";
import helmet from "helmet";

const appback = express();

dotenv.config();

const ENCRYPT_STRING = process.env.REACT_APP_ENCRYPT_STRING;

conectarDB();


appback.use(helmet());
appback.use(bodyParser.json());
appback.use(cors());


function verifyToken(token) {

  const json = decodeToken(token);
  console.log(json);
  return json;
}

appback.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*", "http://localhost:3001/*", "https://dgoae.digitaloe.unam.mx");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});


/** 
 * url: /data
 * params:
 *  doc_id 
 *  username
 * Descripción:
 *  Obtiene el formulario con el id 
*/

appback.get(`/data`, async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  var docID = req.query.doc_id;
  var userID = req.query.username;

  if (userID !== json.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    console.log("data.....................");
    const accessfile = await AllAccess.findOne({ IdPregunta: docID }).exec();
    if (!accessfile) {
      res.status(404).send("File not found");
      return;
    }
    var doc = await Form.findOne({ IdPregunta: docID });
    if (!doc) {
      res.status(404).send("File not found");
      return;
    }

    const datajson = {
      formdata: doc,
      isEncrypted: accessfile.isEncrypted,
    };
    res.send(datajson);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Listar los cuestionarios de un usuario
*/

appback.get(`/get_all_filenames_by_user`, async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  var userID = req.query.username;
  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }



  Form.find({ email: json?.name }, (err, files) => {
    if (err) {
      console.error(err);
      res.json([]);
    } else {
      let js = files.map((file) => {
        return {
          name: file.document_name,
          formId: file.IdPregunta,
          description: file.document_description,
          questions: file.questions,
          time: file.fechaEntrega,
        };
      });

      res.json(js);
    }

  });
});

/** 
 * Obtener datos de los cuestionarios que el usuario tiene
*/
appback.get(`/get_all_filenames_by_user_header`, async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  var userID = req.query.username;
  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  Form.find({ email: json?.name }, (err, files) => {
    if (err) {
      console.error(err);
      res.json([]);
    } else {
      let js = files.map((file, idx) => {
        return {
          id: idx + 1,
          name: file.document_name,
          formId: file.IdPregunta,
          description: file.document_description,
          questions: file.questions,
          time: file.fechaEntrega,
        };
      });
      res.json(js);
    }

  });
});
/**
 * Obtener el formulario para responder
 */
appback.get("/getform", async (req, res) => {

  const globalID = req.query.global_id;

  try {


    const allAccess = await AllAccess.findOne({ gid: globalID });
    if (allAccess.enable === true) {
      const form = await Form.findOne({ IdPregunta: allAccess.IdPregunta });
      res.send({
        document_name: form.document_name,
        document_description: form.document_description,
        questions: form.questions,
        isEncrypted: allAccess.isEncrypted,
      });
    } else {

      const form = await Form.findOne({ IdPregunta: allAccess.IdPregunta });
      res.send({
        document_name: form.document_name,
        document_description: "Cuestionario no habilitado",
        questions: [],
      });
      return;
    }
  } catch (err) {
    res.status(500).send("Error while loading form: " + globalID);
  }
});

appback.get(`/getGlobalID`, async (req, res) => {

  const gid = req.query.id;
  console.log(req.headers);



  try {
    const result = await AllAccess.findOne({ IdPregunta: gid });
    if (!result) {
      return;
    }
    res.json({ gid: result.gid });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


appback.get(`/isFormEnabled`, async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  var userID = req.query.username;
  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const docid = req.query.doc_id;
  try {
    const result = await AllAccess.findOne({ IdPregunta: docid });
    if (!result) {
      return;
    }
    
  console.log(" ENABLEDDDDD ", result.enable, docid );
    res.json({ isFormEnabled: result.enable });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


appback.post("/add_question", async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  const user_id = req.query.username;


  if (user_id !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;
  const document_data = req.body;

  const form = await Form.findOne({ IdPregunta: document_id });

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

  if (!form) {
    const document = new Form({
      email: user_id,
      IdPregunta: document_id,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    await document.save();
    res.json(document);
  } else {
    const document = new Form({
      email: form.email,
      IdPregunta: form.IdPregunta,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,

      questions: document_data.questions,
    });
    await form.updateOne({
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    res.json(document);
  }



  const allAccess = await AllAccess.findOne({ IdPregunta: document_id });
  if (!allAccess) {
    const newForm = new AllAccess({
      email: user_id,
      gid: uuidv4(),
      IdPregunta: document_id,
      enable: false,
      isEncrypted: false,
      IdRespuesta: uuidv4(),
    });
    await newForm.save();
  }
});


appback.post("/add_question_encrypted", async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  const user_id = req.query.username;

  if (user_id !== json.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;
  const document_data = req.body;
  console.log(req.headers);
  const form = await Form.findOne({ IdPregunta: document_id });

  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  if (!form) {
    const document = new Form({
      email: user_id,
      IdPregunta: document_id,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    await document.save();
    res.json(document);
  } else {
    const document = new Form({
      email: form.email,
      IdPregunta: form.IdPregunta,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    await form.updateOne({
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    res.json(document);
  }



  const allAccess = await AllAccess.findOne({ IdPregunta: document_id });
  if (!allAccess) {
    const newForm = new AllAccess({
      email: user_id,
      gid: uuidv4(),
      IdPregunta: document_id,
      enable: false,
      isEncrypted: true,
      IdRespuesta: uuidv4(),
    });
    await newForm.save();
  }
});

appback.post("/remove_form", async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  console.log(req.headers);
  const user_id = req.query.username;


  if (user_id !== json.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;

  await AllAccess.deleteOne({ IdPregunta: document_id });
  await Form.deleteOne({ IdPregunta: document_id });

  const jsonres = { message: "Usuario:" + user_id + " borró el formulario " + document_id };
  return res.json(jsonres);
});


appback.post("/copy_url", async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  console.log(req.headers);
  const user_id = req.query.username;


  if (user_id !== json.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;

  try {
    const allAccess = await AllAccess.findOne({ IdPregunta: document_id });

    const jsonres = {
      message: "Usuario:" + user_id + " Copió la URL  " + document_id,
      copy_url: allAccess.gid
    };

    return res.json(jsonres);
  } catch (ex) {

    return res.json({
      message: "No se encontro el formulario: " + document_id,
      copy_url: document_id
    });
  }
});



appback.post("/duplicate_form", async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  console.log(req.headers);
  const user_id = req.query.username;

  if (user_id !== json.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;

  try {

    const form = await Form.findOne({ IdPregunta: document_id });

    const id_pregunta_new = uuidv4();
    const document = new Form({
      email: form.email,
      IdPregunta: id_pregunta_new,
      document_name: form.document_name + "Duplicado",
      document_description: form.document_description,
      isEncrypted: true,

      questions: form.questions,
    });

    await document.save();

    const newForm = new AllAccess({
      email: user_id,
      gid: uuidv4(),
      IdPregunta: id_pregunta_new,
      enable: false,
      isEncrypted: true,
      IdRespuesta: uuidv4(),
    });
    await newForm.save();

    return res.json({
      message: "Se duplicó el formulario: " + form.document_name +". Si no se despliega, favor de recargar la página.",
      result: true
    });

  } catch (ex) {

    return res.json({
      message: "No se encontro el formulario: " + document_id,
      result: false
    });
  }
});

appback.post("/student_response", async (req, res) => {

  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  console.log("STUDENT_RESPONSE");
  console.log(req);
  const docs_data = req.body;
  const globalID = docs_data.global_id;

  console.log("1", docs_data);
  console.log("2", globalID);

  try {
    const response = await Response.findOne({
      gid: globalID,
    });

    console.log("3", response);
    if (!response) {
      const newResponse = new Response({
        gid: globalID,
        IdRespuesta: docs_data.IdRespuesta,
        responses: docs_data.answer_data,
        columns: docs_data.column,
        doc_name: docs_data.doc_name,
      });

      console.log("4", newResponse);

      await newResponse.save();
      res.sendStatus(200);


    } else {
      response.responses.push(docs_data.answer_data[0]);

      await response.save();
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

function isObject(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

appback.get(`/getExcel`, async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  const fid = req.query.id;
  console.log("Golbal" + fid);
  console.log(req.headers);
  try {
    const accessfile = await AllAccess.findOne({ file: fid }).exec();

    if (!accessfile) {
      res.send(null);
      return;
    }

    const user = accessfile.email;
    const filename = accessfile.filename;

    if (user !== json.name) {
      res.status(401).send("Unauthorized");
      return;
    }

    const response = await Response.findOne({ filename }).exec();

    if (!response) {
      res.send(null);
      return;
    }

    const json_responses = response.responses;

    res.json(json_responses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

appback.put(`/enable_disable`, async (req, res) => {

  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  console.log(req.headers);
  const userID = req.query.username;

  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  const document_id = req.query.doc_id;

  try {
    const result = await AllAccess.findOne({ IdPregunta: document_id });
    const isEnabled = result.enable;
    console.log("enable_disable   "   + document_id + " " + isEnabled);
    if (!result) {
    
      return res.json({ message: "Not Found record" });
    
    }else{
      
      
  

      await  result.updateOne({ enable: !isEnabled });


      res.json({ message: "Ralizado"  });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }

});


appback.post(`/hasCryptedInfo`, async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);

  var docs_data = req.body;
  var fid = docs_data.fid;
  var userID = docs_data.uname;
  console.log(json, userID);

  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const result = await AllAccess.findOne({ file: fid });

    if (!result) {
      return res.json({ message: "Not Found record" });
    }

    console.log(result);
    res.json({ isEncrypted: result.isEncrypted });

  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }


});


appback.get(`/getResponses`, async (req, res) => {

  console.log("responses");

  const json = await decodeToken(req.headers.dgoaetoken);
  var userID = req.query.username;
  const fid = req.query.id;

  console.log("----", json, userID, fid);
  if (userID !== json?.name) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {

    const accessfile = await AllAccess.findOne({ IdPregunta: fid });
    if (!accessfile) {
      res.send({ rsize: 0, resp: [], columns: [], doc_name: "Untitled", isEnabled: false, isEncrypted: false });
      return;
    }
    console.log(accessfile);

    const isEnabled = accessfile.enable;
    const isEncrypted = accessfile.isEncrypted;
    const fgid = accessfile.gid;
    const s_response = await Response.findOne({ gid: fgid });

    let json_responses = {
      rsize: 0,
      resp: [],
      columns: 0,
      doc_name: "",
      isEnabled: isEnabled,
      isEncrypted: isEncrypted,

    };
  
    if(s_response){
      console.log(s_response?.responses.length, "gid", fgid);
      console.log("---------------------------");

      json_responses = {
        rsize: s_response?.responses.length,
        resp: s_response?.responses,
        columns: s_response?.columns,
        doc_name: s_response?.doc_name,
        isEnabled: isEnabled,
        isEncrypted: isEncrypted,
  
      };

    }
    
    console.log(json_responses);
    res.send(json_responses);

    console.log("responses");
  } catch (err) {
    console.log(err);
    res.send({ rsize: 0, resp: [], columns: [] });
  }
});

appback.get(`/getFormData`, async (req, res) => {
  const json = await decodeToken(req.headers.dgoaetoken);
  console.log(json);
  const document_id = req.query.doc_id;
  console.log(req.headers);
  try {

    const form = await Form.findOne({ IdPregunta: document_id });
    if (!form) {
      console.log("Form not found");
      res.send({
        IdPregunta: form.IdPregunta,
        document_name: form.document_name,
        document_description: form.document_description,
        isEncrypted: form.isEncrypted,
      });
    } else {
      console.log("Form found");
      res.send({
        IdPregunta: form.IdPregunta,
        document_name: form.document_name,
        document_description: form.document_description,
        isEncrypted: form.isEncrypted,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

appback.post("/verify-token", async (req, res) => {
  console.log(req.body);
  const { reCAPTCHA_TOKEN, Secret_Key } = req.body;
  console.log(req.headers);
  try {
    let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${Secret_Key}&response=${reCAPTCHA_TOKEN}`);
    console.log(response.data);

    return res.status(200).json({
      success: true,
      message: "Token successfully verified",
      verification_info: response.data
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error verifying token"
    })
  }
});

appback.listen(9000, () => {
  console.log("Express server is running port number 9000");
});






/*
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import conectarDB from "../backend/config/db.js";
import Form from "../backend/models/Form.js";
import AllAccess from "./models/AllAcces.js";
import Response from "./models/Response.js";
import CryptoJS from "crypto-js";
import axios from "axios";

const appback = express();
dotenv.config();

const ENCRYPT_STRING =  process.env.REACT_APP_ENCRYPT_STRING;

conectarDB();


appback.use(bodyParser.json());
appback.use(cors());

appback.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*", "http://localhost:3001/*", "https://dgoae.digitaloe.unam.mx/*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});

appback.get(`/data`, async (req, res) => {
  var docID = req.query.doc_id;
  var userID = req.query.username;

  try {
    const doc = await Form.findOne({ IdPregunta: docID });
    if (!doc) {
      res.status(404).send("File not found");
      return;
    }
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
});

appback.get(`/get_all_filenames_by_user`, async (req, res) => {
  var userID = req.query.username;
  Form.find({ email: userID }, (err, files) => {
    if (err) {
      console.error(err);
      res.json([]);
    } else {
      let js = files.map((file) => {
        return {
          name: file.document_name,
          formId: file.IdPregunta,
          description: file.document_description,
          questions: file.questions,
          time: file.fechaEntrega,
        };
      });
      res.json(js);
    }
  });
});

appback.get("/getform", async (req, res) => {
  const globalID = req.query.global_id;

  try {
    const allAccess = await AllAccess.findOne({ gid: globalID });
    if (allAccess.enable === true) {
      const form = await Form.findOne({ IdPregunta: allAccess.IdPregunta });
      res.send({
        document_name: form.document_name,
        document_description: form.file,
        questions: form.questions,
        isEncrypted: allAccess.isEncrypted,
      });
    } else {
      const form = await Form.findOne({ IdPregunta: allAccess.IdPregunta });
      res.send({
        document_name: form.document_name,
        document_description: "Cuestionario no habilitado",
        questions: [],
      });
      return;
    }
  } catch (err) {
    res.status(500).send("Error while loading form");
  }
});

appback.get(`/getGlobalID`, async (req, res) => {
  const gid = req.query.id;

  try {
    const result = await AllAccess.findOne({ IdPregunta: gid });
    if (!result) {
      return;
    }
    res.json({ gid: result.gid });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

appback.post("/add_question", async (req, res) => {
  const user_id = req.query.username;
  const document_id = req.query.doc_id;
  const document_data = req.body;
  
  const form = await Form.findOne({ IdPregunta: document_id });

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

  if (!form) {
    const document = new Form({
      email: user_id,
      IdPregunta: document_id,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    await document.save();
    res.json(document);
  } else {
    const document = new Form({
      email: form.email,
      IdPregunta: form.IdPregunta,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,

      questions: document_data.questions,
    });
    await form.updateOne({
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    res.json(document);
  }

  

  const allAccess = await AllAccess.findOne({ IdPregunta: document_id });
  if (!allAccess) {
    const newForm = new AllAccess({
      email: user_id,
      gid: uuidv4(),
      IdPregunta: document_id,
      enable: false,
      isEncrypted: false,
      IdRespuesta: uuidv4(),
    });
    await newForm.save();
  }
});


appback.post("/add_question_encrypted", async (req, res) => {
  const user_id = req.query.username;
  const document_id = req.query.doc_id;
  const document_data = req.body;
  
  const form = await Form.findOne({ IdPregunta: document_id });

  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  if (!form) {
    const document = new Form({
      email: user_id,
      IdPregunta: document_id,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    await document.save();
    res.json(document);
  } else {
    const document = new Form({
      email: form.email,
      IdPregunta: form.IdPregunta,
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,

      questions: document_data.questions,
    });
    await form.updateOne({
      document_name: document_data.document_name,
      document_description: document_data.document_description,
      isEncrypted: document_data.isEncrypted,
      questions: document_data.questions,
    });
    res.json(document);
  }

  

  const allAccess = await AllAccess.findOne({ IdPregunta: document_id });
  if (!allAccess) {
    const newForm = new AllAccess({
      email: user_id,
      gid: uuidv4(),
      IdPregunta: document_id,
      enable: false,
      isEncrypted: true,
      IdRespuesta: uuidv4(),
    });
    await newForm.save();
  }
});

appback.post("/remove_form", async (req, res) => {

  const user_id = req.query.username;
  const document_id = req.query.doc_id;
 
  await AllAccess.deleteOne({ IdPregunta: document_id });
  await Form.deleteOne({ IdPregunta: document_id });

   const jsonres = { message:  "Usuario:" + user_id + " borró el formulario " + document_id };
   return res.json(jsonres);
  });


appback.post("/student_response", async (req, res) => {
  const encryptInformation = (wordTextPlain) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      JSON.stringify(wordTextPlain),
      ENCRYPT_STRING
    );
    return textoCifrado.toString();
  };

  const docs_data = req.body;
  const globalID = req.query.doc_id;

  try {
    const response = await Response.findOne({
      doc_name: docs_data.doc_name,
    });
    if (!response) {
      const newResponse = new Response({
        gid: docs_data.global_id,
        IdRespuesta: docs_data.IdRespuesta,
        responses: docs_data.answer_data,
        columns: docs_data.column,
        doc_name: docs_data.doc_name,
      });
      await newResponse.save();
    } else {
      response.responses.push(docs_data.answer_data[0]);

      await response.save();
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

function isObject(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

appback.get(`/getExcel`, async (req, res) => {
  const fid = req.query.id;

  try {
    const accessfile = await AllAccess.findOne({ file: fid }).exec();

    if (!accessfile) {
      res.send(null);
      return;
    }

    const user = accessfile.email;
    const filename = accessfile.filename;
    const response = await Response.findOne({ filename }).exec();

    if (!response) {
      res.send(null);
      return;
    }

    const json_responses = response.responses;
    res.json(json_responses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

appback.post(`/enable_disable`, async (req, res) => {
  var docs_data = req.body;
  var fid = docs_data.fid;
  var isEnabled = docs_data.enabled;
  res.send(null);
});

appback.post(`/hasCryptedInfo`, async (req, res) => {
  var docs_data = req.body;
  var fid = docs_data.fid;
  try {
    const result = await AllAccess.findOne({ file: fid });
    
    if (!result) {
      return res.json({message: "Not Found record"});
    }
    res.json({ isEncrypted: result.isEncrypted });
    
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }

});


appback.get(`/getResponses`, async (req, res) => {
  try {
    const fid = req.query.id;
    const accessfile = await Form.findOne({ IdPregunta: fid });
    if (!accessfile) {
      res.send({ rsize: 0, resp: [], columns: [] });
      return;
    }

    const user = accessfile.email;
    const globalID = accessfile.gid;
    const filename = accessfile.document_name;
    const isEnabled = accessfile.enable;
    const s_response = await Response.findOne({ doc_name: filename });
    const json_responses = {
      rsize: s_response.responses.length,
      resp: s_response.responses,
      columns: s_response.columns,
      doc_name: s_response.doc_name,
      isEnabled: isEnabled,
    };

    res.send(json_responses);
  } catch (err) {
    console.log(err);
    res.send({ rsize: 0, resp: [], columns: [] });
  }
});

appback.get(`/getFormData`, async (req, res) => {
  const document_id = req.query.doc_id;

  try {

    const form = await Form.findOne({ IdPregunta: document_id });
    if (!form) {
      console.log("Form not found");
      res.send({
        IdPregunta: form.IdPregunta,
        document_name: form.document_name,
        document_description: form.document_description,
        isEncrypted: form.isEncrypted,
      });
    } else {
      console.log("Form found");
      res.send({
        IdPregunta: form.IdPregunta,
        document_name: form.document_name,
        document_description: form.document_description,
        isEncrypted: form.isEncrypted,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

appback.post("/verify-token", async (req,res) => {
  const { reCAPTCHA_TOKEN, Secret_Key} = req.body;

  try {
    let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${Secret_Key}&response=${reCAPTCHA_TOKEN}`);

    return res.status(200).json({
      success:true,
      message: "Token successfully verified",
      verification_info: response.data
    });
  } catch(error) {
    console.log(error);

    return res.status(500).json({
      success:false,
      message: "Error verifying token"
    })
  }
});

appback.listen(9000, () => {
  console.log("Express server is running port number 9000");
});
*/
