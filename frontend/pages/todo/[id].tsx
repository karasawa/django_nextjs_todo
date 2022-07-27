import { getAllTodoIds, getTodo } from "../../lib/todos";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";
import Layout from "../../components/Layout";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  staticTodo: {
    id: string;
    title: string;
    memo: string;
    user: string;
    created_at: Date;
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllTodoIds();
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const staticTodo = await getTodo(params!.id);
  return {
    props: {
      staticTodo,
    },
    revalidate: 3,
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Post: NextPage<Props> = ({ staticTodo }) => {
  const router = useRouter();

  const { data: todo, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}detail-todo/${staticTodo.id}/`,
    fetcher,
    {
      fallbackData: staticTodo,
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title={`${todo.id}`}>
      <MainContainer>
        <SideBar />
        <MainWrapper>
          <TitleWrapper>
            <Title>詳細</Title>
          </TitleWrapper>
          <TodoWrapper>
            <h3>ID：　{todo.id}</h3>
            <h3>タスク：　{todo.title}</h3>
            <h3>メモ：　{todo.memo}</h3>
            <h3>
              登録日：　
              {String(todo.created_at).substring(
                10,
                String(todo.created_at).indexOf("")
              )}
            </h3>
            <h3>作成者：　{todo.user}</h3>
          </TodoWrapper>
          <ButtonWrapper>
            <BackButton onClick={() => router.push("/")}>戻る</BackButton>
          </ButtonWrapper>
        </MainWrapper>
      </MainContainer>
    </Layout>
  );
};

export default Post;

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

const TodoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: right;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #50b7f5;
  color: #fff;
  border-radius: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: bold;
`;
