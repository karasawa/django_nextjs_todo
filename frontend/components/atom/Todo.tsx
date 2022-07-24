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
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px solid #e6ecf0;
`;

const List = styled.li`
  list-style: none;
`;

const IconWrapper = styled.div``;
const TodoWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  &:hover {
    color: #50b7f5;
  }
`;
