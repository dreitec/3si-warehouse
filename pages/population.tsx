import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Description, FullWidth, Compact } from "../components";
import { PoplationLineChatSection } from "../sections";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Population</title>
        <meta name="description" content="Population over time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FullWidth>
          <Compact>
            <Description justify="left" button={true}>
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
          <PoplationLineChatSection />
        </Compact>
      </main>
    </div>
  );
};

export default Home;
