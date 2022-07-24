import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC } from "react";
import styled from "styled-components";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
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

const Dialog: FC<Props> = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  return (
    <div>
      <Modal
        open={open}
        onClose={(open) => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <H3Text>TODOを追加</H3Text>
          <form>
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
              <Button type="submit">登録する</Button>
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
