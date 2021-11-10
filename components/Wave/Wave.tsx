import React from "react";
import styled from "@mui/system/styled";

const Container = styled("div")(() => ({
  height: "150px",
  overflow: "hidden",
  position: "relative",
  bottom: "-150px",
}));
const Wave = () => {
  return (
    <Container>
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ height: "100%", width: "100%" }}
      >
        <path
          d="M0.00,49.98 C140.79,187.00 295.99,-57.72 500.00,49.98 L501.41,-36.02 L0.00,0.00 Z"
          style={{ stroke: "none", fill: "white" }}
        />
      </svg>
    </Container>
  );
};

export default Wave;
