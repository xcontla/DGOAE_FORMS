import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import lottie from "lottie-web";

const LottieImage = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../images/form.json"),
    });
  }, []);

  return <Lottie className="container" ref={container}></Lottie>;
};

const Lottie = styled.div`
  width: 70%;
  height: 500px;
`;

export default LottieImage;
