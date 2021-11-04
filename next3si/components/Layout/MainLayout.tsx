import React from "react";

import { Container, styled } from "@mui/material";
import { Navbar } from "../";

const StyledMain = styled("main")(({ theme }) => ({
  padding: `${theme.spacing(8)} 0px`,
}));
interface Props {
  children: any;
}

const MainLayout = (props: Props) => {
  return (
    <Container>
      <Navbar />
      <StyledMain>
        <Container>{props.children}</Container>
      </StyledMain>
    </Container>
  );
};

export default MainLayout;
