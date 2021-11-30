import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Description, FullWidth, Compact } from "../components";
import { ExportSection } from "../sections";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Providers</title>
        <meta
          name="description"
          content="Charts and data export for providers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Compact>
          <ExportSection />
        </Compact>
      </main>
    </div>
  );
};

export default Home;
