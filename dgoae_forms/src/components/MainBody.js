import React, { useEffect, useState } from "react";
import StorageIcon from "@material-ui/icons/Storage";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import contact from "../images/contact.png";
import "./MainBody.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import QuestionForm from "./QuestionForm";
import Footer from "./Footer";


function MainBody({searchForm}) {
  const { user } = useAuth0();
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

   function navegate_to(docname) {
    var fname = docname.split(".");
   
    navigate("/form/" + fname[0], {files})
  }

  

  useEffect(() => {
    async function filesnames() {
      var request = await axios.get(
        `https://dgoae.digitaloe.unam.mx/apiforms/get_all_filenames_by_user?username=${user.name}`
      );
      let filenames = request.data;
      setFiles(filenames);
    }

    filesnames();
  }, []);

  return (
    <div>
      <div className="main_body">
      <div className="main_body_top">
        <div
          className="main_body_top_left"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Formularios recientes
        </div>
        <div className="main_body_top_right">
          <div
            className="main_body_top_center"
            style={{ fontSize: "14px", marginRight: "125px" }}
          >
            Archivos de {user.name} <ArrowDropDownIcon />
          </div>
        </div>
      </div>
      <div className="main_body_docs">
        {files.map((element, index) => (
          <div
            key={index}
            className="doc_cards"
            onClick={() => {
              navegate_to(element.formId);
            }}
          >
            <img src={contact} className="doc_image" />
            <div className="doc_card_content">
              <h5 style={{ overflow: "ellipsis" }}>
                {element.document_name}
              </h5>

              <div
                className="doc_content"
                style={{ fontSize: "12px", color: "gray" }}
              >
                <div className="content_left">
                  <StorageIcon
                    style={{
                      fontSize: "12px",
                      color: "white",
                      backgroundColor: "#6e2594",
                      padding: "3px",
                      marginRight: "3px",
                      borderRadius: "2px",
                    }}/>
                  <div className="column_date">
                    <h5>{element.name}</h5>
                    <h5>{element.time.split('T')[0]}</h5>
                  </div>
                </div>
                <MoreVertIcon style={{ fontSize: "16px", color: "gray" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}

export default MainBody;
