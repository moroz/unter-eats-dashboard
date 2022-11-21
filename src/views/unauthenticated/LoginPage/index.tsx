import { SignInMutationVariables, useSignInMutation } from "@api/mutations";
import { FormWrapper, InputField } from "@components/forms";
import { SubmitButton } from "@components/buttons";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Card } from "@components";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [mutate, { data, called, loading }] = useSignInMutation();
  const methods = useForm<SignInMutationVariables>();
  const { register } = methods;
  const navigate = useNavigate();
  const hasError = called && !loading && !data?.signIn.success;

  const onSubmit = useCallback(async (data: SignInMutationVariables) => {
    const result = await mutate({ variables: data });
    if (result.data?.signIn.success) {
      navigate("/");
    }
  }, []);

  return (
    <Layout title="Login">
      <Card>
        <FormWrapper {...methods} onSubmit={onSubmit}>
          <h1 className="title is-4 has-text-centered">Sign in</h1>
          {loading && <div className="notification">Signing in...</div>}
          {hasError && (
            <div className="notification is-warning">
              Your email or password is incorrect.
            </div>
          )}
          <InputField
            label="Email:"
            {...register("email")}
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            spellCheck={false}
            required
          />
          <InputField
            label="Password:"
            type="password"
            autoComplete="password"
            required
            {...register("password")}
          />
          <SubmitButton className="is-fullwidth" disabled={loading}>
            Sign in
          </SubmitButton>
        </FormWrapper>
      </Card>
    </Layout>
  );
};

export default LoginPage;
