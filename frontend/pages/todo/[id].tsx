import { getAllTodoIds, getTodo } from "../../lib/todos";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";
import Layout from "../../components/Layout";
import styled from "styled-components";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  todo: {
    id: string;
    title: string;
    created_at: Date;
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllTodoIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const todo = await getTodo(params!.id);
  return {
    props: {
      todo,
    },
    revalidate: 3,
  };
};

const Post: NextPage<Props> = ({ todo }) => {
  return (
    <Layout title={`${todo.id}`}>
      <MainContainer>
        <h3>{todo.id}</h3>
        <h3>{todo.title}</h3>
      </MainContainer>
    </Layout>
  );
};

export default Post;

const MainContainer = styled.div`
  dispaly: flex;
  justify-content: center;
  align-items: center;
`;
