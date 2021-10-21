import React from "react";
import { Description, TabBox, ChartContainer, LineChart } from "../components";
import { GeographicalEligibilitySection } from "../Sections";
import {
  PeopleOutline as PeopleOutlineIcon,
  PieChart as PieChartIcon,
  //   Map as MapIcon,
  //   Height as HeightIcon,
  //   SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { Container } from "@material-ui/core";
import { getEligibilityData, getServedData } from "../api";

const Homepage = () => {
  const [eligibilityNotation, setEligibilityNotation] = React.useState(false);
  const [servedNotation, setservedNotation] = React.useState(false);

  const [servedData, setServedData] = React.useState();
  const [eligibilityData, setEligibilityData] = React.useState();

  const populateServedData = async (keys?: string[]) => {
    try {
      const response: any = await getServedData(keys);
      setServedData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const populateEligibilityData = async (keys?: string[]) => {
    try {
      const response: any = await getEligibilityData(keys);
      setEligibilityData(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    populateEligibilityData();
    populateServedData();
  }, []);

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
      {/* <ChartContainer
        checked={eligibilityNotation}
        setChecked={setEligibilityNotation}
        labels={["Percent", "Number"]}
        title="Eligibility Over Time"
        getData={populateEligibilityData}
      >
        <LineChart
          keyName={eligibilityNotation ? "number" : "percentage"}
          dataFromProps={eligibilityData}
        />
      </ChartContainer> */}

      <GeographicalEligibilitySection />

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
      {/* <ChartContainer
        checked={servedNotation}
        setChecked={setservedNotation}
        labels={["Percent", "Number"]}
        title="Children Served Over Time"
        getData={populateServedData}
      >
        <LineChart
          keyName={servedNotation ? "number" : "percentage"}
          dataFromProps={servedData}
        />
      </ChartContainer> */}
    </div>
  );
};

export default Homepage;
