import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MainContainer>
      <form style={{ height: "600px" }}>
        <MainWrapper>
          <H3Text>django-nextjs-todo</H3Text>
          <SubWrapper>
            <UsernameForm placeholder="username" />
            <PasswordForm placeholder="password" />
          </SubWrapper>
          <H5Text>
            <Link href="#">
              <A>パスワードを忘れた場合はこちら</A>
            </Link>
          </H5Text>
          <Button>{isLogin ? "ログイン" : "新規作成"}</Button>
          <H5Text>
            アカウントをお持ちでない場合{" "}
            <Link href="#">
              <A>新規作成</A>
            </Link>
          </H5Text>
        </MainWrapper>
      </form>
    </MainContainer>
  );
};

export default AuthForm;

const UsernameForm = styled.input`
  margin-bottom: 25px;
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 3px;
`;
const PasswordForm = styled.input`
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 3px;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  height: 600px;
  margin: 0 auto;
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainContainer = styled.div`
  height: 600px;
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 3px;
  border: none;
  color: #fff;
  background-color: #50b7f5;
  cursor: pointer;
`;
const H3Text = styled.h3`
  text-align: center;
  font-size: 25px;
`;
const H5Text = styled.h5`
  text-align: right;
  cursor: pointer;
`;
const A = styled.a`
  color: #50b7f5;
  cursor: pointer;
`;
