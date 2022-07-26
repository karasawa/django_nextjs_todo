import type { NextPage, GetStaticProps } from "next";
import Layout from "../components/Layout";
import styled from "styled-components";
import { getAllTodos } from "../lib/todos";
import Todo from "../components/atom/Todo";
import SideBar from "../components/SideBar";
import useSWR from "swr";
import { useEffect } from "react";
import { ContextProvider } from "../context/ContextProvider";
import Dialog from "../components/Dialog";

type Props = {
  sortedTodos: [
    {
      id: string;
      title: string;
      memo: string;
      created_at: Date;
    }
  ];
};

type TodoModel = {
  id: string;
  title: string;
  memo: string;
  created_at: Date;
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

const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}list-todo/`;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage<Props> = ({ sortedTodos }) => {
  const { data: todos, mutate } = useSWR(url, fetcher, {
    fallbackData: sortedTodos,
  });
  const filterdTodos = todos?.sort((a: TodoModel, b: TodoModel) => {
    if (b.created_at > a.created_at) {
      return 1;
    } else {
      return -1;
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <ContextProvider>
      <Layout title="home">
        <MainContainer>
          <SideBar />
          <MainWrapper>
            <TitleWrapper>
              <Title>ホーム</Title>
            </TitleWrapper>
            <ul style={{ padding: 0 }}>
              {filterdTodos.map((todo: TodoModel) => (
                <Todo key={todo.id} todo={todo} mutate={mutate} />
              ))}
            </ul>
          </MainWrapper>
        </MainContainer>
        <Dialog mutate={mutate} />
      </Layout>
    </ContextProvider>
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
