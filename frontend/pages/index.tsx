import type { NextPage, GetStaticProps } from "next";
import Layout from "../components/Layout";
import styled from "styled-components";
import { getAllTodos } from "../lib/todos";
import Todo from "../components/atom/Todo";
import SideBar from "../components/SideBar";

type Props = {
  sortedTodos: [
    {
      id: string;
      title: string;
      created_at: Date;
    }
  ];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sortedTodos = await getAllTodos();
  return {
    props: {
      sortedTodos,
    },
    revalidate: 3,
  };
};

const Home: NextPage<Props> = ({ sortedTodos }) => {
  return (
    <Layout title="home">
      <MainContainer>
        <SideBar />
        <MainWrapper>
          <TitleWrapper>
            <Title>ホーム</Title>
          </TitleWrapper>
          <ul style={{ padding: 0 }}>
            {sortedTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </MainWrapper>
      </MainContainer>
    </Layout>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 0.45;
  border-right: 1px solid #e6ecf0;
`;

const TitleWrapper = styled.div`
  border-bottom: 1px solid #e6ecf0;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 20px;
`;
