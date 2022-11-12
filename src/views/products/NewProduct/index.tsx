import { CreateProductParams } from "@api/interfaces";
import { useCreateProductMutation } from "@api/mutations";
import { SubmitButton } from "@components/buttons";
import { FormWrapper } from "@components/forms";
import { setFormErrors } from "@lib/formHelpers";
import Layout from "@views/Layout";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormFields from "../FormFields";

interface Props {}

const NewProduct: React.FC<Props> = () => {
  const methods = useForm<CreateProductParams>();
  const [mutate] = useCreateProductMutation();
  const navigate = useNavigate();
  const { setError } = methods;

  const onSubmit = useCallback(
    async (params: CreateProductParams) => {
      const res = await mutate({ variables: { params } });
      if (res.data?.result.success) {
        const id = res.data.result.data.id;
        navigate(`/products/${id}`);
      } else {
        setFormErrors(setError, res.data?.result.errors);
      }
    },
    [mutate]
  );

  return (
    <Layout title="New product" centered>
      <FormWrapper {...methods} onSubmit={onSubmit}>
        <FormFields />
        <SubmitButton>Create product</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default NewProduct;
