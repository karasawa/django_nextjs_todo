import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import styled from "styled-components";
import { getAllTodos, getTodo } from "../lib/todos";
import Todo from "../components/atom/Todo";

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
      <div>
        <h3>home</h3>
        <ul style={{ padding: 0 }}>
          {sortedTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
