
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconButton, Switch, Typography } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import axios from 'axios'
import './Summary.css'
import Button from '@material-ui/core/Button'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { API_URL } from '../constants';
import CryptoJS from "crypto-js";


function Summary() {


    const { id } = useParams();

    var [responses, setResponses] = useState([]);
    var [rsize, setRSize] = useState(0);
    var [rcols, setRCols] = useState([]);
    var [questions, setQuestions] = useState([]);
    var [isCripted, setCripted] = useState(false);
    var navigate = useNavigate();

    const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;
    //let items = [];


    const decryptInformation = (wordTextCipher) => {
    
    
        if(!isCripted)
        return wordTextCipher;
      
        console.log("Decrypt: " +  wordTextCipher);
        
        var bytes = CryptoJS.AES.decrypt(
          wordTextCipher,
          ENCRYPT_STRING
        );
    
    
        var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
        console.log("Decrypt: " +  textoPlano);
        return textoPlano;
      };

    useEffect(() => {

        async function getReponses() {

            var request = await axios.get(API_URL + `/getResponses?id=${id}`);
            var cripted = await axios.post(
                API_URL + `/hasCryptedInfo`,
                {
                    fid: id
                }
            );

            responses = request.data.resp;

            rsize = request.data.rsize;
            rcols = request.data.columns;
            questions = request.questions;

            console.log("Res: ", responses);
            console.log("Size: ", rsize);
            console.log("Cols: ", rcols);
            console.log("Quest: ", questions);
            isCripted = cripted.data.isEncrypted;
            setCripted(isCripted);
            setResponses(responses);
            setRSize(rsize);
            setRCols(rcols);
            setQuestions(questions);


        };

        getReponses();

    }, []);

    const decryptValues = ( obj) => {
        let resp = {}
        for (const key in obj) {
            if(obj.hasOwnProperty(key)){
                resp[key] = decryptInformation(obj[key]);
            }
        }
        return resp;
    } 
    

    async function descargaExcel() {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let info = [];
        if(isCripted){
            console.log("Info_____");
         info = responses.map((r) => decryptValues(r));
         
        }else{
           info = responses;
        }
        console.log("Info",info);
        const ws = XLSX.utils.json_to_sheet(info);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, id + fileExtension);


    }

    function evalResponses() {


        let resumen = {};

    }


    function regresarPrincipal() {
        navigate("/");
    }


    return (
        <div className='submit' style={{ height: "76vh" }}>
            <div className='user_form'>
                <div className='user_form_section'>
                    <div className='user_form_questions' style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight: "24px", paddingBottom: "8px", fontSize: "24px" }} >Resumen de las respuestas</Typography>

                        </div>
                        <div>

                            Total de aplicaciones {rsize}
                        </div>
                    </div>

                </div>



                <div className='user_form_section'>
                    <div className='user_form_questions' style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight: "24px", paddingBottom: "8px", fontSize: "24px" }} >Resumen </Typography>

                        </div>
                        <br></br>
                        <div style={{ margin: "5px" }}>
                            <span>Descargar Excel </span>
                            <Button variant='contained' color='primary' onClick={(e) => descargaExcel()} style={{ fontSize: '12px' }}>Descargar</Button>
                        </div>

                        <br></br>
                        <div className='save_form'>
                            <Button variant='contained' color='secondary' onClick={regresarPrincipal} style={{ fontSize: '10px' }}>Regresar</Button>
                        </div>


                        <div className='user_footer'>
                            DGOAE FORMS
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Summary


