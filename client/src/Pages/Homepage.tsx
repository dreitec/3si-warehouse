import React from "react";
import { Description, TabBox } from "../components";
import {
  PeopleOutline as PeopleOutlineIcon,
  PieChart as PieChartIcon,
  Map as MapIcon,
  Height as HeightIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";

interface Props {}

const Homepage = (props: Props) => {
  return (
    <div>
      <Description heading="FIRST GLIMPSE INTO YOUR DATA WAREHOUSE">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor
        consequat mauris. Vestibulum ornare vel odio ac hendrerit. Curabitur
        lacinia sem id pharetra hendrerit. Nam quis lacus sit amet sapien
        dapibus eleifend. Nunc quis augue nulla.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Quisque auctor consequat mauris. Vestibulum
        ornare vel odio ac hendrerit. Curabitur lacinia sem id pharetra
        hendrerit. Nam quis lacus sit amet sapien dapibus eleifend. Nunc quis
        augue nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque auctor consequat mauris. Vestibulum ornare vel odio ac
        hendrerit. Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus
        sit amet sapien dapibus eleifend. Nunc quis augue nulla.
      </Description>

      <TabBox />

      <Description
        heading="FIRST GLIMPSE INTO YOUR DATA WAREHOUSE"
        Icon={PeopleOutlineIcon}
        button={true}
        margin={20}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor
        consequat mauris. Vestibulum ornare vel odio ac hendrerit. Curabitur
        lacinia sem id pharetra hendrerit. Nam quis lacus sit amet sapien
        dapibus eleifend. Nunc quis augue nulla.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Quisque auctor consequat mauris. Vestibulum
        ornare vel odio ac hendrerit. Curabitur lacinia sem id pharetra
        hendrerit. Nam quis lacus sit amet sapien dapibus eleifend. Nunc quis
        augue nulla.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque auctor consequat mauris. Vestibulum ornare vel odio ac
        hendrerit. Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus
        sit amet sapien dapibus eleifend. Nunc quis augue nulla.
      </Description>
    </div>
  );
};

export default Homepage;
