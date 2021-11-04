import React from "react";

import { Container } from "@mui/material";
import { Navbar, Compact } from "../";

interface Props {
  children: any;
}

const MainLayout = (props: Props) => {
  return (
    <Container>
      <Navbar />
      <Compact>
        <Container>{props.children}</Container>
      </Compact>
    </Container>
  );
};

export default MainLayout;
