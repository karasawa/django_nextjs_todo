import type { NextPage } from "next";
import Layout from "../components/Layout";
import AuthForm from "../components/atom/AuthForm";

const Auth: NextPage = () => {
  return (
    <Layout title="auth">
      <div>
        <AuthForm />
      </div>
    </Layout>
  );
};

export default Auth;
