import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Description,
  FullWidth,
  Compact,
  BottomNavigation,
} from "../../components";

import { UnservedGeoSection } from "../../sections";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Unserved</title>
        <meta
          name="description"
          content="Charts and data export for Unserved children"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FullWidth>
          <Compact>
            <Description button={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              auctor consequat mauris. Vestibulum ornare vel odio ac hendrerit.
              Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit
              amet sapien dapibus eleifend. Nunc quis augue nulla.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Quisque auctor
              consequat mauris. Vestibulum ornare vel odio ac hendrerit.
              Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit
              amet sapien dapibus eleifend. Nunc quis augue nulla.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Quisque auctor
              consequat mauris. Vestibulum ornare vel odio ac hendrerit.
              Curabitur lacinia sem id pharetra hendrerit. Nam quis lacus sit
              amet sapien dapibus eleifend. Nunc quis augue nulla.
            </Description>
          </Compact>
        </FullWidth>
        <Compact>
          <UnservedGeoSection />
          <BottomNavigation />
        </Compact>
      </main>
    </div>
  );
};

export default Home;
