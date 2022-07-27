import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";

const cookie = new Cookie();

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const login = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}auth/jwt/create/`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const options = { path: "/" };
          cookie.set("access_token", data.access, options);
          cookie.set("request_user", username, options);
        });
      router.push("/");
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login();
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}register/`, {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          }
        });
        await login();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <MainContainer>
      <form style={{ height: "600px" }} onSubmit={authUser}>
        <MainWrapper>
          <H3Text>django-nextjs-todo</H3Text>
          <SubWrapper>
            <UsernameForm
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordForm
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </SubWrapper>
          <H5Text>
            <Link href="#">
              <A>パスワードを忘れた場合はこちら</A>
            </Link>
          </H5Text>
          <Button type="submit">{isLogin ? "ログイン" : "新規作成"}</Button>
          {isLogin ? (
            <H5Text>
              アカウントをお持ちでない場合{" "}
              <A onClick={(e) => setIsLogin(!isLogin)}>新規作成</A>
            </H5Text>
          ) : (
            <H5Text>
              <A onClick={(e) => setIsLogin(!isLogin)}>戻る</A>
            </H5Text>
          )}
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
  outline: none;
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
