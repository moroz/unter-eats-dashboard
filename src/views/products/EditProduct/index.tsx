import { Product, UpdateProductParams } from "@api/interfaces";
import { useUpdateProductMutation } from "@api/mutations";
import { useGetProductQuery } from "@api/queries/productQueries";
import { SubmitButton } from "@components/buttons";
import { FormWrapper } from "@components/forms";
import Message from "@components/Message";
import { omit } from "@lib/fakeLodash";
import { setFormErrors } from "@lib/formHelpers";
import Layout from "@views/Layout";
import { FlashMessageLevel, useFlash } from "@views/Layout/FlashProvider";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormFields from "../FormFields";

interface Props {}

const EditProduct: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetProductQuery(id!);
  const [mutate, { data: mutationData }] = useUpdateProductMutation();
  const methods = useForm<UpdateProductParams>();
  const { reset, setError } = methods;
  const product = data?.product;
  const navigate = useNavigate();
  const { addMessage } = useFlash();

  const success = mutationData?.result.success;
  const backUrl = `/products/${id}`;

  const resetFormWithProduct = useCallback(
    (product: Product) => {
      if (!product) return;
      const data = omit(product, [
        "id",
        "insertedAt",
        "updatedAt",
        "__typename",
        "categories"
      ]);
      reset(data);
    },
    [reset]
  );

  useEffect(() => {
    if (data?.product) {
      resetFormWithProduct(data.product);
    }
  }, [data]);

  const onSubmit = useCallback(
    async (params: UpdateProductParams) => {
      if (!product) return;
      const res = await mutate({ variables: { id: product.id, params } });
      if (!res.data?.result.success) {
        setFormErrors(setError, res.data?.result.errors);
      } else {
        addMessage(
          {
            level: FlashMessageLevel.Success,
            body: "The product has been successfully updated."
          },
          true
        );
        navigate(backUrl);
      }
    },
    [mutate, product]
  );

  if (loading && !data) return <LayoutLoader />;
  if (!product) return <NotFound />;

  return (
    <Layout
      title={product.namePl}
      subtitle="Editing product"
      centered
      backUrl={backUrl}
    >
      <FormWrapper {...methods} onSubmit={onSubmit}>
        {success === false && (
          <Message level="danger">
            The product could not be saved. Please review the error messages in
            the form below:
          </Message>
        )}
        <FormFields />
        <SubmitButton>Update product</SubmitButton>
      </FormWrapper>
    </Layout>
  );
};

export default EditProduct;
