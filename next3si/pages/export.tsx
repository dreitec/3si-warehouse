import type { NextPage } from "next";
import Head from "next/head";
import { MainLayout, TabBox } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Export</title>
        <meta
          name="description"
          content="Charts and data export for eligible children"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Page data</main>
    </div>
  );
};

export default Home;
