import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useState } from "react";
import AuthForm from "../components/atom/AuthForm";

const Auth: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout title="auth">
      <div>
        <h3>django-nextjs-todo</h3>
        <AuthForm />
      </div>
    </Layout>
  );
};

export default Auth;
