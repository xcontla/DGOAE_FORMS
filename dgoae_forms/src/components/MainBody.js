
import React, { useEffect, useState } from "react";
import StorageIcon from "@material-ui/icons/Storage";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import contact1 from "../images/contact.png";
import contact2 from "../images/contact2.png";
import contact3 from "../images/contact3.png";
import contact4 from "../images/contact4.png";
import contact5 from "../images/contact5.png";
import contact6 from "../images/contact6.png";
import contact7 from "../images/contact7.png";
import "./MainBody.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import { API_URL } from "../constants";

const contactsImages = [
  contact1, contact2, contact3, contact4, contact5, contact6, contact7
];

function MainBody({ searchForm }) {

  const { user, getIdTokenClaims } = useAuth0();
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  function navegate_to(docname) {
    var fname = docname.split(".");
    navigate("/form/" + fname[0], { files })
  }


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

  useEffect(() => {

    async function filesnames() {
      if (token) {
        var request = await axios.get(
          API_URL + `/get_all_filenames_by_user?username=${user.name}`, getConfigHeader(token)
        );
        let filenames = request.data;
        setFiles(filenames);
      }

    }
    filesnames();
  }, [token]);

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
              <img src={contactsImages[index % contactsImages.length]} className="doc_image" />
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
                      }} />
                    <div className="column_date">
                      <h5>{element.name}</h5>
                      <h5>{element.time.split('T')[0]}</h5>
                      <h5>{element.enabled}</h5>
                    </div>
                  </div>
                  <MoreVertIcon style={{ fontSize: "16px", color: "gray" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default MainBody;



/*import React, { useEffect, useState } from "react";
import StorageIcon from "@material-ui/icons/Storage";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import contact1 from "../images/contact.png";
import contact2 from "../images/contact2.png";
import contact3 from "../images/contact3.png";
import contact4 from "../images/contact4.png";
import contact5 from "../images/contact5.png";
import contact6 from "../images/contact6.png";
import contact7 from "../images/contact7.png";
import "./MainBody.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import { API_URL } from "../constants";


const contactsImages = [
  contact1,contact2, contact3, contact4,contact5, contact6, contact7
];

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
        API_URL + `/get_all_filenames_by_user?username=${user.name}`
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
            <img src={contactsImages[index%contactsImages.length]} className="doc_image" />
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


*/
