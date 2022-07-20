import Head from "next/head";
import { FC, ReactNode } from "react";

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
      <main>{children}</main>
    </div>
  );
};

export default Layout;
