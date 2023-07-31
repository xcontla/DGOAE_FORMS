import { Button, styled, TextField } from "@mui/material";
import React, { useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: "1rem",
    width: "300px",
  }));

const Form = () => {
  const [password, setPassword] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <StyledTextField
        label="Introduce contraseña"
        variant="filled"
        required
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
      />
      
      <div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "2rem" }}
        >
          Aceptar
        </Button>
      </div>
    </form>
  );
};

export default Form;