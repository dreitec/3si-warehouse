import React from "react";
import { Description, TabBox, ChartContainer, LineChart } from "../components";
import {
  PeopleOutline as PeopleOutlineIcon,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Height as HeightIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { Container } from "@material-ui/core";
import { getOneYearChildData } from "../api";

interface Props {}

const Homepage = (props: Props) => {
  const [eligibility, setEligibility] = React.useState(false);

  return (
    <div>
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

        <Description
          heading="FIRST GLIMPSE INTO YOUR DATA WAREHOUSE"
          Icon={PeopleOutlineIcon}
          button={true}
          margin={20}
        >
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
      </Container>
      <ChartContainer
        checked={eligibility}
        setChecked={setEligibility}
        labels={["Percent", "Number"]}
      >
        <LineChart
          keyName={eligibility ? "number" : "percentage"}
          dataFunction={getOneYearChildData}
        />
      </ChartContainer>
      {/* <ChartContainer
        checked={eligibility}
        setChecked={setEligibility}
        labels={["Percent", "Number"]}
      >
        <LineChart
          keyName={eligibility ? "percentage" : "number"}
          dataFunction={getOneYearChildData}
        />
      </ChartContainer> */}
      <Container maxWidth="md">
        <Description
          heading="Service"
          Icon={PieChartIcon}
          button={true}
          margin={20}
        >
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
      </Container>
    </div>
  );
};

export default Homepage;
