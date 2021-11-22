import React from "react";
import Container from "@mui/material/Container";
import { Navbar, Compact, Description, Wave, TabBox } from "../";
import { useRouter } from "next/router";
import styled from "@mui/system/styled";
import { theme } from "../../mui";

interface IDivProps extends React.HTMLAttributes<HTMLDivElement> {
  homeTab: boolean;
  exportPage: boolean;
}
const StyledContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "homeTab",
})((props: IDivProps) => {
  const { homeTab } = props;
  return {
    width: "100%",
    backgroundColor: homeTab ? "white" : "transparent",
    padding: 0,
    marginBottom: props.exportPage ? theme.spacing(15) : 0,
  };
});

const MainLayout = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("/");

  React.useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);
  const nonTabbedLayout = activeTab === "/" || activeTab === "/export";
  return (
    <StyledContainer
      homeTab={nonTabbedLayout}
      exportPage={activeTab === "/export"}
    >
      <Container>
        <Navbar activeTab={activeTab} />
        {nonTabbedLayout && (
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
      </Container>
      {!nonTabbedLayout && (
        <Compact>
          <Container sx={{ padding: 0 }}>
            <TabBox />
          </Container>
        </Compact>
      )}

      {nonTabbedLayout ? <Wave /> : ""}
    </StyledContainer>
  );
};

export default MainLayout;
