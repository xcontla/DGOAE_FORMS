import React from "react";

import formimage from "../images/1.png";
import { AiOutlineEye } from "react-icons/ai";
import { IconButton } from "@material-ui/core";

import { useAuth0 } from "@auth0/auth0-react";
import HouseIcon from "@material-ui/icons/HomeOutlined";
import Avatar from "@material-ui/core/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { LogoutButton } from "../auth/Logout";

import "./FormHeader.css";

function FormHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();

  function navigates() {
    navigate(`/viewresponse/${id}`);
  }

  function back_init() {
    navigate("/");
  }

  return (
    <div className="form_header">
      <div className="form_header_left">
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
      </div>
      <div className="form_header_right" >
        <IconButton onClick={navigates} title="Ver como usuario">
          <AiOutlineEye className="form_header_icon" />
        </IconButton>

        <IconButton onClick={back_init} title="Regresar a inicio">
          <HouseIcon className="form_header_icon" />
        </IconButton>

        <LogoutButton />
        <IconButton onClick={back_init} title="Regresar a inicio">
          <Avatar
            style={{ height: "30px", width: "30px" }}
            src={user.picture}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default FormHeader;
