import React from "react";

import Container from "@mui/material/Container";
import styled from "@mui/system/styled";

const StyledMain = styled("div")(({ theme }) => ({
  padding: 0,
}));
interface Props {
  children: any;
}

const MainLayout = (props: Props) => {
  return (
    <StyledMain>
      <Container sx={{ padding: 0 }}>{props.children}</Container>
    </StyledMain>
  );
};

export default MainLayout;
