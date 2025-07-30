import Head from "next/head";

interface PropTypes {
  title?: string;
}

const TitlePage = (props: PropTypes) => {
  const { title = "SiVolunteer" } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href="" />
    </Head>
  );
};

export default TitlePage;
