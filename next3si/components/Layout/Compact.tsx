import React from "react";

import { Container, styled } from "@mui/material";
import { Navbar } from "../";

const StyledMain = styled("div")(({ theme }) => ({
  padding: `0`,
}));
interface Props {
  children: any;
}

const MainLayout = (props: Props) => {
  return (
    <StyledMain>
      <Container>{props.children}</Container>
    </StyledMain>
  );
};

export default MainLayout;
