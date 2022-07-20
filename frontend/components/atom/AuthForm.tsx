import Link from "next/link";
import styled from "styled-components";

const AuthForm = () => {
  return (
    <MainContainer>
      <form style={{ height: "600px" }}>
        <MainWrapper>
          <SubWrapper>
            <UsernameForm />
            <PasswordForm />
          </SubWrapper>
          <H5Text>
            <Link href="#">
              <A>パスワードを忘れた場合はこちら</A>
            </Link>
          </H5Text>
          <Button>新規登録</Button>
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

const UsernameForm = styled.input``;
const PasswordForm = styled.input``;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
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
  padding: 5px;
  border-radius: 3px;
`;
const H5Text = styled.h5`
  text-align: right;
  cursor: pointer;
`;
const A = styled.a`
  color: #50b7f5;
  cursor: pointer;
`;
