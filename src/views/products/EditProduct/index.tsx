import { Product, UpdateProductParams } from "@api/interfaces";
import { useUpdateProductMutation } from "@api/mutations";
import { useGetProductQuery } from "@api/queries/productQueries";
import { SubmitButton } from "@components/buttons";
import {
  FormWrapper,
  InputField,
  InputGroup,
  Textarea
} from "@components/forms";
import Message from "@components/Message";
import { omit } from "@lib/fakeLodash";
import { setFormErrors } from "@lib/formHelpers";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import FormFields from "../FormFields";
import styles from "./EditProduct.module.sass";

interface Props {}

const EditProduct: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetProductQuery(id!);
  const [mutate, { data: mutationData }] = useUpdateProductMutation();
  const methods = useForm<UpdateProductParams>();
  const { register, reset, setError } = methods;
  const product = data?.product;

  const success = mutationData?.result.success;

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
        resetFormWithProduct(res.data.result.data);
      }
    },
    [mutate, product]
  );

  if (loading && !data) return <LayoutLoader />;
  if (!product) return <NotFound />;

  const title = `Product: ${product.namePl}`;

  return (
    <Layout title={title}>
      <div className={styles.columns}>
        <FormWrapper {...methods} onSubmit={onSubmit}>
          {success === true && (
            <Message level="success">
              The product has been successfully updated.
            </Message>
          )}
          <FormFields />
          <SubmitButton>Update product</SubmitButton>
        </FormWrapper>
      </div>
    </Layout>
  );
};

export default EditProduct;
