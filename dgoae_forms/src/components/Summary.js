import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { API_URL } from '../constants';
import CryptoJS from "crypto-js";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Summary() {
    const { user, getIdTokenClaims } = useAuth0();
    const { id } = useParams();

    const [responses, setResponses] = useState([]);
    const [rsize, setRSize] = useState(0);
    const [isCripted, setCripted] = useState(false);
    const [token, setToken] = useState("");
    const [chartData, setChartData] = useState([]);
    const [questions, setQuestions] = useState([]);

    const ENCRYPT_STRING = process.env.REACT_APP_ENCRIPT_KEY;
    var navigate = useNavigate();

    useEffect(() => {
        async function getToken() {
            const t = await getIdTokenClaims();
            setToken(t.__raw);
            localStorage.setItem('token', t.__raw);
        }
        getToken();
    }, []);

    const getConfigHeader = (_token) => ({
        headers: { dgoaetoken: _token }
    });

    const decryptInformation = (wordTextCipher) => {
        if (!isCripted)
            return wordTextCipher;

        var bytes = CryptoJS.AES.decrypt(wordTextCipher, ENCRYPT_STRING);
        var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
        return textoPlano;
    };

    const decryptValues = (obj) => {
        let resp = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                resp[key] = decryptInformation(obj[key]);
            }
        }
        return resp;
    };

    useEffect(() => {
        async function getResponses() {
            if (!token) return;
            try {
                var request = await axios.get(API_URL + `/getResponses?id=${id}&username=${user.name}`, getConfigHeader(token));

                setRSize(request.data.rsize);
                setQuestions(request.data.questions);
                setResponses(request.data.resp);
                setCripted(request.data.isEncrypted);

                processChartData(request.data.resp, request.data.questions, request.data.isEncrypted);

            } catch (error) {
                console.error("Error obteniendo respuestas:", error);
            }
        }
        getResponses();
    }, [token, id]);

    const processChartData = (resp, questions, crypted) => {

        console.log("Data", crypted, resp);
        console.log("Questions", questions);

        let freqData = {};

        const relevantQuestions = questions.filter(q => q.questionType === "radio" || q.questionType === "checkbox");


        let info = [];
        if (crypted) {
            info = resp.map((r) => decryptValues(r));

        } else {
            info = resp;
        }

        console.log("INFO", info);
        relevantQuestions.forEach(q => {
            freqData[q.questionText] = {};
        });
        console.log("freqData", freqData);
        info.forEach(entry => {
            console.log("Entry", entry);
            relevantQuestions.forEach(q => {
                const answer = decryptInformation(entry[q.questionText]);
                console.log("answer", answer);
                if (answer) {
                    if (Array.isArray(answer)) {
                        answer.forEach(opt => {
                            freqData[q.questionText][(opt)] = (freqData[q.questionText][(opt)] || 0) + 1;
                        });
                    } else {
                        freqData[q.questionText][answer] = (freqData[q.questionText][answer] || 0) + 1;
                    }
                }
            });
        });

        let formattedChartData = relevantQuestions.map(q => {
            let data = { question: q.questionText };
            Object.keys(freqData[q.questionText]).forEach(option => {
                data[option] = freqData[q.questionText][option];
            });
            return data;
        });

        setChartData(formattedChartData);
    };

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

    async function descargaExcel() {

        let info = [];
        console.log(responses);
        if (isCripted) {
            info = responses.map((r) => decryptValues(r));

        } else {
            info = responses;
        }

        if (!responses.length) return;
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(info);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, id + fileExtension);
    }

    return (
        <div className='submit' style={{ height: "76vh" }}>
            <div className='user_form'>
                <div className='user_form_section'>
                    <Typography style={{ fontSize: "24px" }}>Resumen de las respuestas</Typography>
                    <div>Total de aplicaciones: {rsize}</div>
                </div>

                <div className='user_form_section'>
                    <Typography style={{ fontSize: "24px" }}>Resumen</Typography>
                    <div style={{ margin: "5px" }}>
                        <span>Descargar en un archivo Excel </span>
                        <Button variant='contained' color='primary' onClick={descargaExcel} style={{ fontSize: '12px' }}>Descargar</Button>
                    </div>

                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="question" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Object.keys(chartData[0]).filter(key => key !== "question").map((key, index) => (
                                    <Bar key={index} dataKey={key} fill={colors[index % colors.length]} name={key} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <Typography style={{ fontSize: "16px", marginTop: "20px" }}>No hay datos disponibles para graficar.</Typography>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default Summary;


/*
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

import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";

function Summary() {


    const { user, getIdTokenClaims } = useAuth0();
    const { id } = useParams();

    var [responses, setResponses] = useState([]);
    var [rsize, setRSize] = useState(0);
    var [rcols, setRCols] = useState([]);
    //var [questions, setQuestions] = useState([]);
    var [isCripted, setCripted] = useState(false);
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



    const decryptInformation = (wordTextCipher) => {

        if (!isCripted)
            return wordTextCipher;
        var bytes = CryptoJS.AES.decrypt(
            wordTextCipher,
            ENCRYPT_STRING
        );


        var textoPlano = bytes.toString(CryptoJS.enc.Utf8);
        return textoPlano;
    };

    useEffect(() => {

        
        async function getReponses() {
        if(token){
            var request = await axios.get(API_URL + `/getResponses?id=${id}&username=${user.name}`,getConfigHeader(token));
            

            responses = request.data.resp;
            rsize = request.data.rsize;
            rcols = request.data.columns;
          
            isCripted = request.data.isEncrypted;

            setCripted(isCripted);
            setResponses(responses);
            setRSize(rsize);
            setRCols(rcols);

            }
        };

        getReponses();

    }, [token]);


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

        console.log(responses);
        if (isCripted) {
           console.log("Info_____");
            info = responses.map((r) => decryptValues(r));

        } else {
            info = responses;
        }
        console.log("Info", info);

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
                            <span>Descargar en un archivo Excel </span>
                            <Button variant='contained' color='primary' onClick={(e) => descargaExcel()} style={{ fontSize: '12px' }}>Descargar</Button>
                        </div>

                        <br></br>
                        <div className='blank'>
                            
                        </div>


                        <div className='footer'>

        <Footer />


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Summary

*/