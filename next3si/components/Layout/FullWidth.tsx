import React from "react";
import Container from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
}

const FullWidth = (props: Props) => {
  const { children } = props;
  return (
    <div style={{ backgroundColor: "white", maxWidth: "none" }}>{children}</div>
  );
};

export default FullWidth;
