import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainBody from "./MainBody";
import Template from "./Template";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Welcome() {
  const { user } = useAuth0();

  return (
    <div>
      <Header />,
      <Template />,
      <MainBody />
    </div>
  );
}

export default Welcome;
