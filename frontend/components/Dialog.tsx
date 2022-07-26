import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, FormEvent, useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import Cookie from "universal-cookie";
import { StateContext } from "../context/ContextProvider";

type Props = {
  mutate: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const cookie = new Cookie();

const Dialog: FC<Props> = ({ mutate }) => {
  const { open, setOpen, isCreate, updateData, setUpdateData } =
    useContext(StateContext);
  const [title, setTitle] = useState(
    updateData.todo.title === "" ? "" : updateData.todo.title
  );
  const [memo, setMemo] = useState(
    updateData.todo.memo === "" ? "" : updateData.todo.memo
  );

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}todos/`, {
      method: "POST",
      body: JSON.stringify({ title: title, memo: memo }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setTitle("");
    setMemo("");
    setUpdateData({
      todo: { id: "", title: "", memo: "", created_at: new Date() },
    });
    mutate();
  };

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}todos/${updateData.todo.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: title, memo: memo }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setTitle("");
    setMemo("");
    setUpdateData({
      todo: { id: "", title: "", memo: "", created_at: new Date() },
    });
    mutate();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(open) => {
          setUpdateData({
            todo: { id: "", title: "", memo: "", created_at: new Date() },
          });
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <H3Text>{isCreate ? "TODOを追加" : "TODOを更新"}</H3Text>
          <form onSubmit={isCreate ? create : update}>
            <MainWrapper>
              <TitleForm
                placeholder="todo-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <MemoForm
                placeholder="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
              <Button type="submit">
                {isCreate ? "登録する" : "更新する"}
              </Button>
            </MainWrapper>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Dialog;

const H3Text = styled.h3`
  margin-top: 0;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleForm = styled.input`
  margin-bottom: 25px;
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 3px;
`;

const MemoForm = styled.input`
  margin-bottom: 25px;
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 3px;
  border: none;
  color: #fff;
  background-color: #50b7f5;
  cursor: pointer;
`;
