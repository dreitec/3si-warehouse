import React from "react";

import { Container, styled } from "@mui/material";
import { Navbar } from "../components";

const StyledMain = styled("main")(({ theme }) => ({
  marginTop: theme.spacing(8),
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
