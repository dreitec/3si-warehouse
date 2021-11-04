import type { NextPage } from "next";
import Head from "next/head";
import { MainLayout, TabBox } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Eligible</title>
        <meta
          name="description"
          content="Charts and data export for eligible children"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <MainLayout>
          <TabBox />
        </MainLayout>
      </main>
    </div>
  );
};

export default Home;
