import React from "react";
import { Description, TabBox } from "../components";
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
    </div>
  );
};

export default Homepage;
