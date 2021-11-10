import React from "react";
import Container from "@mui/material/Container";
import { Navbar, Compact, Description, Wave } from "../";
import { useRouter } from "next/router";
import styled from "@mui/system/styled";

interface IDivProps extends React.HTMLAttributes<HTMLDivElement> {
  homeTab: boolean;
}
const StyledContainer = styled("div")((props: IDivProps) => {
  const { homeTab } = props;
  return {
    width: "100%",
    backgroundColor: homeTab ? "white" : "transparent",
  };
});
interface Props {
  children: any;
}

const MainLayout = (props: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("/");

  React.useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);
  return (
    <StyledContainer homeTab={activeTab === "/"}>
      <Container>
        <Navbar activeTab={activeTab} />
        {activeTab === "/" && (
          <Container maxWidth="sm">
            <Description
              justify="center"
              heading={"FIRST GLIMPSE INTO YOUR DATA WAREHOUSE"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              auctor consequat mauris. Vestibulum ornare vel odio ac hendrerit.
              Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit
              amet sapien dapibus eleifend. Nunc quis augue nulla.
            </Description>
          </Container>
        )}
        <Compact>
          <Container>{props.children}</Container>
        </Compact>
      </Container>
      {activeTab === "/" && <Wave />}
    </StyledContainer>
  );
};

export default MainLayout;
