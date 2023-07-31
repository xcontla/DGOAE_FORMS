import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
export const LogoutButton = () => {
  const { logout } = useAuth0();

  // return <Button onClick={() => logout({returnTo: window.location.origin})} color='primary' >Salir</Button>
  return (
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
      variant="contained"
      color="secondary"
      startIcon={<ExitToAppIcon />}
    >
      Salir
    </Button>
  );
};
