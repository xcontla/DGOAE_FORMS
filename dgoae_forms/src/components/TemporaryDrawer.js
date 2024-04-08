import React from "react";

import MenuIcon from "@mui/icons/Menu";
import {
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@mui/core";
import "./TemporaryDrawer.css";
import docsimage from "../images/google_docs_logo.png";
import formimage from "../images/google-forms-logo-icon.png";
import driveimage from "../images/google_drive_logo.png";

import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  listItem: {
    marginLeft: "20px",
    fontsize: "14px",
    fontWeight: "500",
    color: "gray",
  },
  logoimages: {
    height: "20px",
    width: "auto",
  },
  settings: {
    marginLeft: "20px",
    fontsize: "14px",
    color: "gray",
  },
});

function TemporaryDrawer() {
  const classes = useStyles();
  var [state, setState] = React.useState({
    left: false,
  });

  const toogleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const listElementSideBar = (anchor) => (
    <div style={{ width: "200px" }} role="presentation">
      <Divider />
      <List>
        <ListItem>
          <ListItemText style={{ fontSize: "48px", marginLeft: "5px" }}>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              D
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              G
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              O
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              A
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                marginRight: "10px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              E
            </span>
            <span
              style={{
                color: "#5f6368",
                fontWeight: "700",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              Docs
            </span>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List style={{ marginLeft: "8px", marginRight: "8px", marginTop: "8px" }}>
        <Link to={
           "/credits"
        }>
          <ListItem className="list_item">
            <img src={docsimage} className={classes.logoimages} />
            <div className={classes.listItem}>Creditos</div>
          </ListItem>
        </Link>

        <ListItem className="list_item">
          <img src={formimage} className={classes.logoimages} />
          <div className={classes.listItem}>Creditos</div>

        </ListItem>
        <ListItem className="list_item">
          <img src={docsimage} className={classes.logoimages} />
          <div className={classes.listItem}>Creditos</div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="list_item">
          <FiSettings />
          <div className={classes.settings}>Settings</div>
        </ListItem>
        <ListItem className="list_item">
          <BsQuestionCircle />
          <div className={classes.settings}>Help & Feedback</div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="list_item">
          <img src={driveimage} className={classes.logoimages} />
          <div className={classes.listItem}>Drive</div>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toogleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>

        <Drawer
          open={state["left"]}
          onClose={toogleDrawer("left", false)}
          anchor={"left"}
        >
          {listElementSideBar("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default TemporaryDrawer;



/*
import React from "react";

import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import "./TemporaryDrawer.css";
import docsimage from "../images/google_docs_logo.png";
import formimage from "../images/google-forms-logo-icon.png";
import driveimage from "../images/google_drive_logo.png";

import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  listItem: {
    marginLeft: "20px",
    fontsize: "14px",
    fontWeight: "500",
    color: "gray",
  },
  logoimages: {
    height: "20px",
    width: "auto",
  },
  settings: {
    marginLeft: "20px",
    fontsize: "14px",
    color: "gray",
  },
});

function TemporaryDrawer() {
  const classes = useStyles();
  var [state, setState] = React.useState({
    left: false,
  });

  const toogleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const listElementSideBar = (anchor) => (
    <div style={{ width: "200px" }} role="presentation">
      <Divider />
      <List>
        <ListItem>
          <ListItemText style={{ fontSize: "48px", marginLeft: "5px" }}>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              D
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              G
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              O
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              A
            </span>
            <span
              style={{
                color: "#2349F5",
                fontWeight: "500",
                fontSize: "22px",
                marginRight: "10px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              E
            </span>
            <span
              style={{
                color: "#5f6368",
                fontWeight: "700",
                fontSize: "22px",
                fontFamily: "'Product Sans', Arial, sans-serif",
              }}
            >
              Docs
            </span>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List style={{ marginLeft: "8px", marginRight: "8px", marginTop: "8px" }}>
        <Link to={
           "/credits"
        }>
          <ListItem className="list_item">
            <img src={docsimage} className={classes.logoimages} />
            <div className={classes.listItem}>Creditos</div>
          </ListItem>
        </Link>

        <ListItem className="list_item">
          <img src={formimage} className={classes.logoimages} />
          <div className={classes.listItem}>Creditos</div>

        </ListItem>
        <ListItem className="list_item">
          <img src={docsimage} className={classes.logoimages} />
          <div className={classes.listItem}>Creditos</div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="list_item">
          <FiSettings />
          <div className={classes.settings}>Settings</div>
        </ListItem>
        <ListItem className="list_item">
          <BsQuestionCircle />
          <div className={classes.settings}>Help & Feedback</div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem className="list_item">
          <img src={driveimage} className={classes.logoimages} />
          <div className={classes.listItem}>Drive</div>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toogleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>

        <Drawer
          open={state["left"]}
          onClose={toogleDrawer("left", false)}
          anchor={"left"}
        >
          {listElementSideBar("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default TemporaryDrawer;
*/
