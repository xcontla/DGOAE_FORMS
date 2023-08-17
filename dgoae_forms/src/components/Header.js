import React, { useEffect, useState } from "react";
import "./Header.css";
import { IconButton } from "@material-ui/core";
import formimage from "../images/1.png";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";
import TemporaryDrawer from "./TemporaryDrawer";

import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../auth/Logout";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [searchForm, setSearchForm] = useState([]);

  const handleChange = (e) => {
    setSearchForm(e.target.value);
  };


  useEffect(() => {
    async function filesnames() {
      var request = await axios.get(
        `https://dgoae.digitaloe.unam.mx/apiforms/get_all_filenames_by_user?username=${user.name}`
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
        {/* <TemporaryDrawer /> */}
        <img
          src={formimage}
          alt="no img"
          width="30px"
          height="30px"
          className="form_image"
        />
        <div className="info">DGOAE-FORMS</div>
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
        {/* <IconButton>
          <AppsIcon />
        </IconButton> */}
        <LogoutButton />
        <IconButton>
          <Avatar src={user.picture} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
