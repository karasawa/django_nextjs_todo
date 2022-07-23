import { FC } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

type Props = {
  todo: {
    id: string;
    title: string;
    created_at: Date;
  };
};

const Todo: FC<Props> = ({ todo }) => {
  return (
    <List>
      <MainContainer>
        <TodoWrapper>
          {todo.id}
          {" : "}
          <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
        </TodoWrapper>
        <IconWrapper>
          <EditIcon />
          <DeleteIcon />
        </IconWrapper>
      </MainContainer>
    </List>
  );
};

export default Todo;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;

const List = styled.li`
  list-style: none;
`;

const IconWrapper = styled.div``;
const TodoWrapper = styled.div``;
