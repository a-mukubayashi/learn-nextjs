import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, PostData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Date from "../components/date";
import Profile from "../components/profile";

interface Props {
  allPostsData: PostData[];
  username?: string;
}

// SSGの場合getStaticProps. SSRはgetServerSidePropsを使う
// clientでfetchする場合はSWR推奨
export const getStaticProps: GetStaticProps<Props> = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      username: process.env.DB_USER,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const { allPostsData, username } = props;
  return (
    <Layout home>
      <div className={styles.container}>
        <Head>
          <title>{siteTitle}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <dl>
          <dt>user name</dt>
          <dd>{username}</dd>
        </dl>
        <Profile />
        <main className={styles.main}>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          >
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
          <h1 className="title">
            Read{" "}
            <Link href="/posts/first-post">
              <a>this page!</a>
            </Link>
          </h1>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
