import React from "react";

import formimage from "../images/1.png";
import { FiStar, FiSettings } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
import avatarimage from "../images/user.jpg";
import { IoMdFolderOpen } from "react-icons/io";

import { useAuth0 } from "@auth0/auth0-react";

import ColorLensIcon from "@material-ui/icons/ColorLens";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HouseIcon from "@material-ui/icons/HomeOutlined";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { useStateValue } from "./StateProvider";
import { useNavigate, useParams } from "react-router-dom";
import { LogoutButton } from "../auth/Logout";

import "./FormHeader.css";

function FormHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ document_name }, dispatch] = useStateValue();

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
        <img src={formimage} style={{ height: "45px", width: "auto" }} />
      </div>
      <div className="form_header_right">
        {/* <IconButton>
          <ColorLensIcon className="form_header_icon" size="small" />
        </IconButton> */}
        <IconButton onClick={navigates}>
          <AiOutlineEye className="form_header_icon" />
        </IconButton>
        {/* <IconButton>
          <FiSettings className="form_header_icon" />
        </IconButton> */}

        <IconButton onClick={back_init}>
          <HouseIcon className="form_header_icon" />
        </IconButton>

        <LogoutButton />
        <IconButton>
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
