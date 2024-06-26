
import React, { useEffect, useState } from "react";
import "./Header.css";
import { IconButton } from "@material-ui/core";
import formimage from "../images/logoDGOAE.jpg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../auth/Logout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";


function Header() {
  const { user, getIdTokenClaims } = useAuth0();
  const [searchForm, setSearchForm] = useState([]);
  const [token, setToken] = useState("");
  var config = {};

  function getConfigHeader(_token) {
    return {
      headers: {
        dgoaetoken: _token
      }
    };
  };

  useEffect(() => {
    async function getToken() {
      const t = await getIdTokenClaims();
      setToken(t.__raw);
      localStorage.setItem('token', t.__raw);
    };
    getToken();
  }, [token]);

  const handleChange = (e) => {
    setSearchForm(e.target.value);
  };

  useEffect(() => {
    
    async function filesnames() {
      if (token) {
        var request = await axios.get(
          API_URL + `/get_all_filenames_by_user_header?username=${user.name}`, getConfigHeader(token)
        );
        setSearchForm(request.data);
      }
    }
    filesnames();
  }, [token]);

  const navigate = useNavigate();

  function navegate_to(docname) {
    var fname = docname.split(".");
    navigate("/form/" + fname[0])
  }

  return (
    <div className="header">
      <div className="header_info">
        <img
          src={formimage}
          alt="no img"
          width="100px"
          className="form_image"
        />
      </div><div className="header_info">
        <span className="info">FORMULARIOS</span>
      </div>
      <div className="header_search">

        <Autocomplete
          disablePortal
          id={searchForm.formId}
          options={searchForm}
          getOptionLabel={(searchForm) => searchForm.id +"." + searchForm.name  || ""}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Buscar Formulario" />
          )}
          onChange={(event, value) => {
            navegate_to(value.formId);
          }}

        />

      </div>
      <div className="header_right">
        <LogoutButton />
        <IconButton>
          <Avatar src={user.picture} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;



/*
import React, { useEffect, useState } from "react";
import "./Header.css";
import { IconButton } from "@material-ui/core";
import formimage from "../images/1.png";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar } from "@material-ui/core";

import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../auth/Logout";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

function Header() {
  const { user } = useAuth0();
  const [searchForm, setSearchForm] = useState([]);

  const handleChange = (e) => {
    setSearchForm(e.target.value);
  };


  useEffect(() => {
    async function filesnames() {
      var request = await axios.get(
         API_URL + `/get_all_filenames_by_user?username=${user.name}`
      );
      let filenames = request.data;

      setSearchForm(filenames);
    }

    filesnames();
  }, []);

  const navigate = useNavigate();

  function navegate_to(docname) {
    var fname = docname.split(".");
   
    navigate("/form/" + fname[0])
  }

  return (
    <div className="header">
      <div className="header_info">
        <img
          src={formimage}
          alt="no img"
          width="30px"
          height="30px"
          className="form_image"
        />
        <div className="info">DGOAE-FORMULARIOS</div>
      </div>
      <div className="header_search">
     
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={searchForm}
          getOptionLabel={(searchForm) => searchForm.name || ""}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Buscar Formulario" />
          )}
          onChange={(event, value) => {
            
            navegate_to(value.formId);
          }}
          
        />
      
      </div>
      <div className="header_right">
        <LogoutButton />
        <IconButton>
          <Avatar src={user.picture} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
*/
