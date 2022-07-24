import Head from "next/head";
import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;

const Main = styled.main`
  height: 100vh;
`;
