import React from "react";
import { Description, TabBox } from "../components";
import {
  GeographicalEligibilitySection,
  EligbilitySection,
  ServedSection,
  GeograpicallyServedSection,
  ProvidersSection,
  UnservedChildrenScatterGraphSection,
  UnservedChildrenChoroplethGraphSection,
  ExportSection,
} from "../Sections";

import { Container } from "@mui/material";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Homepage = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Description heading="FIRST GLIMPSE INTO YOUR DATA WAREHOUSE">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          auctor consequat mauris. Vestibulum ornare vel odio ac hendrerit.
          Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit amet
          sapien dapibus eleifend. Nunc quis augue nulla.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Quisque auctor consequat mauris.
          Vestibulum ornare vel odio ac hendrerit. Curabitur lacinia sem id
          pharetra hendrerit. Nam quis lacus sit amet sapien dapibus eleifend.
          Nunc quis augue nulla.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque auctor consequat mauris. Vestibulum ornare
          vel odio ac hendrerit. Curabitur lacinia sem id pharetra hendrerit.
          Nam quis lacus sit amet sapien dapibus eleifend. Nunc quis augue
          nulla.
        </Description>

        <TabBox />
      </Container>
      <Route path="/" exact>
        <EligbilitySection />
        <GeographicalEligibilitySection />
      </Route>
      <Route path="/service">
        <ServedSection />
        <GeograpicallyServedSection />
      </Route>
      <Route path="/providers">
        <ProvidersSection />
      </Route>
      <Route path="/gaps">
        <UnservedChildrenChoroplethGraphSection />
        <UnservedChildrenScatterGraphSection />
      </Route>
      <Route path="/export">
        <ExportSection />
      </Route>
    </Router>
  );
};

export default Homepage;
