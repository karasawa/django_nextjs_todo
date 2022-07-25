import { FC } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import Cookie from "universal-cookie";

type Props = {
  todo: {
    id: string;
    title: string;
    memo: string;
    created_at: Date;
  };
  mutate: () => void;
};

const cookie = new Cookie();

const Todo: FC<Props> = ({ todo, mutate }) => {
  const remove = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    mutate();
  };

  return (
    <List>
      <MainContainer>
        <TodoWrapper>
          {todo.id}
          {" : "}
          <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
        </TodoWrapper>
        <IconWrapper>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => remove(todo.id)}>
            <DeleteIcon />
          </IconButton>
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
