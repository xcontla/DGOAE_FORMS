import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, styled } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { APP_URL2 } from "../constants";

export const LogoutButton = () => {
  const { logout } = useAuth0();
  
  return (
    <Button
      style={{backgroundColor: "#b71c1c", color:"whitesmoke"}}
      onClick={() => logout({ returnTo: window.location.origin + APP_URL2 })}
      variant="contained"
      startIcon={<ExitToAppIcon />
      
    }
    >
      Cerrar Sesión
    </Button>
  );
};
